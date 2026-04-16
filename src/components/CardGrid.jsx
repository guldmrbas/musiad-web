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

  return (
    <article className="event-card">
      <div className="card-logo" style={{ color: item.logoColor }}>
        {item.logo.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className={`card-divider${item.activeBar ? " active" : ""}`}></div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      {item.date ? <div className="card-date">{item.date}</div> : null}
      {item.location ? <div className="card-location">{item.location}</div> : null}
      {item.link ? <div className="card-location">{item.link}</div> : null}
      <CardLink mutedLink={mutedLink} to={linkTarget} text={t("actions.readMore")} />
    </article>
  );
}

export function EventCard({ item, mutedLink }) {
  return <BaseCard item={item} mutedLink={mutedLink} linkTarget="/events" />;
}

export function CommunityCard({ item, mutedLink }) {
  return <BaseCard item={item} mutedLink={mutedLink} linkTarget="/connect" />;
}

export function AssociationCard({ item, mutedLink }) {
  return <BaseCard item={item} mutedLink={mutedLink} linkTarget="/about" />;
}
