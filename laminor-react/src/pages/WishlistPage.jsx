import { useCart } from '../context/CartContext';
import { MdShoppingCart, MdFavorite, MdRefresh, MdArrowBack } from 'react-icons/md';

export default function WishlistPage({ setPage, setSelectedProduct }) {
  const { wishlist, toggleWishlist, addToCart, t } = useCart();

  return (
    <div className="pt-16 min-h-screen section-grey animate-fadeIn transition-colors duration-300">
      <div className="px-4 sm:px-8 lg:px-16 py-10 lg:py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-[32px] sm:text-[40px] font-black tracking-[-0.02em]">{t('wishlist')}</h1>
            <p className="opacity-50 text-[14px] mt-2">{wishlist.length} {t('items')} saqlangan</p>
          </div>
          <button onClick={() => setPage('catalog')} className="flex items-center gap-2 text-[13px] font-bold opacity-60 hover:opacity-100 transition-opacity">
            <MdArrowBack /> {t('back_to_catalog')}
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 section-white rounded-[32px] border border-[var(--border-color)]">
            <MdFavorite className="text-[60px] mx-auto mb-4 opacity-10" />
            <div className="text-[18px] font-bold opacity-40">Sevimlilar ro'yxati bo'sh</div>
            <button onClick={() => setPage('catalog')} className="btn-blue mt-8">Xaridni boshlash</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlist.map(p => (
              <div key={p.id} className="bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-[var(--border-color)] transition-all relative">
                <button onClick={() => toggleWishlist(p)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-md border-none text-red-500">
                  <MdFavorite />
                </button>
                <div className="h-[160px] grid grid-cols-4 grid-rows-3 gap-[1px] bg-[#ccc] dark:bg-white/10 cursor-pointer" onClick={() => { setSelectedProduct(p); setPage('product-detail'); }}>
                  {p.cells.map(([c1,c2],i) => <div key={i} style={{ background:`linear-gradient(175deg,${c1},${c2})` }} />)}
                </div>
                <div className="p-4">
                  <div className="text-[15px] font-extrabold mb-1">{p.name}</div>
                  <div className="text-[16px] font-black text-[#2563FF] mb-4">{p.price.toLocaleString()} so'm</div>
                  <button onClick={() => addToCart(p)} className="w-full py-3 bg-[#2563FF] text-white rounded-xl text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#1A4FE8]">
                    <MdShoppingCart /> {t('addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
