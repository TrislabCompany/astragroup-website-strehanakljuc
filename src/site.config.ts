// The site's own facts, read at build time: languages, company, contact,
// legal pages, lists of items, structured data and security.txt. Change the
// values here; the shape is in src/lib/site-settings.ts. Nothing here is
// secret: it all ends up in the public pages. Values that differ per
// Environment go to /config.json instead (src/lib/config.ts).
// First written by `pnpm init-site` from site.yaml; from then on it is the
// site's own.

import shareImage from "./assets/share.png";
import type { SiteSettings } from "./lib/site-settings";

/** The site's languages. With one language, the URLs have no language prefix. */
export const languages = ["sl"] as const;
export type Lang = (typeof languages)[number];

const site: SiteSettings<Lang> = {
  url: "https://strehanakljuc.si",
  name: "Streha na ključ",
  description: {
    sl: "Prenova strehe in nova streha na ključ, korak za korakom: od ogleda do predaje. Pošljite povpraševanje za brezplačno ponudbo."
  },
  languages: languages,
  defaultLanguage: "sl",
  shareImage: {
    src: shareImage,
    alt: {
      sl: "Streha na ključ: risba hiše z bakreno streho na skrilasti podlagi in napis Prenova strehe in nova streha, od ogleda do predaje."
    }
  },
  themeColor: "#263a45",
  collections: [
    {
      id: "pogosta-vprasanja",
      title: {
        sl: "Pogosta vprašanja"
      },
      lead: {
        sl: "Odgovori na vprašanja o dovoljenjih, letnem času, puščanju strehe in subvencijah."
      },
      nav: true,
      home: false
    }
  ],
  company: {
    name: "Astra Group",
    legalName: "ASTRA GROUP d.o.o.",
    address: {
      street: "Ulica 15. maja 2",
      postalCode: "6000",
      city: "Koper - Capodistria",
      country: "SI"
    },
    registrationNumber: "6610463000",
    vatId: "SI50724240",
    logo: "/favicon.svg",
    profiles: []
  },
  contact: {
    // No public mailbox: the quote request form is the site's only contact.
    topics: [],
    // A plain link, shown in the imprint only: the site names the company there alone.
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ulica+15.+maja+2%2C+6000+Koper"
  },
  legalPages: {
    imprint: true,
    privacy: true,
    accessibility: true,
    sustainability: false
  },
  structuredData: "LocalBusiness",
  securityTxt: {
    contact: "mailto:info@trislab.com",
    expires: "2027-11-11T22:09:52.871Z"
  }
};

export default site;
