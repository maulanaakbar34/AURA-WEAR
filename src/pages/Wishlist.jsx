import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatRupiah } from "../data/products";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useCart();

  return (
    <main className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-heading">
          <div>
            <span className="wishlist-eyebrow">YOUR PERSONAL COLLECTION</span>
            <h1>Wishlist <Heart size={27} /></h1>
            <p>
              Simpan item favoritmu dan temukan gaya yang paling cocok untukmu.
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button
              type="button"
              className="wishlist-clear-button"
              onClick={clearWishlist}
            >
              <Trash2 size={16} />
              Hapus semua
            </button>
          )}
        </div>

        <div className="wishlist-count">
          {wishlistItems.length} produk tersimpan
        </div>

        {wishlistItems.length === 0 ? (
          <section className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <Heart size={34} strokeWidth={1.3} />
            </div>

            <h2>Belum ada produk favorit</h2>
            <p>
              Temukan koleksi yang kamu suka, lalu tekan ikon hati untuk
              menyimpannya di sini.
            </p>

            <Link to="/koleksi" className="wishlist-shop-button">
              <ShoppingBag size={18} />
              Jelajahi Koleksi
              <ArrowRight size={17} />
            </Link>
          </section>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((product) => (
              <article className="wishlist-card" key={product.id}>
                <Link
                  to={`/produk/${product.id}`}
                  className="wishlist-card-image"
                >
                  <img src={product.image} alt={product.name} loading="lazy" />

                  {product.isNew && (
                    <span className="wishlist-new-badge">NEW</span>
                  )}
                </Link>

                <div className="wishlist-card-info">
                  <span className="wishlist-card-category">
                    {product.category}
                  </span>

                  <Link
                    to={`/produk/${product.id}`}
                    className="wishlist-card-name"
                  >
                    {product.name}
                  </Link>

                  <div className="wishlist-card-price">
                    <span>{formatRupiah(product.price)}</span>

                    {product.oldPrice && (
                      <del>{formatRupiah(product.oldPrice)}</del>
                    )}
                  </div>

                  <div className="wishlist-card-actions">
                    <Link
                      to={`/produk/${product.id}`}
                      className="wishlist-detail-button"
                    >
                      Lihat Produk
                    </Link>

                    <button
                      type="button"
                      className="wishlist-remove-button"
                      aria-label={`Hapus ${product.name} dari wishlist`}
                      title="Hapus dari wishlist"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Wishlist;
