import { useI18n } from "../i18n/I18nProvider";

function PageHero({ title, className = "" }) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
}

export default function ContactPage() {
  const { messages } = useI18n();
  const contact = messages.contact;
  const venue = contact.venue;
  const sales = contact.sales;

  return (
    <main>
      <PageHero {...contact.hero} className="contact office" />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {contact.hero.intro ? (
            <p className="contact-intro">{contact.hero.intro}</p>
          ) : null}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="contact-section-title">{contact.venueSectionTitle}</h2>
          <div className="contact-grid">
            <article className="contact-card venue-card">
              <h3>{venue.title}</h3>
              <div className="office-address">
                {venue.address.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>

              <div className="contact-links">
                <a href={`tel:${venue.phoneRaw ?? venue.phone}`}>{venue.phone}</a>
                <a href={`mailto:${venue.email}`}>{venue.email}</a>
                <a href={venue.websiteUrl} rel="noreferrer" target="_blank">
                  {venue.website}
                </a>
              </div>
            </article>

            <aside className="contact-card map-card">
              <div className="map-card-inner">
                <div className="map-kicker">{contact.mapCard.label}</div>
                <h3>{contact.mapCard.title}</h3>
                <p>{contact.mapCard.text}</p>
                <a className="ghost-button" href={venue.mapUrl} rel="noreferrer" target="_blank">
                  {contact.mapCard.action}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-panel">
            <h2 className="contact-section-title">{sales.title}</h2>
            <p className="lead-copy">{sales.intro}</p>

            <div className="sales-grid">
              {sales.contacts.map((person) => (
                <article className="sales-card" key={person.email}>
                  <h3>{person.name}</h3>
                  <div className="sales-language">{person.languages}</div>
                  <a className="sales-link" href={`tel:${person.phoneRaw ?? person.phone}`}>
                    {person.phone}
                  </a>
                  <a className="sales-link" href={`mailto:${person.email}`}>
                    {person.email}
                  </a>
                </article>
              ))}
            </div>

            {contact.note ? <p className="contact-note">{contact.note}</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
