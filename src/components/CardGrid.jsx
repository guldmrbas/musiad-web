import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

function CardLink({ mutedLink, to = "#", text }) {
  if (to === "#") {
    return <span className={`card-link${mutedLink ? " muted" : ""}`}>{text}</span>;
  }

  return (
    <Link className={`card-link${mutedLink ? " muted" : ""}`} to={to}>
      {text}
    </Link>
  );
}

function BaseCard({ item, mutedLink, linkTarget = "#" }) {
  const { t } = useI18n();
  const descriptions = Array.isArray(item.description)
    ? item.description
    : item.description
      ? [item.description]
      : [];
  const externalLink = item.linkUrl || (item.link ? `https://${item.link}` : null);

  return (
    <article className="event-card">
      <div className="card-logo" style={{ color: item.logoColor }}>
        {item.logo.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className={`card-divider${item.activeBar ? " active" : ""}`}></div>
      {item.logoImage ? (
        <div className="card-logo-image-wrap">
          <a href={externalLink} target="_blank" rel="noreferrer">
            <img
              src={item.logoImage}
              alt={item.title}
              className="card-logo-image"
            />
          </a>
        </div>
      ) : null}
      {item.title ? <h3>{item.title}</h3> : null}
      {descriptions.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {item.hideReadMore ? null : (
        <CardLink mutedLink={mutedLink} to={linkTarget} text={t("actions.readMore")} />
      )}
      {(item.date || item.location || item.link) ? (
        <div className="card-footer">
          {item.date ? <div className="card-date">{item.date}</div> : null}
          {item.location ? <div className="card-location">{item.location}</div> : null}
          {item.link ? (
            <a
              className="card-location"
              href={externalLink}
              target="_blank"
              rel="noreferrer"
            >
              {item.link}
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function EventCard({ item, mutedLink }) {
  return <BaseCard item={{ ...item, hideReadMore: true }} mutedLink={mutedLink} linkTarget="/events" />;
}

export function CommunityCard({ item, mutedLink }) {
  return <BaseCard item={item} mutedLink={mutedLink} linkTarget="/connect" />;
}

export function AssociationCard({ item, mutedLink }) {
  return <BaseCard item={{ ...item, hideReadMore: true }} mutedLink={mutedLink} linkTarget="#" />;
}
