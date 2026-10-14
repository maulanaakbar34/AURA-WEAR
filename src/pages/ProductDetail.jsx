
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ArrowLeft,
} from "lucide-react";

import { products, formatRupiah } from "../data/products";
import { useCart } from "../context/CartContext";

import "../styles/product-detail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Cari produk berdasarkan ID URL
  const product = products.find(
    (item) => item.id === Number(id)
  );

  // Rekomendasi produk selain produk yang sedang dibuka
  const recommendedProducts = product
    ? products
        .filter((item) => item.id !== product.id)
        .slice(0, 4)
    : [];

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useCart();

  const isWishlisted = product
    ? isInWishlist(product.id)
    : false;

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  // Jika produk tidak ditemukan
  if (!product) {
    return (
      <main className="product-detail-page">
        <div className="product-not-found">
          <h2>Produk tidak ditemukan</h2>

          <p>
            Produk yang kamu cari mungkin sudah tidak tersedia.
          </p>

          <Link to="/koleksi" className="detail-back-link">
            <ArrowLeft size={17} />
            Kembali ke koleksi
          </Link>
        </div>
      </main>
    );
  }

  // Validasi pilihan produk sebelum transaksi
  function validateProductSelection() {
    if (!selectedSize) {
      setMessage("Silakan pilih ukuran terlebih dahulu.");
      return false;
    }

    if (!selectedColor) {
      setMessage("Silakan pilih warna terlebih dahulu.");
      return false;
    }

    if (
      !Number.isInteger(product.stock) ||
      product.stock <= 0
    ) {
      setMessage("Maaf, produk sedang habis.");
      return false;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > product.stock
    ) {
      setMessage(
        "Jumlah produk tidak valid atau melebihi stok."
      );
      return false;
    }

    return true;
  }

  // Tambahkan produk ke keranjang
  function handleAddToCart() {
    if (!validateProductSelection()) return;

    addToCart(
      product,
      selectedSize,
      selectedColor,
      quantity
    );

    setMessage("Produk berhasil ditambahkan ke keranjang!");
  }

  // Checkout langsung ke halaman checkout bersama
  function handleCheckoutDirect() {
    if (!validateProductSelection()) return;

    const checkoutItem = {
      key: `${product.id}-${selectedSize}-${selectedColor}`,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    navigate("/checkout", {
      state: {
        checkoutItems: [checkoutItem],
      },
    });
  }

  return (
    <main className="product-detail-page">
      <div className="detail-container">
        <Link to="/koleksi" className="back-to-shop">
          <ArrowLeft size={18} />
          <span>Kembali ke Koleksi</span>
        </Link>

        <div className="product-detail-layout">
          {/* GAMBAR PRODUK */}
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />

            {product.isNew && (
              <span className="product-badge detail-new-badge">
                NEW
              </span>
            )}
          </div>

          {/* INFORMASI PRODUK */}
          <div className="product-detail-info">
            <span className="detail-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <div className="detail-rating">
              <Star size={17} fill="currentColor" />
              <span>{product.rating}</span>

              <span className="detail-rating-label">
                Rating demo produk
              </span>
            </div>

            {/* HARGA */}
            <div className="detail-price">
              <span>{formatRupiah(product.price)}</span>

              {product.oldPrice && (
                <del>{formatRupiah(product.oldPrice)}</del>
              )}
            </div>

            <p className="detail-description">
              Tampil stylish dan percaya diri dengan koleksi
              Tita Wear. Desain minimalis dengan pilihan warna
              lembut yang mudah dipadukan untuk aktivitas
              sehari-hari.
            </p>

            {/* STOK */}
            <div className="detail-stock">
              {product.stock > 0
                ? `Stok tersedia: ${product.stock} item`
                : "Stok habis"}
            </div>

            {/* PILIH UKURAN */}
            <div className="detail-option">
              <div className="detail-option-heading">
                <label>Pilih Ukuran</label>
                <span>{selectedSize || "Belum dipilih"}</span>
              </div>

              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={
                      selectedSize === size ? "selected" : ""
                    }
                    aria-pressed={selectedSize === size}
                    onClick={() => {
                      setSelectedSize(size);
                      setMessage("");
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* PILIH WARNA */}
            <div className="detail-option">
              <div className="detail-option-heading">
                <label>Pilih Warna</label>
                <span>{selectedColor || "Belum dipilih"}</span>
              </div>

              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    type="button"
                    key={color.name}
                    className={
                      selectedColor === color.name
                        ? "selected"
                        : ""
                    }
                    aria-label={`Pilih warna ${color.name}`}
                    aria-pressed={
                      selectedColor === color.name
                    }
                    title={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setMessage("");
                    }}
                  >
                    <span
                      className="color-swatch"
                      style={{
                        backgroundColor: color.hex,
                      }}
                    />

                    <span className="color-name">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* JUMLAH PRODUK */}
            <div className="detail-option">
              <label className="quantity-label">
                Jumlah
              </label>

              <div className="quantity-control">
                <button
                  type="button"
                  aria-label="Kurangi jumlah"
                  disabled={quantity <= 1}
                  onClick={() => {
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    );
                    setMessage("");
                  }}
                >
                  <Minus size={16} />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  aria-label="Tambah jumlah"
                  disabled={
                    quantity >= product.stock ||
                    product.stock <= 0
                  }
                  onClick={() => {
                    setQuantity((current) =>
                      Math.min(product.stock, current + 1)
                    );
                    setMessage("");
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* TOTAL HARGA */}
            <div className="detail-price">
              <span>
                Total: {formatRupiah(product.price * quantity)}
              </span>
            </div>

            {/* PESAN VALIDASI */}
            {message && (
              <p
                className="detail-message"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}

            {/* TOMBOL KERANJANG DAN WISHLIST */}
            <div className="detail-actions">
              <button
                type="button"
                className="detail-add-cart"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingBag size={19} />
                <span>Tambah ke Keranjang</span>
              </button>

              <button
                type="button"
                className={`detail-wishlist-button ${
                  isWishlisted ? "wishlisted" : ""
                }`}
                aria-label={
                  isWishlisted
                    ? "Hapus dari wishlist"
                    : "Tambahkan ke wishlist"
                }
                title={
                  isWishlisted
                    ? "Hapus dari wishlist"
                    : "Tambahkan ke wishlist"
                }
                onClick={() => {
                  toggleWishlist(product);

                  setMessage(
                    isWishlisted
                      ? "Produk dihapus dari wishlist."
                      : "Produk ditambahkan ke wishlist."
                  );
                }}
              >
                <Heart
                  size={20}
                  strokeWidth={1.8}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* CHECKOUT LANGSUNG */}
            <button
              type="button"
              className="direct-checkout-button"
              onClick={handleCheckoutDirect}
              disabled={product.stock <= 0}
            >
              <ShoppingBag size={19} />
              <span>Beli Sekarang</span>
            </button>

            {/* KEUNGGULAN PRODUK */}
            <div className="detail-note">
              <p>✓ Desain minimalis dan mudah dipadukan</p>
              <p>✓ Pilihan ukuran dan warna tersedia</p>
              <p>✓ Pemesanan mudah melalui WhatsApp</p>
            </div>
          </div>
        </div>

        {/* REKOMENDASI PRODUK LAIN */}
        {recommendedProducts.length > 0 && (
          <section
            className="recommended-section"
            aria-labelledby="recommended-title"
          >
            <div className="recommended-header">
              <p className="recommended-eyebrow">
                PILIHAN UNTUK KAMU
              </p>

              <h2 id="recommended-title">
                Rekomendasi Produk Lain
              </h2>

              <p>
                Temukan koleksi lain yang cocok untuk gaya kamu.
              </p>
            </div>

            <div className="recommended-grid">
              {recommendedProducts.map((item) => (
                <Link
                  to={`/produk/${item.id}`}
                  className="recommended-card"
                  key={item.id}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  <div className="recommended-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="recommended-image"
                      loading="lazy"
                    />

                    {item.isNew && (
                      <span className="recommended-badge">
                        NEW
                      </span>
                    )}
                  </div>

                  <div className="recommended-info">
                    <p className="recommended-category">
                      {item.category}
                    </p>

                    <h3>{item.name}</h3>

                    <p className="recommended-price">
                      {formatRupiah(item.price)}
                    </p>

                    <span className="recommended-link">
                      Lihat Produk →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default ProductDetail;
