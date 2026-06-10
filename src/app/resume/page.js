import Chrome from "@/components/terminal/Chrome";
import SinglePane from "@/components/terminal/SinglePane";
import { ResumePane } from "@/components/terminal/Panes";

export const metadata = {
  title: "resume | usama@archlinux",
  description: "Experience timeline",
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  return (
    <Chrome>
      <SinglePane title="resume">
        <ResumePane />
        <div style={{ marginTop: 18, paddingTop: 12, borderTop: "1px solid var(--border)", color: "var(--fg-dim)", fontSize: "0.85em", maxWidth: 720 }}>
          <span style={{ color: "var(--green)" }}>note</span> · downloadable resume files are kept private — I tailor a
          version per role. Reach out via the <span style={{ color: "var(--yellow)" }}>contact</span> window for a copy.
        </div>
      </SinglePane>
    </Chrome>
  );
}
