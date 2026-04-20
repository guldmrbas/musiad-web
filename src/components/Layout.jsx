import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

const languageOrder = ["tr", "en", "ar"];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, messages } = useI18n();

  const navItems = messages.nav ?? [];
  const siteName = messages.meta?.siteName ?? "MÜSTAKİL FUAR/ORGANİZASYON";

  useEffect(() => {
    setLangOpen(false);
    setMenuOpen(false);
  }, [language]);

  return (
    <header className="site-header">
      <div className="container nav-row">
        <NavLink className="brand-mark" to="/" aria-label={messages.ui?.homeAriaLabel ?? `${siteName} home`}>
          <img src="/logo.jpeg" alt={messages.ui?.brandLogoAlt ?? siteName} className="brand-logo" />
        </NavLink>

        <nav className="nav-links" aria-label={messages.ui?.primaryNavigation ?? "Primary navigation"}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-tools">
          <div className={`lang-switch${langOpen ? " open" : ""}`}>
            <button
              aria-label={messages.ui?.changeLanguage ?? "Change language"}
              className="lang-button"
              onClick={() => setLangOpen((v) => !v)}
              type="button"
            >
              <span>🌐</span>
              <span>{messages.languages?.[language] ?? language.toUpperCase()}</span>
              <span>▾</span>
            </button>
            <div className="lang-menu">
              {languageOrder.map((code) => (
                <button
                  key={code}
                  className={code === language ? "active" : ""}
                  onClick={() => {
                    setLanguage(code);
                    setLangOpen(false);
                  }}
                  type="button"
                >
                  {messages.languages?.[code] ?? code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            className="menu-button"
            aria-expanded={menuOpen}
            aria-label={messages.ui?.openMenu ?? "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            ☰
          </button>
        </div>
      </div>

      <div className={`mobile-panel${menuOpen ? " open" : ""}`}>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

function Footer() {
  const { messages } = useI18n();
  const footer = messages.footer;
  const bottom = footer.bottom;
  const socialLinks = {
    linkedin: "https://www.linkedin.com/company/m%C3%BCstakilfuarc%C4%B1l%C4%B1k/",
    x: "https://x.com/MUSIADEXPO",
    instagram: "https://www.instagram.com/musiadexpo/",
    youtube: "https://www.youtube.com/@MUSIADTV",
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-nav">
            {footer.groups.map((group) => (
              <div className="footer-group" key={group.title}>
                <h4>{group.title}</h4>
                {group.links.map((link) => {
                  if (link.href) {
                    return <a key={`${group.title}-${link.label}`} href={link.href}>{link.label}</a>;
                  }
                  if (link.to) {
                    return <NavLink key={`${group.title}-${link.label}`} to={link.to}>{link.label}</NavLink>;
                  }
                  return <span key={`${group.title}-${link.label}`} className="footer-text">{link.label}</span>;
                })}
              </div>
            ))}
          </div>

          <a
            className="back-top"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ▲
          </a>
        </div>
      </div>

      {bottom && (
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <div className="footer-bottom-social">
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label={messages.ui?.linkedin ?? "LinkedIn"} className="footer-bottom-icon">in</a>
              <a href={socialLinks.x} target="_blank" rel="noreferrer" aria-label="Twitter / X" className="footer-bottom-icon">𝕏</a>
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label={messages.ui?.instagram ?? "Instagram"} className="footer-bottom-icon">⌘</a>
              <a href={socialLinks.youtube} target="_blank" rel="noreferrer" aria-label={messages.ui?.youtube ?? "YouTube"} className="footer-bottom-icon">▶</a>
            </div>
            <div className="footer-bottom-brand">{messages.meta?.siteName ?? "MÜSTAKİL FUAR/ORGANİZASYON"}</div>
            <div className="footer-bottom-legal">{bottom.legal}</div>
            <div className="footer-bottom-copy">{bottom.copyright}</div>
            <div className="footer-bottom-policies">
              {bottom.policies.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span className="footer-bottom-sep"> | </span>}
                  <a href="#">{item}</a>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

function FloatRail() {
  return (
    <div className="float-rail" aria-hidden="true">
      <a href="mailto:satis@mustakilfuarcilik.com">✉</a>
      <a href="tel:+905309129475">✆</a>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const { isRtl } = useI18n();

  const pageClass = useMemo(() => {
    return location.pathname === "/" ? "home-page" : `${location.pathname.slice(1)}-page`;
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    document.body.className = `${pageClass}${isRtl ? " rtl" : ""}`;
    return () => {
      document.body.className = "";
    };
  }, [isRtl, pageClass]);

  return (
    <div className="page-shell">
      <Header />
      <FloatRail />
      <Outlet />
      <Footer />
    </div>
  );
}
