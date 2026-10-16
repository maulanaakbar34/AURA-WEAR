
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Heart,
  ShoppingBag,
  MapPin,
  Phone,
  LayoutGrid,
} from "lucide-react";

import "../styles/home.css";

const categories = [
  {
    name: "Blouse & Atasan",
    image: "/assets/atas 1.jpg.jpeg",
    slug: "blouse",
    number: "01",
  },
  {
    name: "Dress",
    image: "/assets/dress 2.jpg.jpeg",
    slug: "dress",
    number: "02",
  },
  {
    name: "Cardigan & Knitwear",
    image: "/assets/cardigan 2.jpg.jpeg",
    slug: "cardigan",
    number: "03",
  },
  {
    name: "Rok",
    image: "/assets/rok 1.jpg.jpeg",
    slug: "rok",
    number: "04",
  },
];

function Home() {
  return (
    <main className="home-page">
      {/* HERO FULL SCREEN */}
      <section className="fashion-hero">
        <img
          className="fashion-hero-image"
          src="/assets/profil.jpg.jpeg"
          alt="Koleksi fashion AURA-S-WEAR"
          fetchPriority="high"
        />

        <div className="fashion-hero-overlay" />

        {/* NAVBAR TRANSPARAN */}
        <header className="fashion-header">
          <Link
            to="/"
            className="fashion-brand"
            aria-label="AURA-S-WEAR Beranda"
          >
            <span className="fashion-brand-name">
              AURA'SWEAR
            </span>

            <span className="fashion-brand-tagline">
              STYLE YOUR STORY
            </span>
          </Link>

          <nav
            className="fashion-top-nav"
            aria-label="Navigasi utama"
          >
            <Link to="/" aria-current="page">
              Beranda
            </Link>
            <Link to="/koleksi">Koleksi</Link>
            <Link to="/alamat-toko">Alamat Toko</Link>
            <Link to="/kontak">Kontak</Link>
          </nav>

          <div className="fashion-header-actions">
            <Link
              to="/wishlist"
              className="fashion-wishlist"
              aria-label="Buka wishlist"
              title="Wishlist"
            >
              <Heart size={22} strokeWidth={1.6} />
            </Link>

            <Link
              to="/keranjang"
              className="fashion-cart"
              aria-label="Buka keranjang"
              title="Keranjang"
            >
              <ShoppingBag size={22} strokeWidth={1.6} />
            </Link>
          </div>
        </header>

        {/* KONTEN HERO */}
        <div className="fashion-hero-content">
          <span className="fashion-eyebrow">
            YOUR EVERYDAY FASHION
          </span>

          <h1>
            Your Style,
            <br />
            <span>Your Story.</span>
          </h1>

          <p>
            Temukan gaya yang mencerminkan dirimu.
            Koleksi fashion modern yang nyaman, timeless,
            dan mudah dipadukan setiap hari.
          </p>

          <Link
            to="/koleksi"
            className="fashion-shop-button"
          >
            Belanja Sekarang
            <ArrowRight size={18} />
          </Link>

          <span className="fashion-hero-note">
            MINIMALIST STYLE, MAXIMUM CONFIDENCE
          </span>
        </div>

        <div className="fashion-hero-bottom">
          <span>NEW COLLECTION</span>
          <span>DISCOVER YOUR STYLE ↓</span>
        </div>
      </section>

      {/* KOLEKSI KATEGORI */}
      <motion.section
        className="home-collections"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65 }}
      >
        <div className="home-section-heading">
          <div>
            <span className="home-section-label">
              FIND YOUR STYLE
            </span>

            <h2>Explore Collections</h2>

            <p>
              Temukan koleksi favorit untuk setiap momen.
            </p>
          </div>

          <Link
            to="/koleksi"
            className="home-text-link"
          >
            Lihat Semua
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <Link
              to={`/koleksi/${category.slug}`}
              className="home-category-card"
              key={category.slug}
            >
              <div className="home-category-image">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />

                <span className="home-category-number">
                  {category.number}
                </span>

                <span className="home-category-arrow">
                  <ArrowRight size={19} />
                </span>
              </div>

              <div className="home-category-info">
                <h3>{category.name}</h3>
                <span>Explore Collection</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* KEUNGGULAN TOKO */}
      <section className="home-benefits">
        <div className="home-benefit-item">
          <Truck size={27} strokeWidth={1.4} />
          <div>
            <h3>Pengiriman Mudah</h3>
            <p>Informasi pengiriman melalui WhatsApp.</p>
          </div>
        </div>

        <div className="home-benefit-item">
          <ShieldCheck size={27} strokeWidth={1.4} />
          <div>
            <h3>Belanja Nyaman</h3>
            <p>Informasi produk yang jelas dan transparan.</p>
          </div>
        </div>

        <div className="home-benefit-item">
          <Heart size={27} strokeWidth={1.4} />
          <div>
            <h3>Style Your Way</h3>
            <p>Pilih gaya yang mencerminkan dirimu.</p>
          </div>
        </div>
      </section>

      {/* FOOTER HITAM — PERTAHANKAN */}
      <footer className="home-footer">
        <div className="home-footer-brand">
          <Link to="/" className="fashion-brand">
            <span className="fashion-brand-name">
              AURA'SWEAR
            </span>
            <span className="fashion-brand-tagline">
              STYLE YOUR STORY
            </span>
          </Link>
        </div>

        <div className="home-footer-links">
          <h3>Jelajahi</h3>
          <Link to="/">Beranda</Link>

          <Link to="/koleksi">
            <LayoutGrid size={15} />
            Koleksi
          </Link>

          <Link to="/alamat-toko">
            <MapPin size={15} />
            Alamat Toko
          </Link>

          <Link to="/kontak">
            <Phone size={15} />
            Kontak
          </Link>

          <Link to="/wishlist">
            <Heart size={15} />
            Wishlist
          </Link>
        </div>

        <div className="home-footer-contact">
          <h3>Temukan Gaya Kamu</h3>
          <p>
            Jelajahi koleksi dan temukan pilihan favoritmu.
          </p>

          <Link
            to="/koleksi"
            className="home-footer-button"
          >
            Belanja Sekarang
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-footer-bottom">
          <span>
            © {new Date().getFullYear()} AURA-S-WEAR
          </span>
          <span>STYLE YOUR STORY.</span>
        </div>
      </footer>
    </main>
  );
}

export default Home;
