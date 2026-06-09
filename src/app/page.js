import Link from "next/link";
import Social from "@/components/Social";
import { capabilityCards, featuredWork, quickStats } from "@/components/portfolioContent";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Portfolio</p>
          <h1 className={styles.heroTitle}>Machine learning and full stack systems built for real-world delivery.</h1>
          <p className={styles.heroDescription}>
            Usama Imdad builds products across computer vision, web applications, automation, and deployment workflows with a
            focus on practical execution.
          </p>
          <div className={styles.actions}>
            <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/projects">
              Explore Projects
            </Link>
            <Link className={`${styles.button} ${styles.buttonSecondary}`} href="/resume">
              Resume Access
            </Link>
            <Link className={`${styles.button} ${styles.buttonGhost}`} href="/about">
              About Me
            </Link>
          </div>
        </div>
        <div className={styles.panel}>
          <p className={styles.eyebrow}>Current focus</p>
          <div className={styles.stats}>
            {quickStats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statLabel}>{stat.label}</span>
                <strong className={styles.statValue}>{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Capabilities</p>
          <h2 className={styles.sectionTitle}>A technical mix that spans models, interfaces, and deployment.</h2>
        </div>
        <div className={styles.grid}>
          {capabilityCards.map((card) => (
            <article key={card.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAccent}`}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Selected Work</p>
          <h2 className={styles.sectionTitle}>Existing experience reframed into the work areas that matter most.</h2>
        </div>
        <div className={styles.grid}>
          {featuredWork.map((item) => (
            <article key={item.title} className={`${styles.card} ${styles.cardFeatured}`}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSplit}`}>
        <div>
          <p className={styles.kicker}>Profile</p>
          <h2 className={styles.sectionTitle}>A builder focused on useful systems, not demo-only work.</h2>
          <p className={styles.sectionText}>
            The portfolio combines machine learning work, web product delivery, automation, and infrastructure experience
            into one engineering profile. The underlying pattern is consistent: solve difficult problems and ship systems that
            are actually usable.
          </p>
        </div>
        <div>
          <Social />
        </div>
      </section>
    </div>
  );
}
