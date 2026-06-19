import { Scale } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  if (getAdminSession()) redirect("/admin");

  const errorMessage =
    searchParams.error === "auth"
      ? "Credenciales incorrectas o usuario inactivo."
      : searchParams.error === "invalid"
        ? "Revisa el correo y la contrasena."
        : null;

  return (
    <main className="admin-login-page">
      <section className="login-panel">
        <div className="login-brand">
          <span><Scale size={32} /></span>
          <div>
            <strong>FGJ Admin</strong>
            <p>Gestion institucional demo</p>
          </div>
        </div>

        <form action={loginAction} className="admin-form">
          <label>
            Correo institucional
            <input name="email" type="email" defaultValue="admin@fgj.example" required />
          </label>
          <label>
            Contrasena
            <input name="password" type="password" defaultValue="Admin2026!" required minLength={8} />
          </label>
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
          <button type="submit">Iniciar sesion</button>
        </form>
      </section>
    </main>
  );
}
