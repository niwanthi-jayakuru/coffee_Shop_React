import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import coffeeCupImage from './assets/website/coffe cup.png';
import aboutImage from './assets/website/about.png';

const FeatureIcon = ({ variant }) => {
  if (variant === 'kettle') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-neutral-900" fill="none" aria-hidden="true">
        <path
          d="M7.5 8.5V7a4.5 4.5 0 0 1 9 0v1.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6.5 9.5h11a2 2 0 0 1 2 2v1.2a3.8 3.8 0 0 1-3.8 3.8h-4.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6.2 9.5h9.3a1.5 1.5 0 0 1 1.5 1.5V18a2.5 2.5 0 0 1-2.5 2.5H8.7A2.5 2.5 0 0 1 6.2 18V9.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'cup') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-neutral-900" fill="none" aria-hidden="true">
        <path
          d="M7 8.5h9v6.8A3.2 3.2 0 0 1 12.8 18.5H10.2A3.2 3.2 0 0 1 7 15.3V8.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M16 9.4h1.4a2.1 2.1 0 0 1 0 4.2H16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6 20h12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-neutral-900" fill="none" aria-hidden="true">
      <path
        d="M7 14c3.6 0 4.4-4 8-4 1.2 0 2.2.4 3 1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 16.5c3.8 0 4.7-4.2 8.5-4.2 1.3 0 2.4.4 3.3 1.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M5.5 18.7h13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

const coffeeItems = [
  {
    id: 1,
    title: 'Espresso',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    title: 'Americano',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    title: 'Cappuccino',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  }, []);
  return (
    <div
      id="top"
      className="flex min-h-screen flex-col overflow-x-hidden bg-brand-dark text-white"
    >
      <Navbar />
      <main className="flex flex-1 flex-col bg-brand-dark text-white">
        <Hero />

        <section
          id="services"
          className="scroll-mt-28 border-t border-white/10 bg-white py-16 text-neutral-900 sm:py-20"
          aria-labelledby="services-heading"
        >
          <div className="container">
            <h2
              id="services-heading"
              className="font-cursive text-center text-[clamp(1.875rem,4vw,2.75rem)] font-normal tracking-wide text-neutral-800"
              data-aos="fade-down"
            >
              Best Coffee For You
            </h2>

            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {coffeeItems.map((item, index) => (
                <li
                  key={item.id}
                  className="flex flex-col items-center rounded-2xl bg-white px-6 py-10 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] ring-1 ring-neutral-200/80"
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                >
                  <div className="mb-6 shrink-0">
                    <img
                      src={coffeeCupImage}
                      alt="Coffee cup with latte art on roasted beans"
                      className="max-w-[200px] block mx-auto transform -translate-y-14 group-hover:scale-110 group-hover:rotate-6 duration-300"
                      width={160}
                      height={160}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-neutral-900">{item.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section
          id="about"
          className="scroll-mt-28 border-t border-white/10 bg-neutral-100 py-16 text-neutral-900 sm:py-20"
          aria-labelledby="about-heading"
        >
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="relative" data-aos="fade-right">
                <div className="absolute -left-8 -top-8 h-44 w-44 rounded-full border-2 border-neutral-900/10 bg-white/60 blur-[0.2px]" />
                <div className="relative mx-auto w-full max-w-md">
                  <img
                    src={aboutImage}
                    alt="Cup of premium blend coffee"
                    className="mx-auto aspect-square w-full max-w-[360px] rounded-full object-cover shadow-[0_18px_50px_rgba(0,0,0,0.18)] ring-1 ring-neutral-900/10"
                    width={520}
                    height={520}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div data-aos="fade-left">
                <h2
                  id="about-heading"
                  className="font-cursive text-[clamp(1.875rem,4vw,2.75rem)] font-normal tracking-wide text-neutral-800"
                >
                  Premium Blen Coffee
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore
                  iste ratione ex alias quis magni at optio
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-100">
                        <FeatureIcon variant="kettle" />
                      </span>
                      <span className="font-sans text-sm font-semibold text-neutral-900">
                        Premium Coffee
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-100">
                        <FeatureIcon variant="cup" />
                      </span>
                      <span className="font-sans text-sm font-semibold text-neutral-900">
                        Hot Coffee
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-100">
                        <FeatureIcon variant="wave" />
                      </span>
                      <span className="font-sans text-sm font-semibold text-neutral-900">
                        Cold Coffee
                      </span>
                    </li>
                  </ul>

                  <div className="hidden h-full w-px bg-neutral-900/25 lg:block" aria-hidden="true" />

                  <div className="rounded-xl bg-white/70 p-6 ring-1 ring-neutral-900/10">
                    <h3 className="font-sans text-sm font-bold text-neutral-900">Tea Lover</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      Much like writing code, brewing the perfect cup of tea requires patience,
                      precision, and a dash of passion to create a comforting blend of flavors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="order"
          className="container scroll-mt-28 border-t border-white/10 py-16 sm:min-h-[40vh]"
        >
          <h2 className="font-sans text-3xl font-bold text-primary mb-4">Order</h2>
          <p className="max-w-xl text-white/85">
            The Order nav link targets{' '}
            <code className="rounded bg-white/10 px-1 py-0.5 text-primary">#order</code>.
            Plug in menu or checkout when you&apos;re ready.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
