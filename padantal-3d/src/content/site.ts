// Contenido único de la web de Padantal SL. Portado del sitio estático.

export const nav = {
  links: [
    { href: "#nosotros", label: "Quiénes somos" },
    { href: "#servicios", label: "Qué hacemos" },
    { href: "#socios", label: "Sociedades" },
    { href: "#casos", label: "Casos de éxito" },
  ],
  cta: { href: "#contacto", label: "Contactar" },
};

export const hero = {
  eyebrow: "Padantal SL · Sector pesquero global",
  titleLead: "Construyendo la",
  titleAccent: "pesca del futuro",
  lead: "Socio estratégico con capacidad real de ejecución. Combinamos know-how técnico y know-who internacional para liderar, activar y transformar proyectos pesqueros complejos a escala global.",
  ctaPrimary: { href: "#contacto", label: "Hablemos de tu proyecto" },
  ctaSecondary: { href: "#casos", label: "Ver casos de éxito" },
  stats: [
    { value: "+30", unit: "años", label: "de experiencia internacional" },
    { value: "+100", unit: "años", label: "de tradición marítima familiar" },
    { value: "+10", unit: "países", label: "con proyectos ejecutados" },
    { value: "13", unit: "buques", label: "registrados y operativos" },
  ],
};

export const about = {
  eyebrow: "Quiénes somos",
  title: "Un actor que el sector necesitaba",
  paragraphs: [
    "Padantal SL es una empresa fundada por directores con más de 30 años de experiencia internacional en el sector pesquero, procedentes de familias con más de 100 años de tradición marítima.",
    "Nace para cubrir una necesidad clave: un actor capaz de combinar know-how técnico y know-who internacional, liderar proyectos complejos, activar flotas y acompañar a empresas y países en el desarrollo de su industria pesquera.",
    "Operamos a escala global y trabajamos de forma directa con algunos de los actores más grandes e influyentes del sector. Gobiernos, grandes flotas y empresas líderes nos llaman para poner en marcha proyectos complejos por nuestra capacidad real de ejecución, red internacional y prestigio profesional.",
  ],
  know: [
    { term: "Know-how", desc: "Conocimiento técnico profundo y probado." },
    { term: "Know-who", desc: "Acceso directo a los actores clave del sector." },
  ],
};

export const services = {
  eyebrow: "Qué hacemos",
  title: "Especialistas en proyectos pesqueros internacionales",
  intro:
    "Trabajamos con estándares internacionales y un enfoque técnico probado en cada fase del proyecto.",
  items: [
    {
      title: "Desarrollo y operación de proyectos",
      desc: "Diseño, estructuración y ejecución completa de proyectos pesqueros internacionales, de principio a fin.",
    },
    {
      title: "Activación de capacidad de acarreo",
      desc: "Gestión ante ORP's (CIAT, ICCAT, IOTC) para activar capacidad de acarreo de forma inmediata y conforme.",
    },
    {
      title: "Modernización de flotas",
      desc: "Renovación de flotas y optimización de estructuras operativas para maximizar el rendimiento.",
    },
    {
      title: "Integración industrial",
      desc: "Flota, planta, valor añadido y exportación integrados bajo un único marco operativo y legal.",
    },
  ],
};

export const pillars = {
  eyebrow: "3 pilares clave",
  title: "La base de cada proyecto",
  intro: "Tres fortalezas que nos permiten aportar impacto real desde el primer día.",
  items: [
    {
      n: "01",
      title: "Experiencia global & ejecución probada",
      points: [
        "Más de 30 años de experiencia internacional.",
        "Proyectos en más de 10 países.",
        "Colaboración directa con los mayores actores del sector.",
      ],
    },
    {
      n: "02",
      title: "Acceso, red internacional & cumplimiento regulatorio",
      points: [
        "Dominio de normativas (ORP's) y gestión de permisos, abanderamientos y chartering internacional.",
        "Know-who estratégico: acceso directo a armadores, gobiernos, plantas, operadores y mercados.",
        "Integramos barcos de distintos océanos bajo un marco legal y operativo impecable.",
      ],
    },
    {
      n: "03",
      title: "Soluciones integrales & valor para los países",
      points: [
        "Diseño de planes nacionales de pesca.",
        "Activación inmediata de capacidad de acarreo (3.000–6.000 m³).",
        "Un socio capaz de aportar impacto real desde el primer día.",
      ],
    },
  ],
};

export const societies = {
  eyebrow: "Participación activa",
  title: "Sociedades con participación activa",
  intro:
    "Trabajamos de forma directa y con presencia accionarial junto a algunos de los mayores grupos atuneros, conserveras, flotas y gobiernos del mundo.",
  logos: [
    { src: "/assets/logos/sapmer.png", alt: "SAPMER — Tuna Division", caption: "SAPMER · Tuna Division" },
    { src: "/assets/logos/pescanova.jpg", alt: "Grupo Nueva Pescanova", caption: "Grupo Nueva Pescanova" },
    { src: "/assets/logos/ricardo-fuentes-dark.svg", alt: "Grupo Ricardo Fuentes", caption: "Grupo Ricardo Fuentes" },
    { src: "/assets/logos/trimarine.png", alt: "Tri Marine", caption: "Tri Marine" },
    { src: "/assets/logos/frinsa.png", alt: "Frinsa", caption: "Frinsa" },
    { src: "/assets/logos/panama.svg", alt: "República de Panamá — Gobierno Nacional", caption: "República de Panamá · Gobierno Nacional" },
  ],
  orps: [
    { b: "IOTC", s: "Indian Ocean Tuna Commission" },
    { b: "ICCAT", s: "Atún del Atlántico" },
    { b: "CIAT", s: "Pacífico Oriental" },
    { b: "Bareboat charter", s: "Abanderamientos & chartering internacional" },
  ],
};

export const cases = {
  eyebrow: "Casos de éxito",
  title: "Resultados, no recomendaciones",
  intro: "No fuimos consultivos: diseñamos, estructuramos y ejecutamos la operación completa.",
  items: [
    {
      badge: "Atún industrial",
      title: "Desarrollo del sector atunero industrial",
      location: "Omán · Océano Índico",
      image: "/assets/img/seiner.jpg",
      lead: "Padantal lideró de forma directa la creación y puesta en marcha de la industria atunera moderna de Omán, mediante inversión y colaboración con Ranaq Al Salam LLC, Tuna Development LLC y Rawanq Group.",
      points: [
        "Diseño del plan de pesca industrial de atún con cerco para el Índico.",
        "Estrategia legal para el desarrollo de cuota de yellowfin, alineada con la IOTC.",
        "Constitución de sociedades omaníes y registro de buques bajo pabellón omaní (bareboat charter, adquisiciones y nuevas construcciones).",
      ],
      result: { big: "6", text: "buques cerqueros atuneros registrados y operativos bajo bandera omaní, en pleno cumplimiento de la IOTC." },
    },
    {
      badge: "Pequeños pelágicos",
      title: "Desarrollo de la flota industrial pelágica",
      location: "Omán",
      image: "/assets/img/trawler.jpg",
      lead: "Padantal lideró la expansión del sector pelágico de Omán, diseñando un plan completo para especies como el jurel y la caballa.",
      points: [
        "Diseño del modelo de flota y operación para pequeños pelágicos.",
        "Asesoría técnica y estructuración operativa para empresas locales.",
        "Incorporación de buques arrastreros pelágicos al sistema omaní.",
      ],
      result: { big: "7", text: "buques arrastreros pelágicos operan hoy bajo bandera de Omán gracias al proyecto desarrollado por Padantal." },
    },
    {
      badge: "Atún rojo · BFT",
      title: "Desarrollo estratégico con Grupo Ricardo Fuentes",
      location: "Marruecos",
      image: "/assets/img/almadraba.jpg",
      lead: "Padantal participa activamente con Grupo Ricardo Fuentes, uno de los mayores grupos atuneros del mundo, en el desarrollo del atún rojo.",
      points: [
        "Obtención y gestión de cuotas de atún rojo (BFT) para almadrabas de Marruecos.",
        "Coordinación regulatoria y operativa para maximizar el rendimiento del recurso.",
        "Optimización logística y mejora de procesos extractivos.",
      ],
      result: { big: "★", text: "Colaboración activa con uno de los mayores grupos atuneros a nivel mundial." },
    },
  ],
};

export const conclusion = {
  eyebrow: "Conclusión",
  titleLead: "No somos una consultora. Somos un",
  titleAccent: "socio estratégico",
  lead: "Tenemos capacidad real de transformar sectores pesqueros completos: experiencia internacional, relaciones con los mayores actores del mundo, conocimiento técnico profundo y una trayectoria demostrada.",
  duo: [
    { term: "Know-how", desc: "Para diseñar, ejecutar y operar proyectos complejos." },
    { term: "Know-who", desc: "Para movilizar flota, inversión, tecnología y talento desde el primer día." },
  ],
};

export const contact = {
  email: "info@padantal.com",
  coverage: "Operación a escala global",
  response: "En menos de 48 horas laborables",
  interests: [
    "Desarrollo y operación de proyectos",
    "Activación de capacidad de acarreo (ORP's)",
    "Modernización de flotas",
    "Integración industrial y exportación",
    "Otro",
  ],
};

// Tarjetas KPI que flotan sobre el vídeo del hero (estilo dashboard premium).
export const heroCards = [
  { value: "13", unit: "buques", label: "Registrados y operativos", trend: "Omán · IOTC" },
  { value: "100%", unit: "", label: "Cumplimiento ORP's", trend: "IOTC · ICCAT · CIAT" },
  { value: "+30", unit: "años", label: "Experiencia internacional", trend: "+10 países" },
];

// Datos reales de la sociedad (Registro Mercantil de Madrid).
export const company = {
  eyebrow: "La compañía",
  title: "Una sociedad española con alcance global",
  intro:
    "Padantal SL opera desde Madrid liderando proyectos pesqueros en distintos océanos. Detrás hay dirección con más de 30 años de experiencia internacional y familias con más de un siglo de tradición marítima.",
  founder: {
    name: "Daniel Vidal",
    role: "Fundador y dirección",
    note: "Lidera la estrategia y la ejecución de los proyectos de Padantal a escala internacional.",
  },
  facts: [
    { k: "Sede", v: "Madrid, España" },
    { k: "Forma jurídica", v: "Sociedad Limitada (SL)" },
    { k: "Actividad", v: "Desarrollo y operación pesquera internacional" },
    { k: "Alcance", v: "Proyectos en +10 países" },
  ],
};

// Pie legal con datos del Registro Mercantil.
export const legal = {
  name: "Padantal SL",
  nif: "B-55482418",
  address: "C/ Fernando VI 17, 1.º Izq., 28004 Madrid, España",
  registry: "Inscrita en el Registro Mercantil de Madrid",
};
