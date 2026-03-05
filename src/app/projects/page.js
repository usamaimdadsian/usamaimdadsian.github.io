import Link from "next/link";
import { getPublicRepositories, GITHUB_OWNER } from "@/lib/github";
import styles from "./projects.module.css";

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

export default async function Projects() {
  const repositories = await getPublicRepositories();

  return (
    <div className={styles.page}>
      <section className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Projects</p>
          <h1 className={styles.heroTitle}>Public repositories turned into project entries.</h1>
          <p className={styles.heroDescription}>
            This page now pulls from the public GitHub repositories for {GITHUB_OWNER}. Each repository can open as a
            blog-style project page where the content comes from that repository&apos;s README file.
          </p>
        </div>
      </section>

      <section className={styles.grid}>
        {repositories.length > 0 ? (
          repositories.map((repository) => (
            <article key={repository.id} className={styles.card}>
              <p className={styles.eyebrow}>{repository.language || "Repository"}</p>
              <h2 className={styles.cardTitle}>{repository.name}</h2>
              <p className={styles.cardDescription}>{repository.description}</p>
              <div className={styles.cardMeta}>
                <span>Updated {formatDate(repository.updatedAt)}</span>
                <span>{repository.stargazersCount} stars</span>
              </div>
              <div className={styles.cardActions}>
                <Link className={styles.button} href={`/projects/${repository.slug}`}>
                  Read Project
                </Link>
                <a className={styles.secondaryButton} href={repository.htmlUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </article>
          ))
        ) : (
          <article className={styles.card}>
            <p className={styles.eyebrow}>GitHub</p>
            <h2 className={styles.cardTitle}>No repositories available</h2>
            <p className={styles.cardDescription}>
              Repository data was not available at build time. The page will populate once GitHub repository fetching succeeds.
            </p>
          </article>
        )}
      </section>

      <section className={styles.cta}>
        <div>
          <p className={styles.kicker}>Project Detail</p>
          <h2 className={styles.sectionTitle}>Each project entry is intended to read like a post built from the repo README.</h2>
        </div>
        <Link className={styles.button} href="/resume">
          View Resume Paths
        </Link>
      </section>
    </div>
  );
}
