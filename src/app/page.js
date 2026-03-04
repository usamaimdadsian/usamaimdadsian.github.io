import Link from "next/link";
import Social from "@/components/Social";
import { capabilityCards, featuredWork, quickStats } from "@/components/portfolioContent";

export default function Home() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero__copy">
          <p className="portfolio-kicker">Portfolio</p>
          <h1 className="portfolio-hero__title">Machine learning and full stack systems built for real-world delivery.</h1>
          <p className="portfolio-hero__description">
            Usama Imdad builds products across computer vision, web applications, automation, and deployment workflows with a
            focus on practical execution.
          </p>
          <div className="portfolio-hero__actions">
            <Link className="portfolio-button portfolio-button--primary" href="/projects">
              Explore Projects
            </Link>
            <Link className="portfolio-button portfolio-button--secondary" href="/resume">
              Open Resume
            </Link>
            <Link className="portfolio-button portfolio-button--ghost" href="/about">
              About Me
            </Link>
          </div>
        </div>
        <div className="portfolio-hero__panel">
          <p className="portfolio-panel__eyebrow">Current focus</p>
          <div className="portfolio-stats">
            {quickStats.map((stat) => (
              <div key={stat.label} className="portfolio-stat">
                <span className="portfolio-stat__label">{stat.label}</span>
                <strong className="portfolio-stat__value">{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section__header">
          <p className="portfolio-kicker">Capabilities</p>
          <h2 className="portfolio-section__title">A technical mix that spans models, interfaces, and deployment.</h2>
        </div>
        <div className="portfolio-grid portfolio-grid--capabilities">
          {capabilityCards.map((card) => (
            <article key={card.title} className="portfolio-card">
              <h3 className="portfolio-card__title">{card.title}</h3>
              <p className="portfolio-card__description">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-section--accent">
        <div className="portfolio-section__header">
          <p className="portfolio-kicker">Selected Work</p>
          <h2 className="portfolio-section__title">Existing experience reframed into the work areas that matter most.</h2>
        </div>
        <div className="portfolio-grid portfolio-grid--featured">
          {featuredWork.map((item) => (
            <article key={item.title} className="portfolio-card portfolio-card--featured">
              <h3 className="portfolio-card__title">{item.title}</h3>
              <p className="portfolio-card__description">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-section--split">
        <div className="portfolio-section__copy">
          <p className="portfolio-kicker">Profile</p>
          <h2 className="portfolio-section__title">A builder focused on useful systems, not demo-only work.</h2>
          <p className="portfolio-section__text">
            The portfolio combines machine learning work, web product delivery, automation, and infrastructure experience
            into one engineering profile. The underlying pattern is consistent: solve difficult problems and ship systems that
            are actually usable.
          </p>
        </div>
        <div className="portfolio-section__side">
          <Social />
        </div>
      </section>
    </div>
  );
}
