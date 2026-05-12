import { useCart } from '../context/CartContext';
import { MdEmojiEvents, MdPeople, MdRocketLaunch, MdVerifiedUser } from 'react-icons/md';

const OAK_CELLS = [['#7a5c3d','#9a7a56'],['#6b5038','#8a6850'],['#8c6848','#a8845e'],['#5e4028','#7c5a3c'],['#a08060','#c0a080'],['#745435','#906848'],['#624830','#80604a'],['#8a6a4a','#a8845e'],['#543828','#705040'],['#9c7a58','#b89272'],['#6a4e35','#886250'],['#7e5e42','#9a7858'],['#7a5c3d','#9a7a56'],['#6b5038','#8a6850'],['#8c6848','#a8845e'],['#5e4028','#7c5a3c'],['#a08060','#c0a080'],['#745435','#906848'],['#624830','#80604a'],['#8a6a4a','#a8845e'],['#543828','#705040'],['#9c7a58','#b89272'],['#6a4e35','#886250'],['#7e5e42','#9a7858'],['#7a5c3d','#9a7a56'],['#6b5038','#8a6850'],['#8c6848','#a8845e'],['#5e4028','#7c5a3c'],['#a08060','#c0a080'],['#745435','#906848']];

export default function AboutPage({ setPage }) {
  const { t, darkMode } = useCart();
  return (
    <div className="pt-16 min-h-screen section-grey animate-fadeIn transition-colors duration-300">
      {/* Hero */}
      <div className={`px-4 sm:px-8 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-[#080808]' : 'bg-[#1a1a1a]'}`}>
        <div className="relative z-[1]">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-[6px] rounded-full border border-[#2563FF]/30 bg-[#2563FF]/10">
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#2563FF]">{t('about')}</span>
          </div>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-black text-white leading-[1.0] tracking-[-0.03em] mb-5">
            Har bir uyda<br /><span className="text-[#2563FF]">qulaylik</span><br />yaratamiz
          </h1>
          <p className="text-[14px] sm:text-[15px] text-white/50 leading-[1.8] mb-10">13 yildan ortiq tajriba bilan biz minglab mijozlarga ishonchli va nafis pol qoplamalarini etkazib beramiz.</p>
          <div className="flex gap-3 flex-wrap">
            <button className="btn-blue" onClick={() => setPage('catalog')}>{t('catalog')}</button>
            <button className="btn-ghost-w" onClick={() => setPage('contact')}>{t('contact')}</button>
          </div>
        </div>
        <div className="relative z-[1] grid grid-cols-2 gap-3">
          {[['13+','Yil bozorda'],['AC5','Sertifikat'],['860','kg/m³'],['3+','Kolleksiya']].map(([val,lbl]) => (
            <div key={lbl} className="rounded-2xl px-6 py-7 bg-white/5 border border-white/10">
              <div className="text-[32px] sm:text-[40px] font-black text-white leading-none mb-[6px] tracking-[-0.02em]">
                {val === 'AC5' ? <><span className="text-[#2563FF]">AC</span>5</> : <>{val.replace('+','')}{val.includes('+') && <span className="text-[#2563FF]">+</span>}</>}
              </div>
              <div className="text-[11px] text-white/40 tracking-[0.1em] font-semibold">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <section className="px-4 sm:px-8 lg:px-16 py-12 lg:py-20 section-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="rounded-[20px] overflow-hidden h-[280px] sm:h-[360px] lg:h-[420px] grid grid-cols-5 grid-rows-6 gap-px bg-[#ccc] dark:bg-white/10">
            {OAK_CELLS.map(([c1,c2],i) => <div key={i} style={{ background:`linear-gradient(175deg,${c1},${c2})` }} />)}
          </div>
          <div>
            <div className="sh-tag inline-flex"><div className="sh-tag-dot" /><span className="sh-tag-txt">Missiyamiz</span></div>
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-black tracking-[-0.02em] mb-5 leading-[1.1]">Barqarorlik, <span className="text-[#2563FF]">sifat</span> va ishonch</h2>
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[[<MdEmojiEvents />,'Sifat standarti'],[<MdVerifiedUser />,'Ekologik'],[<MdPeople />,'Uzoq munosabat'],[<MdRocketLaunch />,'Innovatsiya']].map(([ic,t]) => (
                <div key={t} className="why-card p-5">
                  <div className="text-[28px] mb-3 text-[#2563FF]">{ic}</div>
                  <div className="text-[13px] font-extrabold">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
