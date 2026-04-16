import { EventCard } from "../components/CardGrid";
import { useI18n } from "../i18n/I18nProvider";

function PageHero({ crumb, current, title, className = "" }) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <div className="container">
        <div className="breadcrumbs">
          {crumb} › {current}
        </div>
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
      <PageHero {...events.hero} className="events" />
      <section className="section">
        <div className="container">
          <div className="cards-grid">
            {events.cards.map((item, index) => (
              <EventCard key={item.title} item={item} mutedLink={index !== 0} />
            ))}
          </div>
          <div className="pagination-row">
            <button type="button" aria-label={messages.ui?.previous ?? "Previous"}>‹</button>
            {events.pagination.map((item, index) => (
              <button key={item} className={index === 0 ? "active" : ""} type="button">{item}</button>
            ))}
            <button type="button" aria-label={messages.ui?.next ?? "Next"}>›</button>
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
