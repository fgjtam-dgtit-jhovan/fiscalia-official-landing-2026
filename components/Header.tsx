"use client";

import { Menu, Scale, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="date-strip">Viernes, 25 de mayo de 2026 14:30 pm</div>
      <div className="nav-shell">
        <a className="brand" href="#inicio" aria-label="Fiscalia General de Justicia">
          <span className="brand-seal">
            <Scale size={28} strokeWidth={1.8} />
          </span>
          <span>
            <strong>FGJ</strong>
            <small>Fiscalia General de Justicia del Estado de Ejemplo</small>
          </span>
        </a>

        <button className="menu-button" type="button" aria-label="Abrir menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={open ? "nav-list open" : "nav-list"} aria-label="Navegacion principal">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
          <a href="/admin" onClick={() => setOpen(false)}>Admin</a>
        </nav>
      </div>
    </header>
  );
}
