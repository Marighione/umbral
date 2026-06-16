export const STORAGE_KEYS = {
  MEMBRESIA: "umbral_membresia",
  RESERVAS: "umbral_reservas",
  INSTITUCIONES: "umbral_instituciones",
} as const;

export function getStorageItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage lleno o no disponible
  }
}

export function appendStorageItem<T>(key: string, item: T): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStorageItem<T[]>(key) ?? [];
    existing.push(item);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    // localStorage lleno o no disponible
  }
}
