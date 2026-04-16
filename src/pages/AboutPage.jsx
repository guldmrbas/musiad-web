import SectionHeading from "../components/SectionHeading";
import { AssociationCard } from "../components/CardGrid";
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

export default function AboutPage() {
  const { messages } = useI18n();
  const about = messages.about;

  return (
    <main>
      <PageHero {...about.hero} className="people" />

      <section className="quote-panel">
        <div className="container">
          <blockquote>{about.quote.text}</blockquote>
          <cite>
            <strong>{about.quote.author}</strong>
            <br />
            {about.quote.role}
          </cite>
        </div>
      </section>

      <section className="page-layout">
        <div className="container two-col">
          <div className="page-copy">
            <SectionHeading title={about.aboutUs.title} />
            {about.aboutUs.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h3>{about.aboutUs.statsTitle}</h3>
            <ul className="bullet-list">
              {about.aboutUs.stats.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {about.aboutUs.closing.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="page-visual exhibition"></div>
        </div>
      </section>

      <section className="page-layout">
        <div className="container">
          <SectionHeading title={about.mission.title} />
          <h2 className="display-statement">{about.mission.statement}</h2>
        </div>
      </section>

      <section className="page-layout">
        <div className="container">
          <SectionHeading title={about.values.title} />
          <div className="values-panel">
            <div className="values-copy">
              <div className="values-eyebrow">{about.values.eyebrow}</div>
              <h2>{about.values.statement}</h2>
            </div>
            <div className="values-visual"></div>
          </div>
        </div>
      </section>

      <section className="page-layout">
        <div className="container leadership-wrap">
          <h2 className="panel-title">{about.leadership.title}</h2>
          <div className="two-col leader-grid">
            <div className="leader-photo"></div>
            <div className="page-copy">
              <h3 className="person-name">{about.leadership.name}</h3>
              <div className="person-role">{about.leadership.role}</div>
              {about.leadership.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title={about.associationsTitle} />
          <div className="cards-grid">
            {about.associations.map((item, index) => (
              <AssociationCard key={item.title} item={item} mutedLink={index !== 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="cta-banner">
          <div className="cta-media"></div>
          <div className="cta-copy">
            <h3>{about.cta}</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
