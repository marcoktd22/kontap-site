"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

/**
 * Scroll-triggered reveal. Fades + lifts content once as it enters the
 * viewport. `index` staggers siblings; respects reduced-motion via CSS.
 */
export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "li" | "section" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
