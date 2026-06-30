"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SALAS, MAPA_RECORRIDO } from "@/lib/recorrido-data";
import type { SalaImage } from "@/lib/recorrido-data";
import { Lightbox } from "@/components/ui/Lightbox";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerImage = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const LEYENDA = [
  "Experiencia Icónica",
  "Big Bang Psicodélico",
  "Espacio Inflable / Lúdico",
  "Mapping Interactivo",
  "Intervención",
  "Zona de descanso",
];

export default function Recorrido() {
  const [lightbox, setLightbox] = useState<{ images: SalaImage[]; index: number } | null>(null);
  const [activeSala, setActiveSala] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const salaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const salasContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    salaRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSala(i);
        },
        { threshold: 0.3 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const container = salasContainerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const scrollToSala = useCallback((i: number) => {
    salaRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openLightbox = useCallback((images: SalaImage[], index: number) => {
    setLightbox({ images, index });
  }, []);

  return (
    <section id="recorrido" className="relative bg-white">
      {/* Nav lateral desktop */}
      <div className={`hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 transition-opacity duration-300 ${navVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {SALAS.map((sala, i) => (
          <button
            key={sala.id}
            onClick={() => scrollToSala(i)}
            aria-label={`Ir a ${sala.title}`}
            className={`group flex items-center gap-2 transition-all duration-300 ${
              activeSala === i ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            <span
              className={`font-body text-[12px] font-semibold tabular-nums transition-colors ${
                activeSala === i ? "text-coral" : "text-text-muted"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`h-[2px] transition-all duration-300 ${
                activeSala === i ? "w-6 bg-coral" : "w-3 bg-text-muted/40"
              }`}
            />
            <span
              className={`font-body text-[11px] tracking-wide transition-all duration-300 whitespace-nowrap ${
                activeSala === i
                  ? "opacity-100 max-w-[200px] text-coral"
                  : "opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[200px] text-text-muted"
              } overflow-hidden`}
            >
              {sala.title}
            </span>
          </button>
        ))}
      </div>

      {/* Intro */}
      <div className="max-w-container mx-auto px-6 pt-14 md:pt-20 pb-10 md:pb-14">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-[36px] md:text-display-lg text-text-base">
            El recorrido
          </h2>
          <p className="mt-4 text-[15px] md:text-[17px] text-text-muted leading-relaxed">
            Seis momentos para atravesar el arte desde el cuerpo, el juego y la participación.
            Cada sala propone una acción distinta: intercambiar, romper, jugar, moverse, intervenir o descansar.
          </p>
        </motion.div>

        {/* Mapa */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 md:mt-14 bg-bg-alt rounded-2xl border border-border-base p-4 md:p-8"
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden">
            <Image
              src={MAPA_RECORRIDO}
              alt="Mapa general del recorrido de Umbral"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LEYENDA.map((nombre, i) => (
              <button
                key={nombre}
                onClick={() => scrollToSala(i)}
                className="flex items-center gap-2 text-[13px] text-text-muted hover:text-coral transition-colors cursor-pointer"
              >
                <span className="font-semibold tabular-nums text-coral/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{nombre}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Salas */}
      <div ref={salasContainerRef}>
        {/* Nav horizontal mobile sticky */}
        <div className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-border-base">
          <div className="flex gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
            {SALAS.map((sala, i) => (
              <button
                key={sala.id}
                onClick={() => scrollToSala(i)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  activeSala === i
                    ? "bg-coral text-white"
                    : "bg-bg-alt text-text-muted hover:bg-border-base"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
        {SALAS.map((sala, salaIndex) => (
          <div
            key={sala.id}
            id={sala.id}
            ref={(el) => { salaRefs.current[salaIndex] = el; }}
            className={`scroll-mt-16 ${salaIndex % 2 === 0 ? "bg-white" : "bg-bg-alt"}`}
          >
            <div className="max-w-container mx-auto px-6 py-14 md:py-20 lg:py-24">
              <div className={`grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start ${
                salaIndex % 2 !== 0 ? "lg:direction-rtl" : ""
              }`}>
                {/* Texto — 2 cols */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className={`lg:col-span-2 lg:sticky lg:top-24 ${
                    salaIndex % 2 !== 0 ? "lg:order-2" : ""
                  }`}
                >
                  <p className="font-body text-[12px] tracking-[0.15em] uppercase text-text-muted">
                    {sala.kicker}
                  </p>
                  <h3 className="font-display text-[32px] md:text-[42px] lg:text-[48px] text-text-base mt-3 leading-[1.1]">
                    {sala.title}
                  </h3>
                  <p className="mt-5 text-[15px] md:text-[16px] text-text-base leading-relaxed">
                    {sala.description}
                  </p>
                  <div className="mt-5 flex items-start gap-3 bg-coral/5 rounded-lg p-4 border border-coral/10">
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
                    <p className="text-[14px] text-text-base">{sala.tip}</p>
                  </div>
                </motion.div>

                {/* Grilla de imágenes — 3 cols */}
                <div
                  className={`lg:col-span-3 grid grid-cols-2 gap-3 md:gap-4 ${
                    salaIndex % 2 !== 0 ? "lg:order-1" : ""
                  }`}
                >
                  {sala.images.map((img, imgIndex) => (
                    <motion.button
                      key={img.src}
                      custom={imgIndex}
                      variants={staggerImage}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      onClick={() => openLightbox(sala.images, imgIndex)}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in group"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-3.5 h-3.5 text-text-base" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() =>
            setLightbox((prev) =>
              prev && prev.index > 0 ? { ...prev, index: prev.index - 1 } : prev
            )
          }
          onNext={() =>
            setLightbox((prev) =>
              prev && prev.index < prev.images.length - 1
                ? { ...prev, index: prev.index + 1 }
                : prev
            )
          }
        />
      )}
    </section>
  );
}
