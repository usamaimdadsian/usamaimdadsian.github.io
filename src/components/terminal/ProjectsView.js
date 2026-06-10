"use client";

// ============================================================================
// ProjectsView.js — client wrapper so the projects listing page can route to
// a repo's detail page (or open its GitHub URL) on click.
// ============================================================================
import { useNav } from "./nav";
import { ProjectsPane } from "./Panes";

export default function ProjectsView({ projects }) {
  const { navigate } = useNav();
  const onOpen = (pr) => {
    if (pr.slug) navigate(`/projects/${pr.slug}`);
    else if (pr.url) window.open(pr.url, "_blank", "noopener,noreferrer");
  };
  return <ProjectsPane projects={projects} onOpen={onOpen} />;
}
