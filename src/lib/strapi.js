// ============================================================================
// strapi.js — reads project data from the Strapi backend (../backend).
// Strapi is the single source for the projects listing (no GitHub/placeholder
// fallback by design). READMEs are fetched live from GitHub at the detail
// route, with the Strapi-stored copy used only when GitHub is rate-limited.
// ============================================================================

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

// ls -la style permission strings, cycled for visual variety.
const PERMS = ["drwxr-xr-x", "drwxrwxr-x", "drwxr-x---", "-rwxr-xr-x"];

function mapProject(entry, i) {
  return {
    slug: entry.slug,
    name: entry.name,
    perm: PERMS[i % PERMS.length],
    lang: entry.language || "—",
    blurb: entry.description || "No description provided yet.",
    stack: Array.isArray(entry.topics) ? entry.topics.slice(0, 6) : [],
    year: entry.pushedAt ? String(new Date(entry.pushedAt).getFullYear()) : "",
    url: entry.htmlUrl,
    stars: entry.stars || 0,
  };
}

// Projects listing for the dashboard + /projects pane. Returns [] if Strapi is
// unreachable so a backend outage shows an empty state rather than crashing the
// whole terminal (the other panes don't depend on Strapi).
export async function getProjects() {
  const qs = [
    "filters[hidden][$eq]=false",
    "sort[0]=featured:desc",
    "sort[1]=order:asc",
    "sort[2]=pushedAt:desc",
    "pagination[pageSize]=100",
  ].join("&");

  try {
    const res = await fetch(`${STRAPI_URL}/api/projects?${qs}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`Strapi projects fetch failed: ${res.status}`);
      return [];
    }
    const json = await res.json();
    return (json.data || []).map(mapProject);
  } catch (error) {
    console.error("Strapi unreachable for projects", error);
    return [];
  }
}

// Full record (incl. cached readme) for a single project by slug.
export async function getProject(slug) {
  const qs = `filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`;
  try {
    const res = await fetch(`${STRAPI_URL}/api/projects?${qs}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data || [])[0] || null;
  } catch (error) {
    console.error(`Strapi unreachable for project ${slug}`, error);
    return null;
  }
}

// Slugs for generateStaticParams (best-effort).
export async function getProjectSlugs() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/projects?fields[0]=slug&pagination[pageSize]=100`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map((e) => e.slug).filter(Boolean);
  } catch {
    return [];
  }
}
