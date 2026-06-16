"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Tag } from "@/components/ui/Tag";

const VALORES = [
  {
    nombre: "Participación",
    descripcion:
      "Creemos en un arte que se construye con las personas. La experiencia se completa a través de la acción del público.",
    acento: "bg-coral",
  },
  {
    nombre: "Experimentación",
    descripcion:
      "Valoramos el proceso, el error y la exploración como motores fundamentales de la creación.",
    acento: "bg-teal",
  },
  {
    nombre: "Transformación",
    descripcion:
      "Entendemos el arte como un proceso dinámico que cambia con cada interacción.",
    acento: "bg-rosa",
  },
  {
    nombre: "Creatividad accesible",
    descripcion:
      "Promovemos un espacio donde cualquier persona pueda crear, experimentar y expresarse sin conocimientos previos.",
    acento: "bg-coral",
  },
  {
    nombre: "Conexión humana",
    descripcion:
      "Diseñamos experiencias que generan vínculos entre las personas y su entorno.",
    acento: "bg-teal",
  },
  {
    nombre: "Arte + tecnología",
    descripcion:
      "Utilizamos la tecnología como herramienta expresiva al servicio de la experiencia, no como un fin en sí mismo.",
    acento: "bg-rosa",
  },
];

const MANIFIESTO_LINES = [
  "El arte no pertenece a unos pocos.",
  "No vive solo en museos, ni en marcos, ni en nombres.",
  "",
  "Vive en la acción, en la curiosidad, en la experiencia.",
  "",
  "Este es un espacio para entrar sin saber",
  "y salir habiendo creado.",
  "",
  "Acá no venís a mirar.",
  "Venís a ser parte.",
  "",
  "Porque el arte no se observa.",
  "Se habita, se transforma y se comparte.",
];

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

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function SobreUmbral() {
  return (
    <SectionWrapper id="sobre-umbral" background="alt">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Columna izquierda — Texto principal */}
        <div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <Tag>Quiénes somos</Tag>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-display text-[32px] md:text-display-lg text-text-base mt-4"
          >
            Quiénes somos
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mt-6 text-[15px] md:text-[16px] text-text-base leading-relaxed max-w-prose"
          >
            Somos un Centro Cultural de experiencias inmersivas dedicado al diseño y
            producción de propuestas artísticas participativas.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mt-4 text-[15px] md:text-[16px] text-text-base leading-relaxed max-w-prose"
          >
            Transformamos el vínculo tradicional entre el público y el arte. En lugar
            de promover una experiencia contemplativa, desarrollamos entornos donde las
            personas participan activamente, intervienen y se convierten en protagonistas
            de la obra.
          </motion.p>

          {/* Misión */}
          <motion.blockquote
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mt-8 border-l-4 border-coral bg-white rounded-r-lg p-6"
          >
            <p className="text-[12px] uppercase tracking-[0.08em] font-medium text-coral mb-2">
              Misión
            </p>
            <p className="text-[15px] md:text-[16px] text-text-base leading-relaxed">
              Desarrollar experiencias artísticas inmersivas que transformen el rol del
              espectador en participante activo, integrando arte, diseño, tecnología y
              narrativa para generar entornos donde las personas puedan explorar,
              intervenir y construir su propia experiencia.
            </p>
          </motion.blockquote>

          {/* Visión */}
          <motion.blockquote
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mt-6 border-l-4 border-teal bg-white rounded-r-lg p-6"
          >
            <p className="text-[12px] uppercase tracking-[0.08em] font-medium text-teal-dark mb-2">
              Visión
            </p>
            <p className="text-[15px] md:text-[16px] text-text-base leading-relaxed">
              Consolidarnos como un centro cultural referente en experiencias inmersivas,
              impulsando modelos de exhibición participativos y sensoriales que redefinan
              la relación entre el público y el arte contemporáneo.
            </p>
          </motion.blockquote>
        </div>

        {/* Columna derecha — Valores */}
        <div className="lg:pt-[108px] flex flex-col">
          <motion.h3
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="font-display text-[24px] md:text-display-md text-text-base mb-6"
          >
            Nuestros valores
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {VALORES.map((valor, i) => (
              <motion.div
                key={valor.nombre}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl border border-border-base p-5 hover:shadow-md transition-shadow duration-300 overflow-hidden relative"
              >
                {/* Barra de acento superior */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${valor.acento}`} />
                <h4 className="font-body text-[15px] md:text-[16px] font-semibold text-text-base mt-1">
                  {valor.nombre}
                </h4>
                <p className="mt-2 text-[13px] md:text-[14px] text-text-muted leading-relaxed">
                  {valor.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Manifiesto — ancho completo, line-by-line reveal */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
        className="mt-16 md:mt-20 bg-white rounded-xl p-8 md:p-12 border border-border-base"
      >
        <div className="flex flex-col items-center gap-0">
          {MANIFIESTO_LINES.map((line, i) =>
            line === "" ? (
              <div key={`spacer-${i}`} className="h-6" />
            ) : (
              <motion.p
                key={i}
                custom={i}
                variants={lineReveal}
                className="font-display text-[22px] md:text-[30px] text-coral text-center leading-snug"
              >
                {line}
              </motion.p>
            )
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
