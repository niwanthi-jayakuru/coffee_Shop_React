import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MapPin, User, Phone, FileText, CheckCircle2, Loader2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced
}) {
  const [deliveryMode, setDeliveryMode] = useState('pickup'); // 'pickup' | 'delivery'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, current) => acc + current.item.price * current.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    if (deliveryMode === 'delivery' && !address.trim()) {
      setError('Please enter your delivery address.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        notes: notes.trim() || undefined,
        items: cartItems.map(c => ({
          itemId: c.item.id,
          quantity: c.quantity
        }))
      };

      if (deliveryMode === 'delivery') {
        payload.address = address.trim();
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || `Checkout failed (${res.status})`);
      }

      const data = await res.json();
      setPlacedOrder(data.order);
      onClearCart();
      if (onOrderPlaced) {
        onOrderPlaced();
      }
    } catch (err) {
      setError(err.message || 'Something went wrong while placing your order.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setPlacedOrder(null);
    setName('');
    setPhone('');
    setAddress('');
    setNotes('');
    setDeliveryMode('pickup');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div 
          onClick={placedOrder ? handleCloseSuccess : onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300" 
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
            <div className="flex h-full flex-col bg-secondary border-l border-white/10 shadow-2xl">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2" id="slide-over-title">
                  <ShoppingBag className="h-5 w-5 text-accent" />
                  {placedOrder ? 'Order Confirmed!' : 'Your Order'}
                </h2>
                <button
                  type="button"
                  onClick={placedOrder ? handleCloseSuccess : onClose}
                  className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Order Success Screen */}
              {placedOrder ? (
                <div className="flex-1 overflow-y-auto px-6 py-8 text-center flex flex-col justify-center items-center">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20 animate-bounce">
                    <CheckCircle2 className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-2">Thank you, {placedOrder.name}!</h3>
                  <p className="text-white/60 text-sm mb-6 max-w-xs">
                    Your order has been received and is being prepared with love.
                  </p>

                  <div className="w-full bg-brand-dark/40 rounded-2xl p-5 border border-white/10 text-left space-y-4 mb-8">
                    <div className="flex justify-between text-xs text-white/50 border-b border-white/5 pb-2">
                      <span>Order ID</span>
                      <span className="font-mono text-white/80">{placedOrder.id}</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-wider block">Items Summary</span>
                      <ul className="text-sm space-y-1.5 text-white/80">
                        {placedOrder.items?.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{item.itemId} <span className="text-white/40 text-xs">x{item.quantity}</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/5 font-bold">
                      <span className="text-white">Total Paid</span>
                      <span className="text-accent text-lg">₹{placedOrder.total}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseSuccess}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
                  >
                    Got it, Brew More!
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items list */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {cartItems.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center text-center text-white/40">
                        <ShoppingBag className="h-14 w-14 mb-4 text-white/20 stroke-1" />
                        <p className="text-lg font-semibold text-white/60">Your cart is empty</p>
                        <p className="text-sm mt-1">Browse our menu and add some delicious brews!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs text-white/40 uppercase tracking-wider font-semibold">
                          <span>Items</span>
                          <button 
                            onClick={onClearCart} 
                            className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 hover:underline"
                          >
                            <Trash2 className="h-3 w-3" /> Clear Cart
                          </button>
                        </div>
                        <ul className="divide-y divide-white/5">
                          {cartItems.map(({ item, quantity }) => (
                            <li key={item.id} className="flex py-4 gap-4 items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-bold text-white text-sm sm:text-base leading-snug">{item.name}</h4>
                                <p className="text-xs text-accent mt-0.5">₹{item.price} each</p>
                              </div>

                              <div className="flex items-center gap-4">
                                {/* Quantity buttons */}
                                <div className="flex items-center bg-brand-dark/40 rounded-full py-1 px-2 border border-white/5">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="p-0.5 text-white/50 hover:text-white"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-5 text-center text-xs font-bold text-white">{quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="p-0.5 text-white/50 hover:text-white"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <span className="font-bold text-white text-sm w-12 text-right">
                                  ₹{item.price * quantity}
                                </span>

                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-white/40 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Checkout Form & Total (only if cart has items) */}
                  {cartItems.length > 0 && (
                    <div className="border-t border-white/10 bg-brand-dark/30 px-6 py-6">
                      
                      {/* Total */}
                      <div className="flex justify-between items-center text-base font-bold text-white mb-6">
                        <span>Subtotal</span>
                        <span className="text-accent text-xl">₹{total}</span>
                      </div>

                      {/* Checkout Details Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Checkout Details</h4>
                        
                        {/* Delivery Option Toggle */}
                        <div className="flex p-1 bg-brand-dark/60 rounded-full border border-white/5">
                          <button
                            type="button"
                            onClick={() => setDeliveryMode('pickup')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
                              deliveryMode === 'pickup' 
                                ? 'bg-primary text-white' 
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            Cafe Pickup
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryMode('delivery')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
                              deliveryMode === 'delivery' 
                                ? 'bg-primary text-white' 
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            Home Delivery
                          </button>
                        </div>

                        {/* Name */}
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="text"
                            placeholder="Your Name *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-brand-dark/50 hover:bg-brand-dark/70 focus:bg-brand-dark text-white text-sm rounded-xl pl-10 pr-4 py-2.5 border border-white/5 focus:border-accent focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="tel"
                            placeholder="Phone Number *"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full bg-brand-dark/50 hover:bg-brand-dark/70 focus:bg-brand-dark text-white text-sm rounded-xl pl-10 pr-4 py-2.5 border border-white/5 focus:border-accent focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Address (If Delivery) */}
                        {deliveryMode === 'delivery' && (
                          <div className="relative animate-fadeIn">
                            <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                            <textarea
                              placeholder="Delivery Address *"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                              rows={2}
                              className="w-full bg-brand-dark/50 hover:bg-brand-dark/70 focus:bg-brand-dark text-white text-sm rounded-xl pl-10 pr-4 py-2.5 border border-white/5 focus:border-accent focus:outline-none transition-colors resize-none"
                            />
                          </div>
                        )}

                        {/* Notes */}
                        <div className="relative">
                          <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                          <textarea
                            placeholder="Instructions (e.g. choice of milk, sweetness level)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                            className="w-full bg-brand-dark/50 hover:bg-brand-dark/70 focus:bg-brand-dark text-white text-sm rounded-xl pl-10 pr-4 py-2.5 border border-white/5 focus:border-accent focus:outline-none transition-colors resize-none"
                          />
                        </div>

                        {error && (
                          <p className="text-red-400 text-xs font-semibold px-1">{error}</p>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-brand-dark font-extrabold py-3 px-6 rounded-full transition-all duration-300 shadow-md cursor-pointer disabled:cursor-not-allowed mt-2"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Placing Order...
                            </>
                          ) : (
                            `Place ${deliveryMode === 'delivery' ? 'Delivery' : 'Pickup'} Order`
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
