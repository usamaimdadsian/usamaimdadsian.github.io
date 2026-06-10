"use client";

// ============================================================================
// SinglePane.js — full-screen single pane used by each per-pane route.
// Scrolling past the end of the pane body doesn't jump straight to the next
// pane; instead the current pane lifts and a "peek" strip grows from the edge
// (parallax reveal). Only once the overscroll passes a threshold does it commit
// the navigation — otherwise it snaps back. Esc / Backspace go home (Chrome.js).
// ============================================================================
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Pane from "./Pane";
import { useNav } from "./nav";
import { canScrollFurther } from "@/lib/scroll";

// top-to-bottom dashboard tiles, then the extra status-bar windows
const ORDER = ["/", "/about", "/projects", "/skills", "/resume", "/contact"];
const NAMES = {
  "/": "dashboard", "/about": "about", "/projects": "projects",
  "/skills": "skills", "/resume": "resume", "/contact": "contact",
};

const THRESHOLD = 450; // accumulated wheel delta needed to commit the page change
const SHIFT = 30;      // px the current pane lifts at full overscroll (parallax)

export default function SinglePane({ title, children }) {
  const { navigate } = useNav();
  const pathname = usePathname();
  const workRef = useRef(null);
  const accum = useRef(0);
  const decay = useRef(null);
  const [peek, setPeek] = useState(0); // signed progress -1..1; sign = direction
  const [snap, setSnap] = useState(false);

  useEffect(() => {
    const el = workRef.current;
    const idx = ORDER.indexOf(pathname);
    if (!el || idx === -1) return;

    const reset = (animate) => {
      clearTimeout(decay.current);
      accum.current = 0;
      setSnap(animate);
      setPeek(0);
    };

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      // let the pane scroll its own overflowing body first
      if (canScrollFurther(e.target, el, dir)) {
        if (accum.current) reset(true);
        return;
      }
      const next = idx + dir;
      if (next < 0 || next >= ORDER.length) return; // nothing beyond — leave it
      e.preventDefault();

      // a flick the other way cancels any buildup
      if (accum.current !== 0 && Math.sign(accum.current) !== dir) accum.current = 0;
      accum.current += e.deltaY;

      const progress = Math.min(1, Math.abs(accum.current) / THRESHOLD);
      setSnap(false);
      setPeek(progress * dir);

      if (progress >= 1) { reset(false); navigate(ORDER[next]); return; }

      // if scrolling stops before the threshold, ease back to rest
      clearTimeout(decay.current);
      decay.current = setTimeout(() => reset(true), 240);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => { el.removeEventListener("wheel", onWheel); clearTimeout(decay.current); };
  }, [pathname, navigate]);

  const idx = ORDER.indexOf(pathname);
  const dir = peek > 0 ? 1 : -1;
  const nextRoute = idx !== -1 ? ORDER[idx + dir] : undefined;
  const mag = Math.abs(peek);

  return (
    <div className="workarea workarea--zoom workarea--peek" ref={workRef}>
      <div
        className="zoom-shift"
        style={{ transform: `translateY(${-peek * SHIFT}px)`, transition: snap ? "transform .25s ease" : "none" }}
      >
        <Pane title={title} active action={{ href: "/", icon: "▣", title: "back to dashboard" }}>
          {children}
        </Pane>
      </div>

      {mag > 0.001 && nextRoute && (
        <div
          className={"peek " + (peek > 0 ? "peek--bottom" : "peek--top")}
          style={{
            height: `${mag * 56}px`,
            opacity: Math.min(1, mag * 1.6),
            transition: snap ? "height .25s ease, opacity .25s ease" : "none",
          }}
          aria-hidden="true"
        >
          <span className="peek__arrow">{peek > 0 ? "↓" : "↑"}</span>
          <span className="peek__label">{mag >= 1 ? "opening" : "keep scrolling"} · {NAMES[nextRoute]}</span>
          <span className="peek__bar"><span style={{ width: `${mag * 100}%` }} /></span>
        </div>
      )}
    </div>
  );
}
