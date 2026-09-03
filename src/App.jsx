import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Send,
  Sun,
  Moon,
} from "lucide-react";

import constructionImg from "./assets/construction.jpg";
import flooringImg from "./assets/flooring.jpg";
import paintingImg from "./assets/painting.jpg";
import cleaningImg from "./assets/cleaning.jpg";
import apartmentImg from "./assets/apartment.jpg";
import interiorImg from "./assets/interior.jpg";

/* ------------------------------------------------------------------ */
/*  BRAND TOKENS                                                       */
/*  Remacon-inspired: near-black type, warm off-white paper, a single  */
/*  gold accent. No per-service colour theming — the photography does  */
/*  the differentiating, the type system stays constant.               */
/* ------------------------------------------------------------------ */
const GOLD = "#B8934A";
const GOLD_SOFT = "#D4AF6A";

const LANGS = ["fi", "en", "sv"];

/* The six sub-brands, in the running order Jarno specified. `index`
   drives the alternating layout: even → text left / image right,
   odd → image left / text right. */
const SERVICES = [
  { key: "rakennus", id: "rakennus", image: constructionImg },
  { key: "parketti", id: "parketti", image: flooringImg },
  { key: "maalaus", id: "maalaus", image: paintingImg },
  { key: "siivous", id: "siivous", image: cleaningImg },
  { key: "huoneisto", id: "huoneisto", image: apartmentImg },
  {
    key: "saaristo",
    id: "saaristo",
    /* TODO: replace with real archipelago photography. This is the only
       service without an owned photo — everything else is a real asset. */
    image: "https://picsum.photos/seed/center-saaristo/1600/2000",
  },
];

const SERVICE_KEYS = SERVICES.map((s) => s.key);

/* Reference shots for the carousel — all owned assets, no external calls. */
const GALLERY_ITEMS = [
  { image: constructionImg, service: "rakennus", location: "Helsinki" },
  { image: flooringImg, service: "parketti", location: "Espoo" },
  { image: paintingImg, service: "maalaus", location: "Vantaa" },
  { image: cleaningImg, service: "siivous", location: "Tampere" },
  { image: apartmentImg, service: "huoneisto", location: "Turku" },
  { image: interiorImg, service: "huoneisto", location: "Porvoo" },
];

/* ------------------------------------------------------------------ */
/*  TRANSLATIONS                                                       */
/*  Each service carries: name (nav/select label), eyebrow (all-caps   */
/*  kicker), title (serif headline) and 2–3 narrative paragraphs.      */
/*  No feature lists, no bullet points — story text only.              */
/* ------------------------------------------------------------------ */
const translations = {
  fi: {
    nav: {
      home: "Koti",
      rakennus: "Rakennus",
      parketti: "Parketti",
      maalaus: "Maalaus",
      siivous: "Siivous",
      huoneisto: "Huoneisto",
      saaristo: "Saaristo",
      contact: "Yhteystiedot",
      cta: "Pyydä tarjous",
    },
    hero: {
      eyebrow: "Rakentaminen · Kunnossapito · Puhtaus",
      title: "Luotettavaa palvelua\nkiinteistösi koko elinkaarelle",
      subtitle:
        "Kuusi erikoisosaajaa saman katon alla. Yksi sopimus, yksi yhteyshenkilö, yksi vastuu.",
      badge: "Center Oy",
      badgeSub: "Rakennus · Kiinteistöt",
      ctaPrimary: "Pyydä tarjous",
      ctaSecondary: "Tutustu palveluihin",
      stats: [
        { value: "100+", label: "Toteutettua projektia" },
        { value: "12", label: "Vuotta kokemusta" },
        { value: "250+", label: "Tyytyväistä asiakasta" },
      ],
    },
    readMore: "Lue lisää",
    services: {
      rakennus: {
        name: "Rakennuscenter",
        eyebrow: "Rakennuscenter",
        title: "Rakentamista, joka kestää sukupolvia",
        body: [
          "Rakennuscenter vastaa uudisrakentamisesta, saneerauksista ja julkisivutöistä alusta loppuun — suunnittelupöydältä luovutukseen asti.",
          "Noudatamme aina hyvän rakennustavan mukaisia menetelmiä ja pidämme tilaajan ajan tasalla töiden etenemisestä.",
          "Yksi vastuullinen kumppani, yksi aikataulu, yksi yhteyshenkilö koko projektin ajan.",
        ],
      },
      parketti: {
        name: "Parketticenter",
        eyebrow: "Parketticenter",
        title: "Parketti on tilan hiljainen ylellisyys",
        body: [
          "Parketticenter asentaa, hioo ja pinnoittaa puulattiat, joissa yhdistyvät perinteinen käsityö ja nykyaikaiset materiaalit.",
          "Kalanruotokuvio, tammilankku tai kokonaan uusi pinta vanhan päälle — työjälki on sama: tasainen, hiljainen ja vuosikymmeniä kestävä.",
          "Suojaamme tilat huolellisesti ja siivoamme jälkemme, jotta koti on käyttövalmis heti työn valmistuttua.",
        ],
      },
      maalaus: {
        name: "Maalauscenter",
        eyebrow: "Maalauscenter",
        title: "Väri viimeistelee tilan",
        body: [
          "Maalauscenter tekee sisä- ja ulkomaalaukset, tasoitetyöt sekä teollisuuspinnoitteet huolellisella pohjatyöllä.",
          "Hyvä maalaus alkaa aina pohjasta. Käytämme päästöluokiteltuja materiaaleja ja työskentelemme siististi myös asutuissa kohteissa.",
          "Lopputuloksena on tasainen, kestävä pinta, joka näyttää yhtä hyvältä myös vuosien päästä.",
        ],
      },
      siivous: {
        name: "Siivouscenter",
        eyebrow: "Siivouscenter",
        title: "Puhtaus, jota ei tarvitse erikseen pyytää",
        body: [
          "Siivouscenter huolehtii ylläpitosiivouksesta, rakennussiivouksesta ja toimitilojen puhtaudesta sovitun palvelukuvauksen mukaisesti.",
          "Sama tuttu tiimi käy kohteessa joka kerta, joten talon tavat opitaan nopeasti ja poikkeamiin reagoidaan oma-aloitteisesti.",
          "Raportoimme tehdyt työt selkeästi, jotta isännöitsijä ja tilaaja tietävät aina missä mennään.",
        ],
      },
      huoneisto: {
        name: "Huoneistocenter",
        eyebrow: "Huoneistocenter",
        title: "Koti kerrallaan, huolella uudistettu",
        body: [
          "Huoneistocenter keskittyy asuinhuoneistojen remontteihin: keittiöt, kylpyhuoneet ja kokonaisvaltaiset pintaremontit.",
          "Työskentelemme keskellä asiakkaan arkea, joten pidämme työmaan siistinä, melun kurissa ja aikataulun läpinäkyvänä.",
          "Hoidamme luvat, valvonnan ja aliurakoitsijat puolestasi — sinä valitset materiaalit, me hoidamme loput.",
        ],
      },
      saaristo: {
        name: "Saaristocenter",
        eyebrow: "Saaristocenter",
        title: "Meren äärellä, samalla laadulla",
        body: [
          "Saaristocenter vie saman palvelun saaristoon: huvila- ja mökkikohteiden rakennustyöt, huollot ja kausikunnostukset.",
          "Logistiikka, kuljetukset ja sääolot huomioidaan jo tarjousvaiheessa, joten kohteessa ei jäädä odottamaan materiaaleja.",
          "Käymme kohteella myös silloin kun sinä et pääse — ja raportoimme kuvin, mitä on tehty.",
        ],
      },
    },
    gallery: {
      eyebrow: "Referenssit",
      title: "Valittuja kohteitamme",
      subtitle: "Katsaus viimeaikaisiin toteutuksiimme ympäri Suomea.",
    },
    why: {
      eyebrow: "Miksi Center Oy",
      title: "Kolme syytä luottaa meihin",
      subtitle:
        "Center Oy kokoaa kuusi erikoisalaa yhden vastuullisen kumppanin taakse.",
      items: [
        {
          title: "Luotettavuus",
          desc: "Sovitut asiat pidetään — sopimuksesta valmiiseen työhön.",
        },
        {
          title: "Laatu",
          desc: "Teemme työn kerralla kunnolla, alan parhailla käytännöillä.",
        },
        {
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
      location: "Paikkakunta",
      details: "Lisätiedot",
      detailsPlaceholder: "Kerro projektistasi...",
      submit: "Lähetä tarjouspyyntö",
      success: "Kiitos! Otamme sinuun yhteyttä pian.",
    },
    contact: {
      eyebrow: "Suora yhteys",
      title: "Puhu suoraan Jarnon kanssa",
      lead: "Jokainen tarjouspyyntö käydään läpi henkilökohtaisesti. Soita tai laita viestiä, niin sovitaan katselmus.",
      personName: "Jarno",
      personRole: "Toimitusjohtaja, Center Oy",
      hoursLabel: "Tavoitat arkisin",
      hours: "ma–pe 7.00–17.00",
    },
    footer: {
      about:
        "Center Oy on suomalainen monipalveluyritys, joka kokoaa rakentamisen, parketit, maalauksen, siivouksen, huoneistoremontit ja saaristopalvelut yhden katon alle.",
      services: "Palvelut",
      contact: "Yhteystiedot",
      rights: "Kaikki oikeudet pidätetään.",
    },
  },

  en: {
    nav: {
      home: "Home",
      rakennus: "Construction",
      parketti: "Parquet",
      maalaus: "Painting",
      siivous: "Cleaning",
      huoneisto: "Apartments",
      saaristo: "Archipelago",
      contact: "Contact",
      cta: "Request a Quote",
    },
    hero: {
      eyebrow: "Construction · Maintenance · Cleaning",
      title: "Dependable service\nfor the whole life of your property",
      subtitle:
        "Six specialist companies under one roof. One contract, one contact, one responsibility.",
      badge: "Center Oy",
      badgeSub: "Construction · Property",
      ctaPrimary: "Request a Quote",
      ctaSecondary: "Explore Services",
      stats: [
        { value: "100+", label: "Projects completed" },
        { value: "12", label: "Years of experience" },
        { value: "250+", label: "Satisfied clients" },
      ],
    },
    readMore: "Read more",
    services: {
      rakennus: {
        name: "Rakennuscenter",
        eyebrow: "Rakennuscenter",
        title: "Construction built to outlast generations",
        body: [
          "Rakennuscenter handles new builds, renovations and façade work from beginning to end — from the drawing board to the day we hand over the keys.",
          "We work strictly to Finnish good building practice and keep the client informed at every stage of the schedule.",
          "One accountable partner, one timeline, one contact person for the entire project.",
        ],
      },
      parketti: {
        name: "Parketticenter",
        eyebrow: "Parketticenter",
        title: "Parquet is a room's quiet luxury",
        body: [
          "Parketticenter lays, sands and finishes wooden floors that bring together traditional craft and modern materials.",
          "Herringbone, wide oak plank or a fresh surface over an old one — the result is the same: level, quiet and built to last decades.",
          "We protect the space carefully and clean up after ourselves, so the home is ready to use the moment we finish.",
        ],
      },
      maalaus: {
        name: "Maalauscenter",
        eyebrow: "Maalauscenter",
        title: "Colour is what finishes a space",
        body: [
          "Maalauscenter takes care of interior and exterior painting, plastering and industrial coatings — always on properly prepared surfaces.",
          "A good paint job starts underneath. We use low-emission materials and work cleanly, even in occupied buildings.",
          "The result is an even, durable finish that still looks right years later.",
        ],
      },
      siivous: {
        name: "Siivouscenter",
        eyebrow: "Siivouscenter",
        title: "Cleanliness you never have to ask for",
        body: [
          "Siivouscenter looks after routine cleaning, post-construction cleaning and commercial premises, exactly to the agreed service description.",
          "The same familiar team visits every time, so they learn the building's habits quickly and act on issues without being asked.",
          "We report the work clearly, so the property manager and the client always know where things stand.",
        ],
      },
      huoneisto: {
        name: "Huoneistocenter",
        eyebrow: "Huoneistocenter",
        title: "One home at a time, renewed with care",
        body: [
          "Huoneistocenter focuses on apartment renovations: kitchens, bathrooms and full surface refurbishments.",
          "We work in the middle of someone's daily life, so we keep the site tidy, the noise contained and the schedule transparent.",
          "We handle the permits, the supervision and the subcontractors — you choose the materials, we take care of the rest.",
        ],
      },
      saaristo: {
        name: "Saaristocenter",
        eyebrow: "Saaristocenter",
        title: "By the sea, held to the same standard",
        body: [
          "Saaristocenter brings the same service out to the archipelago: construction, maintenance and seasonal work on villas and summer houses.",
          "Logistics, transport and weather are priced into the quote from the start, so nobody stands on site waiting for materials.",
          "We visit the property when you cannot — and send photographs of what has been done.",
        ],
      },
    },
    gallery: {
      eyebrow: "Our Work",
      title: "Selected Projects",
      subtitle: "A look at some of our recent work across Finland.",
    },
    why: {
      eyebrow: "Why Center Oy",
      title: "Three reasons to trust us",
      subtitle:
        "Center Oy brings six specialist trades behind a single accountable partner.",
      items: [
        {
          title: "Reliability",
          desc: "What is agreed is what gets done — from contract to completion.",
        },
        {
          title: "Quality",
          desc: "We do the job properly the first time, using the best practices in the trade.",
        },
        {
          title: "Schedules",
          desc: "We keep to the timeline and keep you informed throughout the project.",
        },
      ],
    },
    form: {
      eyebrow: "Get in touch",
      title: "Request a Quote",
      subtitle: "Tell us about your project and we will reply within 24 hours.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      service: "Service",
      location: "Location",
      details: "Details",
      detailsPlaceholder: "Tell us about your project...",
      submit: "Send request",
      success: "Thank you! We will be in touch shortly.",
    },
    contact: {
      eyebrow: "Direct line",
      title: "Talk to Jarno directly",
      lead: "Every request is reviewed personally. Call or send a message and we will arrange a site visit.",
      personName: "Jarno",
      personRole: "Managing Director, Center Oy",
      hoursLabel: "Available on weekdays",
      hours: "Mon–Fri 7.00–17.00",
    },
    footer: {
      about:
        "Center Oy is a Finnish multi-service company bringing construction, parquet, painting, cleaning, apartment renovation and archipelago services under one roof.",
      services: "Services",
      contact: "Contact",
      rights: "All rights reserved.",
    },
  },

  sv: {
    nav: {
      home: "Hem",
      rakennus: "Byggnad",
      parketti: "Parkett",
      maalaus: "Målning",
      siivous: "Städning",
      huoneisto: "Lägenheter",
      saaristo: "Skärgård",
      contact: "Kontakt",
      cta: "Begär offert",
    },
    hero: {
      eyebrow: "Byggande · Underhåll · Renlighet",
      title: "Pålitlig service\nunder fastighetens hela livslängd",
      subtitle:
        "Sex specialister under samma tak. Ett avtal, en kontaktperson, ett ansvar.",
      badge: "Center Oy",
      badgeSub: "Byggnad · Fastigheter",
      ctaPrimary: "Begär offert",
      ctaSecondary: "Se våra tjänster",
      stats: [
        { value: "100+", label: "Genomförda projekt" },
        { value: "12", label: "År av erfarenhet" },
        { value: "250+", label: "Nöjda kunder" },
      ],
    },
    readMore: "Läs mer",
    services: {
      rakennus: {
        name: "Rakennuscenter",
        eyebrow: "Rakennuscenter",
        title: "Byggande som håller i generationer",
        body: [
          "Rakennuscenter ansvarar för nybyggnation, saneringar och fasadarbeten från början till slut — från ritbordet till överlåtelsen.",
          "Vi följer alltid god byggsed och håller beställaren informerad om hur arbetet framskrider.",
          "En ansvarig partner, en tidtabell, en kontaktperson genom hela projektet.",
        ],
      },
      parketti: {
        name: "Parketticenter",
        eyebrow: "Parketticenter",
        title: "Parketten är rummets tysta lyx",
        body: [
          "Parketticenter lägger, slipar och ytbehandlar trägolv där traditionellt hantverk möter moderna material.",
          "Fiskbensmönster, bred ekplanka eller en helt ny yta ovanpå den gamla — resultatet är detsamma: jämnt, tyst och hållbart i decennier.",
          "Vi skyddar utrymmena omsorgsfullt och städar efter oss, så att hemmet är färdigt att användas direkt.",
        ],
      },
      maalaus: {
        name: "Maalauscenter",
        eyebrow: "Maalauscenter",
        title: "Färgen fulländar rummet",
        body: [
          "Maalauscenter utför in- och utvändig målning, spackelarbeten samt industribeläggningar med noggrant förarbete.",
          "En bra målning börjar i underlaget. Vi använder emissionsklassade material och arbetar snyggt även i bebodda objekt.",
          "Resultatet är en jämn och slitstark yta som ser lika bra ut även efter många år.",
        ],
      },
      siivous: {
        name: "Siivouscenter",
        eyebrow: "Siivouscenter",
        title: "Renlighet man aldrig behöver be om",
        body: [
          "Siivouscenter sköter underhållsstädning, byggstädning och renlighet i verksamhetslokaler enligt överenskommen servicebeskrivning.",
          "Samma bekanta team besöker objektet varje gång, så husets rutiner lärs in snabbt och avvikelser åtgärdas på eget initiativ.",
          "Vi rapporterar utfört arbete tydligt, så att disponenten och beställaren alltid vet läget.",
        ],
      },
      huoneisto: {
        name: "Huoneistocenter",
        eyebrow: "Huoneistocenter",
        title: "Ett hem i taget, förnyat med omsorg",
        body: [
          "Huoneistocenter fokuserar på lägenhetsrenoveringar: kök, badrum och heltäckande ytrenoveringar.",
          "Vi arbetar mitt i kundens vardag, därför håller vi arbetsplatsen ren, ljudnivån nere och tidtabellen transparent.",
          "Vi sköter tillstånd, övervakning och underentreprenörer åt dig — du väljer materialen, vi tar hand om resten.",
        ],
      },
      saaristo: {
        name: "Saaristocenter",
        eyebrow: "Saaristocenter",
        title: "Vid havet, med samma kvalitet",
        body: [
          "Saaristocenter tar med samma service ut i skärgården: byggarbeten, underhåll och säsongsrenoveringar för villor och stugor.",
          "Logistik, transporter och väderförhållanden beaktas redan i offertskedet, så ingen står på plats och väntar på material.",
          "Vi besöker objektet även när du inte kan — och rapporterar med bilder vad som gjorts.",
        ],
      },
    },
    gallery: {
      eyebrow: "Referenser",
      title: "Utvalda objekt",
      subtitle: "En inblick i våra senaste projekt runt om i Finland.",
    },
    why: {
      eyebrow: "Varför Center Oy",
      title: "Tre skäl att lita på oss",
      subtitle:
        "Center Oy samlar sex specialområden bakom en ansvarig partner.",
      items: [
        {
          title: "Pålitlighet",
          desc: "Det som avtalats håller — från kontrakt till färdigt arbete.",
        },
        {
          title: "Kvalitet",
          desc: "Vi gör jobbet ordentligt första gången, enligt branschens bästa praxis.",
        },
        {
          title: "Tidtabeller",
          desc: "Vi håller tidtabellen och håller dig uppdaterad genom hela projektet.",
        },
      ],
    },
    form: {
      eyebrow: "Kontakta oss",
      title: "Begär offert",
      subtitle: "Berätta om ditt projekt så återkommer vi inom 24 timmar.",
      name: "Namn",
      email: "E-post",
      phone: "Telefon",
      service: "Tjänst",
      location: "Ort",
      details: "Mer information",
      detailsPlaceholder: "Berätta om ditt projekt...",
      submit: "Skicka offertförfrågan",
      success: "Tack! Vi kontaktar dig snart.",
    },
    contact: {
      eyebrow: "Direktkontakt",
      title: "Tala direkt med Jarno",
      lead: "Varje förfrågan gås igenom personligen. Ring eller skicka ett meddelande så bokar vi en syn.",
      personName: "Jarno",
      personRole: "Verkställande direktör, Center Oy",
      hoursLabel: "Nås på vardagar",
      hours: "mån–fre 7.00–17.00",
    },
    footer: {
      about:
        "Center Oy är ett finländskt multiserviceföretag som samlar byggande, parkett, målning, städning, lägenhetsrenoveringar och skärgårdstjänster under ett tak.",
      services: "Tjänster",
      contact: "Kontakt",
      rights: "Alla rättigheter förbehållna.",
    },
  },
};

/* TODO: swap for Jarno's real details before launch. */
const CONTACT_DETAILS = {
  phone: "+358 40 123 4567",
  email: "jarno@centeroy.fi",
  address: "Helsinki, Suomi",
};

/* ------------------------------------------------------------------ */
/*  SHARED PRIMITIVES                                                   */
/* ------------------------------------------------------------------ */

/* All-caps kicker used above every headline. */
function Eyebrow({ children, className = "", light = false }) {
  return (
    <p
      className={`text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.28em] ${
        light ? "text-white/55" : "text-[#8A8A8A] dark:text-[#8F8F8F]"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/* Section header: kicker + serif headline + optional lead. Reveals once. */
function RevealHeader({ eyebrow, title, subtitle, light = false, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`font-display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] font-normal ${
          light ? "text-white" : "text-[#111111] dark:text-[#F2EFEA]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-xl text-[0.95rem] leading-relaxed ${
            light ? "text-white/55" : "text-[#5F5B56] dark:text-[#A5A19B]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* Solid, square primary button. Black on light, inverted in dark mode. */
function SolidButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-3 rounded-none px-8 py-4 text-sm font-medium tracking-wide bg-[#111111] text-white hover:bg-[#2B2B2B] dark:bg-[#F2EFEA] dark:text-[#111111] dark:hover:bg-white transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* Sun/Moon toggle — square, to match the rest of the chrome. */
function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="relative w-9 h-9 flex items-center justify-center rounded-none border border-white/15 text-white/70 hover:text-white hover:border-white/35 transition-colors duration-300 overflow-hidden shrink-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -80, scale: 0.4 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 80, scale: 0.4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */
export default function CenterOy() {
  const [lang, setLang] = useState("fi");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formService, setFormService] = useState("rakennus");
  const [submitted, setSubmitted] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("center-oy-theme");
    if (stored) return stored === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    window.localStorage.setItem("center-oy-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  const sectionRefs = {
    home: useRef(null),
    rakennus: useRef(null),
    parketti: useRef(null),
    maalaus: useRef(null),
    siivous: useRef(null),
    huoneisto: useRef(null),
    saaristo: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  const t = translations[lang];

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
      className={`${dark ? "dark" : ""} relative min-h-screen bg-white dark:bg-[#0E0E0E] text-[#111111] dark:text-[#F2EFEA] font-sans antialiased transition-colors duration-500`}
      style={{ "--gold": GOLD, "--gold-soft": GOLD_SOFT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Playfair Display', 'Times New Roman', serif; }
        .font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
        dark={dark}
        toggleTheme={toggleTheme}
      />

      <main>
        <Hero
          t={t}
          scrollTo={scrollTo}
          sectionRef={sectionRefs.home}
          videoSrc="/media/hero-loop.mp4"
          posterSrc={constructionImg}
        />

        <StatsBand t={t} />

        {SERVICES.map((service, i) => (
          <ServiceSection
            key={service.key}
            id={service.id}
            sectionRef={sectionRefs[service.key]}
            serviceKey={service.key}
            imageSrc={service.image}
            index={i}
            t={t}
            scrollTo={scrollTo}
          />
        ))}

        <ProjectGallery t={t} />

        <WhyUs t={t} sectionRef={sectionRefs.about} />

        <ContactSection
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
/*  HEADER — transparent over the hero, solid once the page scrolls     */
/* ------------------------------------------------------------------ */
function Header({ t, lang, setLang, menuOpen, setMenuOpen, scrollTo, dark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen
          ? "bg-[#0E0E0E]/95 backdrop-blur-sm border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        {/* wordmark */}
        <button
          onClick={() => scrollTo("home")}
          aria-label={t.nav.home}
          className="font-display text-lg text-white tracking-[0.12em] shrink-0"
        >
          CENTER<span style={{ color: "var(--gold-soft)" }}> OY</span>
        </button>

        {/* the six sub-brands */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-9">
          {SERVICE_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
            >
              {t.nav[key]}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
          >
            {t.nav.contact}
          </button>
        </nav>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <ThemeToggle dark={dark} onToggle={toggleTheme} />
          <div className="flex items-center border border-white/15">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.1em] transition-colors duration-300 ${
                  lang === l ? "bg-white text-[#111111]" : "text-white/55 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="rounded-none border px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-white/10"
            style={{ borderColor: "var(--gold)" }}
          >
            {t.nav.cta}
          </button>
        </div>

        <div className="xl:hidden flex items-center gap-3">
          <ThemeToggle dark={dark} onToggle={toggleTheme} />
          <button
            className="text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden overflow-hidden bg-[#0E0E0E] border-t border-white/10"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {SERVICE_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="text-left text-sm uppercase tracking-[0.2em] text-white/75 hover:text-white transition-colors"
                >
                  {t.nav[key]}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="text-left text-sm uppercase tracking-[0.2em] text-white/75 hover:text-white transition-colors"
              >
                {t.nav.contact}
              </button>

              <div className="flex items-center gap-2 pt-3">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.1em] border transition-colors ${
                      lang === l
                        ? "bg-white text-[#111111] border-white"
                        : "text-white/55 border-white/20"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 w-full rounded-none border py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-white"
                style={{ borderColor: "var(--gold)" }}
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
/*  HERO — dark, centred, gold-bordered wordmark badge                  */
/* ------------------------------------------------------------------ */
function Hero({ t, scrollTo, sectionRef, videoSrc, posterSrc }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.8]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0E0E0E] text-white flex items-center"
    >
      {/* media layer — desaturated, like the reference */}
      <motion.div style={{ y: mediaY }} className="absolute inset-0 -top-[8%] h-[116%]">
        {videoSrc ? (
          <video
            className="w-full h-full object-cover grayscale-[0.55]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img src={posterSrc} alt="" className="w-full h-full object-cover grayscale-[0.55]" />
        )}
      </motion.div>

      {/* legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/85 via-[#0E0E0E]/45 to-[#0E0E0E]/85" />
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-10 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow light>{t.hero.eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          key={t.hero.title}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-normal leading-[1.12] whitespace-pre-line"
        >
          {t.hero.title}
        </motion.h1>

        {/* gold-bordered wordmark badge, mirroring the reference hero lockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 inline-flex flex-col items-center gap-1.5 border px-9 py-4"
          style={{ borderColor: "var(--gold)" }}
        >
          <span
            className="font-display text-2xl sm:text-3xl tracking-[0.18em] uppercase"
            style={{ color: "var(--gold-soft)" }}
          >
            {t.hero.badge}
          </span>
          <span
            className="text-[0.6rem] uppercase tracking-[0.34em]"
            style={{ color: "var(--gold)" }}
          >
            {t.hero.badgeSub}
          </span>
        </motion.div>

        <motion.p
          key={t.hero.subtitle}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 mx-auto max-w-lg text-[0.95rem] leading-relaxed text-white/60"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("contact")}
            className="group inline-flex items-center gap-3 rounded-none px-8 py-4 text-sm font-medium tracking-wide text-[#1A1408] transition-all duration-300 hover:gap-4"
            style={{ background: `linear-gradient(135deg, ${GOLD_SOFT}, ${GOLD})` }}
          >
            {t.hero.ctaPrimary}
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollTo("rakennus")}
            className="rounded-none border border-white/25 px-8 py-4 text-sm font-medium tracking-wide text-white hover:bg-white/10 hover:border-white/45 transition-colors duration-300"
          >
            {t.hero.ctaSecondary}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STATS BAND — slim editorial strip carrying the old hero numbers     */
/* ------------------------------------------------------------------ */
function StatsBand({ t }) {
  return (
    <section className="bg-[#0E0E0E] text-white border-t" style={{ borderColor: `${GOLD}33` }}>
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-3">
        {t.hero.stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`py-10 sm:py-12 sm:px-8 first:sm:pl-0 last:sm:pr-0 border-b sm:border-b-0 sm:border-r last:sm:border-r-0 border-white/10`}
          >
            <div
              className="font-display text-4xl lg:text-5xl font-normal"
              style={{ color: "var(--gold-soft)" }}
            >
              {s.value}
            </div>
            <div className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-white/45">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE SECTION — the Remacon clone.                                */
/*  Strict 50/50 grid, full-bleed image that fills its column edge to   */
/*  edge and top to bottom. Even index: text left / image right.        */
/*  Odd index: image left / text right. Backgrounds alternate between   */
/*  white and warm paper so consecutive sections stay distinct.         */
/* ------------------------------------------------------------------ */
function ServiceSection({ id, sectionRef, serviceKey, imageSrc, index, t, scrollTo }) {
  const data = t.services[serviceKey];
  const isReversed = index % 2 === 1;
  const ease = [0.16, 1, 0.3, 1];

  return (
    <section
      ref={sectionRef}
      id={id}
      /* scroll-mt clears the fixed 5rem header when navigating by anchor */
      className={`scroll-mt-20 grid lg:grid-cols-2 ${
        index % 2 === 0
          ? "bg-white dark:bg-[#0E0E0E]"
          : "bg-[#F5F3F0] dark:bg-[#151515]"
      } transition-colors duration-500`}
    >
      {/* ---------- text column ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className={`flex items-center px-6 sm:px-10 lg:px-14 xl:px-20 py-20 lg:py-28 ${
          isReversed ? "lg:order-last" : "lg:order-first"
        }`}
      >
        <div className="w-full max-w-xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>

          <h2 className="font-display mt-6 text-3xl sm:text-4xl lg:text-[2.9rem] leading-[1.15] font-normal text-[#111111] dark:text-[#F2EFEA]">
            {data.title}
          </h2>

          <div className="mt-8 space-y-5">
            {data.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-[0.95rem] leading-[1.85] text-[#5F5B56] dark:text-[#A5A19B]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <SolidButton className="mt-10" onClick={() => scrollTo("contact")}>
            {t.readMore}
          </SolidButton>
        </div>
      </motion.div>

      {/* ---------- image column: full bleed, full height ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className={`relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-full overflow-hidden ${
          isReversed ? "lg:order-first" : "lg:order-last"
        }`}
      >
        <motion.img
          src={imageSrc}
          alt={data.name}
          loading="lazy"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT GALLERY — auto-scrolling embla carousel, square corners     */
/* ------------------------------------------------------------------ */
function ProjectGallery({ t }) {
  const autoplay = useRef(Autoplay({ delay: 3800, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay.current]);

  return (
    <section className="py-24 lg:py-32 bg-[#0E0E0E] text-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <RevealHeader
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
          light
        />
      </div>

      <div className="mt-14 overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex-[0_0_84%] sm:flex-[0_0_52%] lg:flex-[0_0_34%] pl-4 first:pl-6 lg:first:pl-10"
            >
              <div className="group relative overflow-hidden aspect-[4/3]">
                <img
                  src={item.image}
                  alt={`${t.services[item.service].name} — ${item.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span
                    className="text-[0.65rem] font-medium uppercase tracking-[0.24em]"
                    style={{ color: "var(--gold-soft)" }}
                  >
                    {t.services[item.service].name}
                  </span>
                  <div className="font-display text-xl mt-1.5">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY US — editorial three-column band, serif numerals, no cards      */
/* ------------------------------------------------------------------ */
function WhyUs({ t, sectionRef }) {
  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-20 py-24 lg:py-32 bg-[#F5F3F0] dark:bg-[#151515] transition-colors duration-500"
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <RevealHeader
          eyebrow={t.why.eyebrow}
          title={t.why.title}
          subtitle={t.why.subtitle}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid sm:grid-cols-3 gap-10 lg:gap-16"
        >
          {t.why.items.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="border-t pt-8"
              style={{ borderColor: `${GOLD}59` }}
            >
              <div
                className="font-display text-3xl leading-none"
                style={{ color: "var(--gold)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display mt-5 text-xl text-[#111111] dark:text-[#F2EFEA]">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.8] text-[#5F5B56] dark:text-[#A5A19B]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT — Jarno's details panel beside the quote form               */
/* ------------------------------------------------------------------ */
function ContactSection({ t, sectionRef, formService, setFormService, onSubmit, submitted }) {
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="scroll-mt-20 py-24 lg:py-32 bg-white dark:bg-[#0E0E0E] transition-colors duration-500"
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20">
        {/* --- direct contact panel --- */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="bg-[#0E0E0E] text-white p-9 lg:p-11 border-t-2" style={{ borderColor: GOLD }}>
            <Eyebrow light>{t.contact.eyebrow}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl lg:text-[2.25rem] leading-[1.2]">
              {t.contact.title}
            </h2>
            <p className="mt-5 text-[0.92rem] leading-[1.85] text-white/55">
              {t.contact.lead}
            </p>

            <div className="mt-9 pt-7 border-t border-white/12">
              <div className="font-display text-xl" style={{ color: "var(--gold-soft)" }}>
                {t.contact.personName}
              </div>
              <div className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-white/40">
                {t.contact.personRole}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 text-[0.92rem]">
              <a
                href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3.5 text-white/75 hover:text-white transition-colors"
              >
                <Phone size={15} style={{ color: GOLD }} />
                {CONTACT_DETAILS.phone}
              </a>
              <a
                href={`mailto:${CONTACT_DETAILS.email}`}
                className="flex items-center gap-3.5 text-white/75 hover:text-white transition-colors"
              >
                <Mail size={15} style={{ color: GOLD }} />
                {CONTACT_DETAILS.email}
              </a>
              <div className="flex items-center gap-3.5 text-white/75">
                <MapPin size={15} style={{ color: GOLD }} />
                {CONTACT_DETAILS.address}
              </div>
            </div>

            <div className="mt-9 pt-7 border-t border-white/12">
              <div className="text-[0.65rem] uppercase tracking-[0.24em] text-white/40">
                {t.contact.hoursLabel}
              </div>
              <div className="mt-2 text-[0.92rem] text-white/75">{t.contact.hours}</div>
            </div>
          </div>
        </motion.div>

        {/* --- quote form --- */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <Eyebrow>{t.form.eyebrow}</Eyebrow>
          <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-[#111111] dark:text-[#F2EFEA]">
            {t.form.title}
          </h2>
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-[#5F5B56] dark:text-[#A5A19B]">
            {t.form.subtitle}
          </p>

          <form onSubmit={onSubmit} className="mt-10 grid sm:grid-cols-2 gap-6">
            <Field label={t.form.name} htmlFor="f-name">
              <input required id="f-name" type="text" name="name" autoComplete="name" className="input" />
            </Field>
            <Field label={t.form.email} htmlFor="f-email">
              <input required id="f-email" type="email" name="email" autoComplete="email" className="input" />
            </Field>
            <Field label={t.form.phone} htmlFor="f-phone">
              <input id="f-phone" type="tel" name="phone" autoComplete="tel" className="input" />
            </Field>
            <Field label={t.form.location} htmlFor="f-location">
              <input id="f-location" type="text" name="location" className="input" />
            </Field>

            <Field label={t.form.service} htmlFor="f-service" className="sm:col-span-2">
              <div className="relative">
                <select
                  id="f-service"
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="input appearance-none pr-10"
                >
                  {SERVICE_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {t.services[key].name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9590] pointer-events-none"
                />
              </div>
            </Field>

            <Field label={t.form.details} htmlFor="f-details" className="sm:col-span-2">
              <textarea
                id="f-details"
                rows={5}
                name="details"
                placeholder={t.form.detailsPlaceholder}
                className="input resize-none"
              />
            </Field>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-5 mt-2">
              <SolidButton type="submit">
                <Send size={15} />
                {t.form.submit}
              </SolidButton>
              <AnimatePresence>
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium"
                    style={{ color: GOLD }}
                  >
                    {t.form.success}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.85rem 0;
          border: none;
          border-bottom: 1px solid #DCD7D0;
          border-radius: 0;
          background: transparent;
          font-size: 0.95rem;
          color: #111111;
          outline: none;
          transition: border-color 0.3s;
        }
        .input::placeholder { color: #A8A29A; }
        .input:focus { border-bottom-color: ${GOLD}; }
        .dark .input {
          border-bottom-color: rgba(255, 255, 255, 0.15);
          color: #F2EFEA;
        }
        .dark .input:focus { border-bottom-color: ${GOLD_SOFT}; }
        .dark .input option { background: #151515; color: #F2EFEA; }
      `}</style>
    </section>
  );
}

function Field({ label, htmlFor, children, className = "" }) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block mb-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[#8A8A8A] dark:text-[#8F8F8F]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */
function Footer({ t, scrollTo }) {
  return (
    <footer className="bg-[#0E0E0E] text-white border-t" style={{ borderColor: `${GOLD}33` }}>
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10 pt-20 pb-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="font-display text-lg tracking-[0.12em]">
            CENTER<span style={{ color: "var(--gold-soft)" }}> OY</span>
          </div>
          <div
            className="mt-4 h-px w-12"
            style={{ backgroundColor: GOLD }}
          />
          <p className="mt-6 max-w-sm text-[0.88rem] leading-[1.85] text-white/50">
            {t.footer.about}
          </p>
        </div>

        <div className="lg:col-span-4">
          <div className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/35">
            {t.footer.services}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3.5">
            {SERVICE_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className="text-left text-[0.85rem] text-white/55 hover:text-white transition-colors w-fit"
              >
                {t.services[key].name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/35">
            {t.footer.contact}
          </div>
          <div className="mt-6 flex flex-col gap-3.5 text-[0.85rem] text-white/55">
            <a
              href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <Phone size={14} /> {CONTACT_DETAILS.phone}
            </a>
            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <Mail size={14} /> {CONTACT_DETAILS.email}
            </a>
            <div className="flex items-center gap-3">
              <MapPin size={14} /> {CONTACT_DETAILS.address}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-10 pb-10">
        <div className="pt-7 border-t border-white/10 text-[0.72rem] tracking-wide text-white/30">
          © {new Date().getFullYear()} Center Oy. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
