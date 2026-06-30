"use client";

import { useState, useCallback } from "react";
import type { EstadoReserva, ComoNosConociste, Reserva } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/storage";

export interface ReservaFormState {
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  horario: string;
  personas: string;
  comoNosConociste: string;
}

export interface ReservaFormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  fecha?: string;
  horario?: string;
  personas?: string;
  comoNosConociste?: string;
}

const initialForm: ReservaFormState = {
  nombre: "",
  email: "",
  telefono: "",
  fecha: "",
  horario: "",
  personas: "",
  comoNosConociste: "",
};

function validate(form: ReservaFormState): ReservaFormErrors {
  const errors: ReservaFormErrors = {};

  if (!form.nombre.trim() || form.nombre.trim().length < 2)
    errors.nombre = "Ingresá tu nombre completo";

  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Ingresá un email válido";

  if (!form.telefono.trim() || form.telefono.replace(/\D/g, "").length < 8)
    errors.telefono = "Ingresá un teléfono válido (mínimo 8 dígitos)";

  if (!form.fecha) errors.fecha = "Elegí una fecha";
  else if (new Date(form.fecha) < new Date(new Date().toDateString()))
    errors.fecha = "La fecha no puede ser en el pasado";

  if (!form.horario) errors.horario = "Elegí un horario";

  const personas = parseInt(form.personas);
  if (!form.personas || isNaN(personas) || personas < 1 || personas > 12)
    errors.personas = "Ingresá entre 1 y 12 personas";

  if (!form.comoNosConociste)
    errors.comoNosConociste = "Seleccioná una opción";

  return errors;
}

function validateField(
  name: keyof ReservaFormState,
  form: ReservaFormState
): string | undefined {
  const allErrors = validate(form);
  return allErrors[name];
}

function guardarReserva(
  form: ReservaFormState,
  comoNosConociste: ComoNosConociste
): string {
  const id = crypto.randomUUID();
  const nuevaReserva: Reserva = {
    id,
    nombre: form.nombre,
    email: form.email,
    telefono: form.telefono,
    fecha: form.fecha,
    horario: form.horario,
    personas: parseInt(form.personas),
    comoNosConociste,
    timestamp: Date.now(),
  };

  try {
    if (typeof window === "undefined") return id;
    const existentes = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.RESERVAS) || "[]"
    );
    existentes.push(nuevaReserva);
    localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(existentes));
  } catch (e) {
    console.error("Error guardando reserva:", e);
  }

  return id;
}

export function useReserva() {
  const [estado, setEstado] = useState<EstadoReserva>("formulario");
  const [form, setForm] = useState<ReservaFormState>(initialForm);
  const [errors, setErrors] = useState<ReservaFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [reservaId, setReservaId] = useState<string>("");

  const updateField = useCallback(
    (name: keyof ReservaFormState, value: string) => {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name: keyof ReservaFormState) => {
      const error = validateField(name, form);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [form]
  );

  const handleSubmit = useCallback(async () => {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const id = guardarReserva(form, form.comoNosConociste as ComoNosConociste);
    setReservaId(id);
    setLoading(false);
    setEstado("confirmacion");
  }, [form]);

  const handleReset = useCallback(() => {
    setForm(initialForm);
    setErrors({});
    setReservaId("");
    setEstado("formulario");
  }, []);

  return {
    estado,
    setEstado,
    form,
    errors,
    loading,
    reservaId,
    updateField,
    handleBlur,
    handleSubmit,
    handleReset,
  };
}
