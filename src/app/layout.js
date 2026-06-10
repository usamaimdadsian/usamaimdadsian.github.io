import localFont from "next/font/local";
import "./globals.css";

// Self-hosted mono fonts (woff2 in public/fonts/mono) — no build-time network.
const jetbrains = localFont({
  src: "../../public/fonts/mono/JetBrainsMono.woff2",
  weight: "100 800",
  variable: "--font-jetbrains",
  display: "swap",
});

const fira = localFont({
  src: "../../public/fonts/mono/FiraCode.woff2",
  weight: "300 700",
  variable: "--font-fira",
  display: "swap",
});

const plex = localFont({
  src: [
    { path: "../../public/fonts/mono/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/mono/IBMPlexMono-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/mono/IBMPlexMono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-plex",
  display: "swap",
});

export const metadata = {
  title: "usama@archlinux: ~/portfolio",
  description: "Usama Imdad — Software Engineer · ML / Full-Stack / IoT / DevOps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="tomorrow" data-crt="off" className={`${jetbrains.variable} ${plex.variable} ${fira.variable}`}>
      <body>{children}</body>
    </html>
  );
}
