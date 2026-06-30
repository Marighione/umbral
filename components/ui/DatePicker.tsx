"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  allowedDays?: number[];
}

const DAYS_HEADER = ["LU", "MA", "MI", "JU", "VI", "SÁ", "DO"];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function toDateString(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function DatePicker({ value, onChange, onBlur, error, allowedDays = [0, 4, 5, 6] }: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  const selected = value ? new Date(value + "T00:00:00") : null;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onBlur]);

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const firstDay = new Date(viewYear, viewMonth, 1);
  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: Array<{ day: number; inMonth: boolean }> = [];

  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true });
  }
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, inMonth: false });
    }
  }

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  function isAvailable(day: number) {
    const date = new Date(viewYear, viewMonth, day);
    if (date < today) return false;
    const jsDay = date.getDay();
    return allowedDays.includes(jsDay);
  }

  function handleSelect(day: number) {
    onChange(toDateString(viewYear, viewMonth, day));
    setOpen(false);
    onBlur?.();
  }

  const displayValue = selected
    ? `${selected.getDate().toString().padStart(2, "0")}/${(selected.getMonth() + 1).toString().padStart(2, "0")}/${selected.getFullYear()}`
    : "";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full bg-white border-[1.5px] rounded-[var(--radius-md)] px-4 py-3 h-[50px] font-body text-[16px] text-left transition-all duration-200 outline-none flex items-center justify-between",
          error
            ? "border-[#E24B4A] focus:border-[#E24B4A] focus:shadow-[0_0_0_3px_rgba(226,75,74,0.12)]"
            : open
              ? "border-coral shadow-[0_0_0_3px_rgba(253,108,79,0.12)]"
              : "border-border-base focus:border-coral focus:shadow-[0_0_0_3px_rgba(253,108,79,0.12)]",
          displayValue ? "text-text-base" : "text-text-muted"
        )}
      >
        <span>{displayValue || "Elegí una fecha"}</span>
        <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 mt-2 w-full bg-white rounded-xl border border-border-base shadow-lg p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              disabled={!canGoPrev}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                canGoPrev ? "hover:bg-bg-alt text-text-base" : "text-text-muted/30 cursor-not-allowed"
              )}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-body text-[15px] font-semibold text-text-base">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-bg-alt text-text-base transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_HEADER.map((d) => (
              <div key={d} className="text-center text-[11px] font-medium text-text-muted tracking-wider py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7">
            {cells.map((cell, idx) => {
              if (!cell.inMonth) {
                return <div key={`empty-${idx}`} className="py-2" />;
              }
              const available = isAvailable(cell.day);
              const date = new Date(viewYear, viewMonth, cell.day);
              const isSelected = selected && isSameDay(date, selected);
              const isToday = isSameDay(date, today);

              return (
                <button
                  key={cell.day}
                  type="button"
                  disabled={!available}
                  onClick={() => handleSelect(cell.day)}
                  className={cn(
                    "relative py-2 text-[14px] rounded-lg transition-all duration-150 font-body",
                    available
                      ? isSelected
                        ? "bg-coral text-white font-semibold"
                        : "text-text-base hover:bg-coral-light font-medium"
                      : "text-text-muted/25 cursor-not-allowed"
                  )}
                >
                  {cell.day}
                  {isToday && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-coral" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-border-base flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <span className="text-[11px] text-text-muted">Hoy</span>
            </div>
            <span className="text-[11px] text-text-muted">
              Disponible: jueves a domingo
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
