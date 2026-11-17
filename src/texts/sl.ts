// The texts of the site's own pages in Slovenian (src/texts/index.ts). No
// prices, warranties, response times, regions or references (docs/brief.md):
// a fact a reader could check needs a source, and is left out without one.
import type { PageTexts } from "./index";

const steps = {
  inspection: {
    title: "Ogled strehe",
    text: "Na dogovorjeni dan si streho ogledamo od blizu: kritino, ostrešje, obrobe, žlebove in podstrešje.",
    result: "Ocena stanja strehe in predlog, ali zadošča popravilo ali je čas za prenovo.",
  },
  offer: {
    title: "Pisna ponudba",
    text: "Po ogledu pripravimo ponudbo s popisom vseh del in materialov, tako da veste, kaj je vključeno.",
    result: "Ponudba, ki jo lahko postavite ob drugo in primerjate obseg in materiale.",
  },
  materials: {
    title: "Izbira kritine in izolacije",
    text: "Skupaj izberemo kritino, barvo in debelino izolacije, ki ustrezajo naklonu strehe in vaši hiši.",
    result: "Jasna odločitev o materialih, preden se dela začnejo.",
  },
  layers: {
    title: "Odstranitev stare strehe in nove plasti",
    text: "Staro kritino odstranimo in odpeljemo, pregledamo ostrešje ter položimo nove plasti: folije, izolacijo, letve in kritino.",
    result: "Streha, sestavljena plast za plastjo, kot jo prikazuje prerez spodaj.",
  },
  flashing: {
    title: "Obrobe in žlebovi",
    text: "Na koncu uredimo obrobe ob dimniku, zidovih in strešnih oknih ter namestimo žlebove in odtočne cevi.",
    result: "Streha, ki je zaključena tudi na mestih, kjer najpogosteje zamaka.",
  },
  handover: {
    title: "Predaja",
    text: "Streho skupaj pregledamo, pospravimo gradbišče in vam predamo opis opravljenih del.",
    result: "Urejeno gradbišče in pregled vsega, kar je bilo narejeno.",
  },
};

const sl: PageTexts = {
  home: {
    intro: {
      eyebrow: "Prenova strehe in nova streha",
      title: "Streha na ključ, od ogleda do predaje",
      lead: "Prenovimo staro streho ali postavimo novo na novi hiši, korak za korakom in z jasnim popisom del. Povejte nam, kaj potrebujete, in pripravimo brezplačno ponudbo.",
      description:
        "Prenova strehe in nova streha na ključ, korak za korakom: od ogleda in pisne ponudbe do predaje. Pošljite povpraševanje za brezplačno ponudbo.",
    },
    flatRoofLink: "Imate ravno streho ali teraso?",
    stepsHeading: "Kako poteka",
    stepsLead: "Od povpraševanja do predaje strehe v petih korakih.",
    steps: [
      {
        title: "Povpraševanje",
        text: "V obrazcu označite, kaj potrebujete, in nam povejte nekaj o strehi.",
        result: "Brezplačno in brez obveznosti.",
      },
      steps.inspection,
      steps.offer,
      {
        title: "Izvedba",
        text: "Delo opravimo po ponudbi: od odstranitve stare kritine do zadnje obrobe.",
        result: "Nove plasti strehe, položene po vrstnem redu, ki ga prikazuje prerez.",
      },
      steps.handover,
    ],
    includedHeading: "Kaj je vključeno",
    includedLead: "Streha na ključ pomeni, da za vse spodaj naštete dele poskrbi ena ekipa.",
    included: [
      "Ogled strehe in svetovanje pri izbiri materialov",
      "Pisna ponudba s popisom del in materialov",
      "Odstranitev in odvoz stare kritine",
      "Pregled in po potrebi popravilo ostrešja",
      "Parna zapora, toplotna izolacija in paroprepustna folija",
      "Letve, kontraletve in prezračevanje strehe",
      "Nova kritina s slemenom in robovi",
      "Obrobe, žlebovi in odtočne cevi",
      "Strešna okna, če jih želite",
      "Čiščenje gradbišča in predaja",
    ],
    layersHeading: "Iz česa je streha",
    layersLead: "Dobra streha ni samo kritina. Pod njo je šest plasti, in vsaka ima svoje delo.",
    journeysHeading: "Kaj potrebujete?",
  },
  journeys: {
    renovation: {
      title: "Prenova strehe",
      text: "Streha pušča, kritina je stara ali vsebuje azbest, pod njo ni izolacije.",
    },
    newRoof: {
      title: "Nova streha na ključ",
      text: "Gradite hišo in želite, da za celo streho poskrbi ena ekipa.",
    },
    flatRoof: {
      title: "Ravne strehe in terase",
      text: "Hidroizolacija, toplotna izolacija in prenova ravne strehe ali terase.",
    },
  },
  quoteCta: {
    heading: "Pošljite povpraševanje",
    text: "Povpraševanje je brezplačno in vas ne zavezuje. Tako poteka:",
    next: [
      "Preberemo, kaj potrebujete, in se oglasimo na način, ki ga izberete.",
      "Dogovorimo se za ogled strehe.",
      "Po ogledu prejmete pisno ponudbo s popisom del.",
    ],
  },
  renovation: {
    intro: {
      eyebrow: "Prenova strehe",
      title: "Prenova strehe, korak za korakom",
      lead: "Ko popravila ne zadoščajo več, prenova zamenja kritino in plasti pod njo. Tako poteka od ogleda do predaje.",
      description:
        "Kdaj je čas za prenovo strehe, kako poteka od ogleda do predaje in kaj je vključeno. Pošljite povpraševanje za brezplačno ponudbo.",
    },
    when: {
      heading: "Kdaj je čas za prenovo",
      items: [
        "Streha pušča na več mestih ali vedno znova na istem.",
        "Kritina je stara, krhka, razpokana ali porasla z mahom.",
        "Kritina je iz salonitnih plošč, ki vsebujejo azbest.",
        "Pod kritino ni toplotne izolacije in pozimi skozi streho uhaja toplota.",
        "Želite urediti podstrešje za bivanje.",
      ],
      paragraphs: ["Če je poškodovan le del strehe, je včasih dovolj popravilo. Ob ogledu vam povemo, kaj zadošča."],
    },
    stepsHeading: "Kako poteka prenova",
    steps: [steps.inspection, steps.offer, steps.materials, steps.layers, steps.flashing, steps.handover],
    includedHeading: "Kaj je vključeno v prenovo",
    included: [
      "Ogled in pisna ponudba s popisom del",
      "Odstranitev in odvoz stare kritine",
      "Pregled ostrešja in zamenjava dotrajanih delov, če je treba",
      "Parna zapora, toplotna izolacija in paroprepustna folija",
      "Letve, kontraletve in nova kritina",
      "Obrobe, žlebovi in odtočne cevi",
      "Čiščenje gradbišča in predaja",
    ],
    subsidy: {
      heading: "Subvencije",
      paragraphs: [
        "Eko sklad, Slovenski okoljski javni sklad, z javnimi pozivi nepovratno spodbuja naložbe v večjo energijsko učinkovitost stavb. Kateri ukrepi so upravičeni in pod kakšnimi pogoji, določa vsak poziv posebej, zato ga preberite, preden se odločite za prenovo.",
      ],
    },
  },
  newRoof: {
    intro: {
      eyebrow: "Nova streha na ključ",
      title: "Nova streha na ključ za novo hišo",
      lead: "Ena ekipa za celo streho: od ostrešja do zadnjega žleba. Tako poteka od načrtov do predaje.",
      description:
        "Kaj vključuje nova streha na ključ, od ostrešja do žlebov in strešnih oken, in kako poteka od načrtov do predaje. Pošljite povpraševanje.",
    },
    meaning: {
      heading: "Kaj pomeni »na ključ«",
      paragraphs: [
        "Streha na ključ pomeni, da za vse plasti strehe in njene zaključke poskrbi ena ekipa. Ni vam treba usklajevati tesarja, krovca in kleparja, in vsak del se ujema z drugim.",
      ],
    },
    includedHeading: "Kaj je vključeno",
    included: [
      "Ostrešje: nosilna lesena konstrukcija",
      "Parna zapora in toplotna izolacija",
      "Paroprepustna folija pod kritino",
      "Letve in kontraletve za prezračevanje",
      "Kritina po vaši izbiri",
      "Obrobe, sleme in robovi",
      "Žlebovi in odtočne cevi",
      "Strešna okna, če jih želite",
    ],
    stepsHeading: "Kako poteka",
    steps: [
      {
        title: "Načrti in dogovor",
        text: "Pregledamo načrte hiše in se dogovorimo, kaj vse naj streha vključuje.",
        result: "Skupno razumevanje obsega del, preden nastane ponudba.",
      },
      steps.offer,
      {
        title: "Ostrešje",
        text: "Postavimo nosilno konstrukcijo strehe po načrtih.",
        result: "Ostrešje, pripravljeno za plasti strehe.",
      },
      {
        title: "Folije in izolacija",
        text: "Položimo parno zaporo, toplotno izolacijo in paroprepustno folijo.",
        result: "Streha, ki zadrži toploto in diha.",
      },
      {
        title: "Letve in kritina",
        text: "Pritrdimo kontraletve in letve ter položimo izbrano kritino.",
        result: "Prezračevana streha z novo kritino.",
      },
      {
        title: "Obrobe, žlebovi in strešna okna",
        text: "Uredimo obrobe, sleme in robove, namestimo žlebove in vgradimo strešna okna.",
        result: "Zaključena streha, ki odvaja vodo.",
      },
      steps.handover,
    ],
  },
  flatRoofs: {
    intro: {
      eyebrow: "Ravne strehe",
      title: "Ravne strehe in terase",
      lead: "Ravna streha in terasa morata predvsem tesniti. Uredimo hidroizolacijo, toplotno izolacijo in prenovo terase.",
      description:
        "Hidroizolacija, toplotna izolacija in prenova ravne strehe ali terase, korak za korakom. Pošljite povpraševanje za brezplačno ponudbo.",
    },
    blocks: [
      {
        heading: "Hidroizolacija",
        paragraphs: [
          "Na ravni strehi voda odteka počasi, zato mora biti hidroizolacija neprekinjena, tudi ob robovih, odtokih in prebojih. Najpogosteje so to strešne membrane ali bitumenski trakovi.",
        ],
      },
      {
        heading: "Toplotna izolacija",
        paragraphs: [
          "Ravna streha nad ogrevanim prostorom potrebuje toplotno izolacijo. Ob prenovi jo lahko dodamo ali zamenjamo, skupaj s parno zaporo pod njo.",
        ],
      },
      {
        heading: "Terase",
        paragraphs: [
          "Terasa nad bivalnim prostorom je ravna streha, po kateri se hodi. Pod oblogo potrebuje enako skrbno hidroizolacijo, z naklonom proti odtokom.",
        ],
      },
    ],
    stepsHeading: "Kako poteka",
    steps: [
      {
        title: "Ogled",
        text: "Pregledamo streho ali teraso, odtoke, robove in mesta, kjer zamaka.",
        result: "Ocena stanja in predlog, kaj je treba narediti.",
      },
      steps.offer,
      {
        title: "Odstranitev starih plasti",
        text: "Odstranimo dotrajano hidroizolacijo ali oblogo terase, kjer je treba.",
        result: "Čista in suha podlaga za nove plasti.",
      },
      {
        title: "Izolacija in hidroizolacija",
        text: "Položimo parno zaporo, toplotno izolacijo in hidroizolacijo ter uredimo robove in odtoke.",
        result: "Ravna streha ali terasa, ki tesni.",
      },
      steps.handover,
    ],
  },
  coverings: {
    intro: {
      eyebrow: "Kritine in materiali",
      title: "Kritine in materiali",
      lead: "Opečna, betonska, pločevinasta ali membrana: vsaka kritina ima svoje prednosti, slabosti in naklon, ki ga potrebuje.",
      description:
        "Primerjava strešnih kritin: opečna in betonska kritina, pločevina in membrane, z njihovimi prednostmi, slabostmi in naklonom strehe.",
    },
    prosLabel: "Prednosti",
    consLabel: "Slabosti",
    pitchLabel: "Naklon strehe",
    items: [
      {
        id: "opecna",
        name: "Opečna kritina",
        summary: "Strešniki iz žgane gline, klasična kritina na poševnih strehah.",
        pros: ["Obstojna barva, ki ne zbledi", "Naraven material", "Posamezen strešnik se zamenja brez težav"],
        cons: ["Težja od pločevine, zato potrebuje trdno ostrešje", "Občutljiva za udarce"],
        pitch: "Srednji do strm naklon.",
      },
      {
        id: "betonska",
        name: "Betonska kritina",
        summary: "Strešniki iz barvanega betona, podobni opečnim.",
        pros: ["Trdna in odporna", "Velika izbira oblik in barv"],
        cons: ["Najtežja med kritinami", "Barvni premaz sčasoma zbledi"],
        pitch: "Srednji do strm naklon.",
      },
      {
        id: "plocevina",
        name: "Pločevinasta kritina",
        summary: "Pločevina v ploščah ali trakovih, gladka ali v obliki strešnikov.",
        pros: ["Lahka, primerna tudi za starejše ostrešje", "Hitro se položi", "Primerna tudi za nižje naklone"],
        cons: ["Pri dežju je glasnejša, če pod njo ni dobre izolacije", "Potrebuje skrbno izvedene obrobe"],
        pitch: "Od nizkega do strmega naklona, odvisno od vrste.",
      },
      {
        id: "membrane",
        name: "Strešne membrane",
        summary: "Trakovi iz umetnih mas ali bitumna, ki tvorijo neprekinjeno plast.",
        pros: ["Tesnijo tudi tam, kjer voda odteka počasi", "Primerne za terase pod oblogo"],
        cons: ["Na poševni strehi niso običajne", "Stiki morajo biti skrbno izvedeni"],
        pitch: "Ravne in skoraj ravne strehe ter terase.",
      },
    ],
    pitchNote: "Najmanjši naklon, ki ga posamezna kritina potrebuje, določi njen proizvajalec v tehničnih navodilih za vsak model posebej.",
    choosing: {
      heading: "Kako izbrati",
      paragraphs: [
        "Izbira je odvisna od naklona strehe, nosilnosti ostrešja, videza hiše in prostorskih pravil v vaši občini. Ob ogledu predlagamo kritine, ki ustrezajo vaši strehi.",
      ],
    },
  },
  layers: {
    title: "Prerez strehe s šestimi plastmi, od notranje proti zunanji",
    layers: [
      { name: "Nosilna konstrukcija", text: "Leseno ostrešje, ki nosi vse plasti strehe." },
      { name: "Parna zapora", text: "Folija, ki zadrži vlago iz prostorov, da ne pride v izolacijo." },
      { name: "Toplotna izolacija", text: "Pozimi zadrži toploto v hiši, poleti vročino zunaj." },
      { name: "Paroprepustna folija", text: "Varuje izolacijo pred vodo in vetrom, vlago pa spušča ven." },
      { name: "Letve in kontraletve", text: "Nosijo kritino in pustijo zraku, da kroži pod njo." },
      { name: "Kritina", text: "Zunanja plast, ki varuje streho pred dežjem, snegom in soncem." },
    ],
  },
  quote: {
    intro: {
      eyebrow: "Povpraševanje",
      title: "Povpraševanje za streho",
      lead: "Trije kratki koraki: kaj potrebujete, nekaj o strehi in kako vas dosežemo. Povpraševanje je brezplačno in vas ne zavezuje.",
      description:
        "Pošljite povpraševanje za prenovo strehe, novo streho na ključ, ravno streho ali popravilo. Brezplačno in brez obveznosti.",
    },
    stepLabel: "Korak",
    work: {
      legend: "Kaj potrebujete?",
      choices: [
        { value: "prenova", label: "Prenovo strehe" },
        { value: "nova-streha", label: "Novo streho na ključ" },
        { value: "ravna-streha", label: "Ravno streho ali teraso" },
        { value: "popravilo", label: "Popravilo strehe" },
      ],
    },
    roof: {
      legend: "O strehi",
      municipality: "Občina, kjer je streha",
      area: "Približna površina strehe v m²",
      areaHint: "Ocena zadošča. Če je ne veste, pustite prazno.",
      roofType: "Oblika strehe",
      roofTypes: [
        { value: "dvokapnica", label: "Dvokapnica" },
        { value: "stirikapnica", label: "Štirikapnica" },
        { value: "enokapnica", label: "Enokapnica" },
        { value: "ravna", label: "Ravna streha ali terasa" },
        { value: "drugo", label: "Drugo ali ne vem" },
      ],
      covering: "Sedanja kritina",
      coverings: [
        { value: "opecna", label: "Opečna" },
        { value: "betonska", label: "Betonska" },
        { value: "plocevina", label: "Pločevina" },
        { value: "salonit", label: "Salonitne plošče" },
        { value: "membrana", label: "Membrana ali bitumen" },
        { value: "brez", label: "Še ni strehe (novogradnja)" },
        { value: "ne-vem", label: "Ne vem" },
      ],
      message: "Kaj še želite povedati?",
      messageHint: "Na primer, kje streha pušča ali kdaj bi radi začeli.",
    },
    contact: {
      legend: "Kako vas dosežemo",
      name: "Ime in priimek",
      phone: "Telefon",
      email: "E-pošta",
      reachHint: "Vpišite telefon, e-pošto ali oboje.",
      preferred: "Kako želite, da se oglasimo?",
      preferredChoices: [
        { value: "telefon", label: "Po telefonu" },
        { value: "e-posta", label: "Po e-pošti" },
      ],
      consentBefore: "Strinjam se, da moje podatke uporabite za odgovor na to povpraševanje, kot opisuje ",
      consentLink: "politika zasebnosti",
      consentAfter: ".",
    },
    optional: "neobvezno",
    choose: "Izberite",
    submit: "Pošlji povpraševanje",
    needsJavaScript: "Za pošiljanje obrazca vklopite JavaScript v brskalniku.",
    nextHeading: "Kaj sledi",
    next: [
      "Preberemo vaše povpraševanje in se oglasimo na način, ki ste ga izbrali.",
      "Dogovorimo se za ogled strehe.",
      "Po ogledu prejmete pisno ponudbo s popisom del.",
    ],
    sendHeading: "Kaj nam pomaga pri ponudbi",
    send: [
      "Fotografije strehe od daleč in od blizu, tudi z notranje strani podstrešja",
      "Mesta, kjer streha pušča",
      "Načrte hiše, če gradite novo",
      "Želeni čas začetka del",
    ],
  },
  thanks: {
    intro: {
      eyebrow: "Povpraševanje",
      title: "Hvala, povpraševanje je poslano",
      lead: "Vaše povpraševanje smo prejeli.",
      description: "Povpraševanje je poslano.",
    },
    next: [
      "Preberemo, kaj potrebujete, in se oglasimo na način, ki ste ga izbrali.",
      "Če imate fotografije strehe, jih pripravite: prosili vas bomo zanje.",
      "Dogovorimo se za ogled, po njem pa prejmete pisno ponudbo.",
    ],
  },
  failed: {
    intro: {
      eyebrow: "Povpraševanje",
      title: "Povpraševanja ni bilo mogoče poslati",
      lead: "Pri pošiljanju je šlo nekaj narobe, zato povpraševanje ni prispelo.",
      description: "Povpraševanja ni bilo mogoče poslati.",
    },
    text: "Vrnite se na obrazec in ga pošljite še enkrat. Preverite, ali so izpolnjena vsa obvezna polja.",
  },
};

export default sl;
