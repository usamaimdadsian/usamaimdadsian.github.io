"use client";

// ============================================================================
// Chrome.js — the persistent tmux frame shared by every page: CRT overlay,
// status-bar navigation, appearance settings, theme/font/crt application.
// Each route renders <Chrome>{paneContent}</Chrome>.
// ============================================================================
import { useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { portfolio as P } from "@/lib/portfolio";
import Settings from "./Settings";
import { NavContext } from "./nav";

const TWEAK_DEFAULTS = { theme: "tomorrow", font: "jetbrains", crt: "off", layout: "tiled" };
const STORAGE_KEY = "portfolio.tweaks";

// next/font exposes each face as a CSS variable on <html>; map the choice onto --mono.
const FONTS = {
  jetbrains: "var(--font-jetbrains), 'JetBrains Mono', monospace",
  plex: "var(--font-plex), 'IBM Plex Mono', monospace",
  fira: "var(--font-fira), 'Fira Code', monospace",
};

// Status-bar windows are routes. The array index is the digit shortcut:
// 0 dashboard · 1 about · 2 projects · 3 qualifications · 4 experience · 5 contact.
export const NAV = [
  { name: "dashboard", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
  { name: "qualifications", href: "/qualifications" },
  { name: "experience", href: "/experience" },
  { name: "contact", href: "/contact" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Chrome({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [clock, setClock] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  // route changes go through a transition: the current page stays put and the
  // loading bar shows until the destination (and its data) is ready.
  const navigate = useCallback((href) => {
    startTransition(() => router.push(href));
  }, [router]);

  // load persisted tweaks (client only)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setTweaks((prev) => ({ ...prev, ...saved }));
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  const setTweak = useCallback((key, value) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // clock ticks once mounted; null until then to avoid SSR hydration mismatch
  useEffect(() => {
    setClock(new Date());
    const iv = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  // apply theme + font + crt to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", tweaks.theme);
    root.setAttribute("data-crt", tweaks.crt);
    root.style.setProperty("--mono", FONTS[tweaks.font] || FONTS.jetbrains);
  }, [tweaks.theme, tweaks.font, tweaks.crt]);

  // let the shell (or any descendant) change a tweak without prop drilling
  useEffect(() => {
    const onTweak = (e) => { if (e.detail?.key) setTweak(e.detail.key, e.detail.value); };
    window.addEventListener("portfolio:tweak", onTweak);
    return () => window.removeEventListener("portfolio:tweak", onTweak);
  }, [setTweak]);

  // digit keys jump straight to a window/route (0 = dashboard) on any page
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (!/^[0-9]$/.test(e.key)) return;
      const n = Number(e.key);
      if (n < NAV.length) navigate(NAV[n].href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  // esc / backspace step back up one level — a project README → /projects,
  // a top-level pane → the dashboard.
  useEffect(() => {
    const parent = pathname.length > 1 ? (pathname.slice(0, pathname.lastIndexOf("/")) || "/") : "/";
    const onKey = (e) => {
      const el = document.activeElement;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "Escape") {
        if (typing) { el.blur(); return; } // leave the shell so dashboard arrows work
        if (pathname !== "/") navigate(parent);
      } else if (e.key === "Backspace") {
        if (typing) return; // normal text editing
        e.preventDefault();
        if (pathname !== "/") navigate(parent);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, pathname]);

  // close the mobile nav menu whenever the route changes
  useEffect(() => { setNavOpen(false); }, [pathname]);

  const curIdx = NAV.findIndex((w) => isActive(pathname, w.href));
  const current = NAV[curIdx] || NAV[0];

  return (
    <NavContext.Provider value={{ navigate, pending }}>
    <div className="tmux">
      {pending && <div className="navload" aria-hidden="true" />}
      <div className="crt-overlay" aria-hidden="true" />
      {children}

      {/* tmux status bar */}
      <div className="statusbar">
        <div className="statusbar__left">
          <span className={"sb-session" + (pending ? " sb-session--busy" : "")}>
            {pending ? " ⣷ loading " : `  ${P.user} `}
          </span>

          {/* desktop: full inline window list */}
          <span className="sb-windows">
            {NAV.map((w, i) => (
              <Link
                key={w.href}
                href={w.href}
                onClick={(e) => { e.preventDefault(); navigate(w.href); }}
                className={"sb-win" + (isActive(pathname, w.href) ? " sb-win--active" : "")}
              >
                {i}<span className="sb-win__name">:{w.name}{isActive(pathname, w.href) ? "*" : ""}</span>
              </Link>
            ))}
          </span>

          {/* mobile: expander that reveals the full window names */}
          <button
            type="button"
            className="sb-nav-toggle"
            aria-expanded={navOpen}
            aria-label="navigation menu"
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className="sb-nav-toggle__bars">{navOpen ? "✕" : "≡"}</span>
            <span className="sb-nav-toggle__cur">{curIdx < 0 ? 0 : curIdx}:{current.name}</span>
            <span className="sb-nav-toggle__chev">{navOpen ? "▾" : "▴"}</span>
          </button>

          {navOpen && (
            <>
              <button className="sb-menu-backdrop" aria-hidden="true" tabIndex={-1} onClick={() => setNavOpen(false)} />
              <div className="sb-menu" role="menu">
                {NAV.map((w, i) => (
                  <button
                    key={w.href}
                    type="button"
                    role="menuitem"
                    className={"sb-menu__item" + (isActive(pathname, w.href) ? " sb-menu__item--active" : "")}
                    onClick={() => { setNavOpen(false); navigate(w.href); }}
                  >
                    <span className="sb-menu__num">{i}</span>
                    <span>{w.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <span className="sb-keys">
            {pathname === "/" ? "↑↓←→/hjkl move · ↵/f open · 0-5 jump" : "keep scrolling to reveal next · esc/⌫ back · 0-5 jump"}
          </span>
        </div>
        <div className="statusbar__right">
          <button className="sb-gear" title="Appearance" onClick={() => setSettingsOpen((o) => !o)}>⚙</button>
          <span className="sb-host">&quot;{P.system.name}&quot;</span>
          <span className="sb-date" suppressHydrationWarning>
            {clock ? clock.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) : ""}
          </span>
          <span className="sb-time" suppressHydrationWarning>
            {clock ? clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
          </span>
        </div>
      </div>

      {settingsOpen && (
        <Settings tweaks={tweaks} setTweak={setTweak} onClose={() => setSettingsOpen(false)} />
      )}
    </div>
    </NavContext.Provider>
  );
}
