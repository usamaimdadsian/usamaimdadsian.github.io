// ============================================================================
// panes.jsx — content panes rendered inside tmux panes.
// Each reads from window.PORTFOLIO. Exported to window for app.jsx.
// ============================================================================
const P = window.PORTFOLIO;

// shared bits ---------------------------------------------------------------
const Prompt = ({ cmd }) => (
  <div style={{ marginBottom: 8, color: "var(--fg-dim)" }}>
    <span style={{ color: "var(--green)" }}>{P.user}@{P.host}</span>
    <span style={{ color: "var(--fg-dim)" }}>:</span>
    <span style={{ color: "var(--blue)" }}>~</span>
    <span style={{ color: "var(--fg-dim)" }}>$ </span>
    <span style={{ color: "var(--fg)" }}>{cmd}</span>
  </div>
);

// ---- Neofetch -------------------------------------------------------------
function NeofetchPane() {
  const s = P.system;
  const rows = [
    ["OS", s.os], ["Uptime", s.uptime], ["DE", s.de], ["WM", s.wm],
    ["Shell", s.shell], ["Focus", s.terminal],
    ["CPU", s.cpu], ["GPU", s.gpu], ["Memory", s.memory],
  ];
  const palette = ["--red","--green","--yellow","--blue","--purple","--cyan","--fg","--fg-dim"];
  return (
    <div style={{ display: "flex", gap: 22, flexWrap: "wrap", alignItems: "flex-start" }}>
      <div style={{ flex: "0 0 auto" }}>
        <img
          src={s.photo}
          alt={s.name}
          onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          style={{
            width: 132, height: 132, objectFit: "cover",
            imageRendering: "auto", borderRadius: 4,
            border: "1px solid var(--border)",
            filter: "saturate(0.9) contrast(1.02)",
          }}
        />
        <div style={{
          display: "none", width: 132, height: 132, alignItems: "center", justifyContent: "center",
          border: "1px solid var(--border)", borderRadius: 4, color: "var(--green)", fontSize: 11,
        }}>[ photo ]</div>
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

// ---- whoami / about -------------------------------------------------------
function AboutPane() {
  return (
    <div>
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
function ProjectsPane({ onOpen }) {
  return (
    <div>
      <Prompt cmd="ls -la ~/projects" />
      <div style={{ color: "var(--fg-dim)", marginBottom: 6 }}>total {P.projects.length}</div>
      {P.projects.map((pr, i) => (
        <div
          key={pr.slug}
          onClick={() => onOpen && onOpen(pr)}
          className="proj-row"
          style={{ cursor: "pointer", padding: "5px 6px", borderRadius: 3, marginLeft: -6 }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
            <span style={{ color: "var(--cyan)" }}>{pr.perm}</span>
            <span style={{ color: "var(--fg-dim)" }}>{pr.year}</span>
            <span style={{ color: "var(--blue)", fontWeight: 700 }}>{pr.name}/</span>
            <span style={{ color: "var(--purple)", fontSize: "0.85em" }}>[{pr.lang}]</span>
          </div>
          <div style={{ color: "var(--fg-dim)", marginLeft: 4, fontSize: "0.92em", marginTop: 2 }}>
            {pr.blurb}
          </div>
          <div style={{ marginLeft: 4, marginTop: 4, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {pr.stack.map((t) => (
              <span key={t} style={{ color: "var(--green)", fontSize: "0.8em", border: "1px solid var(--border)", padding: "1px 6px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
      <div style={{ color: "var(--fg-dim)", marginTop: 10, fontSize: "0.85em" }}>
        <span style={{ color: "var(--green)" }}>hint</span> · click a project, or type <span style={{ color: "var(--yellow)" }}>open &lt;name&gt;</span>
      </div>
    </div>
  );
}

// ---- skills ---------------------------------------------------------------
function SkillsPane() {
  return (
    <div>
      <Prompt cmd="skills --tree" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "16px 28px" }}>
        {P.skills.map((g) => (
          <div key={g.cat}>
            <div style={{ color: "var(--orange)", fontWeight: 700, marginBottom: 4 }}>
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
    </div>
  );
}

// ---- resume timeline ------------------------------------------------------
function ResumePane() {
  return (
    <div>
      <Prompt cmd="git log --oneline --graph career" />
      <div style={{ maxWidth: 720 }}>
        {P.resume.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "var(--yellow)" }}>●</span>
              {i < P.resume.length - 1 && <span style={{ flex: 1, width: 1, background: "var(--border)", margin: "2px 0" }} />}
            </div>
            <div style={{ paddingBottom: 18 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <span style={{ color: "var(--blue)", fontWeight: 700 }}>{r.role}</span>
                <span style={{ color: "var(--fg-dim)", fontSize: "0.85em" }}>{r.period}</span>
              </div>
              <div style={{ color: "var(--green)", fontSize: "0.9em", marginBottom: 4 }}>{r.org}</div>
              {r.points.map((pt, j) => (
                <div key={j} style={{ color: "var(--fg-dim)", lineHeight: 1.6, fontSize: "0.92em" }}>
                  <span style={{ color: "var(--purple)" }}>↳ </span>{pt}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- contact / socials ----------------------------------------------------
function ContactPane() {
  return (
    <div>
      <Prompt cmd="cat contact.json" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 8 }}>
        {P.socials.map((s) => (
          <a
            key={s.key}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-row"
            style={{ textDecoration: "none", display: "flex", gap: 10, alignItems: "baseline", padding: "6px 8px", borderRadius: 3, border: "1px solid transparent" }}
          >
            <span style={{ color: "var(--yellow)", minWidth: 84, display: "inline-block" }}>{s.label}</span>
            <span style={{ color: "var(--fg-dim)" }}>→</span>
            <span style={{ color: "var(--blue)" }}>{s.handle}</span>
          </a>
        ))}
      </div>
      <div style={{ color: "var(--fg-dim)", marginTop: 12, fontSize: "0.85em" }}>
        <span style={{ color: "var(--green)" }}>tip</span> · type <span style={{ color: "var(--yellow)" }}>open github</span> to launch any link
      </div>
    </div>
  );
}

Object.assign(window, {
  NeofetchPane, AboutPane, ProjectsPane, SkillsPane, ResumePane, ContactPane, Prompt,
});
