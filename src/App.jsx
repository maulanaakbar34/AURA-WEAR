
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/koleksi" element={<Shop />} />
        <Route path="/koleksi/:slug" element={<Shop />} />
        <Route path="/produk/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/keranjang" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/alamat-toko" element={<About />} />
        <Route path="/kontak" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
