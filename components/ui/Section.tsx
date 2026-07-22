import { cn } from "@/lib/cn";

/** Consistent vertical rhythm + optional relative positioning for glows. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 sm:py-32 md:py-40",
        className
      )}
    >
      {children}
    </section>
  );
}
