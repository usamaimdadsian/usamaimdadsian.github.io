import Chrome from "@/components/terminal/Chrome";
import SinglePane from "@/components/terminal/SinglePane";
import { ContactPane } from "@/components/terminal/Panes";

export const metadata = { title: "contact | usama@archlinux" };

export default function ContactPage() {
  return (
    <Chrome>
      <SinglePane title="contact">
        <ContactPane />
      </SinglePane>
    </Chrome>
  );
}
