
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

const categories = [
  "Semua Kategori",
  "Blouse & Atasan",
  "Dress",
  "Rok",
  "Cardigan & Knitwear",
];

const revealUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function Shop() {
  const { slug } = useParams();

  const categorySlugMap = {
    blouse: "Blouse & Atasan",
    dress: "Dress",
    cardigan: "Cardigan & Knitwear",
    rok: "Rok",
  };

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    () => categorySlugMap[slug] || "Semua Kategori"
  );
  const [sort, setSort] = useState("newest");
  const [maxPrice, setMaxPrice] = useState(400000);
  const [currentPage, setCurrentPage] = useState(1);

  // Posisi cursor untuk efek background interaktif.
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setMousePosition({
      x: (x - 0.5) * 2,
      y: (y - 0.5) * 2,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Menyesuaikan kategori berdasarkan URL.
  useEffect(() => {
    setCategory(categorySlugMap[slug] || "Semua Kategori");
    setCurrentPage(1);
  }, [slug]);

  // Menentukan jumlah produk berdasarkan ukuran layar.
  const [pageSize, setPageSize] = useState(
    typeof window !== "undefined" && window.innerWidth <= 640
      ? 4
      : 6
  );

  // Menyesuaikan jumlah produk ketika ukuran layar berubah.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const updatePageSize = () => {
      setPageSize(mediaQuery.matches ? 4 : 6);
      setCurrentPage(1);
    };

    updatePageSize();
    mediaQuery.addEventListener("change", updatePageSize);

    return () => {
      mediaQuery.removeEventListener("change", updatePageSize);
    };
  }, []);

  // Memfilter dan mengurutkan produk.
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Semua Kategori" ||
        product.category === category;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === "cheapest") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "expensive") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew)
      );
    }

    return result;
  }, [search, category, sort, maxPrice]);

  // Kembali ke halaman pertama saat filter berubah.
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort, maxPrice]);

  const totalPages = Math.ceil(
    filteredProducts.length / pageSize
  );

  const startIndex = (currentPage - 1) * pageSize;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  // Reset semua filter.
  function resetFilters() {
    setSearch("");
    setCategory("Semua Kategori");
    setSort("newest");
    setMaxPrice(400000);
    setCurrentPage(1);
  }

  return (
    <main className="shop-page">
      {/* Banner Our Collections dengan efek cursor */}
      <motion.section
        className="shop-heading"
        initial="hidden"
        animate="visible"
        variants={revealUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255, 249, 245, 0.08),
              rgba(255, 249, 245, 0.12)
            ),
            url("/assets/model 2.png")
          `,
          backgroundSize: "110% auto",
          backgroundPosition: `
            calc(50% - ${mousePosition.x * 10}px)
            calc(50% - ${mousePosition.y * 6}px)
          `,
          backgroundRepeat: "no-repeat",
          transition: "background-position 0.18s ease-out",
        }}
      >
        <span className="section-label">
          THE AURA'S WEAR EDIT
        </span>

        <h1>Our Collections</h1>

        <p>
          Temukan pilihan fashion yang cocok untuk setiap
          cerita dan gaya keseharianmu.
        </p>
      </motion.section>

      <section className="shop-content">
        {/* Pencarian dan pengurutan */}
        <div className="shop-toolbar">
          <label className="shop-search">
            <Search size={18} />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari produk..."
            />
          </label>

          <label className="shop-sort">
            <SlidersHorizontal size={17} />

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="newest">Produk terbaru</option>
              <option value="cheapest">Harga terendah</option>
              <option value="expensive">Harga tertinggi</option>
              <option value="name">Nama A–Z</option>
            </select>
          </label>
        </div>

        {/* Tab kategori */}
        <div className="shop-category-tabs">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "shop-category-tab active"
                  : "shop-category-tab"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Filter harga */}
        <details className="compact-filter">
          <summary>
            <SlidersHorizontal size={16} />
            Filter harga

            <span>
              Maks. Rp{maxPrice.toLocaleString("id-ID")}
            </span>
          </summary>

          <div className="compact-filter-content">
            <label htmlFor="price-filter">
              Harga maksimal
            </label>

            <input
              id="price-filter"
              type="range"
              min="100000"
              max="400000"
              step="25000"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(Number(event.target.value))
              }
            />

            <div className="filter-actions">
              <span>
                Rp{maxPrice.toLocaleString("id-ID")}
              </span>

              <button type="button" onClick={resetFilters}>
                Reset filter
              </button>
            </div>
          </div>
        </details>

        {/* Informasi jumlah produk */}
        <div className="shop-result-count">
          Menampilkan{" "}
          {filteredProducts.length > 0 ? startIndex + 1 : 0}
          {"–"}
          {Math.min(
            startIndex + pageSize,
            filteredProducts.length
          )}
          {" dari "}
          {filteredProducts.length} produk
        </div>

        {/* Produk sesuai halaman aktif */}
        {currentProducts.length > 0 ? (
          <motion.div
            key={`${currentPage}-${pageSize}-${category}-${search}-${sort}-${maxPrice}`}
            className="product-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07 },
              },
            }}
          >
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={revealUp}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="empty-products">
            <h2>Produk tidak ditemukan</h2>
            <p>Coba kata kunci atau filter yang berbeda.</p>

            <button type="button" onClick={resetFilters}>
              Reset filter
            </button>
          </div>
        )}

        {/* Navigasi pagination */}
        {totalPages > 1 && (
          <nav
            className="shop-pagination"
            aria-label="Halaman produk"
          >
            <button
              type="button"
              className="pagination-arrow"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={18} />
              <span>Sebelumnya</span>
            </button>

            <div className="pagination-numbers">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    currentPage === page
                      ? "pagination-number active"
                      : "pagination-number"
                  }
                  onClick={() => setCurrentPage(page)}
                  aria-current={
                    currentPage === page ? "page" : undefined
                  }
                  aria-label={`Halaman ${page}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="pagination-arrow"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={currentPage === totalPages}
              aria-label="Halaman selanjutnya"
            >
              <span>Selanjutnya</span>
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}

export default Shop;
