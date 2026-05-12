import { useCart } from '../context/CartContext';
import { MdShoppingCart, MdArrowBack, MdVerifiedUser, MdFavorite, MdFavoriteBorder, MdHistory } from 'react-icons/md';

export default function ProductDetailPage({ product, setPage }) {
  const { addToCart, wishlist, toggleWishlist, t, darkMode } = useCart();

  if (!product) return (
    <div className="pt-32 text-center section-grey min-h-screen">
      <div className="text-[18px] font-bold opacity-40 mb-4">Mahsulot topilmadi</div>
      <button onClick={() => setPage('catalog')} className="btn-blue">Katalogga qaytish</button>
    </div>
  );

  const isLiked = wishlist.some(i => i.id === product.id);

  return (
    <div className="pt-16 min-h-screen section-grey animate-fadeIn transition-colors duration-300">
      <div className="px-4 sm:px-8 lg:px-16 py-10 lg:py-20">
        <button onClick={() => setPage('catalog')} className="flex items-center gap-2 text-[14px] font-bold opacity-50 hover:opacity-100 transition-all mb-8">
          <MdArrowBack /> {t('back_to_catalog')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Image/Visual */}
          <div className="space-y-6">
            <div className="aspect-video grid grid-cols-6 grid-rows-4 gap-[2px] bg-[#ccc] dark:bg-white/10 rounded-3xl overflow-hidden shadow-xl">
              {product.cells.map(([c1,c2],i) => <div key={i} style={{ background:`linear-gradient(175deg,${c1},${c2})` }} />)}
            </div>
            <div className="grid grid-cols-3 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className="aspect-square bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] overflow-hidden opacity-40 hover:opacity-100 transition-all cursor-pointer">
                    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-[1px]">
                      {product.cells.slice(0,4).map(([c1,c2],idx) => <div key={idx} style={{ background:`linear-gradient(175deg,${c1},${c2})` }} />)}
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-[#2563FF]/10 text-[#2563FF] text-[12px] font-bold rounded-md uppercase tracking-wider">{product.cat}</span>
              <button onClick={() => toggleWishlist(product)} className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md border-none text-[22px] transition-all ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                {isLiked ? <MdFavorite className="text-red-500" /> : <MdFavoriteBorder className="opacity-40" />}
              </button>
            </div>
            <h1 className="text-[32px] sm:text-[44px] font-black tracking-[-0.03em] mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mb-8">
               <div className="text-[32px] font-black text-[#2563FF] tracking-tight">{product.price.toLocaleString()} <span className="text-[14px] font-medium opacity-50">so'm/m²</span></div>
               {product.oldPrice && <div className="text-[18px] opacity-30 line-through font-bold">{product.oldPrice.toLocaleString()}</div>}
            </div>

            <p className="opacity-60 leading-[1.8] text-[15px] mb-10">
              Laminor {product.name} — bu yuqori sifatli va zamonaviy pol qoplamasi bo'lib, har qanday interyer uchun mukammal mos keladi. AC5/33 sinfi bo'yicha mustahkamlik kafolatlanadi.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
               {[
                 { ic:<MdVerifiedUser />, t:'Sinf', v:'AC5 / 33' },
                 { ic:<MdHistory />, t:'Kafolat', v:'25 yil' },
                 { ic:<MdShoppingCart />, t:'Qalinlik', v:product.cat },
                 { ic:<MdVerifiedUser />, t:'Yadro', v:'HDF Green' }
               ].map(i => (
                 <div key={i.t} className="p-4 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] flex items-center gap-3">
                    <div className="text-[20px] text-[#2563FF] opacity-80">{i.ic}</div>
                    <div>
                      <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{i.t}</div>
                      <div className="text-[14px] font-black">{i.v}</div>
                    </div>
                 </div>
               ))}
            </div>

            <button onClick={() => addToCart(product)} className="w-full h-16 bg-[#2563FF] text-white rounded-2xl font-black text-[16px] flex items-center justify-center gap-3 hover:bg-[#1A4FE8] transition-all active:scale-95 shadow-xl shadow-[#2563FF]/30">
              <MdShoppingCart className="text-[22px]" /> {t('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
