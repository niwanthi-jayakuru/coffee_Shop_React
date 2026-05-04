import React from 'react'
import Logo from "../../assets/website/coffee_shop_logo.jpg";
import CoffeeCupIcon from './CoffeeCupIcon';

const menus = [
  { id: 1, name: "Home", link: "#top" },
  { id: 2, name: "Services", link: "#services" },
  { id: 3, name: "About", link: "#about" },
  { id: 4, name: "Order", link: "#order", cta: true },
]

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-secondary to-secondary/95 text-white shadow-black/20 shadow-md backdrop-blur-sm">
      <div className="container py-3">
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <div>
            <a
              href="#top"
              className="flex items-center gap-3 font-cursive text-2xl font-bold tracking-wide text-white sm:text-3xl"
            >
              <img src={Logo} alt="Coffee Cafe logo" className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14" />
              Coffee Cafe
            </a>
          </div>

          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-6 sm:gap-8 font-sans text-sm font-medium sm:text-base">
              {menus.map((data) => (
                <li key={data.id}>
                  <a
                    href={data.link}
                    className={
                      data.cta
                        ? 'inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-inner ring-1 ring-white/15 transition-colors hover:bg-primary/90'
                        : 'text-white hover:text-accent transition-colors'
                    }
                  >
                    <span>{data.name}</span>
                    {data.cta ? <CoffeeCupIcon className="h-4 w-4 shrink-0 text-white" /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
