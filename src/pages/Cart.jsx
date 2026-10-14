
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { formatRupiah } from "../data/products";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    cartCount,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // Checkout menuju halaman checkout bersama
  function handleCheckout() {
    if (cartItems.length === 0) return;

    navigate("/checkout");
  }

  return (
    <section className="cart-page page-container">
      <div className="cart-heading">
        <span className="eyebrow">YOUR SHOPPING BAG</span>

        <h1>Keranjang Belanja</h1>

        <p>
          Periksa kembali produk pilihanmu sebelum melanjutkan pesanan.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={42} strokeWidth={1.3} />

          <h2>Keranjangmu masih kosong</h2>

          <p>
            Yuk, temukan outfit favoritmu di koleksi Tita Wear.
          </p>

          <Link to="/koleksi" className="button-primary">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* DAFTAR PRODUK */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.key}>
                <Link
                  to={`/produk/${item.id}`}
                  className="cart-item-image"
                >
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="cart-item-info">
                  <Link
                    to={`/produk/${item.id}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <p className="cart-item-variant">
                    Ukuran: {item.size} · Warna: {item.color}
                  </p>

                  <p className="cart-item-price">
                    {formatRupiah(item.price)}
                  </p>

                  <div className="cart-item-bottom">
                    {/* KONTROL JUMLAH */}
                    <div className="quantity-control">
                      <button
                        type="button"
                        aria-label="Kurangi jumlah"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            item.key,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        aria-label="Tambah jumlah"
                        disabled={item.quantity >= 99}
                        onClick={() =>
                          updateQuantity(
                            item.key,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* HAPUS PRODUK */}
                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() => removeFromCart(item.key)}
                    >
                      <Trash2 size={15} />
                      Hapus
                    </button>
                  </div>
                </div>

                {/* SUBTOTAL PRODUK */}
                <p className="cart-item-subtotal">
                  {formatRupiah(item.price * item.quantity)}
                </p>
              </article>
            ))}
          </div>

          {/* RINGKASAN PESANAN */}
          <aside className="cart-summary">
            <h2>Ringkasan Pesanan</h2>

            <div className="cart-summary-row">
              <span>Total produk</span>
              <span>{cartCount} item</span>
            </div>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatRupiah(cartTotal)}</span>
            </div>

            <div className="cart-summary-row">
              <span>Pengiriman</span>
              <span>Dikonfirmasi penjual</span>
            </div>

            <div className="cart-summary-total">
              <span>Total sementara</span>
              <strong>{formatRupiah(cartTotal)}</strong>
            </div>

            {/* MENUJU HALAMAN CHECKOUT */}
            <button
              type="button"
              className="button-primary cart-checkout-button"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              <ShoppingBag size={18} />
              Lanjutkan Checkout
            </button>

            <p className="cart-summary-note">
              Isi data pembeli, alamat pengiriman, dan metode
              pembayaran pada halaman checkout berikutnya.
            </p>

            <Link
              to="/koleksi"
              className="cart-continue-link"
            >
              <ArrowLeft size={15} />
              Lanjutkan Belanja
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Cart;
