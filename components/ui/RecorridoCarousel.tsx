"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface Fase {
  numero: number;
  nombre: string;
  concepto: string;
  eje: string;
  descripcion: string;
  indicacion: string;
  esDescanso?: boolean;
  imagen?: string;
}

interface RecorridoCarouselProps {
  fases: Fase[];
}

export function RecorridoCarousel({ fases }: RecorridoCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, fases.length - 1));
  }, [fases.length]);

  const prev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const total = fases.length;
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="relative bg-bg-alt rounded-2xl overflow-hidden border border-border-base">
      {/* Slide area */}
      <div className="relative min-h-[520px] md:min-h-[560px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${(current * 100) / total}%)`,
          }}
        >
          {fases.map((f) => (
            <div
              key={f.numero}
              className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] md:min-h-[560px]"
              style={{ width: `${100 / total}%` }}
            >
              {/* Left — Text */}
              <div className="flex flex-col justify-center px-8 py-10 md:px-12 lg:px-16 lg:py-16">
                <p className="font-body text-[13px] tracking-[0.15em] uppercase text-text-muted">
                  {f.esDescanso
                    ? "Zona de descanso"
                    : `${String(f.numero).padStart(2, "0")} / ${f.nombre}`}
                </p>

                <h3 className="font-display text-[36px] md:text-[48px] lg:text-[56px] text-text-base mt-4 leading-[1.1]">
                  {f.nombre}
                </h3>

                <p className="text-[15px] md:text-[16px] text-text-muted mt-6 leading-relaxed max-w-[480px]">
                  {f.descripcion}
                </p>

                <div className="flex items-start gap-3 mt-6 bg-white rounded-lg p-4 max-w-[480px] border border-border-base">
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-coral mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-[14px] text-text-base">{f.indicacion}</p>
                </div>
              </div>

              {/* Right — Image (desktop) */}
              <div className="relative hidden lg:block">
                {f.imagen ? (
                  <Image
                    src={f.imagen}
                    alt={f.nombre}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <span className="text-text-muted/30 font-display text-[120px]">
                      {f.esDescanso ? "~" : f.numero}
                    </span>
                  </div>
                )}
              </div>

              {/* Mobile image */}
              {f.imagen && (
                <div className="relative aspect-[16/9] lg:hidden">
                  <Image
                    src={f.imagen}
                    alt={f.nombre}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar — navigation */}
      <div className="relative px-8 md:px-12 lg:px-16 pb-8 pt-2 flex items-center gap-6">
        {/* Dots */}
        <div className="flex gap-2">
          {fases.map((f, i) => (
            <button
              key={f.numero}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a ${f.nombre}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current
                  ? "w-8 bg-coral"
                  : "w-2 bg-border-base hover:bg-text-muted/40"
              )}
            />
          ))}
        </div>

        {/* Progress line */}
        <div className="flex-1 h-[1px] bg-border-base rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coral/40"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Counter */}
        <span className="font-body text-[13px] text-text-muted tabular-nums tracking-wider">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Anterior"
            className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
              current === 0
                ? "border-border-base text-text-muted/30 cursor-not-allowed"
                : "border-border-base text-text-base hover:bg-white"
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={current === total - 1}
            aria-label="Siguiente"
            className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
              current === total - 1
                ? "border-border-base text-text-muted/30 cursor-not-allowed"
                : "border-border-base text-text-base hover:bg-white"
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
