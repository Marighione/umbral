"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface FaseCardProps {
  numero: number;
  nombre: string;
  concepto: string;
  eje: string;
  descripcion: string;
  indicacion: string;
  esDescanso?: boolean;
  imagen?: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function FaseCard({
  numero,
  nombre,
  concepto,
  descripcion,
  indicacion,
  esDescanso = false,
  imagen,
  isExpanded,
  onToggle,
}: FaseCardProps) {
  return (
    <div
      role="button"
      aria-expanded={isExpanded}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={cn(
        "rounded-xl transition-all duration-200 cursor-pointer overflow-hidden",
        isExpanded
          ? "bg-[#FBE9CE] border-[1.5px] border-coral"
          : esDescanso
            ? "bg-[#E8F8F5] border border-border-base"
            : "bg-white border border-border-base"
      )}
    >
      {/* Header — siempre visible */}
      <div className="flex items-center gap-4 p-5">
        <span
          className={cn(
            "font-display text-[40px] md:text-[48px] leading-none select-none",
            esDescanso ? "text-teal-dark/50" : "text-coral/50"
          )}
        >
          {esDescanso ? "—" : `${numero}`}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-body text-[18px] md:text-[20px] font-semibold text-text-base">
            {nombre}
          </h4>
          <p className="text-[14px] text-text-muted mt-0.5">{concepto}</p>
        </div>
        {/* Chevron */}
        <svg
          className={cn(
            "w-5 h-5 flex-shrink-0 text-text-muted transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Contenido expandible */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {imagen && (
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                  <Image
                    src={imagen}
                    alt={nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <p className="text-[15px] md:text-[16px] text-text-base leading-relaxed">
                {descripcion}
              </p>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
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
                <p className="text-[14px] md:text-[15px] text-text-base">{indicacion}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
