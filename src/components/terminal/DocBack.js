"use client";

// ============================================================================
// DocBack.js — the "← back" control on the project README page. Routes through
// the shared nav context so the loading bar shows while the target loads.
// ============================================================================
import { useNav } from "./nav";

export default function DocBack({ href, children }) {
  const { navigate } = useNav();
  return (
    <button type="button" className="doc__back" onClick={() => navigate(href)}>
      {children}
    </button>
  );
}
