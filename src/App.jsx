import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Sparkles,
  Layers,
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Gem,
  CalendarClock,
  ChevronDown,
  Send,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  TRANSLATIONS                                                       */
/* ------------------------------------------------------------------ */
const translations = {
  fi: {
    nav: {
      home: "Etusivu",
      construction: "Rakennuspalvelut",
      cleaning: "Siivouspalvelut",
      floors: "Lattiantyöt",
      about: "Meistä",
      cta: "Pyydä tarjous",
    },
    hero: {
      eyebrow: "Rakennus · Siivous · Lattiat",
      title: "Yksi kumppani. Kolme palvelua. Ei kompromisseja.",
      subtitle:
        "Center Oy toteuttaa rakennus-, siivous- ja lattiaurakat avaimet käteen -periaatteella ympäri Suomen.",
      ctaPrimary: "Pyydä tarjous",
      ctaSecondary: "Katso palvelut",
      stats: [
        { value: "100+", label: "Toteutettua projektia" },
        { value: "12", label: "Vuotta kokemusta" },
        { value: "250+", label: "Tyytyväistä asiakasta" },
      ],
    },
    hub: {
      eyebrow: "Palvelumme",
      title: "Valitse palvelu, näe se toiminnassa",
      subtitle:
        "Kolme erikoisalaa, yksi yhteystieto. Klikkaa palvelua nähdäksesi mitä teemme.",
    },
    services: {
      construction: {
        name: "Rakennuspalvelut",
        tagline: "Uudisrakentaminen, saneeraukset ja julkisivut ammattitaidolla.",
        items: [
          {
            title: "Uudisrakentaminen",
            desc: "Kokonaisvaltaista uudisrakentamista suunnittelusta luovutukseen.",
          },
          {
            title: "Saneeraukset",
            desc: "Asuin- ja liikekiinteistöjen saneeraukset aikataulussa pysyen.",
          },
          {
            title: "Julkisivut",
            desc: "Julkisivukorjaukset ja -verhoukset kestävällä laadulla.",
          },
        ],
      },
      cleaning: {
        name: "Siivouspalvelut",
        tagline: "Ylläpito-, rakennus- ja toimistosiivous joustavasti.",
        items: [
          {
            title: "Ylläpitosiivous",
            desc: "Säännöllinen siivous kiinteistön arvon ja viihtyvyyden ylläpitoon.",
          },
          {
            title: "Rakennussiivous",
            desc: "Loppusiivous rakennus- ja remonttikohteisiin ennen luovutusta.",
          },
          {
            title: "Toimistosiivous",
            desc: "Joustava toimistosiivous työympäristön siisteyden takaamiseksi.",
          },
        ],
      },
      flooring: {
        name: "Lattiantyöt",
        tagline: "Parketti, epoksi sekä hionta ja pinnoitus laadukkaasti.",
        items: [
          {
            title: "Parketointi",
            desc: "Parkettien asennus ja huolto ammattitaidolla.",
          },
          {
            title: "Epoksilattiat",
            desc: "Kestävät epoksipinnoitteet teollisuus- ja liiketiloihin.",
          },
          {
            title: "Hionta ja pinnoitus",
            desc: "Puulattioiden hionta ja pinnoitus uuteen kuntoon.",
          },
        ],
      },
    },
    why: {
      eyebrow: "Miksi Center Oy",
      title: "Kolme syytä luottaa meihin",
      items: [
        {
          icon: "shield",
          title: "Luotettavuus",
          desc: "Sovitut asiat pidetään — sopimuksesta valmiiseen työhön.",
        },
        {
          icon: "gem",
          title: "Laatu",
          desc: "Teemme työn kerralla kunnolla, alan parhailla käytännöillä.",
        },
        {
          icon: "clock",
          title: "Aikataulut",
          desc: "Pysymme aikataulussa ja pidämme sinut ajan tasalla koko projektin ajan.",
        },
      ],
    },
    form: {
      eyebrow: "Ota yhteyttä",
      title: "Pyydä tarjous",
      subtitle: "Kerro projektistasi, niin palaamme asiaan 24 tunnin sisällä.",
      name: "Nimi",
      email: "Sähköposti",
      phone: "Puhelin",
      service: "Palvelu",
      selectService: "Valitse palvelu",
      location: "Paikkakunta",
      details: "Lisätiedot",
      detailsPlaceholder: "Kerro projektistasi...",
      submit: "Lähetä tarjouspyyntö",
      success: "Kiitos! Otamme sinuun yhteyttä pian.",
    },
    footer: {
      about:
        "Center Oy on suomalainen monipalveluyritys, joka yhdistää rakentamisen, siivouksen ja lattiatyöt yhden katon alle.",
      quickLinks: "Pikalinkit",
      contact: "Yhteystiedot",
      rights: "Kaikki oikeudet pidätetään.",
    },
  },

  en: {
    nav: {
      home: "Home",
      construction: "Construction",
      cleaning: "Cleaning",
      floors: "Flooring",
      about: "About Us",
      cta: "Request a Quote",
    },
    hero: {
      eyebrow: "Construction · Cleaning · Flooring",
      title: "One partner. Three services. Zero compromises.",
      subtitle:
        "Center Oy delivers construction, cleaning and flooring projects, turnkey, across Finland.",
      ctaPrimary: "Request a Quote",
      ctaSecondary: "Explore Services",
      stats: [
        { value: "100+", label: "Projects completed" },
        { value: "12", label: "Years of experience" },
        { value: "250+", label: "Satisfied clients" },
      ],
    },
    hub: {
      eyebrow: "Our Services",
      title: "Pick a service, see it in action",
      subtitle:
        "Three specialties, one point of contact. Click a service to see what we do.",
    },
    services: {
      construction: {
        name: "Construction",
        tagline: "New builds, renovations and facades handled by professionals.",
        items: [
          {
            title: "New Builds",
            desc: "Complete new-build construction from design to handover.",
          },
          {
            title: "Renovations",
            desc: "Residential and commercial renovations delivered on schedule.",
          },
          {
            title: "Facades",
            desc: "Facade repairs and cladding built to last.",
          },
        ],
      },
      cleaning: {
        name: "Cleaning",
        tagline: "Maintenance, post-construction and office cleaning, flexibly arranged.",
        items: [
          {
            title: "Maintenance Cleaning",
            desc: "Regular cleaning that protects your property's value and comfort.",
          },
          {
            title: "Post-Construction Cleaning",
            desc: "Final cleaning for construction and renovation sites before handover.",
          },
          {
            title: "Office Cleaning",
            desc: "Flexible office cleaning that keeps your workspace spotless.",
          },
        ],
      },
      flooring: {
        name: "Flooring",
        tagline: "Parquet, epoxy floors, and sanding & coating done right.",
        items: [
          {
            title: "Parquet Installation",
            desc: "Professional parquet installation and maintenance.",
          },
          {
            title: "Epoxy Floors",
            desc: "Durable epoxy coatings for industrial and commercial spaces.",
          },
          {
            title: "Sanding & Coating",
            desc: "Wood floor sanding and coating restored to like-new condition.",
          },
        ],
      },
    },
    why: {
      eyebrow: "Why Center Oy",
      title: "Three reasons to trust us",
      items: [
        {
          icon: "shield",
          title: "Reliability",
          desc: "We keep our word — from contract to completed work.",
        },
        {
          icon: "gem",
          title: "Quality",
          desc: "We do it right the first time, following industry best practice.",
        },
        {
          icon: "clock",
          title: "Schedules",
          desc: "We stay on schedule and keep you informed throughout the project.",
        },
      ],
    },
    form: {
      eyebrow: "Get in Touch",
      title: "Request a Quote",
      subtitle: "Tell us about your project and we'll get back to you within 24 hours.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      service: "Service",
      selectService: "Select a service",
      location: "Location",
      details: "Project Details",
      detailsPlaceholder: "Tell us about your project...",
      submit: "Send Request",
      success: "Thank you! We'll be in touch soon.",
    },
    footer: {
      about:
        "Center Oy is a Finnish multi-service company combining construction, cleaning and flooring under one roof.",
      quickLinks: "Quick Links",
      contact: "Contact",
      rights: "All rights reserved.",
    },
  },

  sv: {
    nav: {
      home: "Hem",
      construction: "Byggtjänster",
      cleaning: "Städtjänster",
      floors: "Golvarbeten",
      about: "Om oss",
      cta: "Begär en offert",
    },
    hero: {
      eyebrow: "Bygg · Städning · Golv",
      title: "En partner. Tre tjänster. Inga kompromisser.",
      subtitle:
        "Center Oy genomför bygg-, städ- och golvprojekt som en helhetslösning i hela Finland.",
      ctaPrimary: "Begär en offert",
      ctaSecondary: "Se tjänster",
      stats: [
        { value: "100+", label: "Genomförda projekt" },
        { value: "12", label: "Års erfarenhet" },
        { value: "250+", label: "Nöjda kunder" },
      ],
    },
    hub: {
      eyebrow: "Våra tjänster",
      title: "Välj en tjänst, se den i praktiken",
      subtitle:
        "Tre specialområden, en kontaktpunkt. Klicka på en tjänst för att se vad vi gör.",
    },
    services: {
      construction: {
        name: "Byggtjänster",
        tagline: "Nybyggen, renoveringar och fasader utförda professionellt.",
        items: [
          {
            title: "Nybyggnation",
            desc: "Helhetslösningar för nybyggnation, från planering till överlämning.",
          },
          {
            title: "Renoveringar",
            desc: "Renoveringar av bostäder och kommersiella fastigheter, i tid.",
          },
          {
            title: "Fasader",
            desc: "Fasadrenoveringar och -beklädnader med hållbar kvalitet.",
          },
        ],
      },
      cleaning: {
        name: "Städtjänster",
        tagline: "Underhålls-, bygg- och kontorsstädning med flexibla lösningar.",
        items: [
          {
            title: "Underhållsstädning",
            desc: "Regelbunden städning som bevarar fastighetens värde och trivsel.",
          },
          {
            title: "Byggstädning",
            desc: "Slutstädning av bygg- och renoveringsobjekt före överlämning.",
          },
          {
            title: "Kontorsstädning",
            desc: "Flexibel kontorsstädning som garanterar en ren arbetsmiljö.",
          },
        ],
      },
      flooring: {
        name: "Golvarbeten",
        tagline: "Parkett, epoxigolv samt slipning och behandling med hög kvalitet.",
        items: [
          {
            title: "Parkettläggning",
            desc: "Professionell installation och underhåll av parkettgolv.",
          },
          {
            title: "Epoxigolv",
            desc: "Slitstarka epoxibeläggningar för industri- och affärslokaler.",
          },
          {
            title: "Slipning och behandling",
            desc: "Slipning och behandling av trägolv till nyskick.",
          },
        ],
      },
    },
    why: {
      eyebrow: "Varför Center Oy",
      title: "Tre skäl att lita på oss",
      items: [
        {
          icon: "shield",
          title: "Pålitlighet",
          desc: "Vi håller vad vi lovar — från avtal till färdigt arbete.",
        },
        {
          icon: "gem",
          title: "Kvalitet",
          desc: "Vi gör rätt från början, enligt branschens bästa praxis.",
        },
        {
          icon: "clock",
          title: "Tidsplaner",
          desc: "Vi håller tidsplanen och håller dig informerad under hela projektet.",
        },
      ],
    },
    form: {
      eyebrow: "Kontakta oss",
      title: "Begär en offert",
      subtitle: "Berätta om ditt projekt så återkommer vi inom 24 timmar.",
      name: "Namn",
      email: "E-post",
      phone: "Telefon",
      service: "Tjänst",
      selectService: "Välj tjänst",
      location: "Ort",
      details: "Projektdetaljer",
      detailsPlaceholder: "Berätta om ditt projekt...",
      submit: "Skicka förfrågan",
      success: "Tack! Vi kontaktar dig snart.",
    },
    footer: {
      about:
        "Center Oy är ett finländskt flertjänsteföretag som förenar bygg, städning och golvarbeten under ett tak.",
      quickLinks: "Snabblänkar",
      contact: "Kontakt",
      rights: "Alla rättigheter förbehållna.",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  THEME TOKENS                                                       */
/* ------------------------------------------------------------------ */
const serviceThemes = {
  construction: { accent: "#059669", accentLight: "#10B981", icon: Building2 },
  cleaning: { accent: "#0284C7", accentLight: "#06B6D4", icon: Sparkles },
  flooring: { accent: "#B45309", accentLight: "#D97706", icon: Layers },
};

const NAV_ITEMS = [
  { key: "home", id: "home" },
  { key: "construction", id: "construction" },
  { key: "cleaning", id: "cleaning" },
  { key: "floors", id: "floors" },
  { key: "about", id: "about" },
];

const LANGS = ["fi", "en", "sv"];

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */
export default function CenterOy() {
  const [lang, setLang] = useState("fi");
  const [activeService, setActiveService] = useState("construction");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formService, setFormService] = useState("construction");
  const [submitted, setSubmitted] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    construction: useRef(null),
    cleaning: useRef(null),
    floors: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  const t = translations[lang];
  const theme = serviceThemes[activeService];

  const scrollTo = (id) => {
    setMenuOpen(false);
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans scroll-smooth antialiased"
      style={{ "--accent": theme.accent, "--accent-light": theme.accentLight }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
        theme={theme}
      />

      <main>
        <Hero t={t} scrollTo={scrollTo} sectionRef={sectionRefs.home} theme={theme} />

        <ServiceHub
          t={t}
          activeService={activeService}
          setActiveService={setActiveService}
          theme={theme}
        />

        <ServiceSection
          id="construction"
          sectionRef={sectionRefs.construction}
          service="construction"
          t={t}
        />
        <ServiceSection
          id="cleaning"
          sectionRef={sectionRefs.cleaning}
          service="cleaning"
          t={t}
        />
        <ServiceSection
          id="floors"
          sectionRef={sectionRefs.floors}
          service="flooring"
          t={t}
        />

        <WhyUs t={t} sectionRef={sectionRefs.about} theme={theme} />

        <QuoteForm
          t={t}
          sectionRef={sectionRefs.contact}
          formService={formService}
          setFormService={setFormService}
          onSubmit={handleSubmit}
          submitted={submitted}
        />
      </main>

      <Footer t={t} scrollTo={scrollTo} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                              */
/* ------------------------------------------------------------------ */
function Header({ t, lang, setLang, menuOpen, setMenuOpen, scrollTo, theme }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 font-display text-xl font-bold text-white tracking-tight"
        >
          <span
            className="inline-block w-2.5 h-2.5 rounded-sm transition-colors duration-500"
            style={{ backgroundColor: "var(--accent-light)" }}
          />
          Center<span className="text-white/50">Oy</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {t.nav[item.key]}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-1">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  lang === l ? "bg-white text-[#0F172A]" : "text-white/60 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors duration-500"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {t.nav.cta}
          </button>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[#0F172A] border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-white/80 text-base font-medium"
                >
                  {t.nav[item.key]}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-2">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${
                      lang === l
                        ? "bg-white text-[#0F172A] border-white"
                        : "text-white/60 border-white/20"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 w-full py-3 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--accent)" }}
              >
                {t.nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */
function Hero({ t, scrollTo, sectionRef }) {
  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden bg-[#0F172A] text-white"
    >
      {/* blueprint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute top-24 left-0 right-0 h-px origin-left"
        style={{ backgroundColor: "var(--accent-light)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-24 lg:pt-36 lg:pb-32">
        <motion.p
          key={t.hero.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-sm tracking-[0.2em] uppercase mb-6"
          style={{ color: "var(--accent-light)" }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          key={t.hero.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] max-w-3xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          key={t.hero.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => scrollTo("contact")}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white transition-all duration-300 hover:gap-3"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {t.hero.ctaPrimary}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollTo("construction")}
            className="px-6 py-3.5 rounded-lg font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-6 max-w-xl">
          {t.hero.stats.map((s, i) => (
            <div key={i} className="border-t border-white/10 pt-4">
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE HUB (tabbed, recolors on selection)                        */
/* ------------------------------------------------------------------ */
function ServiceHub({ t, activeService, setActiveService, theme }) {
  const data = t.services[activeService];

  return (
    <section className="bg-white py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p
          className="font-display text-sm tracking-[0.2em] uppercase mb-3 transition-colors duration-500"
          style={{ color: "var(--accent)" }}
        >
          {t.hub.eyebrow}
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0F172A]">
          {t.hub.title}
        </h2>
        <p className="mt-3 text-slate-500 max-w-xl">{t.hub.subtitle}</p>

        {/* tabs */}
        <div className="mt-10 flex flex-wrap gap-3">
          {Object.keys(serviceThemes).map((key) => {
            const Icon = serviceThemes[key].icon;
            const isActive = activeService === key;
            return (
              <button
                key={key}
                onClick={() => setActiveService(key)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm border transition-colors duration-300 ${
                  isActive
                    ? "text-white border-transparent"
                    : "text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
                style={isActive ? { backgroundColor: serviceThemes[key].accent } : undefined}
              >
                <Icon size={16} />
                {t.services[key].name}
                {isActive && (
                  <motion.span
                    layoutId="hub-indicator"
                    className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{ backgroundColor: serviceThemes[key].accent }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-2xl border border-slate-200 p-8 lg:p-10"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}0d, transparent 60%)`,
            }}
          >
            <h3 className="font-display text-2xl font-bold text-[#0F172A]">{data.name}</h3>
            <p className="mt-2 text-slate-500 max-w-lg">{data.tagline}</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {data.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm"
                >
                  <CheckCircle2
                    size={18}
                    className="mb-3 transition-colors duration-500"
                    style={{ color: "var(--accent)" }}
                  />
                  <div className="font-semibold text-sm text-[#0F172A]">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DETAILED SERVICE SECTION (own fixed accent, anchor target)         */
/* ------------------------------------------------------------------ */
function ServiceSection({ id, sectionRef, service, t }) {
  const theme = serviceThemes[service];
  const Icon = theme.icon;
  const data = t.services[service];

  return (
    <section ref={sectionRef} id={id} className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: theme.accent }}
          >
            <Icon size={20} />
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#0F172A]">
            {data.name}
          </h2>
        </div>
        <p className="text-slate-500 max-w-xl mb-10">{data.tagline}</p>

        <div className="grid sm:grid-cols-3 gap-5">
          {data.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{ borderColor: "transparent" }}
            >
              <div
                className="w-full h-1 rounded-full mb-5 opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: theme.accent }}
              />
              <div className="font-display font-bold text-[#0F172A]">{item.title}</div>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY US                                                              */
/* ------------------------------------------------------------------ */
const whyIcons = { shield: ShieldCheck, gem: Gem, clock: CalendarClock };

function WhyUs({ t, sectionRef, theme }) {
  return (
    <section ref={sectionRef} id="about" className="py-24 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p
          className="font-display text-sm tracking-[0.2em] uppercase mb-3 transition-colors duration-500"
          style={{ color: "var(--accent-light)" }}
        >
          {t.why.eyebrow}
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold max-w-lg">
          {t.why.title}
        </h2>
        <p className="mt-4 text-white/50 max-w-xl">{t.footer.about}</p>

        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {t.why.items.map((item, i) => {
            const Icon = whyIcons[item.icon];
            return (
              <div key={i} className="border-t border-white/10 pt-6">
                <Icon
                  size={24}
                  className="mb-4 transition-colors duration-500"
                  style={{ color: "var(--accent-light)" }}
                />
                <h3 className="font-display font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-white/50 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  QUOTE FORM                                                          */
/* ------------------------------------------------------------------ */
function QuoteForm({ t, sectionRef, formService, setFormService, onSubmit, submitted }) {
  const theme = serviceThemes[formService];

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <p
          className="font-display text-sm tracking-[0.2em] uppercase mb-3 transition-colors duration-500"
          style={{ color: theme.accent }}
        >
          {t.form.eyebrow}
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0F172A]">
          {t.form.title}
        </h2>
        <p className="mt-3 text-slate-500">{t.form.subtitle}</p>

        <form onSubmit={onSubmit} className="mt-10 grid sm:grid-cols-2 gap-5">
          <Field label={t.form.name}>
            <input required type="text" className="input" />
          </Field>
          <Field label={t.form.email}>
            <input required type="email" className="input" />
          </Field>
          <Field label={t.form.phone}>
            <input type="tel" className="input" />
          </Field>
          <Field label={t.form.location}>
            <input type="text" className="input" />
          </Field>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
              {t.form.service}
            </label>
            <div className="relative">
              <select
                value={formService}
                onChange={(e) => setFormService(e.target.value)}
                className="input appearance-none pr-10"
              >
                <option value="construction">{t.services.construction.name}</option>
                <option value="cleaning">{t.services.cleaning.name}</option>
                <option value="flooring">{t.services.flooring.name}</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
              {t.form.details}
            </label>
            <textarea
              rows={4}
              placeholder={t.form.detailsPlaceholder}
              className="input resize-none"
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-4 mt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-white transition-colors duration-300"
              style={{ backgroundColor: theme.accent }}
            >
              <Send size={16} />
              {t.form.submit}
            </button>
            <AnimatePresence>
              {submitted && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                  style={{ color: theme.accent }}
                >
                  {t.form.success}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          font-size: 0.9rem;
          color: #0F172A;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus {
          border-color: ${theme.accent};
          background: white;
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */
function Footer({ t, scrollTo }) {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid sm:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-lg font-bold text-white mb-3">
            Center<span className="text-white/50">Oy</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">{t.footer.about}</p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
            {t.footer.quickLinks}
          </div>
          <div className="flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm text-white/60 hover:text-white transition-colors w-fit"
              >
                {t.nav[item.key]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
            {t.footer.contact}
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Phone size={14} /> +358 40 123 4567
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} /> info@centeroy.fi
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> Helsinki, Finland
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 pt-6 border-t border-white/5 text-xs text-white/30">
        © {new Date().getFullYear()} Center Oy. {t.footer.rights}
      </div>
    </footer>
  );
}
