import Link from "next/link";
import { getRepositoryReadme, GITHUB_OWNER } from "@/lib/github";
import { getProject, getProjectSlugs } from "@/lib/strapi";
import { markdownToHtml } from "@/lib/markdown";

export const revalidate = 3600;

function formatDate(value) {
  if (!value) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

// README comes live from GitHub when possible; the Strapi-stored copy is the
// fallback for when GitHub is rate-limited / unreachable.
async function resolveReadme(repo, cached) {
  try {
    const live = await getRepositoryReadme(repo);
    if (live && live.content && live.content.trim()) return live.content;
  } catch {
    /* fall through to cache */
  }
  return cached || "";
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((repo) => ({ repo }));
}

export async function generateMetadata({ params }) {
  const { repo } = await params;
  const project = await getProject(repo);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { repo } = await params;
  const project = await getProject(repo);

  // Not in Strapi (or backend down): degrade to a card that still links out.
  if (!project) {
    const repoUrl = `https://github.com/${GITHUB_OWNER}/${repo}`;
    return (
      <div className="doc">
        <div className="doc__inner">
          <Link className="doc__back" href="/projects">← back to projects</Link>
          <p className="doc__kicker">cat ~/projects/{repo}/README.md</p>
          <h1 className="doc__title">{repo}</h1>
          <p className="doc__desc">
            This project couldn&apos;t be loaded right now — the backend was unavailable. You can
            still open the repository directly on GitHub.
          </p>
          <div className="doc__actions">
            <a className="doc__btn" href={repoUrl} target="_blank" rel="noopener noreferrer">
              Open on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  const readme = await resolveReadme(repo, project.readme);
  const articleHtml = markdownToHtml(readme);
  const topics = Array.isArray(project.topics) ? project.topics : [];

  return (
    <div className="doc">
      <div className="doc__inner">
        <Link className="doc__back" href="/">← back to ~/portfolio</Link>

        <p className="doc__kicker">cat ~/projects/{project.name}/README.md</p>
        <h1 className="doc__title">{project.name}</h1>
        <p className="doc__desc">{project.description}</p>

        <div className="doc__actions">
          <a className="doc__btn" href={project.htmlUrl} target="_blank" rel="noopener noreferrer">
            Open Repository ↗
          </a>
          {project.homepage ? (
            <a className="doc__btn" href={project.homepage} target="_blank" rel="noopener noreferrer">
              Live Link ↗
            </a>
          ) : null}
        </div>

        <div className="doc__meta">
          <span>owner <b>{GITHUB_OWNER}</b></span>
          <span>lang <b>{project.language || "—"}</b></span>
          <span>updated <b>{formatDate(project.pushedAt)}</b></span>
          <span>★ <b>{project.stars ?? 0}</b></span>
        </div>

        {topics.length > 0 ? (
          <div className="doc__topics">
            {topics.map((topic) => (
              <span key={topic} className="doc__topic">{topic}</span>
            ))}
          </div>
        ) : null}

        {articleHtml ? (
          <article className="doc__article" dangerouslySetInnerHTML={{ __html: articleHtml }} />
        ) : (
          <article className="doc__article">
            <p>No README content is available for this repository.</p>
          </article>
        )}
      </div>
    </div>
  );
}
