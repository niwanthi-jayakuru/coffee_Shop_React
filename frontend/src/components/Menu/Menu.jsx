import { useEffect, useState } from 'react';
import { Coffee, Search, Plus, Minus, Check } from 'lucide-react';

const MENU_IMAGES = {
  espresso: 'https://images.unsplash.com/photo-1510707577719-ee7c14b51e3a?auto=format&fit=crop&w=600&q=80',
  americano: 'https://images.unsplash.com/photo-1551046710-7e2349e54a5a?auto=format&fit=crop&w=600&q=80',
  cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
  'cold-brew': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80';

export default function Menu({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        setError(err.message || 'Failed to fetch menu items.');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => {
      const current = prev[itemId] || 1;
      const next = current + change;
      return {
        ...prev,
        [itemId]: next < 1 ? 1 : next
      };
    });
  };

  const handleAddToCart = (item) => {
    const qty = quantities[item.id] || 1;
    onAddToCart(item, qty);
    
    // Set added animation trigger
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1500);

    // Reset card local quantity back to 1
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  // Filter items based on activeTab and searchQuery
  const filteredItems = items.filter(item => {
    const matchesTab = activeTab === 'all' || item.tags?.includes(activeTab);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCoffeeImage = (id) => MENU_IMAGES[id] || DEFAULT_IMAGE;

  return (
    <section id="services" className="scroll-mt-28 bg-brand-dark/40 py-20 text-white relative">
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-down">
          <span className="text-accent font-cursive text-2xl tracking-wider block mb-2">Our Menu</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Discover Our Coffee Blends
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Crafted with passion, our coffees are brewed from high-quality single-origin beans, roasted to absolute perfection. Find your favorite brew below.
          </p>
        </div>

        {/* Filter and Search Bar Container */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12" data-aos="fade-up">
          {/* Tabs */}
          <div className="flex bg-secondary/30 p-1.5 rounded-full ring-1 ring-white/10 backdrop-blur-sm overflow-x-auto max-w-full">
            {['all', 'hot', 'cold'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold capitalize tracking-wide transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'all' ? 'All Brews' : `${tab} brews`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary/20 hover:bg-secondary/30 focus:bg-secondary/40 text-white rounded-full pl-11 pr-5 py-2.5 text-sm ring-1 ring-white/10 focus:ring-accent focus:outline-none transition-all duration-300 placeholder:text-white/40 shadow-inner"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-secondary/20 rounded-3xl p-6 ring-1 ring-white/10 animate-pulse h-96 flex flex-col justify-between">
                <div className="w-full h-44 bg-white/5 rounded-2xl" />
                <div className="space-y-3 mt-4 flex-1">
                  <div className="h-6 bg-white/10 rounded w-2/3" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="h-6 bg-white/10 rounded w-16" />
                  <div className="h-10 bg-white/10 rounded-full w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 rounded-3xl bg-red-950/20 border border-red-500/20 p-8">
            <p className="text-red-300 font-semibold mb-2">Error loading menu items</p>
            <p className="text-white/60 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 rounded-full bg-primary hover:bg-primary/80 transition text-sm font-semibold"
            >
              Try Again
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 text-white/50 bg-secondary/10 rounded-3xl ring-1 ring-white/5">
            <Coffee className="h-12 w-12 mx-auto mb-4 stroke-1 text-accent" />
            <p className="font-semibold text-lg">No coffee matches your search.</p>
            <p className="text-sm text-white/40 mt-1">Try tweaking your search or filtering keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => {
              const qty = quantities[item.id] || 1;
              const isAdded = addedItems[item.id] || false;
              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-3xl bg-secondary/25 p-5 ring-1 ring-white/10 hover:ring-accent/40 hover:bg-secondary/35 transition-all duration-500 hover:shadow-[0_15px_30px_-5px_rgba(39,12,3,0.8)] shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div>
                    {/* Item Image Container */}
                    <div className="relative overflow-hidden rounded-2xl aspect-square w-full mb-5 bg-brand-dark/50">
                      <img
                        src={getCoffeeImage(item.id)}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {item.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-md text-accent text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full ring-1 ring-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Content */}
                    <h3 className="font-sans text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed line-clamp-2 min-h-[40px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing and Cart Interface */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-white/40 uppercase tracking-widest">Price</span>
                        <span className="text-xl font-extrabold text-accent">₹{item.price}</span>
                      </div>

                      {/* Quantity Toggler */}
                      <div className="flex items-center bg-brand-dark/60 rounded-full py-1 px-2.5 ring-1 ring-white/10">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 text-white/60 hover:text-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 text-white/60 hover:text-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className={`w-full flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold tracking-wide transition-all duration-300 ring-1 shadow-inner ${
                        isAdded
                          ? 'bg-emerald-600 text-white ring-emerald-500'
                          : 'bg-primary hover:bg-primary/95 text-white ring-white/10 hover:ring-accent/40'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-4 w-4" /> Added to Order
                        </>
                      ) : (
                        <>
                          <Coffee className="h-4 w-4" /> Add to Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
