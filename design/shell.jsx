// ============================================================================
// shell.jsx — interactive command-line pane (REPL).
// Parses commands and dispatches actions back to the App.
// ============================================================================
const SH_P = window.PORTFOLIO;

const COMMANDS = {
  help: "list available commands",
  about: "who is Usama (whoami)",
  whoami: "alias of about",
  ls: "list projects",
  projects: "show projects pane",
  open: "open <project|social>  e.g. open github",
  resume: "show experience timeline",
  skills: "show skills",
  contact: "show contact + socials",
  neofetch: "system info card",
  theme: "theme <name>  (tomorrow|dracula|github|matrix|solarized)",
  clear: "clear this shell",
  date: "print current date/time",
  help2: "",
};

function runCommand(raw, ctx) {
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
        ...Object.entries(COMMANDS).filter(([k, v]) => v).map(
          ([k, v]) => `  ${k.padEnd(10)} ${v}`
        ),
        "",
        "panes are clickable — click to focus, double-click to zoom.",
      ]);
    case "about":
    case "whoami":
      ctx.focusPane("about");
      return ok(["→ focusing about pane"]);
    case "ls":
    case "projects":
      ctx.focusPane("projects");
      return ok(SH_P.projects.map((p) => `${p.perm}  ${p.year}  ${p.name}/`));
    case "skills":
      ctx.focusPane("skills");
      return ok(["→ skills"]);
    case "resume":
    case "cv":
      ctx.goWindow(1);
      return ok(["→ opening resume window"]);
    case "contact":
    case "socials":
      ctx.goWindow(2);
      return ok(["→ opening contact window"]);
    case "neofetch":
      ctx.focusPane("neofetch");
      return ok(["→ neofetch"]);
    case "open": {
      if (!arg) return err("usage: open <project|social>");
      const soc = SH_P.socials.find((s) => s.key === arg || s.label.toLowerCase() === arg);
      if (soc) { window.open(soc.url, "_blank"); return ok([`opening ${soc.label} → ${soc.url}`]); }
      const pr = SH_P.projects.find((p) => p.name.includes(arg) || p.slug.includes(arg));
      if (pr) { window.open(pr.url, "_blank"); return ok([`opening ${pr.name} → ${pr.url}`]); }
      return err(`not found: ${arg}`);
    }
    case "theme": {
      const map = { tomorrow: "tomorrow", dracula: "dracula", github: "github", matrix: "matrix", solarized: "solarized" };
      if (map[arg]) { ctx.setTheme(map[arg]); return ok([`theme → ${arg}`]); }
      return err(`unknown theme. try: ${Object.keys(map).join(" | ")}`);
    }
    case "date":
      return ok([new Date().toString()]);
    case "echo":
      return ok([args.join(" ")]);
    case "pwd":
      return ok([SH_P.shellPath]);
    case "cd":
      return ok([]);
    case "sudo":
      return err("usama is not in the sudoers file. This incident will be reported.");
    case "clear":
      ctx.clear();
      return [];
    default:
      return err(`command not found: ${c} — type 'help'`);
  }
}

function ShellPane({ ctx, history, setHistory }) {
  const [value, setValue] = React.useState("");
  const [hist, setHist] = React.useState([]);
  const [hi, setHi] = React.useState(-1);
  const inputRef = React.useRef(null);
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const submit = () => {
    const raw = value;
    const out = runCommand(raw, ctx);
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
              <span style={{ color: "var(--green)" }}>{SH_P.user}@{SH_P.host}</span>
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
        <span style={{ color: "var(--green)" }}>{SH_P.user}@{SH_P.host}</span>
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
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "var(--fg)", font: "inherit", caretColor: "var(--green)",
          }}
        />
      </div>
    </div>
  );
}

Object.assign(window, { ShellPane, runCommand });
