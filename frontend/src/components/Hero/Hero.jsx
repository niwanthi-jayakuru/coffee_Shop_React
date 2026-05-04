import React from 'react'


const heroImageSrc =
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=920&q=85'

const Hero = () => {
  return (
    <section
      id="hero"
      className="container scroll-mt-8 flex flex-1 flex-col justify-center py-14 sm:py-20 lg:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        <div className="max-w-xl lg:max-w-none" data-aos="fade-right">
          <h1 className="font-sans text-[clamp(1.875rem,5vw,3.25rem)] font-bold leading-[1.15] tracking-tight text-white">
            We serve the richest{' '}
            <span className="relative inline-block px-1 align-middle font-cursive text-[clamp(2.5rem,7vw,5rem)] font-normal text-accent lg:px-2">
              Coffee
            </span>{' '}
            in the city
          </h1>
          <div className="mt-10">
            <a
              href="#services"
              className="inline-flex rounded-full border border-primary bg-brand-dark/40 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-inner backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-secondary/60"
            >
              Coffee And Code
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none" data-aos="fade-left">
          <span
            className="absolute left-2 top-6 z-10 rounded-full border border-white/15 bg-secondary/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-md sm:left-4 sm:text-sm"
            data-aos="zoom-in"
            data-aos-delay={150}
          >
            Hey Coder
          </span>
          <span
            className="absolute bottom-14 right-2 z-10 rounded-full border border-white/15 bg-secondary/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-md sm:bottom-10 sm:right-8 sm:text-sm"
            data-aos="zoom-in"
            data-aos-delay={250}
          >
            Best Coffee
          </span>
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
            <img
              src={heroImageSrc}
              alt="Coffee cup with latte art on beans"
              className="aspect-[4/5] w-full object-cover object-center sm:aspect-square lg:aspect-[5/6]"
              width={920}
              height={920}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
