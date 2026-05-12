import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

// Telegram Bot Sozlamalari (Buni keyin o'zingizning Tokeningizga almashtirasiz)
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const CHAT_ID = 'YOUR_CHAT_ID_HERE';

const translations = {
  uz: {
    home: 'Bosh sahifa', catalog: 'Katalog', about: 'Biz haqimizda', contact: 'Aloqa',
    cart: 'Savat', wishlist: 'Sevimlilar', checkout: 'Rasmiylashtirish',
    addToCart: 'Sotib olish', added: 'Qo\'shildi', search: 'Qidiruv...',
    total: 'Jami', buy: 'Buyurtma berish', items: 'ta mahsulot',
    hero_title: 'Premium Pol Qoplamalari', hero_subtitle: 'Mustahkam va suv o\'tkazmaydigan',
    hero_desc: 'Har bir uyda qulaylik va sifat yaratamiz. Xalqaro AC5/33 sertifikati bilan tasdiqlangan.',
    why_us: 'Nima uchun biz?', why_title: 'Siz uchun eng yaxshi tanlov',
    wp_title: '100% Suvga chidamli', wp_desc: 'Super Wax texnologiyasi bilan suvdan to\'liq himoya.',
    ac5_title: 'AC5 / 33-sinf', ac5_desc: 'Xalqaro sifat standartlari bo\'yicha eng yuqori daraja.',
    eco_title: 'Green Core HDF', eco_desc: 'Ekologik toza yashil yadroli HDF texnologiyasi.',
    heat_title: 'Issiqlik bilan mos', heat_desc: 'Yerning isitish tizimi bilan to\'liq moslik.',
    popular: 'Mashhur mahsulotlar', view_all: 'Barchasini ko\'rish',
    stock: 'Omborda mavjud', quality: 'Sifat kafolatlangan',
    empty_cart: 'Savat bo\'sh', back_to_catalog: 'Katalogni ko\'rish',
    footer_text: 'Premium sifatli pol qoplamari. 13 yildan ortiq tajriba.',
    name: 'To\'liq ismingiz', phone: 'Telefon raqamingiz', address: 'Manzil', send: 'Yuborish'
  },
  ru: {
    home: 'Главная', catalog: 'Каталог', about: 'О нас', contact: 'Контакты',
    cart: 'Корзина', wishlist: 'Избранное', checkout: 'Оформление',
    addToCart: 'Купить', added: 'Добавлено', search: 'Поиск...',
    total: 'Итого', buy: 'Оформить заказ', items: 'товаров',
    hero_title: 'Премиум Напольные Покрытия', hero_subtitle: 'Прочные и водонепроницаемые',
    hero_desc: 'Создаем уют и качество в каждом доме. Сертифицировано международным стандартом AC5/33.',
    why_us: 'Почему мы?', why_title: 'Лучший выбор для вас',
    wp_title: '100% Водостойкость', wp_desc: 'Полная защита от воды благодаря технологии Super Wax.',
    ac5_title: 'AC5 / Класс 33', ac5_desc: 'Высший уровень по международным стандартам качества.',
    eco_title: 'Green Core HDF', eco_desc: 'Экологически чистая технология HDF с зеленым ядром.',
    heat_title: 'Совместим с теплом', heat_desc: 'Полная совместимость с системами теплого пола.',
    popular: 'Популярные товары', view_all: 'Посмотреть все',
    stock: 'В наличии', quality: 'Гарантия качества',
    empty_cart: 'Корзина пуста', back_to_catalog: 'В каталог',
    footer_text: 'Напольные покрытия премиум-класса. Более 13 лет опыта.',
    name: 'Ваше полное имя', phone: 'Номер телефона', address: 'Адрес', send: 'Отправить'
  },
  en: {
    home: 'Home', catalog: 'Catalog', about: 'About', contact: 'Contact',
    cart: 'Cart', wishlist: 'Wishlist', checkout: 'Checkout',
    addToCart: 'Buy Now', added: 'Added', search: 'Search...',
    total: 'Total', buy: 'Order Now', items: 'items',
    hero_title: 'Premium Flooring Solutions', hero_subtitle: 'Durable and Waterproof',
    hero_desc: 'We create comfort and quality in every home. Certified with international AC5/33 standards.',
    why_us: 'Why Us?', why_title: 'The Best Choice For You',
    wp_title: '100% Waterproof', wp_desc: 'Full protection against water with Super Wax technology.',
    ac5_title: 'AC5 / Class 33', ac5_desc: 'The highest level according to international quality standards.',
    eco_title: 'Eco-friendly Green Core HDF', eco_desc: 'Eco-friendly Green Core HDF technology.',
    heat_title: 'Floor Heating Compatible', heat_desc: 'Full compatibility with underfloor heating systems.',
    popular: 'Popular Products', view_all: 'View All',
    stock: 'In Stock', quality: 'Quality Guaranteed',
    empty_cart: 'Cart is empty', back_to_catalog: 'View catalog',
    footer_text: 'Premium quality flooring. More than 13 years of experience.',
    name: 'Full Name', phone: 'Phone Number', address: 'Address', send: 'Send Order'
  }
};

export function CartProvider({ children }) {
  // LocalStorage'dan ma'lumotlarni yuklash
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'uz');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ msg: '', show: false });

  // Ma'lumotlar o'zgarganda LocalStorage'ga saqlash
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('darkMode', darkMode); }, [darkMode]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const t = useCallback((key) => translations[lang][key] || key, [lang]);

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 2500);
  }, []);

  const toggleCart = useCallback(() => setCartOpen(prev => !prev), []);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);
  const switchLang = useCallback((l) => setLang(l), []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`✓ "${item.name}" ${t('added')}`);
  }, [showToast, t]);

  const toggleWishlist = useCallback((item) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.filter(i => i.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const changeQty = useCallback((idx, delta) => {
    setCart(prev => prev.map((item, i) => i === idx ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0));
  }, []);

  const deleteItem = useCallback((idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // Telegramga xabar yuborish funksiyasi
  const sendToTelegram = async (message) => {
    if (BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
      console.warn('Telegram Bot Token kiritilmagan!');
      return true; // Test rejimi uchun
    }
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'HTML' })
      });
      return response.ok;
    } catch (e) {
      console.error('Telegram error:', e);
      return false;
    }
  };

  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{
      cart, cartOpen, toggleCart, addToCart, changeQty, deleteItem, clearCart,
      total, grandTotal, toast, showToast,
      wishlist, toggleWishlist,
      lang, switchLang, t,
      darkMode, toggleDarkMode,
      searchQuery, setSearchQuery,
      sendToTelegram
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
