// Where the quote request form is sent: Trislab's shared form Worker
// (docs/forms.md, D-14), which checks Turnstile and the fields, e-mails the
// request to the company's mailbox and stores nothing. It then sends the
// visitor to the thank-you page or the error page below.
//
// Each Environment has its own Worker and Turnstile widget, and the same build
// runs in all of them, so the Worker's address and the site key are not here:
// src/components/forms/FormEndpoint.astro reads them from /config.json
// (PUBLIC_FORMS_URL, PUBLIC_TURNSTILE_SITE_KEY) and posts to
// `${PUBLIC_FORMS_URL}/f/${formId}`.
export const quoteForm = {
  /** The form's id on the form Worker. */
  formId: "strehanakljuc-povprasevanje",
} as const;

/** The page the Worker sends the visitor to after a request has been sent. */
export const THANKS_PATH = "/povprasevanje/hvala";
/** The page the Worker sends the visitor to when a request could not be sent. */
export const FAILED_PATH = "/povprasevanje/napaka";
