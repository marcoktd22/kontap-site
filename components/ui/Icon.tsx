import { cn } from "@/lib/cn";

export type IconName =
  | "bolt"
  | "shield"
  | "refresh"
  | "chart"
  | "signal"
  | "layers"
  | "arrow"
  | "check"
  | "plus"
  | "minus"
  | "star";

const paths: Record<IconName, React.ReactNode> = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  shield: (
    <>
      <path d="M12 3 5 5.5v5c0 4.4 2.9 8.2 7 9.5 4.1-1.3 7-5.1 7-9.5v-5L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  refresh: (
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
      <path d="M4 20v-4h4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m8 14 3-3 3 2 4-5" />
    </>
  ),
  signal: (
    <>
      <path d="M4.5 15a10 10 0 0 1 0-6" />
      <path d="M8 13a5.5 5.5 0 0 1 0-2" />
      <path d="M19.5 15a10 10 0 0 0 0-6" />
      <path d="M16 13a5.5 5.5 0 0 0 0-2" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  star: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
    >
      {paths[name]}
    </svg>
  );
}
