import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Heart,
} from "lucide-react";

const categories = [
  {
    name: "Blouse & Atasan",
    image:
      "/assets/atas 1.jpg.jpeg",
    slug: "blouse",
  },
  {
    name: "Dress",
    image:
      "/assets/dress 2.jpg.jpeg",
    slug: "dress",
  },
  {
    name: "Cardigan & Knitwear",
    image:
      "/assets/cardigan 2.jpg.jpeg ",
    slug: "cardigan",
  },
  {
    name: "Rok",
    image:
      "/assets/rok 1.jpg.jpeg",
    slug: "rok",
  },
];

function InteractiveHeroImage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-4, 4]
  );

  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [4, -4]
  );

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5
    );
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      className="hero-image"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
    >
      <img
        src="/assets/profil.jpg.jpeg"
        alt="Inspirasi gaya fashion wanita"
      />

      <div className="hero-image-caption">
        <span>The latest collection is here</span>
        <strong>Everyday Essentials</strong>
      </div>
    </motion.div>
  );
}

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            YOUR EVERYDAY FASHION
          </span>

          <h1>
            Your Style,
            <br />
            <span>Your Story.</span>
          </h1>

          <p>
            Temukan gaya yang mencerminkan dirimu.
            Koleksi fashion minimalis yang nyaman,
            timeless, dan mudah dipadukan setiap hari.
          </p>

          <Link to="/koleksi" className="hero-button">
            Belanja Sekarang
            <ArrowRight size={18} />
          </Link>

          <div className="hero-note">
            Minimalist style, maximum confidence.
          </div>
        </div>

        <InteractiveHeroImage />
      </section>

      
            {/* Categories Section */}
            <motion.section
              className="categories-section section-container"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="section-heading">
                <div>
                  <span className="section-label">
                    FIND YOUR STYLE
                  </span>

                  <h2>Explore Collections</h2>

                  <p>
                    Temukan koleksi favorit untuk setiap momen.
                  </p>
                </div>

                <Link to="/koleksi" className="text-link">
                  Lihat Semua <ArrowRight size={16} />
                </Link>
              </div>

              <div className="category-grid">
                {categories.map((category) => (
                  <Link
                    to={`/koleksi/${category.slug}`}
                    className="category-card"
                    key={category.slug}
                  >
                    <div className="category-image">
                      <img
                        src={category.image.trim()}
                        alt={category.name}
                        loading="lazy"
                      />
                    </div>

                    <div className="category-info">
                      <h3>{category.name}</h3>

                      <span>
                        Explore <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>


      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefit-item">
          <Truck size={26} strokeWidth={1.5} />

          <div>
            <h3>Pengiriman Mudah</h3>
            <p>
              Informasi pengiriman melalui WhatsApp.
            </p>
          </div>
        </div>

        <div className="benefit-item">
          <ShieldCheck size={26} strokeWidth={1.5} />

          <div>
            <h3>Belanja Nyaman</h3>
            <p>
              Informasi produk yang jelas dan transparan.
            </p>
          </div>
        </div>

        <div className="benefit-item">
          <Heart size={26} strokeWidth={1.5} />

          <div>
            <h3>Style Your Way</h3>
            <p>
              Pilih gaya yang paling mencerminkan dirimu.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;