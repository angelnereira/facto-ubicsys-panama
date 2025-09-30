import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Facturación",
  description: "Interfaz para la configuración de facturación electrónica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <header className="bg-white shadow-sm border-b border-gray-200">
          <nav className="max-w-4xl mx-auto px-8 py-4">
            <ul className="flex items-center space-x-8">
              <li>
                <Link href="/" className="text-lg font-bold text-gray-800 hover:text-blue-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/configuracion" className="text-gray-600 hover:text-blue-600">
                  Configuración
                </Link>
              </li>
              <li>
                <Link href="/conexion-emisor" className="text-gray-600 hover:text-blue-600">
                  Conexión Emisor
                </Link>
              </li>
              <li>
                <Link href="/conexion-hka" className="text-gray-600 hover:text-blue-600">
                  Conexión HKA
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
