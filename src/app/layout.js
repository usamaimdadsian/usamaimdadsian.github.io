import SiteFrame from "@/components/SiteFrame";
import "./globals.css";

export const metadata = {
  title: "Usama Imdad",
  description: "Portfolio and protected resume generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="site-body">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
