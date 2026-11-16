// The sources of the facts on the site's own pages, with the date each was
// last checked (docs/brief.md: every fact cites its source with that date).
// The FAQ entries give theirs in their front matter (src/content.config.ts).
// Check a source again before a release and update `checked`.

export interface Source {
  title: string;
  url: string;
  /** The day the fact was last checked against the source, YYYY-MM-DD. */
  checked: string;
}

export const SOURCES = {
  ekosklad: {
    title: "Eko sklad, Slovenski okoljski javni sklad: javni pozivi za občane",
    url: "https://www.ekosklad.si/",
    checked: "2026-11-16",
  },
} satisfies Record<string, Source>;
