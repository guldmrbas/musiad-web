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

export default function PrivacyPolicyPage() {
  const { messages } = useI18n();
  const privacy = messages.privacyPolicy;

  return (
    <main>
      <PageHero title={privacy.hero.title} className="privacy" />
      <section className="page-layout privacy-page-layout">
        <div className="container">
          <div className="page-copy privacy-copy">
            <p>{privacy.intro}</p>
            {privacy.sections.map((section) => (
              <section key={section.title} className="privacy-section">
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <p className="privacy-updated">{privacy.updatedAt}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
