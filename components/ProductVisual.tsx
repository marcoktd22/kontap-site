import { LogoMark } from "./Logo";
import { Icon } from "./ui/Icon";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/content";

/**
 * Bespoke CSS illustration per product — cohesive, brand-tinted, no stock
 * photography. Each fills its card's visual area.
 */
export function ProductVisual({
  visual,
  className,
}: {
  visual: Product["visual"];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl",
        className
      )}
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(10,54,246,0.18) 0%, rgba(5,13,53,0) 70%)",
      }}
    >
      {visual === "review" && <ReviewVisual />}
      {visual === "card" && <CardVisual />}
      {visual === "wallet" && <WalletVisual />}
      {visual === "pettag" && <PetTagVisual />}
      {visual === "smart" && <SmartVisual />}
    </div>
  );
}

function Plate({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-2xl ring-hairline",
        className
      )}
      style={{
        background: "linear-gradient(150deg, #0A1648 0%, #050D35 60%, #00051B 100%)",
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 30px 60px -30px rgba(0,0,0,0.9)",
      }}
    >
      {children}
    </div>
  );
}

function ReviewVisual() {
  return (
    <div className="relative flex w-full items-center justify-center gap-6">
      {/* Counter plate on a stand */}
      <div className="relative">
        <Plate className="h-32 w-28 flex-col gap-3">
          <LogoMark className="h-9 w-9 text-white/90" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" className="h-3 w-3 text-accent" strokeWidth={1.2} />
            ))}
          </div>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
            Tap to review
          </p>
        </Plate>
        {/* Stand base */}
        <div className="mx-auto mt-1 h-1.5 w-16 rounded-full bg-white/10" />
        <div className="mx-auto h-6 w-1 bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* Floating rating chip */}
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-xl bg-surface-2/80 px-3 py-2 ring-hairline backdrop-blur-md">
        <span className="text-lg font-semibold text-white">4.9</span>
        <div className="flex flex-col">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" className="h-2.5 w-2.5 text-accent" strokeWidth={1} />
            ))}
          </div>
          <span className="text-[0.55rem] text-muted">new review</span>
        </div>
      </div>
    </div>
  );
}

function CardVisual() {
  return (
    <div className="relative" style={{ perspective: "1000px" }}>
      <Plate
        className="h-28 w-44"
        // slight tilt
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            transform: "rotateY(-18deg) rotateX(8deg)",
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 40%)",
          }}
        />
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          <LogoMark className="h-4 w-4 text-white/90" />
          <span className="text-[0.7rem] font-semibold tracking-tight text-white">kontap</span>
        </div>
        <div className="absolute bottom-4 left-4 h-5 w-7 rounded bg-gradient-to-br from-accent/40 to-primary/30 ring-1 ring-white/10" />
        <p className="absolute bottom-4 right-4 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted">
          NFC
        </p>
      </Plate>
    </div>
  );
}

function WalletVisual() {
  return (
    <div className="relative">
      {/* Phone */}
      <div className="relative h-40 w-24 rounded-[1.4rem] bg-surface p-2 ring-hairline shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
        <div className="mx-auto mb-2 mt-0.5 h-1 w-8 rounded-full bg-white/15" />
        {/* Wallet pass */}
        <div
          className="relative h-24 w-full overflow-hidden rounded-xl p-2.5 ring-1 ring-white/10"
          style={{
            background: "linear-gradient(150deg, #0A36F6 0%, #001580 90%)",
          }}
        >
          <div className="flex items-center justify-between">
            <LogoMark className="h-4 w-4 text-white" />
            <span className="text-[0.5rem] font-medium text-white/80">PASS</span>
          </div>
          <p className="mt-3 text-[0.6rem] font-semibold text-white">Kontap Member</p>
          <div className="mt-2 flex gap-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="h-4 w-0.5 bg-white/70" style={{ opacity: i % 3 ? 0.5 : 1 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PetTagVisual() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Collar ring */}
      <div className="absolute -top-1 h-6 w-6 rounded-full border-2 border-white/20" />
      {/* Tag */}
      <div
        className="mt-6 flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-full ring-hairline"
        style={{
          background: "radial-gradient(circle at 40% 30%, #0A1648, #050D35 70%)",
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 30px 60px -30px rgba(0,0,0,0.9)",
        }}
      >
        <LogoMark className="h-8 w-8 text-white/90" />
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted">
          If found · tap
        </p>
      </div>
    </div>
  );
}

function SmartVisual() {
  return (
    <div className="relative flex w-full items-center justify-center gap-4">
      {/* Sticker */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full ring-hairline" style={{ background: "radial-gradient(circle, #0A1648, #050D35)" }}>
        <LogoMark className="h-6 w-6 text-white/80" />
      </div>
      {/* Wristband */}
      <div className="relative flex h-24 w-10 items-center justify-center rounded-full ring-hairline" style={{ background: "linear-gradient(180deg,#0A1648,#00051B)" }}>
        <div className="h-6 w-6 rounded-full bg-accent/20 ring-1 ring-accent/40" />
      </div>
      {/* Stand */}
      <Plate className="h-24 w-16 flex-col gap-2">
        <LogoMark className="h-5 w-5 text-white/80" />
        <div className="h-1 w-8 rounded-full bg-white/10" />
        <div className="h-1 w-6 rounded-full bg-white/10" />
      </Plate>
    </div>
  );
}
