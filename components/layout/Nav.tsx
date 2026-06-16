"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Inicio", id: "hero" },
  { label: "Sobre Umbral", id: "sobre-umbral" },
  { label: "Experiencia", id: "experiencia" },
  { label: "Membresía", id: "membresia" },
  { label: "Instituciones", id: "instituciones" },
];

const SCROLL_END = 350;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Ease-out cubic for smoother feel
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [targetX, setTargetX] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setViewport({ w: window.innerWidth, h: window.innerHeight });

    const handleScroll = () => {
      const raw = clamp(window.scrollY / SCROLL_END, 0, 1);
      setProgress(raw);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure where the nav logo spacer is so the floating logo lands exactly there
  useEffect(() => {
    function measure() {
      if (spacerRef.current) {
        const rect = spacerRef.current.getBoundingClientRect();
        setTargetX(rect.left);
      }
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuAbierto(false);
  }, []);

  const p = easeOut(progress);

  // Logo sizes
  const logoStartWidth = 550;
  const logoEndWidth = 120;
  const logoWidth = lerp(logoStartWidth, logoEndWidth, p);

  // Logo position: start = centered in viewport at ~25vh, end = nav spacer position
  const startX = viewport.w / 2 - logoStartWidth / 2;
  const startY = viewport.h * 0.25;
  const endX = targetX;
  const endY = 10;

  const logoX = lerp(startX, endX, p);
  const logoY = lerp(startY, endY, p);

  return (
    <>
      {/* ==================== FLOATING HERO LOGO ==================== */}
      <div
        className="fixed z-[60] pointer-events-none will-change-transform"
        style={{
          left: `${logoX}px`,
          top: `${logoY}px`,
          width: `${logoWidth}px`,
          opacity: mounted ? 1 : 0,
          visibility: mounted ? "visible" : "hidden",
        }}
        suppressHydrationWarning
      >
        <Image
          src="/logo-umbral-nav.png"
          alt="Umbral"
          width={500}
          height={150}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* ==================== NAV BAR ==================== */}
      <nav
        role="navigation"
        aria-label="Navegación principal"
        suppressHydrationWarning
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-[background,border,box-shadow] duration-500",
          progress > 0.15
            ? "bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-[0_1px_24px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo spacer — measures where the logo should land */}
          <div ref={spacerRef} className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="pointer-events-auto"
              aria-label="Ir al inicio"
            >
              <span className="block w-[120px] h-[40px]" />
            </button>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[15px] font-body font-medium text-text-base/80 hover:text-coral transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection("reservas")}
            >
              Reservar
            </Button>
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
            aria-controls="mobile-menu"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={cn(
                "block w-6 h-[2px] bg-text-base transition-all duration-200",
                menuAbierto && "rotate-45 translate-y-[7px]"
              )}
            />
            <span
              className={cn(
                "block w-6 h-[2px] bg-text-base transition-all duration-200",
                menuAbierto && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-6 h-[2px] bg-text-base transition-all duration-200",
                menuAbierto && "-rotate-45 -translate-y-[7px]"
              )}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 bg-white/80 backdrop-blur-xl border-t border-white/30",
            menuAbierto ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-t-0"
          )}
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-[16px] font-body font-medium text-text-base hover:text-coral transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="primary"
              fullWidth
              onClick={() => scrollToSection("reservas")}
            >
              Reservar
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
