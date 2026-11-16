# astragroup-website-strehanakljuc

Streha na ključ, strehanakljuc.si, built from `tl-template-website` v0.5.0. Read this first; the detail is in [`docs/`](docs/).

## What it is

An [Astro](https://astro.build) site built into static files, served by Cloudflare Pages. It explains, step by step, how a roof is renovated or built turnkey, and leads to a quote request ([docs/brief.md](docs/brief.md)). It sets no cookies, runs no JavaScript and loads no outside service.

| Page | Address | Built from |
| --- | --- | --- |
| Domov | `/` | `src/pages/[...lang]/index.astro` |
| Prenova strehe | `/prenova-strehe` | `prenova-strehe.astro` |
| Nova streha na ključ | `/nova-streha-na-kljuc` | `nova-streha-na-kljuc.astro` |
| Ravne strehe | `/ravne-strehe` | `ravne-strehe.astro` |
| Kritine in materiali | `/kritine-in-materiali` | `kritine-in-materiali.astro` |
| Pogosta vprašanja | `/pogosta-vprasanja` and one page per question | `src/content/pogosta-vprasanja/sl/*.md` |
| Povpraševanje | `/povprasevanje`, `/povprasevanje/hvala`, `/povprasevanje/napaka` | `povprasevanje.astro` and `povprasevanje/` |
| Impresum, politika zasebnosti, izjava o dostopnosti, zemljevid strani, 404 | from the template | `src/content/legal/sl/` |

The texts of the site's own pages are in `src/texts/sl.ts`, the menu in `src/lib/navigation.ts`, and the sources of the facts, with the day each was checked, in `src/lib/sources.ts` and in each FAQ entry. The site's own components: the journey chooser, the numbered timeline, the "what is included" checklist, the roof-layers drawing, the coverings comparison, the FAQ accordion, the quote form and the sticky enquiry button on phones. `scripts/check-design.mjs` checks the brief's design rules on every built page.

**The quote form is the site's only contact.** It is not sent anywhere yet: the shared form Worker isn't built. Until it is, the form's button is off and a note says so. How to switch it on: `src/lib/quote-form.ts`.

**Languages:** Slovenian. The first is the default; each language lives under its own URL.

## Environments

| Environment | Address | Shows | Who can open it |
| --- | --- | --- | --- |
| `dev` | `dev.strehanakljuc.si` | The newest merged work | Signed-in people only |
| `staging` | `staging.strehanakljuc.si` | The newest release | Signed-in people only |
| `production` | `strehanakljuc.si` | The promoted release | Everyone, after the cutover |

How a change moves between them is in [docs/deployment.md](docs/deployment.md). Where each one runs and which version is deployed: `pnpm status`.

## Before production

- Switch the quote form on (`src/lib/quote-form.ts`): the Worker's address, the Turnstile site key, the form page's Content-Security-Policy rule in `public/_headers`, and the claims of the legal pages reviewed for the form page.
- Have a lawyer review the privacy policy and the accessibility statement (`src/content/legal/sl/`); name the mail provider in the privacy policy.
- Check the permit and subsidy facts against their sources and update the dates (`src/lib/sources.ts`, the FAQ entries).
- Replace the home page's drawing with a licensed stock photo if one is chosen (docs/brief.md, Photos).
- Set Cloudflare Web Analytics (`analytics` in `src/site.config.ts`) once the infrastructure repository gives its token.
- Check the facts in `src/site.config.ts` against the company's published data.

## Work on it

1. `pnpm install`, then `pnpm dev`, and open <http://localhost:4321>.
2. Run `pnpm test` and `pnpm test:a11y` before every push ([docs/getting-started.md](docs/getting-started.md)).
3. Every change is a PR to `main`. `ci / ci` must pass and a code owner must approve. A merge deploys to `dev`.

## More

- [docs/brief.md](docs/brief.md): what to build, the design direction and the acceptance criteria.
- [AGENTS.md](AGENTS.md): the guide for coding agents and their skills.
- [Site settings](docs/site-settings.md): languages, lists of items, contact and legal pages, the brand.
- [Deployment](docs/deployment.md): deploy, release and promote.
- [Quality checks](docs/quality-checks.md): what `ci / ci` checks.
- [Updates from the template](docs/upgrading/README.md): `.template-version` and update PRs.
