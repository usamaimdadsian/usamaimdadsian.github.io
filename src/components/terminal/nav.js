"use client";

// ============================================================================
// nav.js — shared navigation context. Chrome wraps every page and provides a
// `navigate(href)` that runs the route change inside a transition, so the
// current page stays visible and a loading bar can show while the next page
// (server component + its data) renders. `pending` is true during that wait.
// ============================================================================
import { createContext, useContext } from "react";

export const NavContext = createContext({ navigate: () => {}, pending: false });

export function useNav() {
  return useContext(NavContext);
}
