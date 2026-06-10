import Chrome from "@/components/terminal/Chrome";
import SinglePane from "@/components/terminal/SinglePane";
import { ExperiencePane } from "@/components/terminal/Panes";

export const metadata = { title: "experience | usama@archlinux" };

export default function ExperiencePage() {
  return (
    <Chrome>
      <SinglePane title="work experience">
        <ExperiencePane />
      </SinglePane>
    </Chrome>
  );
}
