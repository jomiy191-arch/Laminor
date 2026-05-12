import { useCart } from '../context/CartContext';
import { MdClose, MdAdd, MdRemove, MdDeleteOutline, MdArrowForward, MdShoppingCart } from 'react-icons/md';

export default function CartPanel({ setPage }) {
  const { cart, cartOpen, toggleCart, changeQty, deleteItem, total, grandTotal, t, darkMode } = useCart();

  const handleCheckout = () => {
    toggleCart();
    setPage('checkout');
  };

  return (
    <>
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={toggleCart} />
      <div className={`cart-panel ${cartOpen ? 'open' : ''}`}>
        <div className="p-6 flex items-center justify-between border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-[18px] font-black tracking-tight flex items-center gap-2">
              <MdShoppingCart className="text-[#2563FF]" /> {t('cart')}
            </h2>
            <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mt-[2px]">{total} {t('items')}</p>
          </div>
          <button onClick={toggleCart} className={`w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer text-[20px] transition-all ${darkMode ? 'bg-white/5 text-white/50 hover:text-white' : 'bg-[#F0EFEB] text-[#0F0F0D]/40 hover:text-[#0F0F0D]'}`}>
            <MdClose />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6 opacity-30">
              <MdShoppingCart className="text-[64px] mb-4" />
              <div className="text-[16px] font-bold">{t('empty_cart')}</div>
              <p className="text-[12px] mt-2 leading-relaxed">Siz hali mahsulot qo'shmadingiz. Katalogni ko'rib chiqing va o'zingizga yoqqanini tanlang.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={item.id} className="cp-item group bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#2563FF]/20">
                <div className="w-[70px] h-[70px] rounded-xl overflow-hidden grid grid-cols-2 grid-rows-2 gap-[1px] bg-[#ccc] dark:bg-white/10 flex-shrink-0">
                  {(Array.isArray(item.cells) ? item.cells.slice(0,4) : []).map(([c1,c2],idx) => <div key={idx} style={{ background:`linear-gradient(175deg,${c1},${c2})` }} />)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-[#2563FF] uppercase tracking-wider mb-1">{item.cat}</div>
                  <div className="text-[14px] font-extrabold truncate pr-2">{item.name}</div>
                  <div className="text-[13px] font-black mt-1 text-[#2563FF]">{item.price.toLocaleString()} so'm</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className={`flex items-center rounded-lg overflow-hidden border ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white border-[#E2DFD8]'}`}>
                    <button onClick={() => changeQty(i, -1)} className="w-7 h-7 flex items-center justify-center border-none bg-transparent cursor-pointer opacity-50 hover:opacity-100"><MdRemove /></button>
                    <span className="w-7 text-center text-[12px] font-bold">{item.qty}</span>
                    <button onClick={() => changeQty(i, 1)} className="w-7 h-7 flex items-center justify-center border-none bg-transparent cursor-pointer opacity-50 hover:opacity-100"><MdAdd /></button>
                  </div>
                  <button onClick={() => deleteItem(i)} className="text-[18px] opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-all border-none bg-transparent cursor-pointer">
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={`p-6 border-t shadow-[0_-10px_30px_rgba(0,0,0,0.03)] ${darkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-[#E2DFD8]'}`}>
            <div className="flex justify-between items-end mb-6">
              <div className="text-[12px] font-bold opacity-40 uppercase tracking-widest">{t('total')}</div>
              <div className="text-[24px] font-black tracking-tight text-[#2563FF]">{grandTotal.toLocaleString()} so'm</div>
            </div>
            <button onClick={handleCheckout} className="w-full h-16 bg-[#2563FF] text-white border-none rounded-2xl text-[14px] font-black cursor-pointer flex items-center justify-center gap-3 hover:bg-[#1A4FE8] transition-all active:scale-95 shadow-xl shadow-[#2563FF]/20">
              {t('buy')} <MdArrowForward />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
