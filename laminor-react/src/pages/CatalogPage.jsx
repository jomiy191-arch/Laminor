import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { MdShoppingCart, MdTune, MdFavorite, MdFavoriteBorder, MdWhatshot, MdAutoAwesome, MdRefresh, MdVerifiedUser, MdRemoveRedEye } from 'react-icons/md';

const BADGE_MAP = { 
  hot: [<MdWhatshot />, 'Top'], 
  new: [<MdAutoAwesome />, 'Yangi'], 
  sale: ['−15%', 'Chegirma'], 
  eco: [<MdVerifiedUser />, 'Ekologik'] 
};

function FilterOpt({ label, count, active, onClick }) {
  return (
    <div className={`fopt ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="fcheck">{active && <span className="text-[9px] text-white font-bold">✓</span>}</div>
      <span className="text-[12px] font-medium">{label}</span>
      {count !== undefined && <span className="ml-auto text-[10px] opacity-60 bg-black/5 dark:bg-white/5 px-[7px] py-[2px] rounded-full">{count}</span>}
    </div>
  );
}

function ProductCard({ p, onAdd, added, liked, onLike, onView }) {
  const { t, darkMode } = useCart();
  return (
    <div className="bg-[var(--card-bg)] rounded-[14px] overflow-hidden border border-[var(--border-color)] transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] relative">
      <div className="absolute top-[10px] left-[10px] z-[2] flex flex-col gap-1">
        {p.badges.map(b => (
          <span key={b} className={`badge ${b === 'hot' ? 'badge-hot' : b === 'new' ? 'badge-new' : b === 'sale' ? 'badge-sale' : b === 'eco'} flex items-center gap-1`}>
            {BADGE_MAP[b][0]} {BADGE_MAP[b][1]}
          </span>
        ))}
      </div>
      <div className="absolute top-[10px] right-[10px] z-[2] flex flex-col gap-2">
        <button onClick={onLike} className={`w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer text-[16px] shadow-sm border-none hover:scale-[1.15] transition-transform ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
          {liked ? <MdFavorite className="text-red-500" /> : <MdFavoriteBorder className="opacity-40" />}
        </button>
        <button onClick={onView} className={`w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer text-[16px] shadow-sm border-none hover:scale-[1.15] transition-transform text-[#2563FF] ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
          <MdRemoveRedEye />
        </button>
      </div>
      <div className="h-[180px] grid grid-cols-4 grid-rows-3 gap-[1.5px] bg-[#ccc] dark:bg-white/10 cursor-pointer" onClick={onView}>
        {p.cells.map(([c1,c2],i) => <div key={i} className="fp-cell" style={{ background:`linear-gradient(175deg,${c1},${c2})` }} />)}
      </div>
      <div className="px-[14px] pt-[12px] pb-[14px]">
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#2563FF] mb-[5px]">{p.cat}</div>
        <div className="text-[15px] font-extrabold mb-[2px] leading-[1.2]">{p.name}</div>
        <div className="text-[10px] opacity-50 mb-2 font-medium">{p.dims}</div>
        <div className="flex flex-wrap gap-1 mb-[14px]">
          {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
        <div className="flex items-center justify-between pt-[10px] border-t border-[var(--border-color)]">
          <div>
            {p.oldPrice && <div className="text-[10px] opacity-40 line-through">{p.oldPrice.toLocaleString()}</div>}
            <div className="text-[18px] font-black tracking-[-0.02em] leading-none">{p.price.toLocaleString()} <span className="text-[10px] font-medium opacity-50">so'm</span></div>
          </div>
          <button onClick={() => onAdd(p)}
            className={`flex items-center gap-[5px] px-4 py-[9px] border-none rounded-lg text-[11px] font-bold cursor-pointer transition-all text-white ${added?'bg-[#16A34A]':'bg-[#2563FF] hover:bg-[#1A4FE8] hover:scale-[1.04]'}`}>
            {added?"✓": <MdShoppingCart className="text-[16px]" />} {added?t('added'):t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage({ setPage, setSelectedProduct }) {
  const { addToCart, wishlist, toggleWishlist, t, searchQuery, darkMode } = useCart();
  const [addedMap, setAddedMap] = useState({});
  const [isGrid, setIsGrid]     = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [thickFilter, setThickFilter] = useState([]);
  
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.cat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchThick  = thickFilter.length === 0 || thickFilter.some(f => p.cat.includes(f));
      return matchSearch && matchThick;
    });
  }, [searchQuery, thickFilter]);

  const handleAdd = (p) => {
    addToCart(p);
    setAddedMap(m => ({ ...m, [p.id]:true }));
    setTimeout(() => setAddedMap(m => ({ ...m, [p.id]:false })), 1800);
  };

  const toggleFilter = (f) => {
    setThickFilter(prev => prev.includes(f) ? prev.filter(i => i !== f) : [...prev, f]);
  };

  return (
    <div className="pt-16 min-h-screen section-grey animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 px-4 sm:px-8 lg:px-16 py-10 lg:py-14" style={{ background:'linear-gradient(135deg,#2563FF 0%,#1A3FC4 60%,#0F2A8C 100%)' }}>
        <div className="relative z-[1]">
          <div className="inline-flex items-center gap-2 mb-[14px] px-[14px] py-[6px] rounded-full border border-white/20" style={{ background:'rgba(255,255,255,0.15)' }}>
            <div className="w-[7px] h-[7px] rounded-full bg-[#4ADE80]" />
            <span className="text-[11px] font-bold text-white tracking-[0.12em] uppercase">{t('catalog')} · Premium</span>
          </div>
          <div className="text-[28px] sm:text-[36px] lg:text-[40px] font-black text-white tracking-[-0.02em] leading-[1.1] mb-2">Laminor<br />Premium Pol</div>
        </div>
      </div>

      <div className={`lg:hidden px-4 py-3 border-b transition-colors duration-300 ${darkMode ? 'bg-[#121212] border-white/5' : 'bg-white border-[#E2DFD8]'}`}>
        <button onClick={() => setSidebarOpen(o=>!o)} className={`flex items-center gap-2 text-[13px] font-bold border px-4 py-2 rounded-lg transition-colors ${darkMode ? 'text-white bg-white/5 border-white/10' : 'text-[#0F0F0D] bg-[#F0EFEB] border-[#E2DFD8]'}`}>
          <MdTune /> {t('filter')} {sidebarOpen?'▲':'▼'}
        </button>
      </div>

      <div className="flex flex-col lg:grid" style={{ gridTemplateColumns:'260px 1fr' }}>
        <aside className={`px-5 py-6 lg:sticky lg:top-16 transition-colors duration-300 ${darkMode ? 'bg-[#121212] border-r border-white/5' : 'bg-white border-r border-[#E2DFD8]'} ${sidebarOpen?'block':'hidden lg:block'}`} style={{ maxHeight:'calc(100vh - 64px)', overflowY:'auto' }}>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 mb-6">Filtrlash</div>
          
          <div className="mb-8">
            <div className="text-[13px] font-bold mb-[12px] flex justify-between">Qalinlik <span className="text-[10px] font-semibold text-[#2563FF] cursor-pointer" onClick={() => setThickFilter([])}>Tozalash</span></div>
            <div className="flex flex-col gap-[6px]">
              {[['12mm','12 mm'],['10mm','10 mm'],['8mm','8 mm'],['0.8mm','0.8 mm SPC']].map(([val,lbl]) => (
                <FilterOpt key={val} label={lbl} active={thickFilter.includes(val)} onClick={() => toggleFilter(val)} />
              ))}
            </div>
          </div>

          <button onClick={() => {setThickFilter([]);}} className={`w-full py-[10px] border rounded-lg text-[12px] font-semibold transition-all mt-4 flex items-center justify-center gap-2 ${darkMode ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10' : 'bg-[#F0EFEB] border-[#E2DFD8] text-[#52504A] hover:bg-[#E2DFD8]'}`}>
            <MdRefresh /> Filtrlarni tozalash
          </button>
        </aside>

        <main className="p-4 sm:p-6">
          <div className="flex items-center gap-[10px] mb-6 flex-wrap">
            <div className="text-[14px] font-bold mr-auto"><span className="text-[#2563FF]">{filteredProducts.length}</span> {t('items')}</div>
            <div className="flex gap-[2px]">
              {['⊞','☰'].map((ic,i) => (
                <button key={ic} onClick={() => setIsGrid(i===0)} className={`w-8 h-8 flex items-center justify-center border rounded-md text-[14px] transition-all ${isGrid===(i===0)?'bg-[#2563FF] border-[#2563FF] text-white':'bg-[var(--card-bg)] border-[var(--border-color)] opacity-50'}`}>{ic}</button>
              ))}
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 opacity-40">
              <MdRefresh className="text-[40px] mx-auto mb-4 opacity-20" />
              <div className="text-[16px] font-bold">Mahsulot topilmadi</div>
              <div className="text-[13px]">Boshqa parametrlar bilan qidirib ko'ring</div>
            </div>
          ) : (
            <div className={isGrid ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px]' : 'flex flex-col gap-[16px]'}>
              {filteredProducts.map(p => (
                <ProductCard 
                  key={p.id} 
                  p={p} 
                  onAdd={handleAdd} 
                  added={addedMap[p.id]} 
                  liked={wishlist.some(i => i.id === p.id)} 
                  onLike={() => toggleWishlist(p)} 
                  onView={() => { setSelectedProduct(p); setPage('product-detail'); }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
