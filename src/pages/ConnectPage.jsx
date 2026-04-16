import SectionHeading from "../components/SectionHeading";
import { CommunityCard } from "../components/CardGrid";
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

export default function ConnectPage() {
  const { messages } = useI18n();
  const connect = messages.connect;

  return (
    <main>
      <PageHero {...connect.hero} className="connect" />
      <section className="page-layout">
        <div className="container">
          <SectionHeading title={connect.intro.title} />
          <p className="lead-copy">{connect.intro.text}</p>
        </div>
      </section>
      <section className="page-layout">
        <div className="container">
          <h2 className="section-title-plain">{connect.whatIs.title}</h2>
          <ul className="bullet-list">
            {connect.whatIs.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading title={connect.communitiesTitle} />
          <div className="cards-grid">
            {connect.communities.map((item, index) => (
              <CommunityCard key={item.title} item={item} mutedLink={index !== 3} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
