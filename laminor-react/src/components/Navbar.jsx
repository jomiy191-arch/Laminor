import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MdShoppingCart, MdMenu, MdClose, MdSearch, MdFavorite, MdDarkMode, MdLightMode, MdTranslate } from 'react-icons/md';

const LaminorLogo = ({ darkMode }) => (
  <svg viewBox="0 0 100 100" fill="none" className="w-[30px] h-[30px] flex-shrink-0">
    <g transform="rotate(45,50,50)">
      <rect x="12" y="12" width="76" height="76" fill={darkMode ? 'white' : '#0F0F0D'} rx="2"/>
      <rect x="21" y="21" width="58" height="58" fill={darkMode ? '#0F0F0D' : 'white'} rx="1"/>
      <rect x="32" y="32" width="36" height="36" fill={darkMode ? 'white' : '#0F0F0D'} rx="1"/>
      <rect x="42" y="42" width="16" height="16" fill={darkMode ? '#0F0F0D' : 'white'} rx="1"/>
    </g>
  </svg>
);

export default function Navbar({ page, setPage }) {
  const { total, toggleCart, wishlist, t, lang, switchLang, darkMode, toggleDarkMode, searchQuery, setSearchQuery } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langMenu, setLangMenu] = useState(false);

  const links = [
    { id: 'home', label: t('home') },
    { id: 'catalog', label: t('catalog') },
    { id: 'about', label: t('about') },
    { id: 'contact', label: t('contact') },
  ];

  const languages = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  const goto = (id) => { setPage(id); setMenuOpen(false); };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[999] h-16 flex items-center px-4 sm:px-6 lg:px-10 border-b transition-colors duration-300 ${darkMode ? 'bg-[#0F0F0D] border-white/5' : 'bg-white border-[#E2DFD8]'}`}>
        <div className="flex items-center gap-[10px] cursor-pointer flex-shrink-0" onClick={() => goto('home')}>
          <LaminorLogo darkMode={darkMode} />
          <span className={`hidden sm:inline text-[14px] sm:text-[16px] font-extrabold tracking-[0.22em] uppercase ${darkMode ? 'text-white' : 'text-[#0F0F0D]'}`}>Laminor</span>
        </div>

        <ul className="hidden lg:flex list-none h-16 ml-10">
          {links.map(l => (
            <li key={l.id} className="flex">
              <a className={`nav-link ${page === l.id ? 'active' : ''} ${darkMode ? 'text-white/50' : 'text-[#0F0F0D]/50 hover:text-[#0F0F0D]'}`} onClick={() => goto(l.id)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <div className={`relative flex items-center ${searchOpen ? 'w-[150px] sm:w-[220px]' : 'w-10'} transition-all duration-300`}>
            <MdSearch className={`absolute left-3 text-[20px] cursor-pointer z-[2] ${darkMode ? 'text-white/50' : 'text-[#0F0F0D]/40'}`} onClick={() => setSearchOpen(!searchOpen)} />
            <input 
              type="text" 
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); if(page !== 'catalog') setPage('catalog'); }}
              className={`border-none outline-none rounded-full h-9 pl-10 pr-4 text-[13px] w-full transition-all duration-300 ${darkMode ? 'bg-white/10 text-white' : 'bg-[#F0EFEB] text-[#0F0F0D]'} ${searchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
          </div>

          {/* Lang Switcher */}
          <div className="relative">
            <button onClick={() => setLangMenu(!langMenu)} className={`w-10 h-10 flex items-center justify-center transition-colors text-[18px] ${darkMode ? 'text-white/60 hover:text-white' : 'text-[#0F0F0D]/60 hover:text-[#0F0F0D]'}`}>
              <MdTranslate />
              <span className="text-[10px] font-bold ml-1 uppercase">{lang}</span>
            </button>
            {langMenu && (
              <div className={`absolute top-12 right-0 rounded-lg overflow-hidden shadow-xl animate-fadeIn border ${darkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-[#E2DFD8]'}`}>
                {languages.map(l => (
                  <button key={l.code} onClick={() => { switchLang(l.code); setLangMenu(false); }} className={`block w-full px-5 py-3 text-[12px] font-bold text-left transition-colors ${lang === l.code ? 'text-[#2563FF]' : darkMode ? 'text-white/50 hover:bg-white/5' : 'text-[#0F0F0D]/50 hover:bg-[#F0EFEB]'}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleDarkMode} className={`w-10 h-10 flex items-center justify-center transition-colors text-[20px] ${darkMode ? 'text-white/60 hover:text-white' : 'text-[#0F0F0D]/60 hover:text-[#0F0F0D]'}`}>
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>

          <button onClick={() => goto('wishlist')} className={`relative w-10 h-10 flex items-center justify-center transition-colors text-[20px] ${darkMode ? 'text-white/60 hover:text-white' : 'text-[#0F0F0D]/60 hover:text-[#0F0F0D]'}`}>
            <MdFavorite className={wishlist.length > 0 ? 'text-red-500' : ''} />
            {wishlist.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0F0F0D]" />}
          </button>

          <button onClick={toggleCart} className="px-3 sm:px-[18px] h-10 bg-[#2563FF] border-none rounded-lg text-white text-[12px] font-bold cursor-pointer flex items-center gap-[7px] hover:bg-[#1A4FE8] transition-all active:scale-95 relative">
            <MdShoppingCart className="text-[18px]" />
            <span className="hidden sm:inline">{t('cart')}</span>
            <span className="absolute -top-[5px] -right-[5px] min-w-[18px] h-[18px] rounded-[9px] bg-[#FF5C1A] text-white text-[10px] font-extrabold flex items-center justify-center px-1 border-2 border-[#0F0F0D]">
              {total}
            </span>
          </button>

          <button onClick={() => setMenuOpen(o => !o)} className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border-none cursor-pointer text-[22px] ${darkMode ? 'bg-white/10 text-white' : 'bg-[#F0EFEB] text-[#0F0F0D]'}`}>
            {menuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={`fixed top-16 left-0 right-0 z-[998] border-t lg:hidden animate-fadeIn ${darkMode ? 'bg-[#0F0F0D] border-white/10' : 'bg-white border-[#E2DFD8]'}`}>
          {links.map(l => (
            <a key={l.id} onClick={() => goto(l.id)} className={`block px-6 py-4 text-[14px] font-semibold border-b cursor-pointer transition-colors ${page === l.id ? (darkMode ? 'text-white bg-white/5' : 'text-[#2563FF] bg-[#F0EFEB]') : (darkMode ? 'text-white/50 hover:text-white' : 'text-[#0F0F0D]/50 hover:text-[#0F0F0D]')}`}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
