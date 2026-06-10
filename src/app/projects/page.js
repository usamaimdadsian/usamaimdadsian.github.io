import Chrome from "@/components/terminal/Chrome";
import SinglePane from "@/components/terminal/SinglePane";
import ProjectsView from "@/components/terminal/ProjectsView";
import { getProjects } from "@/lib/strapi";

export const revalidate = 3600;
export const metadata = { title: "projects | usama@archlinux" };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Chrome>
      <SinglePane title="projects">
        <ProjectsView projects={projects} />
      </SinglePane>
    </Chrome>
  );
}
