"use client";

// ============================================================================
// Settings.js — self-contained appearance panel (theme / font / CRT / layout).
// Replaces the design prototype's omelette "tweaks" host integration with a
// plain in-app panel. Values are owned by Terminal and persisted to
// localStorage there.
// ============================================================================

function Seg({ label, value, options, onChange }) {
  return (
    <div className="settings__row">
      <span className="settings__lbl">{label}</span>
      <div className="settings__seg">
        {options.map((o) => {
          const v = typeof o === "object" ? o.value : o;
          const l = typeof o === "object" ? o.label : o;
          return (
            <button
              key={v}
              type="button"
              className={"settings__opt" + (v === value ? " settings__opt--on" : "")}
              onClick={() => onChange(v)}
            >
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Settings({ tweaks, setTweak, onClose }) {
  return (
    <div className="settings" role="dialog" aria-label="Appearance settings">
      <div className="settings__hd">
        <span>tweaks</span>
        <button className="settings__x" aria-label="Close settings" onClick={onClose}>✕</button>
      </div>
      <div className="settings__body">
        <div className="settings__sect">Appearance</div>
        <Seg
          label="Color scheme"
          value={tweaks.theme}
          options={[
            { value: "tomorrow", label: "Tomorrow" },
            { value: "dracula", label: "Dracula" },
            { value: "github", label: "GitHub" },
            { value: "matrix", label: "Matrix" },
            { value: "solarized", label: "Solarized" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />
        <Seg
          label="Font"
          value={tweaks.font}
          options={[
            { value: "jetbrains", label: "JetBrains" },
            { value: "plex", label: "IBM Plex" },
            { value: "fira", label: "Fira Code" },
          ]}
          onChange={(v) => setTweak("font", v)}
        />
        <div className="settings__sect">Terminal feel</div>
        <Seg
          label="CRT effect"
          value={tweaks.crt}
          options={["off", "subtle", "full"]}
          onChange={(v) => setTweak("crt", v)}
        />
        <Seg
          label="Layout"
          value={tweaks.layout}
          options={["tiled", "stack"]}
          onChange={(v) => setTweak("layout", v)}
        />
      </div>
    </div>
  );
}
