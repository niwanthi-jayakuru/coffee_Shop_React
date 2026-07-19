import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import CartDrawer from './components/Cart/CartDrawer';
import OrderList from './components/Orders/OrderList';
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

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  }, []);

  // Cart operations
  const handleAddToCart = (item, quantity) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c =>
          c.item.id === item.id
            ? { ...c, quantity: c.quantity + quantity }
            : c
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const handleUpdateQuantity = (itemId, delta) => {
    setCart(prev =>
      prev.map(c => {
        if (c.item.id === itemId) {
          const newQty = c.quantity + delta;
          return newQty > 0 ? { ...c, quantity: newQty } : null;
        }
        return c;
      }).filter(Boolean)
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart(prev => prev.filter(c => c.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      id="top"
      className="flex min-h-screen flex-col overflow-x-hidden bg-brand-dark text-white font-sans"
    >
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="flex flex-1 flex-col bg-brand-dark text-white">

        {/* Hero Section */}
        <Hero />

        {/* Dynamic Interactive Menu Section */}
        <Menu onAddToCart={handleAddToCart} />

        {/* About Section */}
        <section
          id="about"
          className="scroll-mt-28 border-t border-white/10 bg-neutral-100 py-20 text-neutral-900 relative"
          aria-labelledby="about-heading"
        >
          <div className="container px-4 mx-auto">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

              {/* Image side */}
              <div className="relative" data-aos="fade-right">
                <div className="absolute -left-8 -top-8 h-44 w-44 rounded-full border-2 border-neutral-900/10 bg-white/60 blur-[0.2px] pointer-events-none" />
                <div className="relative mx-auto w-full max-w-md">
                  <img
                    src={aboutImage}
                    alt="Cup of premium blend coffee with latte art"
                    className="mx-auto aspect-square w-full max-w-[360px] rounded-full object-cover shadow-[0_18px_50px_rgba(0,0,0,0.18)] ring-1 ring-neutral-900/10 hover:rotate-3 transition-transform duration-500"
                    width={520}
                    height={520}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Text side */}
              <div data-aos="fade-left">
                <span className="text-primary font-cursive text-xl tracking-wider block mb-2">Our Story</span>
                <h2
                  id="about-heading"
                  className="font-sans text-4xl font-extrabold tracking-tight text-neutral-800 mb-6"
                >
                  Premium Brewed Coffee
                </h2>
                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed mb-8">
                  We believe that coffee is more than just a morning routine. It's a craft, an art form, and a community.
                  Every cup we serve is a testament to quality, from sourcing standard single-origin beans to artisan micro-roasting.
                </p>

                <div className="grid gap-8 sm:grid-cols-2">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-100 text-rose-800 shadow-sm">
                        <FeatureIcon variant="kettle" />
                      </span>
                      <span className="font-sans text-sm font-semibold text-neutral-800">
                        Artisanal Brewing
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-100 text-amber-800 shadow-sm">
                        <FeatureIcon variant="cup" />
                      </span>
                      <span className="font-sans text-sm font-semibold text-neutral-800">
                        Hot Espresso Bar
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-blue-800 shadow-sm">
                        <FeatureIcon variant="wave" />
                      </span>
                      <span className="font-sans text-sm font-semibold text-neutral-800">
                        Chilled Cold Brews
                      </span>
                    </li>
                  </ul>

                  <div className="rounded-2xl bg-white border border-neutral-200/80 p-5 shadow-sm">
                    <h3 className="font-sans text-sm font-bold text-neutral-800 mb-2">The Perfect Blend</h3>
                    <p className="text-xs leading-relaxed text-neutral-500">
                      Much like compiling clean code, brewing the perfect blend requires patience, precision, and passion.
                      Take a break, relax, and let our signature coffees fuel your creativity.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Live Orders Section */}
        <section
          id="order"
          className="scroll-mt-28 border-t border-white/10 py-20 bg-brand-dark/20 relative"
          aria-labelledby="order-heading"
        >
          <div className="container px-4 mx-auto">
            <div className="mb-10">
              <span className="text-accent font-cursive text-2xl tracking-wider block mb-2 text-center">Track Order</span>
              <h2 id="order-heading" className="font-sans text-3xl sm:text-4xl font-extrabold text-white text-center">
                Order Dashboard
              </h2>
              <div className="h-1 w-16 bg-primary mx-auto rounded-full mt-4" />
            </div>

            <div className="mt-8">
              <OrderList refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </section>

      </main>

      {/* Shopping Cart slide over drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />
    </div>
  )
}

export default App;
