import { cn } from "@/lib/cn";

interface SectionWrapperProps {
  id: string;
  background?: "white" | "alt";
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  background = "white",
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 md:py-20 px-6",
        background === "alt" ? "bg-bg-alt" : "bg-white",
        className
      )}
    >
      <div className="max-w-container mx-auto">{children}</div>
    </section>
  );
}
