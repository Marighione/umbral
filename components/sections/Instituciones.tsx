"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";
import { STORAGE_KEYS } from "@/lib/storage";
import type { FormInstituciones, TipoInstitucion } from "@/lib/types";

const PROGRAMAS = [
  {
    titulo: "Aula Inmersiva",
    dirigido: "Instituciones educativas (universidades, escuelas, institutos)",
    descripcion:
      "Visitas guiadas con charla técnica de los creadores. Precios preferenciales para grupos y material pedagógico post-visita.",
    cta: "Consultá disponibilidad",
    borde: "border-coral",
  },
  {
    titulo: "Open Day Corporativo",
    dirigido: "Empresas, agencias, marcas",
    descripcion:
      "Tu marca en 360°. El espacio para lanzamientos, after offices y eventos disruptivos. Integramos tu marca en la experiencia digital.",
    cta: "Hablemos",
    borde: "border-teal",
  },
  {
    titulo: "Alianzas Culturales",
    dirigido: "Museos, centros culturales, galerías, organismos públicos",
    descripcion:
      "Acuerdos y beneficios cruzados. Validamos y ampliamos audiencias dentro del circuito cultural contemporáneo.",
    cta: "Proponer alianza",
    borde: "border-rosa",
  },
];

const TIPOS_ORGANIZACION = [
  { value: "educativa", label: "Institución educativa" },
  { value: "cultural", label: "Espacio cultural" },
  { value: "empresa", label: "Empresa o marca" },
  { value: "organismo_publico", label: "Organismo público" },
  { value: "otro", label: "Otro" },
];

type EstadoInstituciones = "formulario" | "confirmado";

interface InstForm {
  organizacion: string;
  nombre: string;
  email: string;
  tipo: string;
  mensaje: string;
}

interface InstErrors {
  organizacion?: string;
  nombre?: string;
  email?: string;
  tipo?: string;
  mensaje?: string;
}

function validateInst(form: InstForm): InstErrors {
  const errors: InstErrors = {};
  if (!form.organizacion.trim())
    errors.organizacion = "Ingresá el nombre de la organización";
  if (!form.nombre.trim() || form.nombre.trim().length < 2)
    errors.nombre = "Ingresá tu nombre completo";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Ingresá un email válido";
  if (!form.tipo) errors.tipo = "Seleccioná el tipo de organización";
  if (!form.mensaje.trim() || form.mensaje.trim().length < 20)
    errors.mensaje = "El mensaje debe tener al menos 20 caracteres";
  return errors;
}

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

const initialForm: InstForm = {
  organizacion: "",
  nombre: "",
  email: "",
  tipo: "",
  mensaje: "",
};

export default function Instituciones() {
  const [estado, setEstado] = useState<EstadoInstituciones>("formulario");
  const [form, setForm] = useState<InstForm>(initialForm);
  const [errors, setErrors] = useState<InstErrors>({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const updateField = useCallback(
    (name: keyof InstForm, value: string) => {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name: keyof InstForm) => {
      const allErrors = validateInst(form);
      if (allErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: allErrors[name] }));
      }
    },
    [form]
  );

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateInst(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const formData: FormInstituciones = {
      organizacion: form.organizacion,
      nombre: form.nombre,
      email: form.email,
      tipo: form.tipo as TipoInstitucion,
      mensaje: form.mensaje,
      timestamp: Date.now(),
    };

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          STORAGE_KEYS.INSTITUCIONES,
          JSON.stringify(formData)
        );
      }
    } catch {
      // localStorage no disponible
    }

    setLoading(false);
    setEstado("confirmado");
  }, [form]);

  return (
    <SectionWrapper id="instituciones" background="alt">
      {/* Título y descripción */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="text-center max-w-prose mx-auto"
      >
        <h2 className="font-display text-[32px] md:text-display-lg text-text-base">
          Sumate como aliado
        </h2>
        <p className="mt-4 text-[15px] md:text-[16px] text-text-base leading-relaxed">
          Desarrollamos propuestas para organizaciones que quieran ampliar sus
          audiencias, generar impacto y conectar con el arte contemporáneo de
          una manera diferente.
        </p>
      </motion.div>

      {/* Cards de programas */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROGRAMAS.map((programa, i) => (
          <motion.div
            key={programa.titulo}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white border-[1.5px] ${programa.borde} rounded-xl p-6 md:p-8 flex flex-col h-full`}
          >
            <h3 className="font-display text-[24px] md:text-display-md text-text-base">
              {programa.titulo}
            </h3>
            <p className="mt-2 text-[12px] uppercase tracking-[0.06em] font-medium text-text-muted">
              {programa.dirigido}
            </p>
            <p className="mt-4 text-[14px] md:text-[15px] text-text-base leading-relaxed flex-1">
              {programa.descripcion}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Formulario de contacto */}
      <div ref={formRef} className="mt-16 max-w-[640px] mx-auto">
        <motion.h3
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="font-display text-[24px] md:text-display-md text-text-base text-center mb-8"
        >
          Contacto institucional
        </motion.h3>

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
                label="Nombre de la organización"
                name="organizacion"
                type="text"
                placeholder="Nombre de tu organización"
                value={form.organizacion}
                onChange={(v) => updateField("organizacion", v)}
                onBlur={() => handleBlur("organizacion")}
                error={errors.organizacion}
                required
              />
              <FormField
                label="Tu nombre"
                name="inst-nombre"
                type="text"
                placeholder="Tu nombre y apellido"
                value={form.nombre}
                onChange={(v) => updateField("nombre", v)}
                onBlur={() => handleBlur("nombre")}
                error={errors.nombre}
                required
              />
              <FormField
                label="Email de contacto"
                name="inst-email"
                type="email"
                placeholder="contacto@organización.com"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                onBlur={() => handleBlur("email")}
                error={errors.email}
                required
              />
              <FormField
                label="Tipo de organización"
                name="tipo"
                type="select"
                placeholder="Seleccioná el tipo"
                options={TIPOS_ORGANIZACION}
                value={form.tipo}
                onChange={(v) => updateField("tipo", v)}
                onBlur={() => handleBlur("tipo")}
                error={errors.tipo}
                required
              />
              <FormField
                label="Mensaje / propuesta"
                name="mensaje"
                type="textarea"
                placeholder="Contanos tu propuesta o consulta…"
                rows={4}
                value={form.mensaje}
                onChange={(v) => updateField("mensaje", v)}
                onBlur={() => handleBlur("mensaje")}
                error={errors.mensaje}
                required
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Enviando…" : "Enviar consulta"}
                </Button>
              </div>
            </motion.form>
          )}

          {estado === "confirmado" && (
            <motion.div
              key="confirmado"
              {...transition}
            >
              <SuccessState
                icon="check"
                title="¡Recibimos tu consulta!"
                subtitle="Te respondemos en menos de 48 horas."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
