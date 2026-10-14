
import { Link } from "react-router-dom";
import { Camera, Mail, MessageCircle } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand-logo footer-logo">
            Aura's
             <span>Wear.</span>
          </Link>

          <p>Your Style, Your Story.</p>

          <p className="footer-description">
            Temukan gaya yang mencerminkan dirimu,
            dengan sentuhan minimalis dan timeless.
          </p>
        </div>

        <div className="footer-column">
          <h3>Jelajahi</h3>
          <Link to="/">Beranda</Link>
          <Link to="/koleksi">Koleksi</Link>
          <Link to="/tentang-kami">Tentang Kami</Link>
          <Link to="/kontak">Kontak</Link>
        </div>

        <div className="footer-column">
          <h3>Bantuan</h3>
          <Link to="/keranjang">Keranjang</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/kontak">Hubungi Kami</Link>
        </div>

        <div className="footer-column">
          <h3>Terhubung</h3>

          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            <Camera size={16} />
            Instagram
          </a>

          <a href="mailto:">
            <Mail size={16} />
            Email toko
          </a>

          <Link to="/kontak">
            <MessageCircle size={16} />
            WhatsApp toko
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Aura's Wear. All rights reserved.</p>
        <p>Made with care for your everyday style.</p>
      </div>
    </footer>
  );
}

export default Footer;