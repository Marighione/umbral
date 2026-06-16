"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";
import { STORAGE_KEYS } from "@/lib/storage";
import type { Membresia as MembresiaType } from "@/lib/types";

type EstadoMembresia = "formulario" | "confirmado";

interface MembresiaForm {
  nombre: string;
  email: string;
}

interface MembresiaErrors {
  nombre?: string;
  email?: string;
}

const BENEFICIOS = [
  "Preventa exclusiva 24 hs antes de cada nueva muestra",
  "Novedades y contenido exclusivo para miembros",
  "Acceso prioritario a eventos especiales",
  "Es gratis. Siempre.",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const transition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

function validateMembresia(form: MembresiaForm): MembresiaErrors {
  const errors: MembresiaErrors = {};
  if (!form.nombre.trim() || form.nombre.trim().length < 2)
    errors.nombre = "Ingresá tu nombre completo";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Ingresá un email válido";
  return errors;
}

export default function Membresia() {
  const [estado, setEstado] = useState<EstadoMembresia>("formulario");
  const [form, setForm] = useState<MembresiaForm>({ nombre: "", email: "" });
  const [errors, setErrors] = useState<MembresiaErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = useCallback(
    (name: keyof MembresiaForm, value: string) => {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name: keyof MembresiaForm) => {
      const allErrors = validateMembresia(form);
      if (allErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: allErrors[name] }));
      }
    },
    [form]
  );

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateMembresia(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const membresia: MembresiaType = {
      nombre: form.nombre,
      email: form.email,
      timestamp: Date.now(),
    };

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          STORAGE_KEYS.MEMBRESIA,
          JSON.stringify(membresia)
        );
      }
    } catch {
      // localStorage no disponible
    }

    setLoading(false);
    setEstado("confirmado");
  }, [form]);

  return (
    <SectionWrapper id="membresia">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Columna izquierda — Descripción y beneficios */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <h2 className="font-display text-[32px] md:text-display-lg text-text-base">
            Sé parte desde el principio
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-text-base leading-relaxed max-w-prose">
            Registrate como Miembro Fundador de Umbral. Accedé a preventas
            exclusivas de 24 horas para nuevas muestras y recibí novedades antes
            que nadie.
          </p>
          <ul className="mt-6 space-y-3">
            {BENEFICIOS.map((beneficio) => (
              <li
                key={beneficio}
                className="flex items-start gap-3 text-[15px] md:text-[16px] text-text-base"
              >
                <span className="text-coral font-semibold mt-0.5">→</span>
                <span>{beneficio}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Columna derecha — Formulario o confirmación */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="bg-durazno/30 border border-border-base rounded-xl p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            {estado === "formulario" && (
              <motion.form
                key="form"
                {...transition}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-5"
              >
                <FormField
                  label="Nombre completo"
                  name="membresia-nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={(v) => updateField("nombre", v)}
                  onBlur={() => handleBlur("nombre")}
                  error={errors.nombre}
                  required
                />
                <FormField
                  label="Email"
                  name="membresia-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(v) => updateField("email", v)}
                  onBlur={() => handleBlur("email")}
                  error={errors.email}
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Enviando…" : "Quiero ser Miembro Fundador"}
                </Button>
              </motion.form>
            )}

            {estado === "confirmado" && (
              <motion.div key="confirmado" {...transition}>
                <SuccessState
                  icon="heart"
                  title="Te damos la bienvenida"
                  subtitle="Ya sos parte. Te vamos a escribir pronto."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
