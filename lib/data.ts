import {
  BadgeCheck,
  BarChart3,
  FileCheck2,
  Gavel,
  Landmark,
  Scale,
  Search,
  ShieldCheck,
  Smartphone,
  Users
} from "lucide-react";

export const navItems = ["Inicio", "FGJ", "Micrositios", "Convocatorias", "Fiscalia Digital", "Transparencia", "Recompensas", "Contacto"];

export const serviceCards = [
  { title: "Datos estadisticos", value: "95%", icon: BarChart3 },
  { title: "Leyes y legislacion", value: "2,847", icon: Scale },
  { title: "Personas desaparecidas", value: "1,234", icon: Search },
  { title: "Valida tus constancias", value: "24/7", icon: FileCheck2 }
];

export const digitalServices = [
  { label: "Denuncias en linea", icon: ShieldCheck },
  { label: "Consulta de expedientes", icon: Gavel },
  { label: "Validacion de constancias", icon: BadgeCheck },
  { label: "Atencion ciudadana digital", icon: Smartphone }
];

export const bulletins = [
  { code: "FICT-001", name: "Persona Desaparecida #001", age: 25, date: "15 de enero de 2024", place: "Zona Metropolitana", image: "/assets/person-placeholder-1.svg" },
  { code: "FICT-002", name: "Persona Desaparecida #002", age: 32, date: "22 de febrero de 2024", place: "Colonia de referencia", image: "/assets/person-placeholder-2.svg" },
  { code: "FICT-003", name: "Persona Desaparecida #003", age: 41, date: "08 de marzo de 2024", place: "Ciudad ficticia", image: "/assets/person-placeholder-3.svg" }
];

export const pressItems = Array.from({ length: 6 }).map((_, index) => ({
  title: "Platica control de emociones impartida al personal de la fiscalia general de justicia",
  date: index % 2 === 0 ? "09 de Junio de 2024" : "03 de Junio de 2024",
  image: [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
  ][index % 3],
  excerpt: "Como parte de las acciones orientadas a la prevencion del delito y al fortalecimiento del bienestar emocional en el entorno laboral."
}));

export const wanted = [
  { status: "Capturado", name: "Luis Alberto Blanco Flores", reward: "$2,000,000.00", image: "/assets/wanted-placeholder-1.svg" },
  { status: "Capturado", name: "Luis Alberto Blanco Flores", reward: "$2,000,000.00", image: "/assets/wanted-placeholder-2.svg" },
  { status: "Capturado", name: "Luis Alberto Blanco Flores", reward: "$2,000,000.00", image: "/assets/wanted-placeholder-1.svg" },
  { status: "Detenido", name: "Luis Alberto Blanco Flores", reward: "$2,000,000.00", image: "/assets/wanted-placeholder-3.svg" }
];

export const campaignCards = [
  { src: "/assets/campaign-fraud.svg", alt: "Aviso preventivo de paginas falsas" },
  { src: "/assets/campaign-extortion.svg", alt: "Aviso preventivo contra extorsion" },
  { src: "/assets/campaign-violence.svg", alt: "Campana institucional de hechos y paz" }
];

export const footerLinks = [
  "Aviso de Privacidad",
  "Politica de Proteccion de Datos Personales",
  "Terminos y Condiciones"
];

export const footerIdentity = {
  name: "Fiscalia General de Justicia del Estado de Ejemplo",
  address: "Av. Justicia Ciudadana #641, Libramiento Naciones Unidad C.P. 87039, Ciudad Victoria, Ejemplo",
  phone: "Telefono 834 318 51 20",
  email: "fiscalia.digital@fgj.example"
};

export const logoIcons = { Landmark, Users };
