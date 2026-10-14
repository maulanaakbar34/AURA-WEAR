import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { formatRupiah } from "../data/products";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);  
  return (
    <article className="product-card">
      <div className="product-card-image">
        <Link to={`/produk/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>

        {product.isNew && (
          <span className="product-badge">NEW</span>
        )}

        
          <button
            type="button"
            className={`product-wishlist-button ${
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
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              size={18}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>

      </div>

      <div className="product-card-info">
        <span className="product-card-category">
          {product.category}
        </span>

        <Link
          to={`/produk/${product.id}`}
          className="product-card-name"
        >
          {product.name}
        </Link>

        <div className="product-card-prices">
          <span className="product-price">
            {formatRupiah(product.price)}
          </span>

          {product.oldPrice && (
            <span className="product-old-price">
              {formatRupiah(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
