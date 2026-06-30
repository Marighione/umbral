"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 bg-white/70" />


      {/* Contenido — debajo del logo grande */}
      <div className="relative z-10 flex flex-col items-center mt-32 md:mt-36">
        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="font-display text-[40px] md:text-display-xl text-text-base text-center leading-[1.1] tracking-[-0.02em]"
        >
          El arte no se observa.
          <br />
          <span className="text-coral">Se habita.</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-6 text-[16px] md:text-[18px] font-body text-text-muted text-center max-w-prose leading-relaxed"
        >
          Centro Cultural de Experiencias Inmersivas.
          <br />
          Un espacio donde vos sos parte de la obra.
        </motion.p>
      </div>
    </section>
  );
}
