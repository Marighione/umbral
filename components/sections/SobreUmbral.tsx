"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Tag } from "@/components/ui/Tag";

const VALORES = [
  {
    titulo: "Participación",
    descripcion: "La obra se completa con la acción del público.",
  },
  {
    titulo: "Experimentación",
    descripcion: "El error, el juego y la prueba forman parte del proceso creativo.",
  },
  {
    titulo: "Transformación",
    descripcion: "Cada interacción modifica el espacio y cambia la experiencia.",
  },
  {
    titulo: "Creatividad accesible",
    descripcion: "Cualquier persona puede crear, intervenir y expresarse.",
  },
  {
    titulo: "Conexión humana",
    descripcion: "El recorrido promueve encuentro, intercambio y construcción colectiva.",
  },
  {
    titulo: "Arte + tecnología",
    descripcion: "La tecnología potencia la experiencia, sin reemplazar el vínculo humano.",
  },
];

const MANIFIESTO_LINES = [
  "¿Por qué el arte todavía parece estar del otro lado?",
  "",
  "Umbral nace como un punto de paso entre mirar y hacer.",
  "",
  "Un espacio donde la distancia con la obra desaparece y el público deja de ser espectador para convertirse en parte de la experiencia.",
  "",
  "Acá se viene a moverse, jugar, crear, intervenir y dejar una marca. Cada gesto transforma el espacio. Cada decisión modifica el recorrido.",
  "",
  "Inspirado en la libertad, el caos y la participación, Umbral propone recuperar el deseo de jugar sin miedo al error y construir algo compartido.",
  "",
  "Porque cuando atravesás el umbral, el arte ya no se observa: se vive, se transforma y se comparte.",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const lineReveal = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function SobreUmbral() {
  const misionRef = useRef<HTMLDivElement>(null);
  const misionScroll = useScroll({
    target: misionRef,
    offset: ["start end", "end start"],
  });
  const misionRecursoY = useTransform(misionScroll.scrollYProgress, [0, 1], [30, -30]);

  // Two-page carousel: page 0 = valores 1-3, page 1 = valores 4-6
  const carouselRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const goToPage = (p: number) => {
    const el = carouselRef.current;
    if (!el) return;
    setPage(p);
    if (p === 0) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    }
  };

  return (
    <section id="sobre-umbral">
      {/* ─── Bloque 1: Quiénes somos ─── */}
      <div className="relative bg-bg-alt overflow-hidden">
        <div className="max-w-container mx-auto px-6 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Tag>Sobre Umbral</Tag>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display text-[40px] md:text-display-xl text-text-base mt-5 leading-[1.05]"
            >
              Quiénes somos
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 text-[16px] md:text-[18px] text-text-base leading-relaxed"
            >
              Somos un centro cultural de experiencias inmersivas donde arte, diseño y tecnología
              se combinan para transformar al público en protagonista.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-4 text-[16px] md:text-[18px] text-text-base leading-relaxed"
            >
              Diseñamos entornos participativos que se habitan, se intervienen y cambian con cada
              visitante. En Umbral, la experiencia no se observa desde afuera: se atraviesa,
              se modifica y se comparte.
            </motion.p>

            {/* Frase destacada */}
            <motion.blockquote
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 relative pl-6 border-l-[3px] border-coral"
            >
              <p className="font-display text-[22px] md:text-[28px] text-coral leading-snug italic">
                &ldquo;No presentamos obras para ser observadas.
                <br />
                Creamos experiencias para ser habitadas.&rdquo;
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>

      {/* ─── Bloque 2: Misión y Visión ─── */}
      <div ref={misionRef} className="relative bg-white overflow-hidden">
        {/* Recurso-4 (arco) decorativo detrás */}
        <motion.div
          style={{ y: misionRecursoY }}
          className="absolute right-[-60px] md:right-[5%] top-1/2 -translate-y-1/2 w-[180px] md:w-[260px] lg:w-[320px] opacity-[0.18] pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/recurso-4.png"
            alt=""
            width={320}
            height={400}
            className="w-full h-auto"
            draggable={false}
          />
        </motion.div>

        <div className="max-w-container mx-auto px-6 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Misión */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-bg-alt rounded-3xl p-10 md:p-12 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-coral via-coral/60 to-transparent rounded-l-3xl" />
              <h3 className="font-display text-[28px] md:text-[36px] text-coral leading-tight">
                Misión
              </h3>
              <p className="mt-4 text-[16px] md:text-[18px] text-text-base leading-relaxed">
                Desarrollar experiencias artísticas inmersivas que transformen el rol del
                espectador en participante activo, integrando arte, diseño, tecnología y narrativa.
              </p>
            </motion.div>

            {/* Visión */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-bg-alt rounded-3xl p-10 md:p-12 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal via-teal/60 to-transparent rounded-l-3xl" />
              <h3 className="font-display text-[28px] md:text-[36px] text-teal-dark leading-tight">
                Visión
              </h3>
              <p className="mt-4 text-[16px] md:text-[18px] text-text-base leading-relaxed">
                Consolidarnos como un centro cultural referente en experiencias participativas
                y sensoriales que redefinan la relación entre el público y el arte contemporáneo.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Bloque 3: Valores ─── */}
      <div className="relative bg-bg-alt overflow-visible">
        {/* Recurso-3 decorativo — flip horizontal, curva hacia el centro */}
        <div
          className="absolute -left-8 md:left-0 bottom-[-20px] w-[300px] md:w-[420px] opacity-[0.14] pointer-events-none select-none scale-x-[-1]"
          aria-hidden="true"
        >
          <Image
            src="/recurso-3.png"
            alt=""
            width={420}
            height={420}
            className="w-full h-auto"
            draggable={false}
          />
        </div>

        <div className="max-w-container mx-auto px-6 pt-16 md:pt-24 pb-6 md:pb-10 relative z-10">
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <motion.h3
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display text-[32px] md:text-display-lg text-text-base"
            >
              Nuestros valores
            </motion.h3>

            {/* Flechas de navegación */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => goToPage(page === 0 ? 1 : 0)}
                aria-label={page === 0 ? "Ver valores 4-6" : "Ver valores 1-3"}
                className="w-10 h-10 rounded-full border border-text-base/20 text-text-base hover:bg-coral hover:border-coral hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {page === 0 ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
                </svg>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Carrusel horizontal */}
        <div className="relative z-10 pb-16 md:pb-24">
          <div className="max-w-container mx-auto px-6">
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
            >
              {VALORES.map((valor, i) => (
                <motion.div
                  key={valor.titulo}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08 }}
                  className="flex-shrink-0 w-[260px] md:w-[320px] snap-start bg-white rounded-2xl border border-border-base p-7 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="font-body text-[13px] font-semibold text-coral/50 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display text-[20px] md:text-[22px] text-text-base mt-2 leading-tight">
                    {valor.titulo}
                  </h4>
                  <p className="mt-3 text-[14px] md:text-[15px] text-text-muted leading-relaxed">
                    {valor.descripcion}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Manifiesto ─── */}
      <div className="bg-white">
        <div className="py-16 md:py-24">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            className="bg-rosa/15 rounded-l-[80px] md:rounded-l-[160px] rounded-r-none ml-6 md:ml-12 py-10 md:py-16"
          >
            <div className="flex flex-col items-center gap-0 max-w-[820px] mx-auto px-6">
              {MANIFIESTO_LINES.map((line, i) =>
                line === "" ? (
                  <div key={`spacer-${i}`} className="h-6" />
                ) : (
                  <motion.p
                    key={i}
                    custom={i}
                    variants={lineReveal}
                    className="font-body text-[18px] md:text-[24px] text-text-base text-center leading-relaxed font-normal"
                  >
                    {line}
                  </motion.p>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
