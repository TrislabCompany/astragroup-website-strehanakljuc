// Where the quote request form is sent: Trislab's shared form Worker
// (docs/forms.md, D-14), which checks Turnstile and the fields, e-mails the
// request to the company's mailbox and stores nothing. It then sends the
// visitor to the thank-you page or the error page below.
//
// Each Environment has its own Worker and its own Turnstile widget, but one
// build runs in all of them (docs/deployment.md). So the address and the site
// key are not built into the page: the form page reads them from the
// Environment's /config.json in the browser (src/components/QuoteForm.astro):
//
// - PUBLIC_FORMS_URL: the Worker's origin, for example https://forms-dev.trislab.com
// - PUBLIC_TURNSTILE_SITE_KEY: the Environment's public Turnstile site key
//
// Both are variables of the GitHub Environment, set in tl-cloud-infrastructure.
// Without either one the form stays switched off and says so.
import type { SiteConfig } from "./config";

/** This site's form on the Worker: posts go to `${PUBLIC_FORMS_URL}/f/${formId}`. */
export const quoteForm = {
  formId: "strehanakljuc-povprasevanje",
  /** The name shown for the challenge in Cloudflare's Turnstile analytics. */
  turnstileAction: "povprasevanje",
} as const;

/** The origins the Worker runs on, one per Environment; public/_headers allows them in form-action. */
export const FORMS_ORIGINS = ["https://forms-dev.trislab.com", "https://forms-staging.trislab.com", "https://forms.trislab.com"] as const;

/**
 * The address the form posts to, from an Environment's settings, or undefined
 * when the form can't be sent there: a setting is missing, or the Worker's
 * address isn't one of FORMS_ORIGINS (the Content-Security-Policy would block it).
 */
export function formTarget(settings: SiteConfig): { action: string; siteKey: string } | undefined {
  const origin = settings.PUBLIC_FORMS_URL?.trim().replace(/\/+$/, "");
  const siteKey = settings.PUBLIC_TURNSTILE_SITE_KEY?.trim();
  if (!origin || !siteKey || !(FORMS_ORIGINS as readonly string[]).includes(origin)) return undefined;
  return { action: `${origin}/f/${quoteForm.formId}`, siteKey };
}

/** The page the Worker sends the visitor to after a request has been sent. */
export const THANKS_PATH = "/povprasevanje/hvala";
/** The page the Worker sends the visitor to when a request could not be sent. */
export const FAILED_PATH = "/povprasevanje/napaka";
