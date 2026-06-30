"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";
import { useReserva } from "@/hooks/useReserva";

const HORARIOS = [
  { value: "17:00", label: "17:00" },
  { value: "19:00", label: "19:00" },
  { value: "21:00", label: "21:00" },
];

const COMO_NOS_CONOCISTE = [
  { value: "instagram", label: "Instagram" },
  { value: "amigo", label: "Me lo recomendó alguien" },
  { value: "flyer", label: "Vi un flyer" },
  { value: "google", label: "Google" },
  { value: "otro", label: "Otro" },
];

const transition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

function formatFecha(fecha: string): string {
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
}

export default function Reservas() {
  const {
    estado,
    form,
    errors,
    loading,
    updateField,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useReserva();

  return (
    <SectionWrapper id="reservas" background="alt">
      <div className="max-w-[640px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="font-display text-[32px] md:text-display-lg text-text-base"
        >
          Reservá tu lugar
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: "easeOut" as const,
          }}
          className="mt-3 text-[15px] md:text-[16px] text-text-muted"
        >
          Cupos limitados. Máximo 12 personas por sala.
        </motion.p>

        <div className="mt-10 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* Estado 1: Formulario */}
            {estado === "formulario" && (
              <motion.form
                key="formulario"
                {...transition}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-5 text-left"
              >
                <FormField
                  label="Nombre completo"
                  name="nombre"
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
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(v) => updateField("email", v)}
                  onBlur={() => handleBlur("email")}
                  error={errors.email}
                  required
                />
                <FormField
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  placeholder="11 1234-5678"
                  value={form.telefono}
                  onChange={(v) => updateField("telefono", v)}
                  onBlur={() => handleBlur("telefono")}
                  error={errors.telefono}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Fecha"
                    name="fecha"
                    type="date"
                    value={form.fecha}
                    onChange={(v) => updateField("fecha", v)}
                    onBlur={() => handleBlur("fecha")}
                    error={errors.fecha}
                    required
                  />
                  <FormField
                    label="Horario"
                    name="horario"
                    type="select"
                    placeholder="Elegí un horario"
                    options={HORARIOS}
                    value={form.horario}
                    onChange={(v) => updateField("horario", v)}
                    onBlur={() => handleBlur("horario")}
                    error={errors.horario}
                    required
                  />
                </div>
                <FormField
                  label="Cantidad de personas"
                  name="personas"
                  type="number"
                  placeholder="1"
                  min={1}
                  max={12}
                  value={form.personas}
                  onChange={(v) => updateField("personas", v)}
                  onBlur={() => handleBlur("personas")}
                  error={errors.personas}
                  required
                />
                <FormField
                  label="¿Cómo nos conociste?"
                  name="comoNosConociste"
                  type="select"
                  placeholder="Seleccioná una opción"
                  options={COMO_NOS_CONOCISTE}
                  value={form.comoNosConociste}
                  onChange={(v) => updateField("comoNosConociste", v)}
                  onBlur={() => handleBlur("comoNosConociste")}
                  error={errors.comoNosConociste}
                  required
                />
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? "Enviando…" : "Confirmar reserva"}
                  </Button>
                </div>
              </motion.form>
            )}

            {/* Estado 2: Confirmación */}
            {estado === "confirmacion" && (
              <motion.div
                key="confirmacion"
                {...transition}
              >
                <SuccessState
                  icon="check"
                  title="¡Reserva confirmada!"
                  subtitle={`${form.nombre}, te esperamos el ${formatFecha(form.fecha)} a las ${form.horario}.\nLlevá ropa cómoda y ganas de explorar.`}
                >
                  <Button variant="secondary" onClick={handleReset}>
                    Hacer otra reserva
                  </Button>
                </SuccessState>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
