import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
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
          className="container scroll-mt-28 border-t border-white/10 py-16 sm:min-h-[40vh]"
        >
          <h2 className="font-sans text-3xl font-bold text-primary mb-4">Services</h2>
          <p className="max-w-xl text-white/85">
            This section is anchored as{' '}
            <code className="rounded bg-white/10 px-1 py-0.5 text-primary">#services</code>{' '}
            so the Services link scrolls here.
          </p>
        </section>
        <section
          id="about"
          className="container scroll-mt-28 border-t border-white/10 py-16 sm:min-h-[40vh]"
        >
          <h2 className="font-sans text-3xl font-bold text-primary mb-4">About</h2>
          <p className="max-w-xl text-white/85">
            Anchored at{' '}
            <code className="rounded bg-white/10 px-1 py-0.5 text-primary">#about</code> — add
            your story here.
          </p>
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
