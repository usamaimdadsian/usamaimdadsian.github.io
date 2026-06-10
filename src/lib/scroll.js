// ============================================================================
// scroll.js — wheel/scroll helpers shared by the terminal panes.
// ============================================================================

// Walking up from `node` to `root`, find the nearest scrollable ancestor and
// report whether it still has room to scroll in `dir` (-1 up / +1 down).
// Lets a pane scroll its own overflowing body before the wheel pages away.
export function canScrollFurther(node, root, dir) {
  let el = node;
  while (el && el !== root) {
    const oy = getComputedStyle(el).overflowY;
    if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1) {
      return dir > 0
        ? el.scrollTop + el.clientHeight < el.scrollHeight - 1
        : el.scrollTop > 0;
    }
    el = el.parentElement;
  }
  return false;
}
