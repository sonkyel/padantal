import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://padantal.com"),
  title: {
    default: "Padantal SL — Construyendo la pesca del futuro",
    template: "%s · Padantal SL",
  },
  description:
    "Socio estratégico global del sector pesquero: desarrollo y operación de proyectos internacionales, activación de capacidad ante ORP's, modernización de flotas e integración industrial.",
  openGraph: {
    title: "Padantal SL — Construyendo la pesca del futuro",
    description:
      "Socio estratégico global del sector pesquero industrial. Know-how técnico y know-who internacional.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${lexend.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
