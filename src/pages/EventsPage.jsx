import { EventCard } from "../components/CardGrid";
import { useI18n } from "../i18n/I18nProvider";
import PreloadImage from "../components/PreloadImage";

function PageHero({ title, className = "" }) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
}

export default function EventsPage() {
  const { messages } = useI18n();
  const events = messages.events;

  return (
    <main>
      <PreloadImage href="/images/msiad.webp" />
      <PageHero title={events.hero.title} className="events" />
      <section className="section">
        <div className="container">
          <div className="cards-grid">
            {events.cards.map((item) => (
              <EventCard key={item.title} item={item} mutedLink={false} />
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="cta-banner">
          <div className="cta-media"></div>
          <div className="cta-copy">
            <h3>{events.cta}</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
