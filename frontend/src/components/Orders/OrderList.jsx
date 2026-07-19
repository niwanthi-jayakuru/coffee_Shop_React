import { useCallback, useEffect, useState } from "react";
import { Coffee, Clock, RefreshCw, User, Phone, MapPin, CheckCircle2 } from "lucide-react";

const ITEM_NAMES = {
  espresso: 'Espresso',
  americano: 'Americano',
  cappuccino: 'Cappuccino',
  'cold-brew': 'Cold Brew'
};

function getItemName(id) {
  return ITEM_NAMES[id] || id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatMoney(amount, currency = "INR") {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "-";
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(n);
  } catch {
    return `${n} ${currency}`;
  }
}

function formatTime(isoString) {
  if (!isoString) return "-";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;
  
  // Format as "HH:MM AM/PM - DD MMM"
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' + 
         d.toLocaleDateString([], { day: 'numeric', month: 'short' });
}

export default function OrderList({ refreshTrigger }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    await Promise.resolve();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setOrders(Array.isArray(data?.orders) ? data.orders : []);
    } catch (e) {
      setError(e?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  const createSampleOrder = useCallback(async () => {
    setCreating(true);
    setError("");
    try {
      const res = await fetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          phone: "9876543210",
          notes: "Extra hot with oat milk",
          items: [
            { itemId: "espresso", quantity: 1 },
            { itemId: "cappuccino", quantity: 2 },
          ],
        }),
      });
      if (!res.ok) throw new Error(`Create failed (${res.status})`);
      await load();
    } catch (e) {
      setError(e?.message || "Failed to create sample order");
    } finally {
      setCreating(false);
    }
  }, [load]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, [load, refreshTrigger]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'received':
        return 'text-amber-300 bg-amber-500/10 border-amber-500/20';
      case 'preparing':
        return 'text-sky-300 bg-sky-500/10 border-sky-500/20';
      case 'ready':
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20';
      default:
        return 'text-white/70 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="rounded-3xl bg-secondary/15 p-6 ring-1 ring-white/10 backdrop-blur-md sm:p-8">
      {/* Header Area */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h3 className="font-sans text-xl font-bold text-white flex items-center gap-2">
            <Coffee className="h-5 w-5 text-accent" />
            Live Orders Dashboard
          </h3>
          <p className="mt-1.5 text-xs text-white/50">
            Realtime tracking connected to server endpoint <span className="font-mono text-white/75 bg-brand-dark/50 px-2 py-0.5 rounded border border-white/5">GET /api/orders</span>
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={createSampleOrder}
            className="inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white border border-white/10 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            disabled={loading || creating}
          >
            {creating ? "Creating..." : "Simulate Demo Order"}
          </button>
          
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-5 py-2.5 text-xs font-bold text-white shadow-inner border border-white/10 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            disabled={loading}
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Refreshing..." : "Refresh Board"}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error ? (
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-950/20 px-4 py-4 text-sm text-red-200">
          <div className="font-bold flex items-center gap-2">⚠️ Could not load active orders</div>
          <div className="mt-1 text-red-200/70">{error}</div>
          <div className="mt-2 text-xs text-red-200/60">
            Ensure backend server is running on <span className="font-mono bg-black/45 px-1 py-0.5 rounded text-white/80">:8080</span>.
          </div>
        </div>
      ) : null}

      {/* Main Content Area */}
      {loading && orders.length === 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl bg-secondary/10 border border-white/5"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-8 text-center py-16 rounded-2xl bg-brand-dark/20 border border-dashed border-white/10 text-white/40">
          <CheckCircle2 className="h-10 w-10 mx-auto mb-3 stroke-1 text-white/30" />
          <p className="font-semibold">No active orders found.</p>
          <p className="text-xs mt-1 max-w-xs mx-auto">Place an order from the menu or simulate a demo order to see it populate here live!</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((o) => (
            <li
              key={o.id}
              className="flex flex-col justify-between rounded-2xl bg-secondary/20 p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg relative group"
            >
              <div>
                {/* Header ID and Status */}
                <div className="flex items-start justify-between gap-4">
                  <div className="font-mono text-[10px] text-white/40 bg-brand-dark/40 px-2 py-1 rounded border border-white/5">
                    {o.id.substring(4, 16)}...
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${getStatusStyle(o.status)}`}>
                    {o.status || "received"}
                  </span>
                </div>

                {/* Customer Details */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white text-base">
                    <User className="h-4 w-4 text-accent shrink-0" />
                    <span>{o.name}</span>
                  </div>

                  {o.phone && (
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Phone className="h-3 w-3 text-accent shrink-0" />
                      <span>{o.phone}</span>
                    </div>
                  )}

                  {o.address && (
                    <div className="flex items-start gap-2 text-xs text-white/60">
                      <MapPin className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{o.address}</span>
                    </div>
                  )}
                </div>

                {/* Items */}
                {Array.isArray(o.items) && o.items.length ? (
                  <div className="mt-5 border-t border-white/5 pt-4">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Ordered Items</span>
                    <ul className="mt-2 space-y-1.5 text-xs text-white/70">
                      {o.items.map((it, idx) => (
                        <li key={`${it.itemId}-${idx}`} className="flex justify-between items-center bg-brand-dark/30 rounded-lg px-3 py-1.5 border border-white/5">
                          <span className="font-medium text-white/80">{getItemName(it.itemId)}</span>
                          <span className="font-bold text-accent">x{it.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Instructions / Notes */}
                {o.notes && (
                  <div className="mt-3 bg-brand-dark/20 border border-white/5 rounded-lg p-2.5 text-xs text-white/50 italic leading-relaxed">
                    "{o.notes}"
                  </div>
                )}
              </div>

              {/* Footer pricing and time */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 uppercase tracking-wider">Amount Paid</span>
                  <span className="text-base font-extrabold text-accent">{formatMoney(o.total, o.currency || "INR")}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/40 text-right">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(o.createdAt)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
