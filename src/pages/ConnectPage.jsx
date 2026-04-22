import { useI18n } from "../i18n/I18nProvider";

export default function ConnectPage() {
  const { messages } = useI18n();
  const c = messages.connect;

  return (
    <main className="mc-page">
      {/* Hero */}
      <section className="mc-hero">
        <div className="container">
          <div className="mc-hero-inner">
            <div className="mc-hero-left">
              <span className="mc-badge-pill">{c.hero.badge}</span>
              <h1 className="mc-hero-title">{c.hero.title}</h1>
              <p className="mc-hero-desc">{c.hero.desc}</p>
              <div className="mc-hero-buttons">
                <button className="mc-btn-outline" onClick={() => document.getElementById('ozellikler').scrollIntoView({ behavior: 'smooth' })}>{c.hero.ctaSecondary}</button>
              </div>
              <div className="mc-hero-info-cards">
                {c.hero.infoCards.map((text, i) => (
                  <div key={i} className="mc-info-card">{text}</div>
                ))}
              </div>
            </div>
            <div className="mc-hero-right">
              <div className="mc-hero-feature-card">
                <h3>{c.hero.featureCard.title}</h3>
                <ul className="mc-bullet-list">
                  {c.hero.featureCard.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Necessary */}
      <section className="mc-section">
        <div className="container">
          <p className="mc-section-label">{c.why.badge}</p>
          <h2 className="mc-section-title">{c.why.title}</h2>
          <p className="mc-section-desc">{c.why.desc}</p>
          <div className="mc-two-col">
            <div className="mc-card">
              <h3>{c.why.problems.title}</h3>
              <ul className="mc-bullet-list">
                {c.why.problems.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="mc-card">
              <h3>{c.why.solution.title}</h3>
              <p>{c.why.solution.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="ozellikler" className="mc-section mc-section-light">
        <div className="container">
          <p className="mc-section-label">{c.features.badge}</p>
          <h2 className="mc-section-title">{c.features.title}</h2>
          <p className="mc-section-desc">{c.features.desc}</p>
          <div className="mc-features-grid">
            {c.features.items.map((item) => (
              <div key={item.title} className="mc-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mc-section">
        <div className="container">
          <p className="mc-section-label">{c.process.badge}</p>
          <h2 className="mc-section-title">{c.process.title}</h2>
          <p className="mc-section-desc">{c.process.desc}</p>
          <div className="mc-steps-grid">
            {c.process.steps.map((step) => (
              <div key={step.number} className="mc-step-card">
                <div className="mc-step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mc-section mc-section-light">
        <div className="container">
          <p className="mc-section-label">{c.benefits.badge}</p>
          <h2 className="mc-section-title">{c.benefits.title}</h2>
          <p className="mc-section-desc">{c.benefits.desc}</p>
          <div className="mc-two-col">
            <div className="mc-card">
              <h3>{c.benefits.contribution.title}</h3>
              <ul className="mc-bullet-list">
                {c.benefits.contribution.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="mc-card">
              <h3>{c.benefits.approach.title}</h3>
              <p>{c.benefits.approach.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario */}
      <section className="mc-section">
        <div className="container">
          <p className="mc-section-label">{c.scenario.badge}</p>
          <h2 className="mc-section-title">{c.scenario.title}</h2>
          <p className="mc-section-desc">{c.scenario.desc}</p>
          <div className="mc-two-col">
            <div className="mc-card">
              <h3>{c.scenario.flow.title}</h3>
              <ul className="mc-bullet-list">
                {c.scenario.flow.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="mc-card">
              <h3>{c.scenario.result.title}</h3>
              <p>{c.scenario.result.text}</p>
              <p className="mc-result-bold">{c.scenario.result.bold}</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
