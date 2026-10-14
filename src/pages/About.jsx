
export default function About() {
  const mapsUrl =
    "https://maps.app.goo.gl/CQNgR4KqSMLvg3kdA?g_st=aw";

  const embedUrl =
    "https://maps.google.com/maps?q=" +
    encodeURIComponent(mapsUrl) +
    "&output=embed";

  return (
    <section className="store-location">
      <div className="store-location-heading">
        <p className="store-eyebrow">VISIT OUR STORE</p>
        <h1>Alamat Toko</h1>
        <p>
          Temukan lokasi Tita Wear melalui Google Maps
          dan kunjungi kami secara langsung.
        </p>
      </div>

      <div className="store-map">
        <iframe
          title="Lokasi Tita Wear"
          src={embedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        className="store-directions"
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        Buka Google Maps & Petunjuk Arah ↗
      </a>
    </section>
  );
}
