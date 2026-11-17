// The main menu, in its order (docs/brief.md): the four journey and topic
// pages, the lists of items marked nav in src/site.config.ts, then the quote
// request, shown as a button. Read by the header, the sitemap page and the
// sticky enquiry button.
import type { UiKey } from "../i18n/ui/en";
import { t, type Lang } from "../i18n";
import site from "../site.config";

export interface NavLink {
  href: string;
  label: string;
}

/** The pages of the site's own design, by address and menu label. */
export const PAGES = [
  { href: "/prenova-strehe", key: "nav.renovation" },
  { href: "/nova-streha-na-kljuc", key: "nav.newRoof" },
  { href: "/ravne-strehe", key: "nav.flatRoofs" },
  { href: "/kritine-in-materiali", key: "nav.coverings" },
] as const satisfies readonly { href: string; key: UiKey }[];

/** The address of the quote request page. */
export const QUOTE_PATH = "/povprasevanje";

/** The links of the main menu, without the quote request button. */
export function menuLinks(lang: Lang): NavLink[] {
  return [
    ...PAGES.map(({ href, key }) => ({ href, label: t(lang, key) })),
    ...site.collections.filter((collection) => collection.nav).map((collection) => ({ href: `/${collection.id}`, label: collection.title[lang] })),
  ];
}

/** True when `path` is the page of `href` or one under it (/pogosta-vprasanja/dovoljenje). */
export function isCurrent(path: string, href: string): boolean {
  return path === href || path.startsWith(`${href}/`);
}
