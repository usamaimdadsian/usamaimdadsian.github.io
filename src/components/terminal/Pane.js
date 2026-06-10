"use client";

// ============================================================================
// Pane.js — reusable tmux pane chrome (title bar + body).
// `action` renders the corner link: on the dashboard it opens the pane's own
// page (▢); on a single-pane page it restores to the dashboard (▣).
// ============================================================================
import { useNav } from "./nav";

export default function Pane({ badge, title, active, gridArea, action, paneId, onActivate, onOpen, children }) {
  const { navigate } = useNav();
  return (
    <div
      className={"pane" + (active ? " pane--active" : "")}
      data-pane={paneId}
      style={{ gridArea: gridArea || "auto", cursor: onOpen ? "pointer" : undefined }}
      onMouseDown={onActivate}
      onClick={onOpen}
    >
      <div className="pane__bar">
        {badge != null && <span className="pane__idx">{badge}</span>}
        <span className="pane__title">{title}</span>
        <span className="pane__dots">
          {action && (
            <button
              type="button"
              className="pane__zoom"
              title={action.title}
              onClick={(e) => { e.stopPropagation(); navigate(action.href); }}
            >
              {action.icon}
            </button>
          )}
        </span>
      </div>
      <div className="pane__body">{children}</div>
    </div>
  );
}
