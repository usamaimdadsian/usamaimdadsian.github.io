import Chrome from "@/components/terminal/Chrome";
import SinglePane from "@/components/terminal/SinglePane";
import { SkillsPane } from "@/components/terminal/Panes";

export const metadata = { title: "skills | usama@archlinux" };

export default function SkillsPage() {
  return (
    <Chrome>
      <SinglePane title="skills">
        <SkillsPane />
      </SinglePane>
    </Chrome>
  );
}
