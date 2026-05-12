import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartPanel from './components/CartPanel';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderPage = () => {
    switch (page) {
      case 'home':           return <HomePage setPage={setPage} />;
      case 'catalog':        return <CatalogPage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case 'about':          return <AboutPage setPage={setPage} />;
      case 'contact':        return <ContactPage setPage={setPage} />;
      case 'product-detail': return <ProductDetailPage product={selectedProduct} setPage={setPage} />;
      case 'wishlist':       return <WishlistPage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case 'checkout':       return <CheckoutPage setPage={setPage} />;
      default:               return <HomePage setPage={setPage} />;
    }
  };

  return (
    <CartProvider>
      {/* Wrapper'ni shaffof qilamiz, fon body'dan keladi */}
      <div className="min-h-screen transition-colors duration-300">
        <Navbar page={page} setPage={setPage} />
        <main>
          {renderPage()}
        </main>
        <CartPanel setPage={setPage} />
        <Toast />
      </div>
    </CartProvider>
  );
}

export default App;
