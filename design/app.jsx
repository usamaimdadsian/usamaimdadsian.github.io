// ============================================================================
// app.jsx — tmux shell: windows, panes, focus/zoom, status bar, tweaks.
// ============================================================================
const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "tomorrow",
  "font": "jetbrains",
  "crt": "subtle",
  "layout": "tiled"
}/*EDITMODE-END*/;

const FONTS = {
  jetbrains: "'JetBrains Mono', monospace",
  plex: "'IBM Plex Mono', monospace",
  fira: "'Fira Code', monospace",
};

// pane registry -------------------------------------------------------------
const PANE_META = {
  neofetch: { title: "neofetch", render: (p) => <NeofetchPane {...p} /> },
  about:    { title: "whoami",   render: (p) => <AboutPane {...p} /> },
  projects: { title: "projects", render: (p) => <ProjectsPane {...p} /> },
  skills:   { title: "skills",   render: (p) => <SkillsPane {...p} /> },
  resume:   { title: "resume",   render: (p) => <ResumePane {...p} /> },
  contact:  { title: "contact",  render: (p) => <ContactPane {...p} /> },
  shell:    { title: "shell",    render: (p) => <ShellPane {...p} /> },
};

const WINDOWS = [
  { name: "main",    panes: ["neofetch", "about", "projects", "skills", "shell"] },
  { name: "resume",  panes: ["resume"] },
  { name: "contact", panes: ["contact"] },
];

// tiled grid placement for the main window
const GRID_AREAS = {
  neofetch: "neofetch", about: "about", projects: "projects", skills: "skills", shell: "shell",
};

function Pane({ id, index, active, zoomed, onFocus, onZoom, children }) {
  const meta = PANE_META[id];
  return (
    <div
      className={"pane" + (active ? " pane--active" : "")}
      onMouseDown={onFocus}
      onDoubleClick={onZoom}
      style={{ gridArea: GRID_AREAS[id] || "auto" }}
    >
      <div className="pane__bar">
        <span className="pane__idx">{index}</span>
        <span className="pane__title">{meta.title}</span>
        <span className="pane__dots">
          <button
            className="pane__zoom"
            title={zoomed ? "restore (prefix+z)" : "zoom pane (prefix+z)"}
            onClick={(e) => { e.stopPropagation(); onZoom(); }}
          >
            {zoomed ? "▣" : "▢"}
          </button>
        </span>
      </div>
      <div className="pane__body">{children}</div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [win, setWin] = useState(0);
  const [activePane, setActivePane] = useState("shell");
  const [zoom, setZoom] = useState(null);
  const [history, setHistory] = useState([]);
  const [clock, setClock] = useState(new Date());
  const [projOpen, setProjOpen] = useState(null);

  useEffect(() => {
    const iv = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  // apply theme + font + crt to root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t.theme);
    root.setAttribute("data-crt", t.crt);
    root.style.setProperty("--mono", FONTS[t.font] || FONTS.jetbrains);
  }, [t.theme, t.font, t.crt]);

  const ctx = {
    focusPane: (id) => {
      const wi = WINDOWS.findIndex((w) => w.panes.includes(id));
      if (wi >= 0) { setWin(wi); setActivePane(id); setZoom(WINDOWS[wi].panes.length > 1 ? id : null); }
    },
    goWindow: (n) => { setWin(n); setActivePane(WINDOWS[n].panes[0]); setZoom(null); },
    setTheme: (name) => setTweak("theme", name),
    clear: () => setHistory([]),
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && zoom) setZoom(null);
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key >= "1" && e.key <= String(WINDOWS.length)) ctx.goWindow(+e.key - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  const window0 = WINDOWS[win];
  const panes = window0.panes;
  const toggleZoom = (id) => setZoom((z) => (z === id ? null : id));

  const renderPaneContent = (id) => {
    if (id === "shell") return PANE_META.shell.render({ ctx, history, setHistory });
    if (id === "projects") return PANE_META.projects.render({ onOpen: (pr) => { window.open(pr.url, "_blank"); } });
    return PANE_META[id].render({});
  };

  const isTiled = t.layout === "tiled" && panes.length > 1 && !zoom;
  const visiblePanes = zoom ? [zoom] : panes;

  return (
    <div className="tmux">
      <div className="crt-overlay" aria-hidden="true" />
      <div
        className={"workarea " + (zoom ? "workarea--zoom" : isTiled ? "workarea--tiled" : "workarea--stack")}
      >
        {visiblePanes.map((id) => (
          <Pane
            key={id}
            id={id}
            index={panes.indexOf(id)}
            active={activePane === id}
            zoomed={zoom === id}
            onFocus={() => setActivePane(id)}
            onZoom={() => toggleZoom(id)}
          >
            {renderPaneContent(id)}
          </Pane>
        ))}
      </div>

      {/* tmux status bar */}
      <div className="statusbar">
        <div className="statusbar__left">
          <span className="sb-session">  {window.PORTFOLIO.user} </span>
          <span className="sb-windows">
            {WINDOWS.map((w, i) => (
              <button
                key={i}
                className={"sb-win" + (i === win ? " sb-win--active" : "")}
                onClick={() => ctx.goWindow(i)}
              >
                {i}:{w.name}{i === win ? "*" : ""}
              </button>
            ))}
          </span>
        </div>
        <div className="statusbar__right">
          <span className="sb-host">"{window.PORTFOLIO.system.name}"</span>
          <span className="sb-date">{clock.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
          <span className="sb-time">{clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Appearance" />
        <TweakSelect
          label="Color scheme"
          value={t.theme}
          options={[
            { value: "tomorrow", label: "Tomorrow Night" },
            { value: "dracula", label: "Dracula" },
            { value: "github", label: "GitHub Dark" },
            { value: "matrix", label: "Green CRT" },
            { value: "solarized", label: "Solarized Light" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakSelect
          label="Font"
          value={t.font}
          options={[
            { value: "jetbrains", label: "JetBrains Mono" },
            { value: "plex", label: "IBM Plex Mono" },
            { value: "fira", label: "Fira Code" },
          ]}
          onChange={(v) => setTweak("font", v)}
        />
        <TweakSection label="Terminal feel" />
        <TweakRadio
          label="CRT effect"
          value={t.crt}
          options={["off", "subtle", "full"]}
          onChange={(v) => setTweak("crt", v)}
        />
        <TweakRadio
          label="Layout"
          value={t.layout}
          options={["tiled", "stack"]}
          onChange={(v) => setTweak("layout", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
