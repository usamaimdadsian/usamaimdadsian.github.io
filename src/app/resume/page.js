import Link from "next/link";
import styles from "./resumePublic.module.css";

export const metadata = {
  title: "Resume Access",
  description: "Public resume access information",
};

export default function ResumePage() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <p className={styles.kicker}>Resume</p>
        <h1>Resume downloads are private.</h1>
        <p>
          I keep multiple tailored resume versions, so the full resume data is available only from the protected admin area.
          Public visitors can still review my general background, selected projects, and capability areas without exposing
          confidential resume details.
        </p>
        <div className={styles.actions}>
          <Link href="/projects">View Projects</Link>
          <Link href="/about">General Background</Link>
          <Link href="/admin/resume">Admin Login</Link>
        </div>
      </div>
    </section>
  );
}
