import Logo from '../../assets/website/coffee_shop_logo.jpg';
import { ShoppingCart } from 'lucide-react';

const menus = [
  { id: 1, name: "Home", link: "#top" },
  { id: 2, name: "Menu", link: "#services" },
  { id: 3, name: "About", link: "#about" },
  { id: 4, name: "Orders", link: "#order" },
];

const Navbar = ({ cartCount, onCartClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-secondary to-secondary/95 text-white shadow-black/20 shadow-md backdrop-blur-sm border-b border-white/5">
      <div className="container py-3">
        <div className="flex w-full items-center justify-between gap-4">
          
          {/* Logo / Brand */}
          <div>
            <a
              href="#top"
              className="flex items-center gap-3 font-cursive text-2xl font-bold tracking-wide text-white sm:text-3xl transition-transform hover:scale-105 duration-300"
            >
              <img 
                src={Logo} 
                alt="Coffee Cafe logo" 
                className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14 border border-white/15" 
              />
              Coffee Cafe
            </a>
          </div>

          {/* Navigation & Cart Button */}
          <div className="flex items-center gap-6 sm:gap-8">
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-6 sm:gap-8 font-sans text-sm font-medium sm:text-base">
                {menus.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="text-white/80 hover:text-accent transition-colors py-1.5 relative group"
                    >
                      <span>{data.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Shopping Cart button */}
            <button
              type="button"
              onClick={onCartClick}
              className="relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-inner ring-1 ring-white/15 hover:ring-accent/30 transition-all duration-300 hover:bg-primary/90 active:scale-95 cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingCart className="h-4 w-4 shrink-0 text-white" />
              <span className="hidden xs:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-extrabold text-brand-dark ring-2 ring-secondary animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
