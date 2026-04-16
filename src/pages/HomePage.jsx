import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { EventCard } from "../components/CardGrid";
import { useI18n } from "../i18n/I18nProvider";

export default function HomePage() {
  const { messages, t } = useI18n();
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
            <div className="rail-arrows" aria-hidden="true">
              <button type="button">‹</button>
              <button type="button">›</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="report-banner">
            <div className="report-copy">
              <div className="mini-brand"><img src="/logo.jpeg" alt={messages.ui?.brandLogoAlt ?? messages.meta?.siteName ?? "MÜSTAKİL FUAR/ORGANİZASYON"} /></div>
              <h3>{home.report.title}</h3>
              <Link className="report-action" to="/about">
                ↗ {t("actions.downloadReport")}
              </Link>
            </div>
            <div className="report-visual">
              <div className="book-stack"></div>
              <div className="book-mock"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title={home.eventsTitle} />
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

      <section className="section">
        <div className="container">
          <SectionHeading title={home.showcaseTitle} />
          <div className="showcase">
            <div className="showcase-side"></div>
            <div className="showcase-center">
              <h3>{home.showcaseHeading}</h3>
              <p className="lead-copy">{home.showcaseText}</p>
              <ul className="bullet-list">
                {home.showcaseBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
            <div className="showcase-side right"></div>
          </div>
          <div className="slider-nav slider-dots" aria-hidden="true" style={{ color: "var(--brand)" }}>
            <span></span>
            <span></span>
            <span></span>
            <span className="active"></span>
          </div>
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
