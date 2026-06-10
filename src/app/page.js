import Chrome from "@/components/terminal/Chrome";
import Dashboard from "@/components/terminal/Dashboard";
import { getProjects } from "@/lib/strapi";

export const revalidate = 3600;

export default async function Home() {
  const projects = await getProjects();

  return (
    <Chrome>
      <Dashboard projects={projects} />
    </Chrome>
  );
}
