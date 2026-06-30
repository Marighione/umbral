import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Umbral — Centro Cultural de Experiencias Inmersivas",
  description:
    "Un espacio donde el arte no se observa. Se habita, se activa y se transforma.",
  openGraph: {
    title: "Umbral — Centro Cultural de Experiencias Inmersivas",
    description:
      "Experiencias artísticas participativas donde el público es parte de la obra.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSerifDisplay.variable} font-body antialiased`}
      >
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
