import Chrome from "@/components/terminal/Chrome";
import SinglePane from "@/components/terminal/SinglePane";
import { QualificationsPane } from "@/components/terminal/Panes";

export const metadata = { title: "qualifications | usama@archlinux" };

export default function QualificationsPage() {
  return (
    <Chrome>
      <SinglePane title="qualifications">
        <QualificationsPane />
      </SinglePane>
    </Chrome>
  );
}
