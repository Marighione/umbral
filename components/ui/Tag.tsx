import { cn } from "@/lib/cn";

interface TagProps {
  children: React.ReactNode;
  color?: "coral" | "teal" | "rosa" | "muted";
}

const colorStyles: Record<NonNullable<TagProps["color"]>, string> = {
  coral: "bg-coral-light text-coral",
  teal:  "bg-[#E0F7F3] text-teal-dark",
  rosa:  "bg-[#FFF0F0] text-rosa-dark",
  muted: "bg-bg-alt text-text-muted",
};

export function Tag({ children, color = "coral" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-[12px] uppercase tracking-[0.08em] font-medium rounded-full",
        colorStyles[color]
      )}
    >
      {children}
    </span>
  );
}
