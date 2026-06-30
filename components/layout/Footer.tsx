"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#507F79] text-white">
      <div className="max-w-container mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-8">
          {/* Logo + dirección + mapa */}
          <div className="text-center md:text-left">
            <Image
              src="/logo-umbral-blanco.png"
              alt="Umbral"
              width={140}
              height={48}
              className="w-[120px] md:w-[140px] h-auto"
            />
            <div className="mt-5 flex items-center justify-center md:justify-start gap-2 text-white/70">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-[14px]">Av. Córdoba 1565, C.A.B.A.</span>
            </div>
            <a
              href="https://maps.google.com/?q=Av.+Córdoba+1565,+Buenos+Aires"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-lg overflow-hidden w-[300px] h-[160px] mx-auto md:mx-0 border border-white/20 hover:border-white/40 transition-colors"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.3!2d-58.3925!3d-34.5986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca8f0a5a5555%3A0x0!2sAv.+C%C3%B3rdoba+1565%2C+Buenos+Aires!5e0!3m2!1ses!2sar!4v1700000000000"
                width="300"
                height="160"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Umbral en Google Maps"
                className="pointer-events-none"
              />
            </a>
          </div>

          {/* Redes + frase */}
          <div className="text-center md:text-right">
            <p className="text-[12px] uppercase tracking-[0.08em] font-medium text-white/50 mb-4">
              Seguinos
            </p>
            <div className="flex items-center justify-center md:justify-end gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/umbral.cc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com/umbral.cc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com/@umbral.cc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
                </svg>
              </a>
            </div>
            <p className="mt-6 font-display text-[18px] md:text-[20px] text-white/80 italic">
              El arte no se observa. Se habita.
            </p>
          </div>
        </div>

        {/* Separador + Copyright */}
        <div className="mt-12 pt-6 border-t border-white/[0.12] text-center">
          <p className="text-[13px] text-white/50">
            © 2026 Umbral. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
