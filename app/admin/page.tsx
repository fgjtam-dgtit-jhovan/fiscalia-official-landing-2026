import Link from "next/link";
import { FileText, LogOut, Newspaper, Search, ShieldCheck, Trophy, Users } from "lucide-react";
import {
  createAdminUserAction,
  createBulletinAction,
  createPressAction,
  createRewardAction,
  createWantedAction,
  logoutAction
} from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type DashboardData = {
  users: number;
  bulletins: number;
  rewards: number;
  press: number;
  wanted: number;
};

async function getDashboardData(): Promise<DashboardData> {
  try {
    const [users, bulletins, rewards, press, wanted] = await Promise.all([
      prisma.adminUser.count(),
      prisma.missingPersonBulletin.count(),
      prisma.rewardBulletin.count(),
      prisma.pressRelease.count(),
      prisma.wantedPerson.count()
    ]);
    return { users, bulletins, rewards, press, wanted };
  } catch {
    return { users: 1, bulletins: 3, rewards: 3, press: 6, wanted: 4 };
  }
}

export default async function AdminPage() {
  const session = requireAdmin();
  const data = await getDashboardData();

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-logo" href="/">
          <ShieldCheck size={30} />
          <span>FGJ Admin</span>
        </Link>
        <nav>
          <a href="#usuarios"><Users size={18} /> Usuarios</a>
          <a href="#boletines"><Search size={18} /> Boletines</a>
          <a href="#recompensas"><Trophy size={18} /> Recompensas</a>
          <a href="#prensa"><Newspaper size={18} /> Prensa</a>
          <a href="#se-buscan"><FileText size={18} /> Se buscan</a>
        </nav>
        <form action={logoutAction}>
          <button className="logout-button" type="submit"><LogOut size={18} /> Cerrar sesion</button>
        </form>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>Sesion activa</p>
            <h1>Panel de gestion institucional</h1>
          </div>
          <span>{session.name} · {session.role}</span>
        </header>

        <section className="admin-stats" aria-label="Resumen">
          <Stat icon={<Users />} label="Usuarios" value={data.users} />
          <Stat icon={<Search />} label="Boletines" value={data.bulletins} />
          <Stat icon={<Trophy />} label="Recompensas" value={data.rewards} />
          <Stat icon={<Newspaper />} label="Prensa" value={data.press} />
          <Stat icon={<FileText />} label="Se buscan" value={data.wanted} />
        </section>

        <div className="admin-grid">
          <AdminCard id="usuarios" title="Gestionar usuarios" description="Alta de cuentas administrativas con roles acotados.">
            <form action={createAdminUserAction} className="admin-form compact">
              <input name="name" placeholder="Nombre del usuario" required />
              <input name="email" type="email" placeholder="correo@fgj.example" required />
              <input name="password" type="password" placeholder="Contrasena temporal" minLength={8} required />
              <select name="role" defaultValue="EDITOR">
                <option value="SUPER_ADMIN">Super admin</option>
                <option value="EDITOR">Editor</option>
                <option value="AUDITOR">Auditor</option>
              </select>
              <button type="submit">Crear usuario</button>
            </form>
          </AdminCard>

          <AdminCard id="boletines" title="Boletines de busqueda" description="Publica registros ficticios o de prueba para el sitio publico.">
            <form action={createBulletinAction} className="admin-form compact">
              <input name="publicCode" placeholder="Codigo FICT-010" required />
              <input name="displayName" placeholder="Persona Desaparecida #010" required />
              <input name="age" type="number" min="0" max="120" placeholder="Edad" required />
              <input name="lastSeenDate" type="date" required />
              <input name="lastSeenLocation" placeholder="Ubicacion ficticia" required />
              <textarea name="summary" placeholder="Resumen ficticio" required />
              <input name="imageUrl" placeholder="/assets/person-placeholder-1.svg" />
              <StatusSelect />
              <button type="submit">Crear boletin</button>
            </form>
          </AdminCard>

          <AdminCard id="recompensas" title="Recompensas" description="Administra banners y llamados de denuncia confidencial.">
            <form action={createRewardAction} className="admin-form compact">
              <input name="title" placeholder="Campana de recompensa ficticia" required />
              <input name="rewardText" placeholder="$300,000.00 MXN" required />
              <input name="phone" placeholder="841.841.0595" required />
              <input name="imageUrl" placeholder="/assets/campaign-fraud.svg" />
              <StatusSelect />
              <button type="submit">Crear recompensa</button>
            </form>
          </AdminCard>

          <AdminCard id="prensa" title="Sala de prensa" description="Gestiona comunicados y notas institucionales.">
            <form action={createPressAction} className="admin-form compact">
              <input name="title" placeholder="Comunicado de Prensa #010" required />
              <input name="publishedAt" type="date" required />
              <textarea name="excerpt" placeholder="Extracto de la noticia" required />
              <input name="imageUrl" type="url" placeholder="https://images.unsplash.com/..." required />
              <StatusSelect />
              <button type="submit">Crear comunicado</button>
            </form>
          </AdminCard>

          <AdminCard id="se-buscan" title="Los mas buscados" description="Alta de perfiles ficticios para la seccion se buscan.">
            <form action={createWantedAction} className="admin-form compact">
              <input name="caseCode" placeholder="SB-FICT-010" required />
              <input name="displayName" placeholder="Persona Buscada Ficticia" required />
              <input name="alias" placeholder="Alias ficticio" />
              <input name="rewardText" placeholder="$2,000,000.00" required />
              <input name="statusLabel" placeholder="Se busca" required />
              <input name="imageUrl" placeholder="/assets/wanted-placeholder-1.svg" />
              <StatusSelect />
              <button type="submit">Crear registro</button>
            </form>
          </AdminCard>
        </div>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <article>
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function AdminCard({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="admin-card">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
}

function StatusSelect() {
  return (
    <select name="status" defaultValue="DRAFT">
      <option value="DRAFT">Borrador</option>
      <option value="PUBLISHED">Publicado</option>
      <option value="ARCHIVED">Archivado</option>
    </select>
  );
}
