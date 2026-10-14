
import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatRupiah } from "../data/products";
import "../styles/checkout.css";

const WHATSAPP_NUMBER = "6285604943074";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  // checkoutItems hanya dikirim saat pengguna membeli langsung.
  const directItems = location.state?.checkoutItems;

  const isDirectCheckout =
    Array.isArray(directItems) && directItems.length > 0;

  const items = isDirectCheckout ? directItems : cartItems;

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [items]
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "QRIS",
    delivery: "Delivery",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Nama pembeli wajib diisi.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Nomor WhatsApp wajib diisi.";
    } else if (!/^[0-9+\-\s()]{9,20}$/.test(form.phone.trim())) {
      nextErrors.phone = "Masukkan nomor telepon yang valid.";
    }

    if (form.delivery === "Delivery" && !form.address.trim()) {
      nextErrors.address = "Alamat pengiriman wajib diisi.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (items.length === 0) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const orderNumber = `TW-${Date.now().toString().slice(-8)}`;

    const productLines = items
      .map((item, index) => {
        const lineTotal = item.price * item.quantity;

        return [
          `${index + 1}. ${item.name}`,
          `   Ukuran: ${item.size || "-"}`,
          `   Warna: ${item.color || "-"}`,
          `   Jumlah: ${item.quantity}`,
          `   Harga: ${formatRupiah(item.price)}`,
          `   Total: ${formatRupiah(lineTotal)}`,
        ].join("\n");
      })
      .join("\n\n");

    const message = [
      "*PESANAN BARU AURA'S WEAR*",
      "",
      `Nomor pesanan: ${orderNumber}`,
      `Nama: ${form.name.trim()}`,
      `WhatsApp pembeli: ${form.phone.trim()}`,
      `Metode: ${form.delivery === "COD" ? "COD" : "Delivery"}`,
      `Pembayaran: ${form.payment}`,
      "",
      "*Detail produk:*",
      productLines,
      "",
      `*Subtotal: ${formatRupiah(subtotal)}*`,
      "",
      form.delivery === "Delivery"
        ? `Alamat pengiriman: ${form.address.trim()}`
        : "Alamat pengiriman: COD, konfirmasi lokasi dengan penjual",
      `Catatan: ${form.notes.trim() || "-"}`,
      "",
      
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Jangan kosongkan keranjang jika browser gagal membuka WhatsApp.
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;

      if (!isDirectCheckout) {
        clearCart();
      }
    } else {
      window.location.href = whatsappUrl;

      if (!isDirectCheckout) {
        clearCart();
      }
    }
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <ShoppingBag size={42} />
          <h1>Belum ada produk untuk checkout</h1>
          <p>Pilih produk terlebih dahulu sebelum melanjutkan pesanan.</p>
          <Link to="/koleksi" className="checkout-primary-button">
            Lihat Koleksi
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <button
          type="button"
          className="checkout-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <header className="checkout-heading">
          <span className="checkout-eyebrow">TITA WEAR</span>
          <h1>Checkout</h1>
          <p>Lengkapi informasi berikut untuk melanjutkan pesanan.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="checkout-layout">
            <section className="checkout-form-card">
              <h2>Informasi Pembeli</h2>

              <div className="checkout-field">
                <label htmlFor="checkout-name">Nama lengkap *</label>
                <input
                  id="checkout-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="checkout-error">{errors.name}</span>
                )}
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-phone">Nomor WhatsApp *</label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Contoh: 081234567890"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <span className="checkout-error">{errors.phone}</span>
                )}
              </div>

              <div className="checkout-field">
                <label>Metode penerimaan *</label>
                <div className="checkout-choice-group">
                  <label className="checkout-choice">
                    <input
                      type="radio"
                      name="delivery"
                      value="Delivery"
                      checked={form.delivery === "Delivery"}
                      onChange={handleChange}
                    />
                    <span>
                      <strong>Delivery</strong>
                      <small>Dikirim ke alamat</small>
                    </span>
                  </label>

                  <label className="checkout-choice">
                    <input
                      type="radio"
                      name="delivery"
                      value="COD"
                      checked={form.delivery === "COD"}
                      onChange={handleChange}
                    />
                    <span>
                      <strong>COD</strong>
                      <small>Bayar saat menerima</small>
                    </span>
                  </label>
                </div>
              </div>

              {form.delivery === "Delivery" && (
                <div className="checkout-field">
                  <label htmlFor="checkout-address">
                    Alamat lengkap *
                  </label>
                  <textarea
                    id="checkout-address"
                    name="address"
                    rows="4"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Jalan, nomor rumah, kelurahan, kecamatan, kota, dan kode pos"
                    autoComplete="street-address"
                  />
                  {errors.address && (
                    <span className="checkout-error">
                      {errors.address}
                    </span>
                  )}
                </div>
              )}

              <div className="checkout-field">
                <label htmlFor="checkout-payment">Metode pembayaran *</label>
                <select
                  id="checkout-payment"
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                >
                  <option value="QRIS">QRIS</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="Tunai">Tunai</option>
                </select>
                <small className="checkout-help">
                  Pembayaran dan ketersediaan metode akan dikonfirmasi penjual
                  melalui WhatsApp.
                </small>
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-notes">Catatan pesanan</label>
                <textarea
                  id="checkout-notes"
                  name="notes"
                  rows="3"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Catatan tambahan (opsional)"
                />
              </div>
            </section>

            <aside className="checkout-summary-card">
              <h2>Ringkasan Pesanan</h2>

              <div className="checkout-items">
                {items.map((item) => (
                  <div
                    className="checkout-product"
                    key={item.key || `${item.id}-${item.size}-${item.color}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="checkout-product-image"
                    />

                    <div className="checkout-product-info">
                      <h3>{item.name}</h3>
                      <p>
                        Ukuran {item.size || "-"} · Warna {item.color || "-"}
                      </p>
                      <p>Jumlah: {item.quantity}</p>
                      <strong>
                        {formatRupiah(item.price * item.quantity)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-total-row">
                <span>Subtotal produk</span>
                <strong>{formatRupiah(subtotal)}</strong>
              </div>

              <div className="checkout-total-row">
                <span>Ongkos kirim</span>
                <span>Dikonfirmasi penjual</span>
              </div>

              <div className="checkout-grand-total">
                <span>Total sementara</span>
                <strong>{formatRupiah(subtotal)}</strong>
              </div>

              <p className="checkout-disclaimer">
                Total di atas belum termasuk ongkos kirim. Penjual akan
                mengonfirmasi biaya pengiriman dan pembayaran melalui WhatsApp.
              </p>

              <button
                type="submit"
                className="checkout-primary-button checkout-submit"
              >
                <MessageCircle size={19} />
                Lanjutkan ke WhatsApp
              </button>

              <p className="checkout-secure-note">
                Pesanan belum dianggap lunas atau terkonfirmasi sampai
                disepakati dengan penjual.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
