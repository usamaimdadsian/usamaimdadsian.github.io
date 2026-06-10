"use client";

// ============================================================================
// Dashboard.js — the "/" overview: every pane tiled together. Each pane can be
// opened into its own page (click it, press its number, ▢ button, or focus it
// with the arrow keys / hjkl and hit f/enter). The shell stays here.
// ============================================================================
import { useCallback, useEffect, useRef, useState } from "react";
import Pane from "./Pane";
import { useNav } from "./nav";
import { AboutPane, ProjectsPane, SkillsPane, ResumePane } from "./Panes";
import { ShellPane } from "./Shell";

// pane id → its dedicated route, tiled grid slot, and the digit that jumps to it
// (the digits are handled globally in Chrome.js; 0 is the dashboard itself).
const PANES = [
  { id: "about", title: "about", href: "/about", area: "about", key: 1 },
  { id: "projects", title: "projects", href: "/projects", area: "projects", key: 2 },
  { id: "skills", title: "skills", href: "/skills", area: "skills", key: 3 },
  { id: "resume", title: "resume", href: "/resume", area: "resume", key: 4 },
  { id: "shell", title: "shell", href: null, area: "shell", key: null },
];

// Spatial neighbours for arrow-key / hjkl focus movement, matching the grid:
//   about    projects
//   skills   resume
//   shell  (spans both columns)
const NAV = {
  about: { right: "projects", down: "skills" },
  projects: { left: "about", down: "resume" },
  skills: { up: "about", right: "resume", down: "shell" },
  resume: { up: "projects", left: "skills", down: "shell" },
  shell: { up: "skills" },
};

const DIRS = {
  ArrowLeft: "left", h: "left",
  ArrowRight: "right", l: "right",
  ArrowUp: "up", k: "up",
  ArrowDown: "down", j: "down",
};

export default function Dashboard({ projects }) {
  const { navigate } = useNav();
  const [activePane, setActivePane] = useState("about");
  const activeRef = useRef(activePane);
  activeRef.current = activePane;
  const workRef = useRef(null);

  const openProject = useCallback((pr) => {
    if (pr.slug) navigate(`/projects/${pr.slug}`);
    else if (pr.url) window.open(pr.url, "_blank", "noopener,noreferrer");
  }, [navigate]);

  const focusShell = useCallback(() => {
    const input = document.querySelector('input[aria-label="terminal input"]');
    if (input) input.focus();
  }, []);

  // open a pane: navigate to its page, or focus the shell if it has none
  const openPane = useCallback((id) => {
    const p = PANES.find((x) => x.id === id);
    if (!p) return;
    setActivePane(id);
    if (p.href) navigate(p.href);
    else focusShell();
  }, [navigate, focusShell]);

  // keyboard: arrows/hjkl move focus, f/enter open focused pane.
  // (digit shortcuts 0..5 are handled globally in Chrome.js)
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      // while typing in the shell, leave the keys alone (Esc-to-leave lives in Chrome)
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (DIRS[e.key]) {
        e.preventDefault();
        setActivePane((cur) => NAV[cur]?.[DIRS[e.key]] || cur);
        return;
      }
      if (e.key === "f" || e.key === "Enter") {
        e.preventDefault();
        openPane(activeRef.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPane]);

  // keep the focused pane visible (matters on the single-column mobile layout)
  useEffect(() => {
    const node = workRef.current?.querySelector(`[data-pane="${activePane}"]`);
    if (node) node.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activePane]);

  const [history, setHistory] = useState([]);

  const ctx = {
    go: (path) => navigate(path),
    openProject,
    setTheme: (name) => window.dispatchEvent(new CustomEvent("portfolio:tweak", { detail: { key: "theme", value: name } })),
    clear: () => setHistory([]),
  };

  const renderBody = (id) => {
    switch (id) {
      case "about": return <AboutPane />;
      case "projects": return <ProjectsPane projects={projects} onOpen={openProject} />;
      case "skills": return <SkillsPane />;
      case "resume": return <ResumePane />;
      case "shell": return <ShellPane ctx={ctx} projects={projects} history={history} setHistory={setHistory} />;
      default: return null;
    }
  };

  return (
    <div className="workarea workarea--tiled" ref={workRef}>
      {PANES.map((p) => (
        <Pane
          key={p.id}
          badge={p.key != null ? p.key : "$"}
          paneId={p.id}
          title={p.title}
          gridArea={p.area}
          active={activePane === p.id}
          onActivate={() => setActivePane(p.id)}
          onOpen={p.href ? () => navigate(p.href) : undefined}
          action={p.href ? { href: p.href, icon: "▢", title: "open as page" } : null}
        >
          {renderBody(p.id)}
        </Pane>
      ))}
    </div>
  );
}
