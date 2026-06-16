"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experienciaActual } from "@/lib/experiencia-actual";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Tag } from "@/components/ui/Tag";
import { RecorridoCarousel } from "@/components/ui/RecorridoCarousel";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Experiencia() {
  const { tag, nombre, descripcion, datosClave, fases } = experienciaActual;

  return (
    <SectionWrapper id="experiencia">
      {/* Parte 1: Intro + Imagen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Columna izquierda — Texto */}
        <div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <Tag>{tag}</Tag>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-display text-[32px] md:text-display-lg text-text-base mt-4"
          >
            {nombre}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mt-4 font-display text-[22px] md:text-[28px] text-coral leading-tight"
          >
            Inspirada en el universo de{" "}
            <span className="font-display italic">Marta Minujín</span>
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mt-6 text-[15px] md:text-[16px] text-text-base leading-relaxed whitespace-pre-line"
          >
            {descripcion}
          </motion.div>
        </div>

        {/* Columna derecha — Imagen */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
        >
          <Image
            src="/Experiencia-en-cartelera.jpg"
            alt={nombre}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      {/* Fichas de datos clave */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {datosClave.map((dato) => (
          <motion.div
            key={dato.label}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-xl border border-border-base p-4 md:p-5 text-center relative overflow-hidden cursor-default"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-coral" />
            <p className="font-body text-[22px] md:text-[24px] font-bold text-coral mt-1">
              {dato.valor}
            </p>
            <p className="text-[12px] md:text-[13px] text-text-muted mt-1 uppercase tracking-[0.04em]">
              {dato.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Parte 2: Fases del recorrido */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="mt-14 md:mt-16"
      >
        <h3 className="font-display text-[24px] md:text-display-md text-text-base mb-8">
          El recorrido
        </h3>

        <RecorridoCarousel fases={fases} />
      </motion.div>
    </SectionWrapper>
  );
}
