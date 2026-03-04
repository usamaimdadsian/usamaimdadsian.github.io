import Image from "next/image";
import Social from "@/components/Social";
import { aboutSections, quickStats } from "@/components/portfolioContent";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.media}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/profile.webp"
              width={240}
              height={240}
              alt="Usama Imdad"
              className={styles.image}
              priority
            />
          </div>
        </div>
        <div className={styles.copy}>
          <p className={styles.kicker}>About</p>
          <h1 className={styles.heroTitle}>Engineering across machine learning, product delivery, and deployment.</h1>
          <p className={styles.heroDescription}>
            Hello, my name is Usama Imdad. I am from a village in Hafizabad, Pakistan. I have a Bachelor&apos;s in Computer
            Engineering and a Master&apos;s in Data Science.
          </p>
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

      <section className={styles.grid}>
        {aboutSections.map((section) => (
          <article key={section.title} className={styles.card}>
            <h2 className={styles.cardTitle}>{section.title}</h2>
            <p className={styles.cardDescription}>{section.description}</p>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <div>
          <p className={styles.kicker}>Approach</p>
          <h2 className={styles.sectionTitle}>Professional work grounded in efficiency and usability.</h2>
          <p className={styles.sectionText}>
            As a developer with more than four years of experience, he works across machine learning, full stack development,
            IoT development, and DevOps. That background supports analytical tools, firmware-oriented work, management
            dashboards, and systems that improve operational efficiency.
          </p>
          <p className={styles.sectionText}>
            What stands out is an interest in difficult problems, state-of-the-art platforms, and automation systems built with
            the right technical choices for the job.
          </p>
          <p className={styles.sectionText}>
            He occasionally writes blogs at{" "}
            <a className={styles.inlineLink} href="https://tlueaftab.com/" target="_blank" rel="noopener noreferrer">
              TlueAftab
            </a>
            .
          </p>
        </div>
        <div>
          <Social />
        </div>
      </section>
    </div>
  );
}
