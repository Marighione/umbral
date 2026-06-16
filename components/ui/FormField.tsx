"use client";

import { cn } from "@/lib/cn";
import { DatePicker } from "@/components/ui/DatePicker";

interface FormFieldProps {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "number" | "select" | "textarea" | "date";
  placeholder?: string;
  required?: boolean;
  error?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  min?: number;
  max?: number;
  value: string | number;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const inputClasses =
  "w-full bg-white border-[1.5px] border-border-base rounded-[var(--radius-md)] px-4 py-3 font-body text-[16px] text-text-base placeholder:text-text-muted transition-all duration-200 outline-none focus:border-coral focus:shadow-[0_0_0_3px_rgba(253,108,79,0.12)]";

const errorInputClasses = "border-[#E24B4A] focus:border-[#E24B4A] focus:shadow-[0_0_0_3px_rgba(226,75,74,0.12)]";

export function FormField({
  label,
  name,
  type,
  placeholder,
  error,
  options,
  rows = 4,
  min,
  max,
  value,
  onChange,
  onBlur,
}: FormFieldProps) {
  const fieldClasses = cn(inputClasses, error && errorInputClasses);

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[14px] font-medium text-text-base mb-1.5"
      >
        {label}
      </label>

      {type === "date" ? (
        <DatePicker
          value={String(value)}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={cn(fieldClasses, !value && "text-text-muted")}
        >
          <option value="">{placeholder || "Seleccioná una opción"}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          className={cn(fieldClasses, "resize-y")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          className={fieldClasses}
        />
      )}

      {error && (
        <p role="alert" className="text-[#E24B4A] text-[12px] mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
