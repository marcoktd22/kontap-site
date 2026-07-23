import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { GlowBackdrop } from "../ui/GlowBackdrop";
import { LogoMark } from "../Logo";

export function CTA() {
  return (
    <section id="cta" className="relative scroll-mt-24 px-4 py-16 sm:py-20">
      <Container className="px-0">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-deep px-6 py-20 text-center text-white ring-hairline-invert sm:px-12 sm:py-28">
          <GlowBackdrop variant="cta" />

          <Reveal className="flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-hairline-invert backdrop-blur-md">
              <LogoMark className="h-8 w-8 text-white" />
            </span>
          </Reveal>

          <Reveal index={1}>
            <h2 className="mx-auto mt-8 max-w-2xl text-balance text-4xl font-semibold sm:text-5xl md:text-6xl">
              <span className="text-gradient-invert">Ready to make your </span>
              <span className="text-gradient-invert-accent">first tap?</span>
            </h2>
          </Reveal>

          <Reveal index={2}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70">
              Bring Kontap to your counter — premium NFC hardware for local
              businesses, all powered by the Plus platform. Shipping across Italy
              and worldwide.
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#products" size="lg">
                Explore products
                <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="#plus" size="lg" variant="invert">
                Join the Plus waitlist
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
