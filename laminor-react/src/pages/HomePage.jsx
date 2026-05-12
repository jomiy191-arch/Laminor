import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { MdShoppingCart, MdArrowForward, MdVerifiedUser, MdWorkspacePremium, MdWbSunny, MdEco } from 'react-icons/md';
import { FiInstagram, FiSend } from 'react-icons/fi';

const WALL_COLS = ['#7a5c3d','#6b5038','#8c6848','#5e4028','#a08060','#745435','#624830','#8a6a4a','#543828','#9c7a58','#6a4e35','#7e5e42','#86644c','#4e3420','#b29070','#705240','#5c4030','#9a7258','#64482c','#7c5a3c','#8a6a50','#503c28','#c0a080'];

export const Footer = ({ setPage, t }) => (
  <footer className="bg-[#0F0F0D] dark:bg-[#080808] px-4 sm:px-8 lg:px-16 pt-10 lg:pt-14 pb-6 transition-colors duration-300">
    <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-[60px] mb-10">
      <div className="col-span-2 lg:col-span-1">
        <div className="flex items-center gap-[10px] mb-[14px]">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none"><g transform="rotate(45,50,50)"><rect x="12" y="12" width="76" height="76" fill="white" rx="2"/><rect x="21" y="21" width="58" height="58" fill="#0F0F0D" rx="1"/><rect x="32" y="32" width="36" height="36" fill="white" rx="1"/><rect x="42" y="42" width="16" height="16" fill="#0F0F0D" rx="1"/></g></svg>
          <span className="text-[16px] font-extrabold tracking-[0.22em] uppercase text-white">Laminor</span>
        </div>
        <p className="text-[13px] text-white/35 leading-[1.8] mb-5">{t('footer_text')}</p>
        <div className="flex gap-2">
          {[<FiSend />, <FiInstagram />].map((ic,i)=>(
            <div key={i} className="w-9 h-9 rounded-[9px] bg-white/[0.07] border border-white/10 flex items-center justify-center text-[16px] text-white/60 cursor-pointer hover:bg-[#2563FF] hover:border-[#2563FF] hover:text-white transition-all">{ic}</div>
          ))}
        </div>
      </div>
      {[
        { head: t('home'), links: [['home', t('home')],['catalog', t('catalog')],['about', t('about')],['contact', t('contact')]] },
        { head: t('catalog'), links: [['catalog','Classic Oak'],['catalog','Grey Beton'],['catalog','Natural Ash'],['catalog','Dark Wenge']] },
        { head: t('contact'), links: [[null,'+998 XX XXX XX XX'],[null,'info@laminor.uz'],[null,'Toshkent'],['contact', t('send')]] },
      ].map(col => (
        <div key={col.head}>
          <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/35 mb-4">{col.head}</div>
          <ul className="list-none flex flex-col gap-[10px]">
            {col.links.map(([pg, lbl]) => (
              <li key={lbl}><a onClick={() => pg && setPage(pg)} className="text-[13px] text-white/50 no-underline cursor-pointer hover:text-white transition-colors">{lbl}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-white/[0.07] pt-6 text-center text-[11px] text-white/25">
      © 2026 Laminor.uz — Barcha huquqlar himoyalangan
    </div>
  </footer>
);

export default function HomePage({ setPage }) {
  const { addToCart, t, darkMode } = useCart();
  const wallRef = useRef(null);
  const [addedMap, setAddedMap] = useState({});

  useEffect(() => {
    if (!wallRef.current) return;
    wallRef.current.innerHTML = '';
    for (let i = 0; i < 54; i++) {
      const d = document.createElement('div');
      d.className = 'fw-cell';
      d.style.background = `linear-gradient(175deg,${WALL_COLS[i % WALL_COLS.length]},${WALL_COLS[(i + 3) % WALL_COLS.length]})`;
      wallRef.current.appendChild(d);
    }
  }, []);

  const handleAddToCart = (p) => {
    addToCart(p);
    setAddedMap(m => ({ ...m, [p.id]: true }));
    setTimeout(() => setAddedMap(m => ({ ...m, [p.id]: false })), 1800);
  };

  return (
    <div className="pt-16 min-h-screen animate-fadeIn transition-colors duration-300">
      {/* HERO SECTION - Light rejimda och rangga o'tkazildi */}
      <section className={`min-h-[calc(100vh-64px)] flex flex-col lg:grid overflow-hidden relative transition-colors duration-500 ${darkMode ? 'bg-[#0F0F0D]' : 'bg-[#F0EFEB]'}`} style={{ gridTemplateColumns:'1fr 1fr' }}>
        <div className="px-6 sm:px-10 lg:px-[64px] py-12 lg:py-20 flex flex-col justify-center relative z-[2]">
          <div className="inline-flex items-center gap-2 mb-6 w-fit px-4 py-[7px] rounded-full border border-[rgba(37,99,255,0.35)] bg-[rgba(37,99,255,0.1)]">
            <div className="w-[7px] h-[7px] rounded-full bg-[#4ADE80]" />
            <span className={`text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase ${darkMode ? 'text-white/85' : 'text-[#2563FF]'}`}>Toshkent · Premium · 13+</span>
          </div>
          <h1 className={`text-[48px] sm:text-[60px] lg:text-[72px] font-black leading-[1.0] tracking-[-0.03em] mb-2 ${darkMode ? 'text-white' : 'text-[#0F0F0D]'}`}>
            <span className="block" style={{ WebkitTextStroke: darkMode ? '1.5px rgba(255,255,255,0.35)' : '1.5px rgba(0,0,0,0.1)', color:'transparent' }}>Premium</span>
            {t('home')} <br /><span className="text-[#2563FF]">{t('catalog')}</span>
          </h1>
          <p className={`text-[11px] sm:text-[13px] tracking-[0.2em] uppercase mb-6 font-medium ${darkMode ? 'text-white/35' : 'text-[#9A978E]'}`}>{t('hero_subtitle')}</p>
          <p className={`text-[14px] sm:text-[15px] leading-[1.8] max-w-[420px] mb-10 ${darkMode ? 'text-white/50' : 'text-[#52504A]'}`}>{t('hero_desc')}</p>
          <div className="flex gap-3 flex-wrap mb-10">
            <button className="btn-blue flex items-center gap-2" onClick={() => setPage('catalog')}>{t('catalog')} <MdArrowForward /></button>
            <button className={`${darkMode ? 'btn-ghost-w' : 'px-8 py-4 bg-white text-[#0F0F0D] border border-[#E2DFD8] rounded-xl text-[13px] font-bold cursor-pointer transition-all hover:bg-[#F0EFEB]'}`} onClick={() => setPage('about')}>{t('about')}</button>
          </div>
        </div>
        <div className="relative overflow-hidden hidden lg:block">
          <div ref={wallRef} className={`grid h-full p-[2px] gap-[2px] ${darkMode ? 'bg-[#1a1a18]' : 'bg-[#E2DFD8]'}`} style={{ gridTemplateColumns:'repeat(6,1fr)', gridTemplateRows:'repeat(9,1fr)' }} />
          <div className="absolute inset-0" style={{ background:`linear-gradient(to right, ${darkMode ? '#0F0F0D' : '#F0EFEB'} 0%,transparent 30%,transparent 70%, ${darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)'} 100%)` }} />
        </div>
      </section>

      {/* WHY US */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 lg:py-[100px] section-white">
        <div className="text-center mb-10 lg:mb-16">
          <div className="sh-tag inline-flex"><div className="sh-tag-dot" /><span className="sh-tag-txt">{t('why_us')}</span></div>
          <h2 className="sh-title text-[32px] sm:text-[40px] lg:text-[44px]">{t('why_title')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon:<MdVerifiedUser />, title:t('wp_title'), desc:t('wp_desc') },
            { icon:<MdWorkspacePremium />, title:t('ac5_title'), desc:t('ac5_desc') },
            { icon:<MdEco />, title:t('eco_title'), desc:t('eco_desc') },
            { icon:<MdWbSunny />, title:t('heat_title'), desc:t('heat_desc') },
          ].map(c => (
            <div key={c.title} className="why-card">
              <div className="text-[32px] mb-4 text-[#2563FF]">{c.icon}</div>
              <div className="text-[15px] font-extrabold mb-2">{c.title}</div>
              <div className="text-[13px] opacity-60 leading-[1.7]">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 lg:py-[100px] section-grey">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[11px] font-bold tracking-[0.25em] uppercase opacity-40 mb-2">{t('catalog')}</div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-black tracking-[-0.02em]">{t('popular')}</h2>
          </div>
          <button onClick={() => setPage('catalog')} className="px-7 py-3 bg-white dark:bg-white/5 border border-[var(--border-color)] rounded-[10px] text-[12px] font-bold flex items-center gap-[6px] shadow-sm">
            {t('view_all')} <MdArrowForward />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.slice(0,3).map(p => (
            <div key={p.id} className="bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-[var(--border-color)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]">
              <div className="h-[200px] grid grid-cols-4 grid-rows-3 gap-[1.5px] bg-[#ccc] dark:bg-white/10">
                {p.cells.map(([c1,c2],i) => <div key={i} style={{ background:`linear-gradient(175deg,${c1},${c2})` }} />)}
              </div>
              <div className="p-5">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2563FF] mb-[6px]">{p.cat}</div>
                <div className="text-[17px] font-extrabold mb-1">{p.name}</div>
                <div className="text-[11px] opacity-50 mb-[14px]">{p.dims}</div>
                <div className="flex justify-between items-center">
                  <div className="text-[18px] font-black tracking-[-0.02em]">{p.price.toLocaleString()} <span className="text-[11px] font-medium opacity-50">so'm/m²</span></div>
                  <button onClick={() => handleAddToCart(p)} className="px-5 py-[9px] bg-[#2563FF] text-white border-none rounded-lg text-[12px] font-bold cursor-pointer hover:bg-[#1A4FE8] transition-colors flex items-center gap-2">
                    {addedMap[p.id] ? "✓" : <MdShoppingCart className="text-[16px]" />} {addedMap[p.id] ? t('added') : t('addToCart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREE CONSULTATION CTA */}
      <section className="px-4 sm:px-8 lg:px-16 pb-16 lg:pb-[100px] section-grey">
        <div className="bg-[#2563FF] rounded-[32px] p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px]" />
          <div className="relative z-[1] max-w-[600px] text-center lg:text-left">
            <h2 className="text-[32px] sm:text-[44px] font-black text-white leading-[1.1] mb-6">
              Bepul konsultatsiya<br />oling bugun!
            </h2>
            <p className="text-white/70 text-[15px] sm:text-[17px] leading-[1.8]">
              Mutaxassislarimiz sizga uy uchun eng mos pol qoplamani tanlashda yordam beradi. 13+ yillik tajriba.
            </p>
          </div>
          <div className="relative z-[1] flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => setPage('contact')} className="h-[64px] px-10 bg-white text-[#2563FF] rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 hover:bg-[#F0EFEB] transition-all active:scale-95">
              Bog'lanish <MdArrowForward />
            </button>
            <button onClick={() => setPage('catalog')} className="h-[64px] px-10 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[15px] flex items-center justify-center hover:bg-white/20 transition-all active:scale-95">
              Katalog
            </button>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} t={t} />
    </div>
  );
}
