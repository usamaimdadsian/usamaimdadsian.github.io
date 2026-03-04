import Link from "next/link";
import { featuredWork, projectDomains } from "@/components/portfolioContent";
import styles from "./projects.module.css";

export default function Projects() {
  return (
    <div className={styles.page}>
      <section className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Projects</p>
          <h1 className={styles.heroTitle}>Project work organized by the systems behind it.</h1>
          <p className={styles.heroDescription}>
            The current portfolio reorganizes existing experience into the product areas where the work has been strongest:
            machine learning, web delivery, automation, and deployment.
          </p>
        </div>
      </section>

      <section className={styles.grid}>
        {projectDomains.map((domain) => (
          <article key={domain.title} className={styles.card}>
            <p className={styles.eyebrow}>Domain</p>
            <h2 className={styles.cardTitle}>{domain.title}</h2>
            <p className={styles.cardDescription}>{domain.description}</p>
          </article>
        ))}
      </section>

      <section className={`${styles.section} ${styles.accentSection}`}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Highlights</p>
          <h2 className={styles.sectionTitle}>Representative work themes from the existing portfolio content.</h2>
        </div>
        <div className={styles.grid}>
          {featuredWork.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <p className={styles.kicker}>Next Step</p>
          <h2 className={styles.sectionTitle}>For the full chronology and detailed sections, use the resume views.</h2>
        </div>
        <Link className={styles.button} href="/resume">
          View Resume Paths
        </Link>
      </section>
    </div>
  );
}
