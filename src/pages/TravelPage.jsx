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

export default function TravelPage() {
  const { messages } = useI18n();
  const travel = messages.travel;

  return (
    <main>
      <PageHero {...travel.hero} className="travel" />
      <section className="page-layout">
        <div className="container travel-grid">
          <div className="page-copy">
            <p>{travel.left.intro}</p>
            <ul className="bullet-list">
              {travel.left.services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{travel.left.contact}</p>
            <div className="stacked-links">
              {travel.left.links.map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
            <a className="guide-link" href="#">{travel.left.guide}</a>
          </div>
          <aside className="info-panel">
            <h2>{travel.right.title}</h2>
            <ul className="bullet-list compact">
              {travel.right.links.map((item) => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
