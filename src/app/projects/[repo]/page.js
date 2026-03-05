import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicRepositories, getRepositoryProject, GITHUB_OWNER } from "@/lib/github";
import { markdownToHtml } from "@/lib/markdown";
import styles from "./project.module.css";

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

export async function generateStaticParams() {
  const repositories = await getPublicRepositories();
  return repositories.map((repository) => ({
    repo: repository.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { repo } = await params;
  const project = await getRepositoryProject(repo);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { repo } = await params;
  const project = await getRepositoryProject(repo);

  if (!project) {
    notFound();
  }

  const articleHtml = markdownToHtml(project.readme.content);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Project</p>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href={project.htmlUrl} target="_blank" rel="noopener noreferrer">
              Open Repository
            </a>
            {project.homepage ? (
              <a className={styles.secondaryButton} href={project.homepage} target="_blank" rel="noopener noreferrer">
                Open Live Link
              </a>
            ) : null}
            <Link className={styles.ghostButton} href="/projects">
              Back to Projects
            </Link>
          </div>
        </div>
        <aside className={styles.metaPanel}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Owner</span>
            <strong className={styles.metaValue}>{GITHUB_OWNER}</strong>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Language</span>
            <strong className={styles.metaValue}>{project.language || "Not specified"}</strong>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Last Updated</span>
            <strong className={styles.metaValue}>{formatDate(project.updatedAt)}</strong>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>README Source</span>
            <strong className={styles.metaValue}>{project.readme.path}</strong>
          </div>
        </aside>
      </section>

      {project.topics.length > 0 ? (
        <section className={styles.topicsSection}>
          {project.topics.map((topic) => (
            <span key={topic} className={styles.topic}>
              {topic}
            </span>
          ))}
        </section>
      ) : null}

      <section className={styles.articleShell}>
        <div className={styles.articleHeader}>
          <p className={styles.kicker}>README</p>
          <h2 className={styles.articleTitle}>Project details rendered as a blog-style article.</h2>
        </div>
        {articleHtml ? (
          <article className={styles.article} dangerouslySetInnerHTML={{ __html: articleHtml }} />
        ) : (
          <article className={styles.article}>
            <p>No README content was available for this repository at build time.</p>
          </article>
        )}
      </section>
    </div>
  );
}
