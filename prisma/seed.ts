import { PrismaClient, BudgetStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed DESARROLLO WEB NEA...");

  const adminPassword = await bcrypt.hash("admin123456", 12);
  await prisma.user.upsert({
    where: { email: "admin@desarrollowebnea.com" },
    update: {},
    create: {
      email: "admin@desarrollowebnea.com",
      password: adminPassword,
      name: "Administrador",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      brandName: "DESARROLLO WEB NEA",
      slogan: "Creamos webs y sistemas que trabajan por tu negocio.",
      heroTitle: "Creamos webs y sistemas que trabajan por tu negocio.",
      heroSubtitle:
        "Diseñamos y desarrollamos páginas web, catálogos digitales, sistemas de gestión y aplicaciones web para comercios, profesionales y empresas del NEA.",
      whatsapp: "5493794123456",
      email: "contacto@desarrollowebnea.com",
      instagram: "https://instagram.com/desarrollowebnea",
      location: "Corrientes Capital / NEA",
      footerText:
        "© DESARROLLO WEB NEA — Soluciones digitales para negocios del nordeste argentino.",
      seoTitle:
        "DESARROLLO WEB NEA | Webs y sistemas que trabajan por tu negocio",
      seoDescription:
        "Páginas web, catálogos digitales, sistemas de gestión y aplicaciones web para comercios, profesionales y empresas del NEA. Panel admin, WhatsApp y deploy profesional.",
      seoKeywords:
        "desarrollo web, NEA, Corrientes, páginas web, catálogo digital, sistema de gestión, panel admin, WhatsApp, restaurantes, clínicas",
      whatsappMessage: "Hola Desarrollo Web NEA, quiero consultar por una web.",
      aboutText:
        "DESARROLLO WEB NEA nace para ayudar a negocios, profesionales y empresas del nordeste argentino a tener presencia digital real, sistemas autoadministrables y herramientas online que simplifiquen su trabajo diario.\n\nNo creamos solo páginas web: creamos soluciones digitales que pueden ser administradas por el propio dueño, con panel de control, imágenes, consultas, productos, servicios y WhatsApp.",
      processText:
        "Trabajamos con un proceso claro, profesional y orientado a resultados reales para tu negocio.",
      techText:
        "Usamos tecnología moderna para crear webs rápidas, seguras, escalables y fáciles de administrar.",
      supportText:
        "Toda web se entrega probada en producción, con capacitación básica y soporte inicial. También ofrecemos mantenimiento mensual para revisiones, cambios menores, soporte técnico y mejoras.",
      pricingNote:
        "El precio final depende del alcance, cantidad de secciones, funcionalidades, contenido, integraciones y nivel de personalización.",
      supportNote:
        "No se promete que ninguna web nunca pueda fallar. Se ofrece soporte, revisión, mantenimiento, backups y mejora continua para sostener el proyecto en el tiempo.",
      trustBarItems: [
        { label: "Proyectos online", icon: "Globe" },
        { label: "Webs con admin", icon: "LayoutDashboard" },
        { label: "Integración WhatsApp", icon: "MessageCircle" },
        { label: "Diseño mobile", icon: "Smartphone" },
        { label: "Sistemas a medida", icon: "Settings" },
        { label: "Soporte post-entrega", icon: "Headphones" },
        { label: "Deploy profesional", icon: "Rocket" },
      ],
      processSteps: [
        { title: "Relevamiento del negocio", description: "Entendemos tu rubro, objetivos y necesidades reales." },
        { title: "Diseño de estructura", description: "Definimos secciones, flujos y funcionalidades clave." },
        { title: "Diseño visual UI/UX", description: "Creamos una interfaz premium orientada a conversión." },
        { title: "Desarrollo web", description: "Construimos el frontend responsive y optimizado." },
        { title: "Panel admin", description: "Desarrollamos el sistema autoadministrable completo." },
        { title: "Pruebas reales", description: "Probamos formularios, WhatsApp, imágenes y flujos." },
        { title: "Publicación online", description: "Deploy profesional en Vercel con dominio configurado." },
        { title: "Capacitación al cliente", description: "Te enseñamos a usar tu panel admin con confianza." },
        { title: "Soporte post-entrega", description: "Acompañamiento inicial para resolver dudas." },
        { title: "Mantenimiento opcional", description: "Planes mensuales para sostener y mejorar tu web." },
      ],
      includedFeatures: [
        "Diseño responsive",
        "Panel admin",
        "Base de datos",
        "Subida de imágenes",
        "WhatsApp integrado",
        "Formularios",
        "SEO básico",
        "Deploy en Vercel",
        "Dominio opcional",
        "Soporte inicial",
        "Mantenimiento opcional",
        "Capacitación al cliente",
        "Pruebas en producción",
        "Documentación mínima de uso",
      ],
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Prisma",
        "Neon PostgreSQL",
        "Vercel",
        "Vercel Blob",
        "GitHub",
        "WhatsApp",
        "APIs",
        "Admin panels",
      ],
      maintenancePlans: [
        { name: "Soporte inicial incluido", description: "7 a 15 días de soporte post-entrega", price: "Incluido" },
        { name: "Mantenimiento básico", description: "Revisiones mensuales y cambios menores", price: "Consultar" },
        { name: "Mantenimiento profesional", description: "Soporte técnico, backups y mejoras", price: "Consultar" },
        { name: "Mantenimiento premium", description: "Prioridad, mejoras continuas y monitoreo", price: "Consultar" },
      ],
    },
  });

  const projects = [
    {
      name: "Parry Burger",
      slug: "parry-burger",
      rubro: "Gastronomía",
      shortDesc:
        "Sistema gastronómico con menú digital, productos, categorías, promociones, pedidos, estados, WhatsApp, imágenes y panel admin.",
      longDesc:
        "Plataforma completa para restaurante con carta digital interactiva, gestión de pedidos en tiempo real, promociones destacadas y panel administrativo para el dueño.",
      problem:
        "El local necesitaba digitalizar su carta, recibir pedidos organizados y gestionar promociones sin depender de terceros.",
      solution:
        "Desarrollamos un sistema gastronómico con menú por categorías, carrito de pedidos, estados de seguimiento, WhatsApp integrado y admin completo.",
      result:
        "Carta online profesional, pedidos organizados y gestión autónoma del menú, precios e imágenes desde el panel admin.",
      webUrl: "https://parryburger.com",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL", "Vercel"],
      features: [
        "Menú digital por categorías",
        "Promociones",
        "Pedidos con estados",
        "WhatsApp integrado",
        "Panel admin",
        "Subida de imágenes",
      ],
      featured: true,
      order: 1,
    },
    {
      name: "Clínica del Niño",
      slug: "clinica-del-nino",
      rubro: "Salud / Medicina",
      shortDesc:
        "Web institucional médica con servicios, obras sociales, solicitudes, seguimiento por código, WhatsApp, imágenes, mapa y panel admin.",
      longDesc:
        "Sitio institucional para clínica pediátrica con información de servicios, obras sociales, formulario de solicitudes con código de seguimiento y panel administrativo.",
      problem:
        "La clínica necesitaba centralizar información médica, recibir solicitudes de turnos/atención y dar seguimiento profesional.",
      solution:
        "Web institucional con servicios, obras sociales, formulario de solicitudes, código de seguimiento DWN-style, WhatsApp y admin para gestionar estados.",
      result:
        "Presencia digital confiable, solicitudes organizadas y seguimiento claro para pacientes y administración.",
      webUrl: "https://clinicadelnino.com",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL", "Vercel"],
      features: [
        "Servicios médicos",
        "Obras sociales",
        "Solicitudes con código",
        "Seguimiento de estado",
        "WhatsApp",
        "Mapa integrado",
        "Panel admin",
      ],
      featured: true,
      order: 2,
    },
    {
      name: "Mueblería Premium",
      slug: "muebleria-premium",
      rubro: "Comercio / Muebles",
      shortDesc:
        "Catálogo autoadministrable con productos, categorías, stock, galería multi-imagen, consultas por WhatsApp y panel admin showroom premium.",
      longDesc:
        "Catálogo digital premium para mueblería con productos, subcategorías, control de stock, galería de imágenes múltiples y consultas directas por WhatsApp.",
      problem:
        "La mueblería necesitaba mostrar su catálogo online con estética premium y permitir consultas rápidas sin depender de redes sociales.",
      solution:
        "Catálogo digital autoadministrable con categorías, stock, galería multi-imagen, filtros y WhatsApp para consultas directas.",
      result:
        "Showroom digital 24/7 con gestión autónoma de productos, precios, imágenes y stock desde el panel admin.",
      webUrl: "https://muebleriapremium.com",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL", "Vercel Blob"],
      features: [
        "Catálogo por categorías",
        "Subcategorías",
        "Control de stock",
        "Galería multi-imagen",
        "WhatsApp consultas",
        "Panel admin completo",
        "Diseño showroom premium",
      ],
      featured: true,
      order: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  const parry = await prisma.project.findUnique({ where: { slug: "parry-burger" } });
  const clinica = await prisma.project.findUnique({ where: { slug: "clinica-del-nino" } });
  const muebleria = await prisma.project.findUnique({ where: { slug: "muebleria-premium" } });

  const caseStudies = [
    {
      projectId: parry?.id,
      title: "Parry Burger — Sistema gastronómico completo",
      slug: "caso-parry-burger",
      problem:
        "Restaurante con carta en PDF, pedidos desorganizados por WhatsApp y sin control de promociones.",
      solution:
        "Menú digital interactivo con categorías, carrito, estados de pedido, promociones editables y panel admin gastronómico.",
      features: ["Menú digital", "Pedidos", "Promociones", "WhatsApp", "Admin"],
      result: "Pedidos organizados, carta siempre actualizada y gestión autónoma del negocio.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
      systemType: "Sistema gastronómico",
      learnings: "La clave fue un admin simple para el dueño y WhatsApp como canal de cierre.",
      webUrl: "https://parryburger.com",
      order: 1,
    },
    {
      projectId: clinica?.id,
      title: "Clínica del Niño — Web médica institucional",
      slug: "caso-clinica-del-nino",
      problem:
        "Información dispersa, solicitudes por teléfono y falta de seguimiento para pacientes.",
      solution:
        "Web institucional con servicios, obras sociales, solicitudes con código de seguimiento y panel admin médico.",
      features: ["Servicios", "Obras sociales", "Solicitudes", "Seguimiento", "WhatsApp"],
      result: "Comunicación clara, solicitudes centralizadas y seguimiento profesional.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
      systemType: "Web institucional médica",
      learnings: "La confianza visual y el seguimiento por código generan tranquilidad en salud.",
      webUrl: "https://clinicadelnino.com",
      order: 2,
    },
    {
      projectId: muebleria?.id,
      title: "Mueblería Premium — Catálogo showroom digital",
      slug: "caso-muebleria-premium",
      problem:
        "Catálogo solo en local físico, consultas lentas y sin presencia digital premium.",
      solution:
        "Catálogo autoadministrable con galería multi-imagen, stock, categorías y WhatsApp directo.",
      features: ["Catálogo", "Stock", "Galería", "Categorías", "WhatsApp"],
      result: "Showroom online 24/7 con consultas directas y gestión autónoma del catálogo.",
      technologies: ["Next.js", "Prisma", "Vercel Blob", "PostgreSQL"],
      systemType: "Catálogo digital premium",
      learnings: "La estética showroom premium eleva la percepción de valor del comercio.",
      webUrl: "https://muebleriapremium.com",
      order: 3,
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
  }

  const services = [
    { name: "Páginas web institucionales", description: "Webs profesionales para presentar tu negocio con confianza, servicios, contacto y panel admin.", icon: "Building2", idealFor: "Profesionales, empresas y comercios", priceFrom: "Desde $900.000", order: 1 },
    { name: "Catálogos digitales", description: "Showroom online con productos, categorías, imágenes y consultas por WhatsApp.", icon: "ShoppingBag", idealFor: "Comercios, mueblerías y tiendas", priceFrom: "Desde $1.500.000", order: 2 },
    { name: "Sistemas de gestión", description: "Paneles admin para gestionar productos, pedidos, solicitudes, estados e imágenes.", icon: "LayoutDashboard", idealFor: "Negocios que necesitan control real", priceFrom: "Desde $1.500.000", order: 3 },
    { name: "Webs para restaurantes", description: "Menú digital, promociones, pedidos y WhatsApp integrado.", icon: "UtensilsCrossed", idealFor: "Restaurantes, bares y gastronomía", priceFrom: "Desde $1.500.000", order: 4 },
    { name: "Webs para clínicas y consultorios", description: "Sitios médicos con servicios, obras sociales, solicitudes y seguimiento.", icon: "Stethoscope", idealFor: "Clínicas, consultorios y salud", priceFrom: "Desde $1.200.000", order: 5 },
    { name: "Webs para inmobiliarias", description: "Propiedades, filtros, fichas detalladas y consultas directas.", icon: "Home", idealFor: "Inmobiliarias y corredores", priceFrom: "Desde $1.200.000", order: 6 },
    { name: "Webs para comercios", description: "Presencia digital profesional con catálogo, contacto y admin.", icon: "Store", idealFor: "Comercios locales del NEA", priceFrom: "Desde $900.000", order: 7 },
    { name: "Aplicaciones web", description: "Apps web a medida con login, paneles y funcionalidades específicas.", icon: "AppWindow", idealFor: "Negocios con procesos únicos", priceFrom: "Desde $2.500.000", order: 8 },
    { name: "SaaS a medida", description: "Productos digitales escalables con suscripciones, roles y dashboards.", icon: "Cloud", idealFor: "Emprendedores y empresas tech", priceFrom: "Desde $2.500.000", order: 9 },
    { name: "Automatizaciones", description: "Integraciones, flujos automáticos y conexiones con APIs externas.", icon: "Workflow", idealFor: "Negocios que quieren ahorrar tiempo", priceFrom: "Consultar", order: 10 },
    { name: "Paneles admin", description: "Backoffice completo para gestionar contenido, imágenes, estados y datos.", icon: "Settings", idealFor: "Cualquier web autoadministrable", priceFrom: "Incluido en sistemas", order: 11 },
  ];

  await prisma.service.deleteMany({});
  await prisma.service.createMany({ data: services });

  const plans = [
    {
      name: "Landing profesional",
      priceFrom: "$500.000",
      description: "Página de presentación premium orientada a conversión y contacto directo.",
      features: ["Diseño responsive", "Secciones principales", "WhatsApp", "Formulario", "SEO básico", "Deploy Vercel"],
      order: 1,
    },
    {
      name: "Web institucional premium",
      priceFrom: "$900.000",
      description: "Web completa para empresas, profesionales y comercios con panel admin básico.",
      features: ["Multi-sección", "Panel admin", "Imágenes", "Formularios", "WhatsApp", "SEO básico", "Capacitación"],
      featured: true,
      order: 2,
    },
    {
      name: "Catálogo / sistema con admin",
      priceFrom: "$1.500.000",
      description: "Catálogo digital o sistema con base de datos, admin completo e imágenes.",
      features: ["Base de datos", "Admin completo", "Categorías", "Productos/servicios", "WhatsApp", "Blob imágenes", "Deploy profesional"],
      order: 3,
    },
    {
      name: "Sistema a medida / SaaS",
      priceFrom: "$2.500.000",
      description: "Solución personalizada con funcionalidades avanzadas, roles y escalabilidad.",
      features: ["Desarrollo a medida", "Panel admin avanzado", "APIs", "Integraciones", "Roles", "Escalabilidad", "Soporte extendido"],
      order: 4,
    },
  ];

  await prisma.pricingPlan.deleteMany({});
  await prisma.pricingPlan.createMany({ data: plans });

  const faqs = [
    { question: "¿Cuánto tarda una web?", answer: "Depende del alcance. Una landing puede estar en 1-2 semanas. Un sistema con admin puede llevar 3-6 semanas según funcionalidades.", order: 1 },
    { question: "¿La web queda a mi nombre?", answer: "Sí. El dominio, contenido y accesos admin quedan a tu nombre. Te entregamos credenciales y documentación básica.", order: 2 },
    { question: "¿Puedo editarla yo?", answer: "Sí. Todas nuestras webs incluyen panel admin para que puedas editar textos, imágenes, productos y más sin tocar código.", order: 3 },
    { question: "¿Incluye dominio?", answer: "El dominio es opcional y se cotiza aparte. Te ayudamos a configurarlo correctamente.", order: 4 },
    { question: "¿Incluye hosting?", answer: "Sí incluye deploy profesional en Vercel. El hosting es moderno, rápido y escalable.", order: 5 },
    { question: "¿Tiene mantenimiento?", answer: "Incluimos soporte inicial de 7 a 15 días. También ofrecemos planes de mantenimiento mensual.", order: 6 },
    { question: "¿Puedo pagar en partes?", answer: "Sí, trabajamos con seña inicial y pagos por etapas según el proyecto.", order: 7 },
    { question: "¿Hacen sistemas a medida?", answer: "Sí. Desarrollamos catálogos, sistemas de gestión, apps web y SaaS personalizados.", order: 8 },
    { question: "¿Puedo vender productos?", answer: "Sí, con catálogos digitales y consultas por WhatsApp. Para e-commerce completo se cotiza según alcance.", order: 9 },
    { question: "¿Pueden hacerme una app?", answer: "Sí, desarrollamos aplicaciones web accesibles desde celular y navegador, sin necesidad de App Store.", order: 10 },
    { question: "¿Qué pasa si algo falla después de entregar?", answer: "Ofrecemos soporte, mantenimiento y revisión continua. Ningún sistema es invulnerable, pero te acompañamos para resolver incidentes.", order: 11 },
  ];

  await prisma.faq.deleteMany({});
  await prisma.faq.createMany({ data: faqs });

  console.log("✅ Seed completado exitosamente");
  console.log("📧 Admin: admin@desarrollowebnea.com");
  console.log("🔑 Password: admin123456");
  console.log("⚠️  Cambiar contraseña antes de publicar en producción");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
