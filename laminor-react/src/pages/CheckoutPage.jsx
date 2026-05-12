import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MdShoppingCart, MdArrowBack, MdSend, MdVerifiedUser } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function CheckoutPage({ setPage }) {
  const { cart, grandTotal, t, darkMode, sendToTelegram, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const itemsText = cart.map(i => `• ${i.name} (${i.qty} m²) - ${i.price.toLocaleString()} so'm`).join('\n');
    const message = `
📦 <b>Yangi Buyurtma!</b>
━━━━━━━━━━━━━
👤 <b>Mijoz:</b> ${formData.name}
📞 <b>Tel:</b> ${formData.phone}
📍 <b>Manzil:</b> ${formData.address}
━━━━━━━━━━━━━
🛒 <b>Mahsulotlar:</b>
${itemsText}
━━━━━━━━━━━━━
💰 <b>Jami:</b> ${grandTotal.toLocaleString()} so'm
    `;

    const success = await sendToTelegram(message);
    
    if (success) {
      alert("Tabriklaymiz! Buyurtmangiz Telegram orqali yuborildi. Tezgunda operatorlarimiz bog'lanishadi.");
      clearCart();
      setPage('home');
    } else {
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    }
    setLoading(false);
  };

  if (cart.length === 0) return (
    <div className="pt-32 text-center section-grey min-h-screen">
      <div className="text-[18px] font-bold opacity-40 mb-4">Savat bo'sh</div>
      <button onClick={() => setPage('catalog')} className="btn-blue">Katalogga o'tish</button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-16 min-h-screen section-grey transition-colors duration-300"
    >
      <div className="px-4 sm:px-8 lg:px-16 py-10 lg:py-16">
        <button onClick={() => setPage('home')} className="flex items-center gap-2 text-[14px] font-bold opacity-50 hover:opacity-100 transition-all mb-8">
          <MdArrowBack /> Bosh sahifaga qaytish
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-14 items-start">
          {/* Order Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--card-bg)] p-6 sm:p-10 rounded-[32px] border border-[var(--border-color)] shadow-sm"
          >
            <h2 className="text-[24px] font-black mb-8">Buyurtmani rasmiylashtirish</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold opacity-40 uppercase tracking-wider ml-1">{t('name')}</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full h-14 border-none rounded-xl px-4 text-[14px] outline-none focus:ring-2 ring-[#2563FF] ${darkMode ? 'bg-white/5 text-white' : 'bg-[#F0EFEB] text-[#0F0F0D]'}`} 
                    placeholder="Ismingizni kiriting" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold opacity-40 uppercase tracking-wider ml-1">{t('phone')}</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full h-14 border-none rounded-xl px-4 text-[14px] outline-none focus:ring-2 ring-[#2563FF] ${darkMode ? 'bg-white/5 text-white' : 'bg-[#F0EFEB] text-[#0F0F0D]'}`} 
                    placeholder="+998" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold opacity-40 uppercase tracking-wider ml-1">{t('address')}</label>
                <input 
                  required 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={`w-full h-14 border-none rounded-xl px-4 text-[14px] outline-none focus:ring-2 ring-[#2563FF] ${darkMode ? 'bg-white/5 text-white' : 'bg-[#F0EFEB] text-[#0F0F0D]'}`} 
                  placeholder="Viloyat, shahar, tuman, ko'cha, uy..." 
                />
              </div>
              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full h-16 bg-[#2563FF] text-white rounded-2xl font-black text-[16px] flex items-center justify-center gap-3 hover:bg-[#1A4FE8] transition-all active:scale-[0.95] shadow-xl shadow-[#2563FF]/30">
                  {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><MdSend /> {t('buy')}</>}
                </button>
              </div>
              <p className="text-[12px] opacity-40 text-center flex items-center justify-center gap-1">
                 <MdVerifiedUser className="text-[#16A34A]" /> Buyurtmangiz xavfsiz va kafolatlangan
              </p>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-[var(--card-bg)] p-6 sm:p-8 rounded-[32px] border border-[var(--border-color)]">
               <h3 className="text-[18px] font-black mb-6 flex items-center gap-2"><MdShoppingCart className="text-[#2563FF]" /> Savatdagi mahsulotlar</h3>
               <div className="space-y-4 mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-[var(--border-color)]">
                       <div className="flex gap-3">
                          <div className="w-12 h-12 bg-[#ccc] dark:bg-white/10 rounded-lg overflow-hidden grid grid-cols-2 grid-rows-2">
                             {item.cells.slice(0,4).map(([c1,c2],i) => <div key={i} style={{ background:`linear-gradient(175deg,${c1},${c2})` }} />)}
                          </div>
                          <div>
                             <div className="text-[13px] font-bold">{item.name}</div>
                             <div className="text-[11px] opacity-50">{item.qty} m² x {item.price.toLocaleString()}</div>
                          </div>
                       </div>
                       <div className="text-[13px] font-extrabold">{(item.qty * item.price).toLocaleString()}</div>
                    </div>
                  ))}
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[14px] opacity-60"><span>Yetkazib berish:</span> <span>Bepul</span></div>
                  <div className="flex justify-between text-[20px] font-black pt-4 border-t border-[var(--border-color)]">
                     <span>{t('total')}:</span>
                     <span className="text-[#2563FF]">{grandTotal.toLocaleString()} so'm</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
