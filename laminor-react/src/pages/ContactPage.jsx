import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MdPhone, MdEmail, MdLocationOn, MdSend, MdAccessTime } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { t, darkMode, sendToTelegram } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const message = `
📩 <b>Yangi Xabar!</b> (Bog'lanish)
━━━━━━━━━━━━━
👤 <b>Mijoz:</b> ${formData.name}
📞 <b>Tel:</b> ${formData.phone}
📝 <b>Mavzu:</b> ${formData.subject}
💬 <b>Xabar:</b> ${formData.message}
    `;

    const success = await sendToTelegram(message);
    if (success) {
      alert("Xabaringiz yuborildi! Tezgunda siz bilan bog'lanamiz.");
      setFormData({ name: '', phone: '', subject: '', message: '' });
    } else {
      alert("Xatolik! Qaytadan urinib ko'ring.");
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-16 min-h-screen section-grey transition-colors duration-300"
    >
      <div className="px-4 sm:px-8 lg:px-16 py-10 lg:py-20">
        <div className="text-center mb-10 lg:mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="sh-tag inline-flex"
          >
            <div className="sh-tag-dot" /><span className="sh-tag-txt">{t('contact')}</span>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[32px] sm:text-[44px] lg:text-[52px] font-black tracking-[-0.02em]"
          >
            Sizga qanday <span className="text-[#2563FF]">yordam</span> beramiz?
          </motion.h1>
          <p className="opacity-60 text-[15px] mt-4 max-w-[500px] mx-auto leading-[1.7]">Savollaringiz bormi? Biz bilan bog'laning va biz sizga eng yaxshi yechimni taklif qilamiz.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-10">
          {/* Info Cards */}
          <div className="space-y-4">
            {[
              { ic:<MdPhone />, t:'Telefon', v:'+998 XX XXX XX XX', s:'Dush-Shan: 9:00 - 18:00' },
              { ic:<MdEmail />, t:'Email', v:'info@laminor.uz', s:'24/7 online qo\'llab-quvvatlash' },
              { ic:<MdLocationOn />, t:'Manzil', v:'Toshkent shahri, Chilonzor tumani', s:'Asosiy ko\'rgazma zali' },
              { ic:<MdAccessTime />, t:'Ish vaqti', v:'09:00 - 18:00', s:'Yakshanba - dam olish kuni' }
            ].map((i, idx) => (
              <motion.div 
                key={i.t} 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="why-card p-6 flex items-center gap-5"
              >
                <div className="w-12 h-12 bg-[#EEF2FF] dark:bg-[#2563FF]/10 rounded-xl flex items-center justify-center text-[24px] text-[#2563FF]">{i.ic}</div>
                <div>
                  <div className="text-[12px] font-bold opacity-40 uppercase tracking-wider mb-1">{i.t}</div>
                  <div className="text-[15px] font-black mb-[2px]">{i.v}</div>
                  <div className="text-[12px] opacity-50 font-medium">{i.s}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--card-bg)] p-6 sm:p-10 rounded-[32px] border border-[var(--border-color)] shadow-sm"
          >
            <h2 className="text-[22px] font-black mb-8">Xabar yuborish</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold opacity-40 uppercase tracking-wider ml-1">Ismingiz</label>
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
                  <label className="text-[12px] font-bold opacity-40 uppercase tracking-wider ml-1">Telefon</label>
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
                <label className="text-[12px] font-bold opacity-40 uppercase tracking-wider ml-1">Mavzu</label>
                <input 
                  required 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`w-full h-14 border-none rounded-xl px-4 text-[14px] outline-none focus:ring-2 ring-[#2563FF] ${darkMode ? 'bg-white/5 text-white' : 'bg-[#F0EFEB] text-[#0F0F0D]'}`} 
                  placeholder="Sizni nima qiziqtirmoqda?" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold opacity-40 uppercase tracking-wider ml-1">Xabar</label>
                <textarea 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full h-32 border-none rounded-xl p-4 text-[14px] outline-none focus:ring-2 ring-[#2563FF] resize-none ${darkMode ? 'bg-white/5 text-white' : 'bg-[#F0EFEB] text-[#0F0F0D]'}`} 
                  placeholder="Xabaringizni yozing..."
                ></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full h-16 bg-[#2563FF] text-white rounded-2xl font-black text-[16px] flex items-center justify-center gap-3 hover:bg-[#1A4FE8] transition-all active:scale-[0.95] shadow-lg shadow-[#2563FF]/20">
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><MdSend /> Xabarni yuborish</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
