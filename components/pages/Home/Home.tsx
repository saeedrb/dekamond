"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./Home.module.css";

type Lang = "nl" | "en";

type ContactState = {
  name: string;
  company: string;
  email: string;
  employees: string;
  message: string;
  consent: boolean;
};

type ContactErrors = Partial<Record<keyof ContactState, string>>;

const dictionary = {
  nl: {
    seoLang: "nl-BE",
    nav: ["Diensten", "KB 3.0", "Proces", "Calculator", "FAQ", "Contact"],
    hero: {
      eyebrow: "Montisoro | Verzuimbeheer & re-integratie",
      title: "Minder langdurig verzuim. Meer werkbare terugkeer.",
      intro:
        "Montisoro helpt Belgische organisaties om afwezigheid menselijk, juridisch helder en operationeel beheersbaar te maken.",
      primary: "Plan een verkennend gesprek",
      secondary: "Bereken verzuimkost",
      stats: [
        ["8 weken", "moment voor arbeidspotentieel"],
        ["20+ werknemers", "extra RIT 3.0 verplichtingen"],
        ["1 aanspreekpunt", "voor HR, leidinggevenden en werknemer"],
      ],
    },
    company: {
      label: "Waarom Montisoro",
      title: "Strategisch genoeg voor directie. Menselijk genoeg voor de werkvloer.",
      text:
        "Wij verbinden welzijn, arbeidsorganisatie en re-integratie tot een praktisch beleid. Geen dikke rapporten, wel heldere acties, ritme en opvolging.",
      points: ["Holistische kijk", "Belgische context", "Discrete begeleiding", "Meetbare opvolging"],
    },
    services: [
      {
        title: "Verzuimbeleid",
        text: "Structuur, rollen en gesprekken die vroegtijdig signalen opvangen.",
      },
      {
        title: "Re-integratiebegeleiding",
        text: "Begeleiding bij aangepast werk, progressieve werkhervatting en duurzame afspraken.",
      },
      {
        title: "Leidinggevenden versterken",
        text: "Training voor moeilijke gesprekken, contact tijdens afwezigheid en documentatie.",
      },
      {
        title: "Data & opvolging",
        text: "Dashboardlogica, risicosegmenten en maandelijkse verzuimrituelen.",
      },
    ],
    kb: {
      title: "KB Re-integratie 3.0 vraagt sneller, scherper en consistenter handelen.",
      text:
        "RIT 3.0 legt meer nadruk op preventie, arbeidspotentieel en tijdige opstart van een formeel traject. Montisoro vertaalt deze verplichtingen naar een werkbaar intern proces.",
      items: [
        "Vroeg contact zonder druk",
        "Inschatting arbeidspotentieel na langdurige afwezigheid",
        "Heldere beslismomenten met arbeidsarts en HR",
        "Plan voor aangepast of ander werk waar haalbaar",
      ],
      note:
        "Inhoud is informatief en vervangt geen juridisch advies. We stemmen concrete dossiers af met de bevoegde preventie- en medische partners.",
    },
    audiences: [
      "HR directors",
      "Operations leaders",
      "Preventieadviseurs",
      "KMO's met groeiende teams",
      "Industrie, logistiek en zorg",
    ],
    ideal: {
      title: "Ideale klant",
      text:
        "Een organisatie met 50 tot 1.500 medewerkers, stijgende afwezigheidsdruk en de wil om beleid menselijker én consequenter te maken.",
      bullets: ["Veel operationele functies", "Complexe roosters", "Managers met tijdsdruk", "Nood aan objectief ritme"],
    },
    process: [
      ["Audit", "We lezen data, beleid, rollen en knelpunten."],
      ["Ontwerp", "We bouwen een kort protocol met beslismomenten."],
      ["Activering", "We trainen HR en leidinggevenden in gesprekken."],
      ["Begeleiding", "We ondersteunen cases en bewaken voortgang."],
    ],
    calculator: {
      title: "Verzuimkost calculator",
      intro: "Een snelle indicatie van directe loonkost. Gebruik dit als startpunt voor beleid, niet als boekhouding.",
      employees: "Aantal werknemers",
      absence: "Gemiddeld verzuimpercentage",
      salary: "Gemiddelde dagkost per werknemer",
      result: "Geschatte jaarimpact",
      formula: "werknemers x 220 werkdagen x verzuim x dagkost",
    },
    team: {
      title: "Een compact expertteam rond mens, werk en herstel.",
      text:
        "Montisoro werkt met experten in welzijn, organisatieontwikkeling en re-integratie. Altijd met één heldere regie en respect voor vertrouwelijkheid.",
      roles: ["Re-integratiecoach", "HR policy advisor", "Wellbeing expert"],
    },
    faq: [
      ["Is Montisoro een sociaal secretariaat?", "Nee. We versterken beleid, gesprekken en begeleiding naast je bestaande partners."],
      ["Werken jullie enkel bij langdurige afwezigheid?", "Nee. Preventie en vroeg contact zijn net zo belangrijk als formele re-integratie."],
      ["Kan dit zonder extra administratie?", "Ja. We ontwerpen minimale documentatie die leidinggevenden effectief gebruiken."],
      ["Is de aanpak tweetalig?", "Ja. Deze site en de begeleiding kunnen Nederlands en Engels ondersteunen."],
    ],
    cta: {
      title: "Maak verzuim bespreekbaar voordat het structureel wordt.",
      text: "Start met een korte scan van beleid, cijfers en lopende cases.",
    },
    form: {
      title: "Contact",
      name: "Naam",
      company: "Organisatie",
      email: "E-mail",
      employees: "Aantal werknemers",
      message: "Waar wil je hulp bij?",
      consent: "Ik ga akkoord dat Montisoro mij contacteert over deze aanvraag.",
      submit: "Verstuur aanvraag",
      success: "Bedankt. Je aanvraag is klaar en wordt via je e-mailclient geopend.",
      errors: {
        required: "Dit veld is verplicht.",
        email: "Gebruik een geldig e-mailadres.",
        consent: "Bevestig toestemming om contact op te nemen.",
      },
    },
    footer: {
      tagline: "Menselijk verzuimbeheer voor Belgische werkgevers.",
      columns: [
        ["Navigatie", ["Diensten", "KB 3.0", "Proces", "Calculator", "Contact"]],
        ["Expertise", ["Verzuimbeheer", "Re-integratie", "Werkbaar werk", "Leidinggevenden"]],
      ],
      legal: "Informatie op deze website is algemeen en vervangt geen juridisch of medisch advies.",
      rights: "Alle rechten voorbehouden.",
    },
  },
  en: {
    seoLang: "en-BE",
    nav: ["Services", "KB 3.0", "Process", "Calculator", "FAQ", "Contact"],
    hero: {
      eyebrow: "Montisoro | Absence management & reintegration",
      title: "Reduce long-term absence. Build sustainable returns.",
      intro:
        "Montisoro helps Belgian employers manage absence with a human, compliant and operationally useful approach.",
      primary: "Book an exploratory call",
      secondary: "Estimate absence cost",
      stats: [
        ["8 weeks", "work-potential assessment moment"],
        ["20+ employees", "additional RIT 3.0 obligations"],
        ["1 lead", "for HR, managers and employee"],
      ],
    },
    company: {
      label: "Why Montisoro",
      title: "Strategic enough for leadership. Human enough for the floor.",
      text:
        "We connect wellbeing, work design and reintegration into practical policy. Less paperwork, more rhythm, action and follow-up.",
      points: ["Holistic view", "Belgian context", "Discreet guidance", "Measurable follow-up"],
    },
    services: [
      {
        title: "Absence policy",
        text: "Clear roles, triggers and conversations that catch signals early.",
      },
      {
        title: "Reintegration guidance",
        text: "Support for adapted work, progressive return and durable agreements.",
      },
      {
        title: "Manager enablement",
        text: "Training for sensitive conversations, contact during absence and documentation.",
      },
      {
        title: "Data & follow-up",
        text: "Dashboard logic, risk segments and monthly absence routines.",
      },
    ],
    kb: {
      title: "KB Reintegration 3.0 requires faster, sharper and more consistent action.",
      text:
        "RIT 3.0 increases focus on prevention, work potential and timely formal pathways. Montisoro turns these obligations into a workable internal process.",
      items: [
        "Early contact without pressure",
        "Work-potential assessment after extended absence",
        "Clear decision points with occupational physician and HR",
        "Plan for adapted or alternative work where feasible",
      ],
      note:
        "Content is informational and not legal advice. Specific cases should be aligned with competent prevention and medical partners.",
    },
    audiences: ["HR directors", "Operations leaders", "Prevention advisors", "Growing SMEs", "Industry, logistics and care"],
    ideal: {
      title: "Ideal client",
      text:
        "An organisation with 50 to 1,500 employees, rising absence pressure and the will to make policy more humane and more consistent.",
      bullets: ["Many operational roles", "Complex schedules", "Time-pressed managers", "Need for objective rhythm"],
    },
    process: [
      ["Audit", "We read data, policy, roles and friction points."],
      ["Design", "We build a short protocol with decision moments."],
      ["Activation", "We train HR and managers for the conversations."],
      ["Guidance", "We support cases and monitor progress."],
    ],
    calculator: {
      title: "Absence cost calculator",
      intro: "A fast indication of direct wage cost. Use it as a policy starting point, not accounting.",
      employees: "Number of employees",
      absence: "Average absence rate",
      salary: "Average daily cost per employee",
      result: "Estimated yearly impact",
      formula: "employees x 220 workdays x absence x daily cost",
    },
    team: {
      title: "A compact expert team around people, work and recovery.",
      text:
        "Montisoro works with experts in wellbeing, organisational development and reintegration. Always with clear coordination and respect for confidentiality.",
      roles: ["Reintegration coach", "HR policy advisor", "Wellbeing expert"],
    },
    faq: [
      ["Is Montisoro a social secretariat?", "No. We strengthen policy, conversations and guidance next to your existing partners."],
      ["Do you only work on long-term absence?", "No. Prevention and early contact are just as important as formal reintegration."],
      ["Can this work without extra admin?", "Yes. We design minimal documentation that managers actually use."],
      ["Is the approach bilingual?", "Yes. This site and the guidance can support Dutch and English."],
    ],
    cta: {
      title: "Make absence discussable before it becomes structural.",
      text: "Start with a concise scan of policy, numbers and active cases.",
    },
    form: {
      title: "Contact",
      name: "Name",
      company: "Organisation",
      email: "Email",
      employees: "Number of employees",
      message: "What do you need help with?",
      consent: "I agree that Montisoro may contact me about this request.",
      submit: "Send request",
      success: "Thank you. Your request is ready and will open in your email client.",
      errors: {
        required: "This field is required.",
        email: "Use a valid email address.",
        consent: "Confirm permission to be contacted.",
      },
    },
    footer: {
      tagline: "Human absence management for Belgian employers.",
      columns: [
        ["Navigation", ["Services", "KB 3.0", "Process", "Calculator", "Contact"]],
        ["Expertise", ["Absence management", "Reintegration", "Workable work", "Managers"]],
      ],
      legal: "Information on this website is general and does not replace legal or medical advice.",
      rights: "All rights reserved.",
    },
  },
} as const;

const sourceLinks = [
  {
    label: "FOD Werkgelegenheid RIT 3.0",
    href: "https://werk.belgie.be/nl/nieuws/rit-30-wijzigingen-aan-de-codex-welzijn-op-het-werk-inzake-re-integratie-en-preventie-van",
  },
  {
    label: "Montisoro",
    href: "https://www.montisoro.com/",
  },
];

const initialContact: ContactState = {
  name: "",
  company: "",
  email: "",
  employees: "",
  message: "",
  consent: false,
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("nl");
  const [employees, setEmployees] = useState(180);
  const [absenceRate, setAbsenceRate] = useState(6.2);
  const [dailyCost, setDailyCost] = useState(285);
  const [contact, setContact] = useState<ContactState>(initialContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);

  const copy = dictionary[lang];
  const estimatedCost = useMemo(
    () => Math.round(employees * 220 * (absenceRate / 100) * dailyCost),
    [absenceRate, dailyCost, employees],
  );

  useEffect(() => {
    document.documentElement.lang = copy.seoLang;
  }, [copy.seoLang]);

  useEffect(() => {
    setAnimationsReady(true);
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -60px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [lang]);

  const validate = () => {
    const nextErrors: ContactErrors = {};

    if (!contact.name.trim()) nextErrors.name = copy.form.errors.required;
    if (!contact.company.trim()) nextErrors.company = copy.form.errors.required;
    if (!contact.email.trim()) {
      nextErrors.email = copy.form.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      nextErrors.email = copy.form.errors.email;
    }
    if (!contact.employees.trim()) nextErrors.employees = copy.form.errors.required;
    if (!contact.message.trim()) nextErrors.message = copy.form.errors.required;
    if (!contact.consent) nextErrors.consent = copy.form.errors.consent;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);

    if (!validate()) return;

    const subject = encodeURIComponent(`Montisoro inquiry from ${contact.company}`);
    const body = encodeURIComponent(
      [
        `Name: ${contact.name}`,
        `Organisation: ${contact.company}`,
        `Email: ${contact.email}`,
        `Employees: ${contact.employees}`,
        "",
        contact.message,
      ].join("\n"),
    );

    window.location.href = `mailto:laurence@montisoro.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setContact(initialContact);
  };

  return (
    <main className={`${styles.site} ${animationsReady ? styles.revealReady : ""}`}>
      <header className={styles.header} aria-label="Montisoro">
        <a className={styles.logo} href="#top" aria-label="Montisoro home">
          <span>M</span>
          Montisoro
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          {copy.nav.map((item) => (
            <a key={item} href={`#${navTarget(item)}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className={styles.langSwitch} aria-label="Language switcher">
          <button className={lang === "nl" ? styles.activeLang : ""} type="button" onClick={() => setLang("nl")}>
            NL
          </button>
          <button className={lang === "en" ? styles.activeLang : ""} type="button" onClick={() => setLang("en")}>
            EN
          </button>
        </div>
      </header>

      <section id="top" className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <div className={styles.photoPanel} />
          <div className={styles.signalCard}>
            <span>RIT 3.0</span>
            <strong>{lang === "nl" ? "Van risico naar ritme" : "From risk to rhythm"}</strong>
          </div>
        </div>
        <div className={styles.heroContent} data-reveal>
          <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p>{copy.hero.intro}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#contact">
              {copy.hero.primary}
            </a>
            <a className={styles.secondaryButton} href="#calculator">
              {copy.hero.secondary}
            </a>
          </div>
        </div>
        <div className={styles.heroStats} aria-label="Key facts">
          {copy.hero.stats.map(([value, label]) => (
            <div key={value} data-reveal>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <Section id="diensten" label={copy.company.label} title={copy.company.title}>
        <div className={styles.companyGrid}>
          <p className={styles.lead}>{copy.company.text}</p>
          <div className={styles.pointGrid}>
            {copy.company.points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
      </Section>

      <section className={styles.services} aria-labelledby="services-title">
        <div className={styles.sectionIntro} data-reveal>
          <p className={styles.eyebrow}>{lang === "nl" ? "Diensten" : "Services"}</p>
          <h2 id="services-title">{lang === "nl" ? "Concreet waar het telt." : "Practical where it matters."}</h2>
        </div>
        <div className={styles.cardGrid}>
          {copy.services.map((service, index) => (
            <article className={styles.serviceCard} key={service.title} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="kb-3-0" className={styles.kbSection}>
        <div className={styles.kbPanel} data-reveal>
          <p className={styles.eyebrow}>KB Re-integratie 3.0</p>
          <h2>{copy.kb.title}</h2>
          <p>{copy.kb.text}</p>
          <ul>
            {copy.kb.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <small>{copy.kb.note}</small>
          <div className={styles.sourceLinks}>
            {sourceLinks.map((source) => (
              <a href={source.href} key={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.audienceSection} aria-labelledby="audience-title">
        <div className={styles.sectionIntro} data-reveal>
          <p className={styles.eyebrow}>{lang === "nl" ? "Voor wie" : "Who it serves"}</p>
          <h2 id="audience-title">{lang === "nl" ? "Gebouwd voor organisaties met druk op planning en mensen." : "Built for organisations under pressure on planning and people."}</h2>
        </div>
        <div className={styles.audienceList}>
          {copy.audiences.map((audience) => (
            <span key={audience} data-reveal>
              {audience}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.idealSection} aria-labelledby="ideal-title">
        <div data-reveal>
          <p className={styles.eyebrow}>Ideal client</p>
          <h2 id="ideal-title">{copy.ideal.title}</h2>
          <p>{copy.ideal.text}</p>
        </div>
        <div className={styles.idealList}>
          {copy.ideal.bullets.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section id="proces" className={styles.processSection} aria-labelledby="process-title">
        <div className={styles.sectionIntro} data-reveal>
          <p className={styles.eyebrow}>{lang === "nl" ? "Proces" : "Process"}</p>
          <h2 id="process-title">{lang === "nl" ? "Vier stappen. Eén vast ritme." : "Four steps. One steady rhythm."}</h2>
        </div>
        <div className={styles.processGrid}>
          {copy.process.map(([title, text], index) => (
            <article key={title} data-reveal>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="calculator" className={styles.calculatorSection} aria-labelledby="calculator-title">
        <div className={styles.calculatorCopy} data-reveal>
          <p className={styles.eyebrow}>{lang === "nl" ? "Calculator" : "Calculator"}</p>
          <h2 id="calculator-title">{copy.calculator.title}</h2>
          <p>{copy.calculator.intro}</p>
          <small>{copy.calculator.formula}</small>
        </div>
        <div className={styles.calculator} data-reveal>
          <RangeField label={copy.calculator.employees} value={employees} min={20} max={1500} step={10} onChange={setEmployees} suffix="" />
          <RangeField label={copy.calculator.absence} value={absenceRate} min={1} max={16} step={0.1} onChange={setAbsenceRate} suffix="%" />
          <RangeField label={copy.calculator.salary} value={dailyCost} min={120} max={650} step={5} onChange={setDailyCost} suffix="EUR" />
          <div className={styles.resultBox} aria-live="polite">
            <span>{copy.calculator.result}</span>
            <strong>{new Intl.NumberFormat(lang === "nl" ? "nl-BE" : "en-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(estimatedCost)}</strong>
          </div>
        </div>
      </section>

      <section className={styles.teamSection} aria-labelledby="team-title">
        <div data-reveal>
          <p className={styles.eyebrow}>{lang === "nl" ? "Team" : "Team"}</p>
          <h2 id="team-title">{copy.team.title}</h2>
          <p>{copy.team.text}</p>
        </div>
        <div className={styles.teamRoles}>
          {copy.team.roles.map((role) => (
            <article key={role} data-reveal>
              <div />
              <h3>{role}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.sectionIntro} data-reveal>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-title">{lang === "nl" ? "Kort antwoord, snelle richting." : "Short answers, clear direction."}</h2>
        </div>
        <div className={styles.faqList}>
          {copy.faq.map(([question, answer]) => (
            <details key={question} data-reveal>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection} data-reveal>
        <div>
          <p className={styles.eyebrow}>{lang === "nl" ? "Startpunt" : "Starting point"}</p>
          <h2>{copy.cta.title}</h2>
          <p>{copy.cta.text}</p>
        </div>
        <a className={styles.primaryButton} href="#contact">
          {copy.hero.primary}
        </a>
      </section>

      <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
        <div data-reveal>
          <p className={styles.eyebrow}>Contact</p>
          <h2 id="contact-title">{copy.form.title}</h2>
          <p>
            Tisseltstraat 25, 1880 Ramsdonk, Belgium
            <br />
            +32 (0) 477 89 91 86
          </p>
        </div>
        <form className={styles.contactForm} noValidate onSubmit={handleSubmit} data-reveal>
          <TextField label={copy.form.name} name="name" value={contact.name} error={errors.name} onChange={(value) => setContact((state) => ({ ...state, name: value }))} />
          <TextField label={copy.form.company} name="company" value={contact.company} error={errors.company} onChange={(value) => setContact((state) => ({ ...state, company: value }))} />
          <TextField label={copy.form.email} name="email" type="email" value={contact.email} error={errors.email} onChange={(value) => setContact((state) => ({ ...state, email: value }))} />
          <TextField label={copy.form.employees} name="employees" type="number" value={contact.employees} error={errors.employees} onChange={(value) => setContact((state) => ({ ...state, employees: value }))} />
          <label className={styles.field}>
            <span>{copy.form.message}</span>
            <textarea value={contact.message} onChange={(event) => setContact((state) => ({ ...state, message: event.target.value }))} rows={5} aria-invalid={Boolean(errors.message)} />
            {errors.message && <small>{errors.message}</small>}
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={contact.consent} onChange={(event) => setContact((state) => ({ ...state, consent: event.target.checked }))} />
            <span>{copy.form.consent}</span>
          </label>
          {errors.consent && <small className={styles.formError}>{errors.consent}</small>}
          {submitted && <p className={styles.success}>{copy.form.success}</p>}
          <button className={styles.primaryButton} type="submit">
            {copy.form.submit}
          </button>
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <a className={styles.logo} href="#top" aria-label="Montisoro home">
            <span>M</span>
            Montisoro
          </a>
          <p>{copy.footer.tagline}</p>
          <address>
            Tisseltstraat 25, 1880 Ramsdonk, Belgium
            <br />
            <a href="tel:+32477899186">+32 (0) 477 89 91 86</a>
            <br />
            <a href="mailto:laurence@montisoro.com">laurence@montisoro.com</a>
          </address>
        </div>
        {copy.footer.columns.map(([title, links]) => (
          <div className={styles.footerColumn} key={title}>
            <h2>{title}</h2>
            {links.map((link) => (
              <a key={link} href={`#${navTarget(link)}`}>
                {link}
              </a>
            ))}
          </div>
        ))}
        <div className={styles.footerColumn}>
          <h2>{lang === "nl" ? "Bronnen" : "Sources"}</h2>
          {sourceLinks.map((source) => (
            <a href={source.href} key={source.href} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Montisoro. {copy.footer.rights}</span>
          <span>{copy.footer.legal}</span>
        </div>
      </footer>
    </main>
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.sectionIntro} data-reveal>
        <p className={styles.eyebrow}>{label}</p>
        <h2>{title}</h2>
      </div>
      <div data-reveal>{children}</div>
    </section>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className={styles.rangeField}>
      <span>
        {label}
        <strong>
          {value}
          {suffix ? ` ${suffix}` : ""}
        </strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function TextField({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input name={name} type={type} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} />
      {error && <small>{error}</small>}
    </label>
  );
}

function navTarget(item: string) {
  if (item === "Diensten" || item === "Services") return "diensten";
  if (item === "Verzuimbeheer" || item === "Absence management") return "diensten";
  if (item === "Re-integratie" || item === "Reintegration") return "kb-3-0";
  if (item === "Werkbaar werk" || item === "Workable work") return "proces";
  if (item === "Leidinggevenden" || item === "Managers") return "proces";
  if (item === "Proces" || item === "Process") return "proces";
  if (item === "Calculator") return "calculator";
  if (item === "FAQ") return "faq";
  if (item === "Contact") return "contact";
  return "kb-3-0";
}
