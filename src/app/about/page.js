import Image from "next/image";
import Social from "@/components/Social";
import { aboutSections, quickStats } from "@/components/portfolioContent";

export default function About() {
  return (
    <div className="portfolio-page">
      <section className="profile-hero">
        <div className="profile-hero__media">
          <div className="profile-hero__image-frame">
            <Image
              src="/images/profile.webp"
              width={240}
              height={240}
              alt="Usama Imdad"
              className="profile-hero__image"
              priority
            />
          </div>
        </div>
        <div className="profile-hero__copy">
          <p className="portfolio-kicker">About</p>
          <h1 className="portfolio-hero__title">Engineering across machine learning, product delivery, and deployment.</h1>
          <p className="portfolio-hero__description">
            Hello, my name is Usama Imdad. I am from a village in Hafizabad, Pakistan. I have a Bachelor&apos;s in Computer
            Engineering and a Master&apos;s in Data Science.
          </p>
          <div className="portfolio-stats portfolio-stats--compact">
            {quickStats.map((stat) => (
              <div key={stat.label} className="portfolio-stat">
                <span className="portfolio-stat__label">{stat.label}</span>
                <strong className="portfolio-stat__value">{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-grid portfolio-grid--about">
        {aboutSections.map((section) => (
          <article key={section.title} className="portfolio-card portfolio-card--about">
            <h2 className="portfolio-card__title">{section.title}</h2>
            <p className="portfolio-card__description">{section.description}</p>
          </article>
        ))}
      </section>

      <section className="portfolio-section portfolio-section--split">
        <div className="portfolio-section__copy">
          <p className="portfolio-kicker">Approach</p>
          <h2 className="portfolio-section__title">Professional work grounded in efficiency and usability.</h2>
          <p className="portfolio-section__text">
            As a developer with more than four years of experience, he works across machine learning, full stack development,
            IoT development, and DevOps. That background supports analytical tools, firmware-oriented work, management
            dashboards, and systems that improve operational efficiency.
          </p>
          <p className="portfolio-section__text">
            What stands out is an interest in difficult problems, state-of-the-art platforms, and automation systems built with
            the right technical choices for the job.
          </p>
          <p className="portfolio-section__text">
            He occasionally writes blogs at{" "}
            <a className="portfolio-inline-link" href="https://tlueaftab.com/" target="_blank" rel="noopener noreferrer">
              TlueAftab
            </a>
            .
          </p>
        </div>
        <div className="portfolio-section__side">
          <Social />
        </div>
      </section>
    </div>
  );
}
