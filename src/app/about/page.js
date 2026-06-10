import Chrome from "@/components/terminal/Chrome";
import SinglePane from "@/components/terminal/SinglePane";
import { AboutPane } from "@/components/terminal/Panes";

export const metadata = { title: "about | usama@archlinux" };

export default function AboutPage() {
  return (
    <Chrome>
      <SinglePane title="about">
        <AboutPane />
      </SinglePane>
    </Chrome>
  );
}
