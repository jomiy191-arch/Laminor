import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  return (
    <div className={`toast ${toast.show ? 'show' : ''}`} role="status" aria-live="polite">
      {toast.msg}
    </div>
  );
}
