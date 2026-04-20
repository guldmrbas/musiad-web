import { Link } from "react-router-dom";
import { useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { EventCard } from "../components/CardGrid";
import { useI18n } from "../i18n/I18nProvider";

export default function HomePage() {
  const { messages, t } = useI18n();
  const trackRef = useRef(null);

  function onMouseDown(e) {
    const el = trackRef.current;
    el.dataset.down = "1";
    el.dataset.startX = e.pageX - el.offsetLeft;
    el.dataset.scrollLeft = el.scrollLeft;
  }
  function onMouseLeave() { trackRef.current.dataset.down = "0"; }
  function onMouseUp() { trackRef.current.dataset.down = "0"; }
  function onMouseMove(e) {
    const el = trackRef.current;
    if (el.dataset.down !== "1") return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = Number(el.dataset.scrollLeft) - (x - Number(el.dataset.startX)) * 1.5;
  }
  const home = messages.home;
  const eventCards = messages.events.cards;

  return (
    <main>
      <section className="hero-home">
        <div className="hero-home-grid">
          <div className="hero-copy">
            <div className="frame-line"></div>
            <div className="hero-copy-content">
              <span className="eyebrow">{home.hero.eyebrow}</span>
              <h1 className="hero-title">{home.hero.title}</h1>
              <div className="hero-bullets">
                {home.hero.bullets.map((bullet, index) => (
                  <div className="hero-bullet" key={bullet}>
                    <i>{["⌘", "◫", "⌁"][index]}</i>
                    <strong>{bullet}</strong>
                  </div>
                ))}
              </div>
              <Link className="outline-button" to="/events">
                {t("actions.goToCalendar")}
              </Link>
            </div>
            <div className="hero-dots" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span className="active"></span>
            </div>
          </div>
          <div className="visual-panel">
            <div className="visual-figure"></div>
          </div>
        </div>
      </section>


      <section className="section">
        <div className="container">
          <Link to="/events" className="section-heading-link">
            <SectionHeading title={home.eventsTitle} />
          </Link>
          <div className="cards-grid">
            {eventCards.map((item, index) => (
              <EventCard key={item.title} item={item} mutedLink={index !== 0} />
            ))}
          </div>
          <div className="center-cta">
            <Link className="ghost-button" to="/events">
              {t("actions.eventsCalendar")}
            </Link>
          </div>
        </div>
      </section>

      <section className="photo-gallery-section">
        <div
          className="photo-gallery-track"
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {["mustakil-1.webp", "mustakil-2.webp", "mustakil-3.webp", "mustakil-4.webp", "mustakil-5.webp", "mustakil-6.webp", "mustakil-7.webp"].map((img, i) => (
            <div className="photo-gallery-slide" key={img}>
              <img src={`/images/${img}`} alt={`Etkinlik ${i + 1}`} draggable={false} />
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="cta-banner">
          <div className="cta-media"></div>
          <div className="cta-copy">
            <h3>{home.cta}</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
