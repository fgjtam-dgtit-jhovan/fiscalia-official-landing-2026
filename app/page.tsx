import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { Header } from "@/components/Header";
import {
  bulletins,
  campaignCards,
  digitalServices,
  footerIdentity,
  footerLinks,
  pressItems,
  serviceCards,
  wanted
} from "@/lib/data";

export default function Home() {
  return (
    <main id="inicio">
      <Header />

      <section className="hero" aria-label="Conocenos">
        <Image
          className="hero-image"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt="Edificio institucional generico"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" />
      </section>

      <section className="intro-section" id="fgj">
        <div className="content">
          <SectionTitle title="Conocenos" />
          <h2>Mision</h2>
          <p>
            Somos una fiscalia autonoma ficticia que garantiza el acceso de prueba a la justicia, el debido proceso, la
            verdad y la reparacion del dano a personas victimas del delito. Este contenido es demostrativo y no contiene
            informacion personal real.
          </p>
          <a className="pill-button dark" href="#fiscalia-digital">Leer mas...</a>
        </div>

        <div className="cards-grid content" id="datos-estadisticos">
          {serviceCards.map(({ title, value, icon: Icon }) => (
            <article className="service-card" key={title}>
              <Icon size={54} strokeWidth={1.6} />
              <strong>{value}</strong>
              <span>{title}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="digital-band" id="fiscalia-digital">
        <div className="digital-bg" />
        <div className="digital-content">
          <div className="fgj-mark">
            <span className="seal">FGJ</span>
            <span>Fiscalia General de Justicia del Estado de Ejemplo</span>
          </div>
          <div className="digital-title">
            <span className="scale-box">⚖</span>
            <div>
              <p>Fiscalia</p>
              <strong>Digital</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="digital-services">
        <div className="content two-column">
          <div>
            <SectionTitle title="Servicios digitales" />
            <p>
              Plataforma demostrativa para orientar tramites digitales, validacion documental y atencion ciudadana sin
              almacenar informacion personal real en entornos de prueba.
            </p>
            <div className="service-list">
              {digitalServices.map(({ label, icon: Icon }) => (
                <span key={label}>
                  <Icon size={18} /> {label}
                </span>
              ))}
            </div>
          </div>
          <Image
            className="digital-photo"
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80"
            alt="Servicios digitales institucionales genericos"
            width={620}
            height={360}
          />
        </div>
      </section>

      <section className="content section-block" id="personas-desaparecidas">
        <SectionTitle title="Boletines de busqueda" subtitle="¡Ayudanos a encontrarlos!" />
        <div className="bulletin-grid">
          {bulletins.map((item) => (
            <article className="bulletin-card" key={item.code}>
              <Image src={item.image} alt={`${item.name} ficticia`} width={520} height={300} />
              <div>
                <strong>{item.name}</strong>
                <span>{item.age} anos · {item.date}</span>
                <span>{item.place}</span>
                <button type="button">Ver mas</button>
              </div>
            </article>
          ))}
        </div>
        <Dots />
      </section>

      <section className="press-section" id="transparencia">
        <div className="content section-block">
          <SectionTitle title="Sala de prensa" />
          <div className="press-grid">
            {pressItems.map((item, index) => (
              <article className="press-card" key={`${item.title}-${index}`}>
                <div className="press-meta">{item.date}</div>
                <Image src={item.image} alt="Actividad institucional generica" width={480} height={300} />
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <a href="#sala-de-prensa">Leer mas</a>
              </article>
            ))}
          </div>
          <a className="pill-button centered" href="#sala-de-prensa">Ir a Sala de Prensa</a>
        </div>
      </section>

      <section className="content section-block" id="recompensas">
        <SectionTitle title="Se buscan" subtitle="Tu denuncia es confidencial 841.841.0595" />
        <div className="bulletin-grid reward-grid">
          {bulletins.map((item) => (
            <article className="reward-card" key={`reward-${item.code}`}>
              <Image src={item.image} alt={`Recompensa ficticia ${item.code}`} width={520} height={300} />
            </article>
          ))}
        </div>
        <Dots />
        <a className="pill-button centered" href="#recompensas">Ver mas Se Buscan</a>
      </section>

      <section className="campaign-strip" aria-label="Campanas institucionales">
        {campaignCards.map((item) => (
          <Image key={item.src} src={item.src} alt={item.alt} width={560} height={340} />
        ))}
      </section>

      <section className="wanted-section">
        <div className="content section-block">
          <SectionTitle
            title="Los mas buscados"
            subtitle="Recompensa de hasta $2,000,000.00 por cada uno, a quien o quienes proporcionen informacion exacta, veraz y util, que coadyuve a la ubicacion y la captura"
          />
          <div className="wanted-grid">
            {wanted.map((item, index) => (
              <article className="wanted-card" key={`${item.status}-${index}`}>
                <Image src={item.image} alt={`${item.status} ficticio`} width={260} height={360} />
              </article>
            ))}
          </div>
          <Dots />
          <a className="pill-button centered" href="#recompensas">Ver mas buscados</a>
        </div>
      </section>

      <footer className="footer" id="contacto">
        <div className="content footer-grid">
          <div className="footer-logo">FGJ</div>
          <div>
            <strong>{footerIdentity.name}</strong>
            <p><MapPin size={16} /> {footerIdentity.address}</p>
            <p><Phone size={16} /> {footerIdentity.phone}</p>
            <p><Mail size={16} /> {footerIdentity.email}</p>
          </div>
          <div className="socials">
            <Instagram />
            <Facebook />
            <Twitter />
            <Send />
          </div>
        </div>
        <div className="privacy-bar">
          Todos los derechos reservados © 2026 /
          {footerLinks.map((link) => (
            <a key={link} href="#contacto">{link}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="section-title">
      <span />
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

function Dots() {
  return (
    <div className="dots" aria-hidden="true">
      <span className="active" />
      <span />
      <span />
    </div>
  );
}
