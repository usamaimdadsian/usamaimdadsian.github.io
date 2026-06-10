"use client";

// ============================================================================
// Panes.js — content panes rendered inside the tmux panes.
// Each reads from the portfolio data object (passed down from Terminal).
// ============================================================================
import { useState } from "react";
import { portfolio as P } from "@/lib/portfolio";
import Icon from "./icons";

// shared bits ---------------------------------------------------------------
export function Prompt({ cmd }) {
  return (
    <div style={{ marginBottom: 8, color: "var(--fg-dim)" }}>
      <span style={{ color: "var(--green)" }}>{P.user}@{P.host}</span>
      <span style={{ color: "var(--fg-dim)" }}>:</span>
      <span style={{ color: "var(--blue)" }}>~</span>
      <span style={{ color: "var(--fg-dim)" }}>$ </span>
      <span style={{ color: "var(--fg)" }}>{cmd}</span>
    </div>
  );
}

// ---- Neofetch -------------------------------------------------------------
export function NeofetchPane() {
  const s = P.system;
  const [imgError, setImgError] = useState(false);
  const rows = [
    ["From", s.os], ["Experience", s.uptime]
  ];
  const palette = ["--red", "--green", "--yellow", "--blue", "--purple", "--cyan", "--fg", "--fg-dim"];
  return (
    <div style={{ display: "flex", gap: 22, flexWrap: "wrap", alignItems: "flex-start" }}>
      <div style={{ flex: "0 0 auto" }}>
        {imgError ? (
          <div style={{
            display: "flex", width: 132, height: 132, alignItems: "center", justifyContent: "center",
            border: "1px solid var(--border)", borderRadius: 4, color: "var(--green)", fontSize: 11,
          }}>[ photo ]</div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={s.photo}
            alt={s.name}
            onError={() => setImgError(true)}
            style={{
              width: 132, height: 132, objectFit: "cover",
              imageRendering: "auto", borderRadius: 4,
              border: "1px solid var(--border)",
              filter: "saturate(0.9) contrast(1.02)",
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 220 }}>
        <div style={{ color: "var(--green)", fontWeight: 700 }}>
          {s.name}<span style={{ color: "var(--fg-dim)" }}> @ </span>
          <span style={{ color: "var(--orange)" }}>{P.host}</span>
        </div>
        <div style={{ color: "var(--fg-dim)", borderBottom: "1px solid var(--border)", margin: "3px 0 8px", paddingBottom: 6, fontSize: "0.92em" }}>
          {s.title}
        </div>
        {rows.map(([k, v]) => (
          <div key={k} style={{ lineHeight: 1.7 }}>
            <span style={{ color: "var(--yellow)", display: "inline-block", minWidth: 70 }}>{k}</span>
            <span style={{ color: "var(--fg-dim)" }}>: </span>
            <span style={{ color: "var(--fg)" }}>{v}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
          {palette.map((c) => (
            <span key={c} style={{ width: 16, height: 16, background: `var(${c})`, borderRadius: 2 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- about (neofetch system card + whoami bio, merged) --------------------
export function AboutPane() {
  return (
    <div>
      <NeofetchPane />
      <div style={{ borderTop: "1px solid var(--border)", margin: "18px 0 14px" }} />
      <Prompt cmd="cat about.txt" />
      <div style={{ color: "var(--fg)", lineHeight: 1.75, maxWidth: 620 }}>
        {P.about.map((line, i) =>
          line === "" ? <div key={i} style={{ height: 12 }} /> : <div key={i}>{line}</div>
        )}
      </div>
    </div>
  );
}

// ---- projects (ls -la) ----------------------------------------------------
export function ProjectsPane({ projects, onOpen }) {
  if (!projects || projects.length === 0) {
    return (
      <div>
        <Prompt cmd="ls ~/projects" />
        <div style={{ color: "var(--red)" }}>ls: cannot access ~/projects: backend unavailable</div>
        <div style={{ color: "var(--fg-dim)", marginTop: 6, fontSize: "0.9em" }}>
          The Strapi backend isn&apos;t reachable. Start it and it will sync projects from GitHub.
        </div>
      </div>
    );
  }
  return (
    <div>
      <Prompt cmd="ls -la ~/projects" />
      <div style={{ color: "var(--fg-dim)", marginBottom: 6 }}>{projects.length} repositories</div>
      {projects.map((pr) => (
        <div
          key={pr.slug}
          onClick={(e) => { e.stopPropagation(); onOpen && onOpen(pr); }}
          className="proj-row"
          style={{ cursor: "pointer", padding: "5px 6px", borderRadius: 3, marginLeft: -6 }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
            <span style={{ color: "var(--green)" }}>▸</span>
            <span style={{ color: "var(--blue)", fontWeight: 700 }}>{pr.name}</span>
            {pr.lang && <span style={{ color: "var(--purple)", fontSize: "0.85em" }}>{pr.lang}</span>}
            {pr.year && <span style={{ color: "var(--fg-dim)", fontSize: "0.85em" }}>{pr.year}</span>}
            {pr.stars > 0 && <span style={{ color: "var(--yellow)", fontSize: "0.8em" }}>★ {pr.stars}</span>}
          </div>
          <div style={{ color: "var(--fg-dim)", marginLeft: 4, fontSize: "0.92em", marginTop: 2 }}>
            {pr.blurb}
          </div>
          {pr.stack.length > 0 && (
            <div style={{ marginLeft: 4, marginTop: 4, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {pr.stack.map((t) => (
                <span key={t} style={{ color: "var(--green)", fontSize: "0.8em", border: "1px solid var(--border)", padding: "1px 6px", borderRadius: 3 }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ color: "var(--fg-dim)", marginTop: 10, fontSize: "0.85em" }}>
        <span style={{ color: "var(--green)" }}>hint</span> · click a project to read it, or type <span style={{ color: "var(--yellow)" }}>open &lt;name&gt;</span>
      </div>
    </div>
  );
}

// shared section heading
function SectionHead({ children }) {
  return (
    <div style={{ color: "var(--orange)", fontWeight: 700, margin: "18px 0 8px", letterSpacing: ".03em" }}>
      <span style={{ color: "var(--fg-dim)" }}># </span>{children}
    </div>
  );
}

const tagStyle = {
  color: "var(--green)", fontSize: "0.78em",
  border: "1px solid var(--border)", padding: "1px 6px", borderRadius: 3,
};

// ---- qualifications (skills + education + certifications) ------------------
export function QualificationsPane() {
  return (
    <div style={{ maxWidth: 760 }}>
      <Prompt cmd="cat qualifications.txt" />

      <SectionHead>skills</SectionHead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "16px 28px" }}>
        {P.skills.map((g) => (
          <div key={g.cat}>
            <div style={{ color: "var(--blue)", fontWeight: 700, marginBottom: 4 }}>
              <span style={{ color: "var(--fg-dim)" }}>▸ </span>{g.cat}
            </div>
            {g.items.map((it, i) => (
              <div key={it} style={{ color: "var(--fg)", lineHeight: 1.65, marginLeft: 6 }}>
                <span style={{ color: "var(--green)" }}>{i === g.items.length - 1 ? "└─" : "├─"} </span>{it}
              </div>
            ))}
          </div>
        ))}
      </div>

      <SectionHead>education</SectionHead>
      {P.education.map((e) => (
        <div key={e.school} style={{ marginBottom: 10 }}>
          <div style={{ color: "var(--blue)", fontWeight: 700 }}>{e.school}</div>
          <div style={{ color: "var(--fg)" }}>{e.degree}</div>
          <div style={{ color: "var(--fg-dim)", fontSize: "0.85em" }}>{e.period}</div>
        </div>
      ))}

      <SectionHead>certifications</SectionHead>
      {P.certifications.map((c) => (
        <div key={c.name} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
            <span style={{ color: "var(--green)" }}>✓</span>
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>{c.name}</span>
          </div>
          <div style={{ color: "var(--fg-dim)", fontSize: "0.85em", marginLeft: 18 }}>
            {c.issuer} · {c.date}
            {c.credId && <span> · id {c.credId}</span>}
          </div>
          {c.skills && c.skills.length > 0 && (
            <div style={{ marginLeft: 18, marginTop: 4, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {c.skills.map((s) => <span key={s} style={tagStyle}>{s}</span>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---- work experience timeline ---------------------------------------------
export function ExperiencePane() {
  return (
    <div>
      <Prompt cmd="cat work-experience.log" />
      <div style={{ maxWidth: 760 }}>
        {P.experience.map((e, i) => (
          <div key={`${e.org}-${e.role}`} style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "var(--yellow)" }}>●</span>
              {i < P.experience.length - 1 && <span style={{ flex: 1, width: 1, background: "var(--border)", margin: "2px 0" }} />}
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <span style={{ color: "var(--blue)", fontWeight: 700 }}>{e.role}</span>
                <span style={{ color: "var(--purple)", fontSize: "0.8em" }}>{e.type}</span>
              </div>
              <div style={{ color: "var(--green)", fontSize: "0.92em" }}>{e.org}</div>
              <div style={{ color: "var(--fg-dim)", fontSize: "0.85em", marginTop: 2 }}>
                {e.period} · {e.duration}
              </div>
              <div style={{ color: "var(--fg-dim)", fontSize: "0.85em" }}>{e.location}</div>
              {e.skills && e.skills.length > 0 && (
                <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "baseline" }}>
                  {e.skills.map((s) => <span key={s} style={tagStyle}>{s}</span>)}
                  {e.more > 0 && <span style={{ color: "var(--fg-dim)", fontSize: "0.78em" }}>+{e.more} more</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- contact / socials ----------------------------------------------------
const SOCIAL_COLOR = {
  email: "--orange", github: "--fg", linkedin: "--blue", x: "--fg",
  youtube: "--red", upwork: "--green", blog: "--orange",
};

export function ContactPane() {
  const email = "usamaimdadsian@gmail.com";
  const cards = [
    { key: "email", label: "Email", handle: email, url: `mailto:${email}`, external: false },
    ...P.socials.map((s) => ({ ...s, external: true })),
  ];
  return (
    <div>
      <Prompt cmd="cat contact.json" />
      <div style={{ color: "var(--fg-dim)", marginBottom: 12, maxWidth: 620, lineHeight: 1.6 }}>
        Open to freelance work and research roles — reach out on any channel below.
      </div>
      <div className="contact-grid">
        {cards.map((s) => (
          <a
            key={s.key}
            href={s.url}
            target={s.external ? "_blank" : undefined}
            rel={s.external ? "noopener noreferrer" : undefined}
            className="contact-card"
          >
            <span className="contact-card__icon" style={{ color: `var(${SOCIAL_COLOR[s.key] || "--green"})` }}>
              <Icon name={s.key} />
            </span>
            <span className="contact-card__body">
              <span className="contact-card__label">{s.label}</span>
              <span className="contact-card__handle">{s.handle}</span>
            </span>
            <span className="contact-card__arrow">↗</span>
          </a>
        ))}
      </div>
      <div style={{ color: "var(--fg-dim)", marginTop: 14, fontSize: "0.85em" }}>
        <span style={{ color: "var(--green)" }}>tip</span> · type <span style={{ color: "var(--yellow)" }}>open github</span> in the shell to launch any link
      </div>
    </div>
  );
}
