import Link from "next/link";
import { featuredWork, projectDomains } from "@/components/portfolioContent";

export default function Projects() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-section portfolio-section--hero">
        <div className="portfolio-section__header">
          <p className="portfolio-kicker">Projects</p>
          <h1 className="portfolio-hero__title">Project work organized by the systems behind it.</h1>
          <p className="portfolio-hero__description">
            The current portfolio reorganizes existing experience into the product areas where the work has been strongest:
            machine learning, web delivery, automation, and deployment.
          </p>
        </div>
      </section>

      <section className="portfolio-grid portfolio-grid--projects">
        {projectDomains.map((domain) => (
          <article key={domain.title} className="portfolio-card portfolio-card--project">
            <p className="portfolio-card__eyebrow">Domain</p>
            <h2 className="portfolio-card__title">{domain.title}</h2>
            <p className="portfolio-card__description">{domain.description}</p>
          </article>
        ))}
      </section>

      <section className="portfolio-section portfolio-section--accent">
        <div className="portfolio-section__header">
          <p className="portfolio-kicker">Highlights</p>
          <h2 className="portfolio-section__title">Representative work themes from the existing portfolio content.</h2>
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

      <section className="portfolio-cta">
        <div>
          <p className="portfolio-kicker">Next Step</p>
          <h2 className="portfolio-section__title">For the full chronology and detailed sections, use the resume views.</h2>
        </div>
        <Link className="portfolio-button portfolio-button--primary" href="/resume">
          View Resume Paths
        </Link>
      </section>
    </div>
  );
}
