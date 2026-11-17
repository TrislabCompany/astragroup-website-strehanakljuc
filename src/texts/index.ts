// The texts of the site's own pages (home, the journey pages, the coverings,
// the quote request), per language. Short interface strings (menus, buttons)
// are in src/i18n/ui/; the FAQ and the legal texts are Markdown in
// src/content/. Every language of the site has a file here with the same shape
// (the type PageTexts makes sure of it).
import type { Lang } from "../i18n";
import sl from "./sl";

/** One step of a numbered timeline: what happens and what the visitor gets from it. */
export interface Step {
  title: string;
  text: string;
  /** "What you get" from this step. */
  result: string;
}

/** A block of text with a heading: paragraphs, a list, or both. */
export interface TextBlock {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

/** The top of a page: its title, the line above it, the lead and the search description. */
export interface PageIntro {
  title: string;
  eyebrow: string;
  lead: string;
  /** The page's description for search engines and sharing. */
  description: string;
}

/** A roof covering in the comparison. */
export interface Covering {
  id: string;
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
  /** The roof pitch it needs, in words. */
  pitch: string;
}

/** A layer of the roof, from the inside out (the roof-layers drawing). */
export interface Layer {
  name: string;
  text: string;
}

/** A choice of the quote form. */
export interface Choice {
  value: string;
  label: string;
}

export interface PageTexts {
  home: {
    intro: PageIntro;
    flatRoofLink: string;
    stepsHeading: string;
    stepsLead: string;
    steps: Step[];
    includedHeading: string;
    includedLead: string;
    included: string[];
    layersHeading: string;
    layersLead: string;
    journeysHeading: string;
  };
  journeys: {
    renovation: { title: string; text: string };
    newRoof: { title: string; text: string };
    flatRoof: { title: string; text: string };
  };
  quoteCta: {
    heading: string;
    text: string;
    next: string[];
  };
  renovation: {
    intro: PageIntro;
    when: TextBlock;
    stepsHeading: string;
    steps: Step[];
    includedHeading: string;
    included: string[];
    subsidy: TextBlock;
  };
  newRoof: {
    intro: PageIntro;
    meaning: TextBlock;
    includedHeading: string;
    included: string[];
    stepsHeading: string;
    steps: Step[];
  };
  flatRoofs: {
    intro: PageIntro;
    blocks: TextBlock[];
    stepsHeading: string;
    steps: Step[];
  };
  coverings: {
    intro: PageIntro;
    prosLabel: string;
    consLabel: string;
    pitchLabel: string;
    items: Covering[];
    pitchNote: string;
    choosing: TextBlock;
  };
  layers: {
    /** The drawing's accessible name. */
    title: string;
    layers: Layer[];
  };
  quote: {
    intro: PageIntro;
    stepLabel: string;
    work: { legend: string; choices: Choice[] };
    roof: {
      legend: string;
      municipality: string;
      area: string;
      areaHint: string;
      roofType: string;
      roofTypes: Choice[];
      covering: string;
      coverings: Choice[];
      message: string;
      messageHint: string;
    };
    contact: {
      legend: string;
      name: string;
      phone: string;
      email: string;
      reachHint: string;
      preferred: string;
      preferredChoices: Choice[];
      consentBefore: string;
      consentLink: string;
      consentAfter: string;
    };
    optional: string;
    choose: string;
    submit: string;
    /** Shown while the form can't be sent: before the page has the Environment's settings, or without JavaScript. */
    formOff: string;
    nextHeading: string;
    next: string[];
    sendHeading: string;
    send: string[];
  };
  thanks: { intro: PageIntro; next: string[] };
  failed: { intro: PageIntro; text: string };
}

const texts: Record<Lang, PageTexts> = { sl };

export function pageTexts(lang: Lang): PageTexts {
  return texts[lang];
}
