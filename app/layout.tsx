import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiscalia Institucional | Landing Demo",
  description: "Landing institucional con datos ficticios y politica de privacidad."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
