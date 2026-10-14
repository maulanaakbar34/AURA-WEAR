import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";

function InstagramIcon({ size = 25 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

const contactInfo = [
  {
    icon: InstagramIcon,
    title: "Instagram",
    description: "Ikuti koleksi dan inspirasi gaya terbaru kami.",
    value: "@titawear",
    link: "https://instagram.com/titawear",
    action: "Kunjungi Instagram",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Hubungi kami untuk pertanyaan atau pemesanan.",
    value: "0856-0494-3074",
    link: "https://wa.me/6285604943074",
    action: "Chat Sekarang",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Kirim pertanyaan atau kerja sama melalui email.",
    value: "titawear@example.com",
    link: "mailto:titawear@example.com",
    action: "Kirim Email",
  },
];

function Contact() {
  return (
    <section className="contact-page">
      <div className="contact-header">
        <span className="eyebrow">WE WOULD LOVE TO HEAR FROM YOU</span>
        <h1>Hubungi Kami</h1>
        <p>
          Ada pertanyaan tentang koleksi kami? Jangan ragu untuk
          menghubungi Tita Wear. Kami siap membantu menemukan
          gaya yang paling sesuai denganmu.
        </p>
      </div>

      <div className="contact-grid">
        {contactInfo.map((item) => {
          const Icon = item.icon;

          return (
            <article className="contact-card" key={item.title}>
              <div className="contact-icon">
                <Icon size={25} strokeWidth={1.7} />
              </div>

              <h2>{item.title}</h2>
              <p>{item.description}</p>

              <strong className="contact-value">
                {item.value}
              </strong>

              <a
                href={item.link}
                className="contact-link"
                target={
                  item.title !== "Email" ? "_blank" : undefined
                }
                rel={
                  item.title !== "Email"
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {item.action}
                <ArrowUpRight size={16} />
              </a>
            </article>
          );
        })}
      </div>

      <div className="contact-note">
        <span className="eyebrow">TITA WEAR</span>
        <h2>Your Style, Your Story.</h2>
        <p>
          Temukan gaya sederhana, elegan, dan nyaman untuk
          menemani setiap cerita dalam hidupmu.
        </p>
      </div>
    </section>
  );
}

export default Contact;