
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const navLinks = [
  { label: "Beranda", to: "/" },
  { label: "Koleksi", to: "/koleksi" },
  { label: "Alamat Toko", to: "/alamat-toko" },
  { label: "Kontak", to: "/kontak" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const lastScrollY = useRef(0);
  const { cartCount, wishlistItems } = useCart();

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      // Navbar selalu terlihat di dekat bagian atas halaman.
      if (currentScrollY <= 80) {
        setNavbarVisible(true);
      } else if (difference > 5) {
        // Scroll ke bawah: sembunyikan navbar.
        setNavbarVisible(false);
      } else if (difference < -5) {
        // Scroll ke atas: tampilkan navbar.
        setNavbarVisible(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`site-header smart-navbar ${
        navbarVisible || menuOpen ? "is-visible" : "is-hidden"
      }`}
    >
      <div className="navbar">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-name">Aura's Wear</span>
          <span className="brand-tagline">
            Your Style, Your Story.
          </span>
        </Link>

        <nav
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link
            to="/wishlist"
            className="icon-button"
            aria-label={`Wishlist, ${wishlistItems.length} produk`}
            title="Wishlist"
          >
            <Heart size={20} />

            {wishlistItems.length > 0 && (
              <span className="cart-count">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/keranjang"
            className="icon-button"
            aria-label={`Keranjang, ${cartCount} item`}
            title="Keranjang"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
