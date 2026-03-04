"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteFrame.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];

export default function SiteFrame({ children }) {
  const pathname = usePathname();
  const isResumeRoute = pathname.startsWith("/resume");
  const shellClassName = `${styles.shell} ${isResumeRoute ? styles.resumeShell : styles.portfolioShell}`;
  const navClassName = `${styles.nav} ${isResumeRoute ? styles.resumeNav : styles.portfolioNav}`;
  const mainClassName = `${styles.main} ${isResumeRoute ? styles.resumeMain : styles.portfolioMain}`;

  return (
    <div className={shellClassName}>
      <header className={navClassName}>
        <div className={styles.navInner}>
          <Link className={styles.brand} href="/">
            <span className={styles.brandMark}>UI</span>
            <span className={styles.brandCopy}>
              <strong>Usama Imdad</strong>
              <span>ML + Full Stack Engineer</span>
            </span>
          </Link>
          <nav className={styles.links} aria-label="Primary">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const linkClassName = `${styles.link} ${isActive ? styles.activeLink : ""}`;

              return (
                <Link key={item.href} href={item.href} className={linkClassName}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className={mainClassName}>{children}</main>
    </div>
  );
}
