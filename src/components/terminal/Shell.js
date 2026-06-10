"use client";

// ============================================================================
// Shell.js — interactive command-line pane (REPL).
// Parses commands and dispatches actions back to the Terminal via ctx.
// ============================================================================
import { useEffect, useRef, useState } from "react";
import { portfolio as P } from "@/lib/portfolio";

const COMMANDS = {
  help: "list available commands",
  home: "go to the dashboard",
  about: "about Usama — system card + bio",
  whoami: "alias of about",
  ls: "list projects",
  projects: "show projects pane",
  open: "open <project|social>  e.g. open github",
  resume: "show experience timeline",
  skills: "show skills",
  contact: "show contact + socials",
  neofetch: "alias of about",
  theme: "theme <name>  (tomorrow|dracula|github|matrix|solarized)",
  clear: "clear this shell",
  date: "print current date/time",
};

export function runCommand(raw, ctx, projects) {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  const [cmd, ...args] = trimmed.split(/\s+/);
  const c = cmd.toLowerCase();
  const arg = args.join(" ").toLowerCase();
  const ok = (lines) => lines.map((l) => ({ type: "out", text: l }));
  const err = (l) => [{ type: "err", text: l }];

  switch (c) {
    case "help":
      return ok([
        "available commands:",
        ...Object.entries(COMMANDS).filter(([, v]) => v).map(
          ([k, v]) => `  ${k.padEnd(10)} ${v}`
        ),
        "",
        "windows: 0 dashboard · 1 about · 2 projects · 3 skills · 4 resume · 5 contact",
        "press a number to jump · click a pane · arrows/hjkl move focus, f/enter open",
        "inside a pane: scroll to the next pane · esc or backspace go back to dashboard",
      ]);
    case "about":
    case "whoami":
    case "neofetch":
      ctx.go("/about");
      return ok(["→ opening about"]);
    case "ls":
    case "projects":
      ctx.go("/projects");
      return ok(projects.map((p) => `${p.perm}  ${p.year}  ${p.name}/`));
    case "skills":
      ctx.go("/skills");
      return ok(["→ opening skills"]);
    case "resume":
    case "cv":
      ctx.go("/resume");
      return ok(["→ opening resume"]);
    case "contact":
    case "socials":
      ctx.go("/contact");
      return ok(["→ opening contact"]);
    case "home":
      ctx.go("/");
      return ok(["→ dashboard"]);
    case "open": {
      if (!arg) return err("usage: open <project|social>");
      const soc = P.socials.find((s) => s.key === arg || s.label.toLowerCase() === arg);
      if (soc) { window.open(soc.url, "_blank", "noopener,noreferrer"); return ok([`opening ${soc.label} → ${soc.url}`]); }
      const pr = projects.find((p) => p.name.toLowerCase().includes(arg) || p.slug.toLowerCase().includes(arg));
      if (pr) { ctx.openProject(pr); return ok([`opening ${pr.name}`]); }
      return err(`not found: ${arg}`);
    }
    case "theme": {
      const themes = ["tomorrow", "dracula", "github", "matrix", "solarized"];
      if (themes.includes(arg)) { ctx.setTheme(arg); return ok([`theme → ${arg}`]); }
      return err(`unknown theme. try: ${themes.join(" | ")}`);
    }
    case "date":
      return ok([new Date().toString()]);
    case "echo":
      return ok([args.join(" ")]);
    case "pwd":
      return ok([P.shellPath]);
    case "cd":
      return ok([]);
    case "sudo":
      return err(`${P.user} is not in the sudoers file. This incident will be reported.`);
    case "clear":
      ctx.clear();
      return [];
    default:
      return err(`command not found: ${c} — type 'help'`);
  }
}

export function ShellPane({ ctx, projects, history, setHistory }) {
  const [value, setValue] = useState("");
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const submit = () => {
    const raw = value;
    const out = runCommand(raw, ctx, projects);
    const entry = { cmd: raw, out };
    if (raw.trim().toLowerCase() === "clear") { setHistory([]); }
    else { setHistory((h) => [...h, entry]); }
    if (raw.trim()) setHist((h) => [raw, ...h]);
    setHi(-1);
    setValue("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") { submit(); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hi + 1, hist.length - 1);
      if (n >= 0) { setHi(n); setValue(hist[n]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hi - 1;
      if (n < 0) { setHi(-1); setValue(""); } else { setHi(n); setValue(hist[n]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(value.trim()) && COMMANDS[k]);
      if (match) setValue(match + " ");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100%", cursor: "text" }}
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", minHeight: 0, paddingRight: 4 }}>
        {history.length === 0 && (
          <div style={{ color: "var(--fg-dim)" }}>
            Welcome. Type <span style={{ color: "var(--yellow)" }}>help</span> to begin, or click any pane above.
          </div>
        )}
        {history.map((h, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <div>
              <span style={{ color: "var(--green)" }}>{P.user}@{P.host}</span>
              <span style={{ color: "var(--fg-dim)" }}>:</span>
              <span style={{ color: "var(--blue)" }}>~</span>
              <span style={{ color: "var(--fg-dim)" }}>$ </span>
              <span style={{ color: "var(--fg)" }}>{h.cmd}</span>
            </div>
            {h.out.map((o, j) => (
              <div key={j} style={{ color: o.type === "err" ? "var(--red)" : "var(--fg-dim)", whiteSpace: "pre-wrap" }}>{o.text}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 6, flexShrink: 0 }}>
        <span style={{ color: "var(--green)" }}>{P.user}@{P.host}</span>
        <span style={{ color: "var(--fg-dim)" }}>:</span>
        <span style={{ color: "var(--blue)" }}>~</span>
        <span style={{ color: "var(--fg-dim)" }}>$&nbsp;</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal input"
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "var(--fg)", font: "inherit", caretColor: "var(--green)",
          }}
        />
      </div>
    </div>
  );
}
