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
      <PageHero title={travel.hero.title} className="travel" />

      <section className="travel-intro-section">
        <div className="container">
          <div className="travel-intro-inner">
            <span className="travel-intro-badge">{travel.badge}</span>
            <p className="travel-intro-text">{travel.intro}</p>
          </div>
        </div>
      </section>

      <section className="travel-info-section">
        <div className="container">
          <div className="travel-info-grid">
            {travel.infoCards.map((card) => (
              <div key={card.title} className="travel-info-card">
                <div className="travel-info-number">{card.number}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="travel-places-section">
        <div className="container">
          <div className="section-heading">
            <div className="flag"></div>
            <h2>{travel.placesTitle}</h2>
          </div>
          <p className="travel-places-intro">{travel.placesIntro}</p>
          <div className="travel-places-grid">
            {travel.places.map((place) => (
              <article key={place.name} className="travel-place-card">
                <div className="travel-place-photo">
                  {place.photo
                    ? <img src={place.photo} alt={place.name} style={{ objectPosition: place.photoPosition || "center" }} />
                    : <span className="travel-place-photo-label">{place.name}</span>
                  }
                </div>
                <div className="travel-place-body">
                  <span className="travel-place-district">{place.district}</span>
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="travel-blog-section">
        <div className="container">
          <div className="section-heading">
            <div className="flag"></div>
            <h2>{travel.blogTitle}</h2>
          </div>
          <div className="travel-blog-grid">
            {travel.blogPosts.map((post) => (
              <article key={post.title} className="travel-blog-card">
                <span className="travel-blog-tag">{post.tag}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
