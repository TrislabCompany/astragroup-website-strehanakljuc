// Checks that what the legal pages promise about the site is true of the build,
// so the statements can't drift from the code. Run by `pnpm test` after
// check-page-weight.mjs, so ci runs it on every PR.
//
// 1. "No JavaScript" (sustainability page, accessibility statement): once a
//    production deploy has taken the environment badge out
//    (scripts/write-config.mjs), no page loads or contains a script. JSON-LD
//    is data, not code, and is allowed. A site that sets `analytics`
//    (docs/analytics.md) runs exactly one script, Analytics.astro's; then the
//    Content-Security-Policy's connect-src in public/_headers must allow its
//    endpoint, and the privacy policy of every language must name the provider
//    ("Plausible", or "Cloudflare Web Analytics", whose beacon script's origin
//    script-src must allow too). The quote form page (/povprasevanje) also runs
//    QuoteForm.astro's script, which adds Cloudflare Turnstile and points the
//    form at the Environment's form Worker (docs/forms.md). Only a page with
//    the form may run it; then public/_headers must have a rule for that
//    page's own path whose Content-Security-Policy allows Turnstile in
//    script-src and frame-src and every Worker (FORMS_ORIGINS in
//    src/lib/quote-form.ts) in form-action, and the privacy policy of every
//    language must name Turnstile.
// 2. The published footprint (sustainability page, every language): the
//    average page weight and the CO2e per page view must match the build,
//    within the rounding the page uses. When the check fails, update the
//    figures in src/content/legal/<lang>/sustainability.md.
//
// The browser check (scripts/check-browser.mjs) covers the other promises:
// WCAG 2.1 AA, reflow, no cookies, no storage and no third-party requests.

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { calculate } from "./co2-estimate.mjs";
import { withoutBadge } from "./write-config.mjs";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const dist = join(rootDir, "dist");
const KB = 1024;
/** How far the published page weight may be from the build: it is rounded ("about 145 KB"). */
const WEIGHT_TOLERANCE = 0.1;
/** The published CO2e per view has two decimals ("about 0.02 g"). */
const GRAMS_TOLERANCE = 0.005;

/** Scripts a page still runs: every <script> except JSON-LD. */
export function scriptsIn(html) {
  return [...html.matchAll(/<script\b[^>]*>/gi)].map(([tag]) => tag).filter((tag) => !/type=["']application\/ld\+json["']/i.test(tag));
}

/** The endpoint a page sends visit counts to (src/components/analytics/Analytics.astro), or undefined. */
export function analyticsEndpoint(html) {
  return html.match(/<meta\s+name="analytics"[^>]*\bdata-endpoint="([^"]+)"/i)?.[1];
}

/** The provider, endpoint and beacon script (Cloudflare only) a page's analytics tag names, or undefined without analytics. */
export function analyticsOf(html) {
  const tag = html.match(/<meta\s+name="analytics"[^>]*>/i)?.[0];
  if (!tag) return undefined;
  const attr = (name) => tag.match(new RegExp(`\\bdata-${name}="([^"]*)"`))?.[1];
  return { provider: attr("provider"), endpoint: attr("endpoint"), beacon: attr("beacon") };
}

/** The name a provider's privacy-policy text must carry. */
export const PROVIDER_NAMES = { plausible: "Plausible", cloudflare: "Cloudflare Web Analytics" };

const ANALYTICS_SCRIPT = /\bsrc="\/_astro\/Analytics\.astro_[^"]*"/;

const FORM_SCRIPT = /\bsrc="\/_astro\/QuoteForm\.astro_[^"]*"/;
/** The origin Turnstile loads its script and its frame from. */
export const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";

/** Whether a page has the quote form (src/components/QuoteForm.astro). */
export function hasForm(html) {
  return /<form\b[^>]*\bdata-quote-form\b/.test(html);
}

/** The form Workers' origins, as FORMS_ORIGINS in src/lib/quote-form.ts lists them. */
export function formsOrigins(source) {
  const list = source.match(/FORMS_ORIGINS\s*=\s*\[([^\]]*)\]/)?.[1] ?? "";
  return [...list.matchAll(/"([^"]+)"/g)].map(([, origin]) => origin);
}

/** What a page's Content-Security-Policy must allow for the quote form, one line per gap; `workers` are the form Workers' origins. */
export function formPolicyGaps(policy, workers) {
  const gaps = [];
  for (const directive of ["script-src", "frame-src"]) {
    if (!policySources(policy, directive).includes(TURNSTILE_ORIGIN)) gaps.push(`${directive} doesn't allow ${TURNSTILE_ORIGIN}`);
  }
  const formAction = policySources(policy, "form-action");
  for (const worker of workers) if (!formAction.includes(worker)) gaps.push(`form-action doesn't allow ${worker}`);
  return gaps;
}

/** The scripts a production page runs that no claim allows: all but JSON-LD, the analytics script when the page has analytics, and the quote form's script when the page has the form. */
export function unexpectedScripts(html) {
  const analytics = analyticsEndpoint(html) !== undefined;
  const form = hasForm(html);
  return scriptsIn(html).filter((tag) => !(analytics && ANALYTICS_SCRIPT.test(tag)) && !(form && FORM_SCRIPT.test(tag)));
}

/** The Content-Security-Policy of the rule for exactly `path` in a _headers file, or undefined. */
export function pathPolicy(headers, path) {
  let current;
  let policy;
  for (const line of headers.split(/\r?\n/)) {
    if (/^\S/.test(line) && !line.startsWith("#")) current = line.trim();
    const value = line.match(/^\s+Content-Security-Policy:\s*(.+)$/i)?.[1];
    if (value !== undefined && current === path) policy = value;
  }
  return policy;
}

/** The sources one directive of a Content-Security-Policy allows. */
export function policySources(policy, name) {
  const directive = (policy ?? "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name} `));
  return directive ? directive.split(/\s+/).slice(1) : [];
}

/** The address Cloudflare Pages serves a built page at: about.html is /about, index.html is /. */
export function pagePath(relative) {
  const path = `/${relative.replaceAll("\\", "/").replace(/^\/+/, "")}`.replace(/\.html$/, "");
  return path === "/index" ? "/" : path.replace(/\/index$/, "");
}

/** The sources a Content-Security-Policy directive allows in a _headers file, for the rule of every path (/*). */
export function directiveSources(headers, name) {
  const csp = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/im)?.[1] ?? "";
  const directive = csp.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name} `));
  return directive ? directive.split(/\s+/).slice(1) : [];
}

/** The sources connect-src allows in a _headers file, for the rule of every path (/*). */
export function connectSources(headers) {
  return directiveSources(headers, "connect-src");
}

/** The figures in a sustainability page: the first "<n> KB" and "<n> g CO₂e" in its text. */
export function publishedFigures(markdown) {
  const number = (text) => (text === undefined ? undefined : Number(text.replace(",", ".")));
  return {
    kb: number(markdown.match(/(\d+(?:[.,]\d+)?)\s*KB/)?.[1]),
    grams: number(markdown.match(/(\d+(?:[.,]\d+)?)\s*g CO₂e/)?.[1]),
  };
}

async function main() {
  const failures = [];

  const files = (await readdir(dist, { withFileTypes: true, recursive: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));
  const endpoints = new Set();
  const beacons = new Set();
  const providers = new Set();
  const formPages = [];
  for (const file of files) {
    const html = withoutBadge(await readFile(file, "utf8"));
    const scripts = unexpectedScripts(html);
    if (scripts.length > 0) failures.push(`${file.slice(dist.length)} runs a script in production: ${scripts[0]}`);
    const endpoint = analyticsEndpoint(html);
    if (endpoint) endpoints.add(endpoint);
    if (hasForm(html)) formPages.push(pagePath(file.slice(dist.length)));
    const analytics = analyticsOf(html);
    if (analytics?.provider) providers.add(analytics.provider);
    if (analytics?.beacon) beacons.add(analytics.beacon);
  }

  const legal = join(rootDir, "src", "content", "legal");
  if (formPages.length > 0) {
    const headers = await readFile(join(rootDir, "public", "_headers"), "utf8");
    const workers = formsOrigins(await readFile(join(rootDir, "src", "lib", "quote-form.ts"), "utf8"));
    if (workers.length === 0) failures.push("src/lib/quote-form.ts lists no FORMS_ORIGINS; list the form Workers' origins there");
    for (const path of formPages) {
      const policy = pathPolicy(headers, path);
      if (policy === undefined) {
        failures.push(`${path} has the quote form, but public/_headers has no Content-Security-Policy rule for ${path}; add one (docs/forms.md, section 3)`);
        continue;
      }
      for (const gap of formPolicyGaps(policy, workers)) failures.push(`the quote form needs it, but the rule for ${path} in public/_headers: ${gap}; add it there (docs/forms.md)`);
    }
    for (const lang of await readdir(legal)) {
      const text = await readFile(join(legal, lang, "privacy.md"), "utf8").catch(() => undefined);
      if (text !== undefined && !text.includes("Turnstile")) failures.push(`${lang}/privacy.md doesn't name Cloudflare Turnstile, which checks the quote form (docs/forms.md)`);
    }
  }
  if (endpoints.size > 0) {
    const headers = await readFile(join(rootDir, "public", "_headers"), "utf8");
    const allowed = connectSources(headers);
    const allowedScripts = directiveSources(headers, "script-src");
    for (const beacon of beacons) {
      const origin = new URL(beacon).origin;
      if (!allowedScripts.includes(origin)) failures.push(`analytics loads a script from ${origin}, which script-src in public/_headers doesn't allow; add it there`);
    }
    for (const endpoint of endpoints) {
      const origin = new URL(endpoint).origin;
      if (!allowed.includes(origin)) failures.push(`analytics sends to ${origin}, which connect-src in public/_headers doesn't allow; add it there`);
    }
    for (const lang of await readdir(legal)) {
      const text = await readFile(join(legal, lang, "privacy.md"), "utf8").catch(() => undefined);
      for (const provider of providers) {
        const name = PROVIDER_NAMES[provider] ?? provider;
        if (text !== undefined && !text.includes(name)) failures.push(`${lang}/privacy.md doesn't name ${name}, which counts the visits (docs/analytics.md)`);
      }
    }
  }

  const report = JSON.parse(await readFile(join(rootDir, "page-weight-report.json"), "utf8"));
  const builtKb = report.averageBytes / KB;
  const builtGrams = calculate({ averageBytes: report.averageBytes, visits: 1 }).kgPerVisit * 1000;
  for (const lang of await readdir(legal)) {
    const page = join(legal, lang, "sustainability.md");
    const text = await readFile(page, "utf8").catch(() => undefined);
    if (text === undefined) continue;
    const { kb, grams } = publishedFigures(text);
    if (kb === undefined || Math.abs(kb - builtKb) / builtKb > WEIGHT_TOLERANCE) {
      failures.push(`${lang}/sustainability.md says ${kb} KB per page; the build averages ${builtKb.toFixed(1)} KB`);
    }
    if (grams === undefined || Math.abs(grams - builtGrams) > GRAMS_TOLERANCE) {
      failures.push(`${lang}/sustainability.md says ${grams} g CO2e per view; the build gives ${builtGrams.toFixed(4)} g`);
    }
  }

  if (failures.length > 0) {
    for (const failure of failures) console.error(`claims: ${failure}`);
    process.exit(1);
  }
  console.log(
    `claims: ok. ${files.length} pages run ${endpoints.size > 0 ? "only the analytics script, allowed in connect-src and named in the privacy policy," : "no JavaScript"} in production${formPages.length > 0 ? `, except the quote form's script on ${formPages.join(", ")}, with its own Content-Security-Policy allowing Turnstile and the form Workers, and Turnstile named` : ""}; ${builtKb.toFixed(1)} KB and ${builtGrams.toFixed(4)} g CO2e per view match the sustainability page.`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await main();
