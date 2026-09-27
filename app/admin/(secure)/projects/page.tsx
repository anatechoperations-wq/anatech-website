import { ProjectBoard } from "@/components/admin/ProjectBoard";
import { getCrmProjects } from "@/lib/admin-projects";

export const metadata = { title: "CRM Projects" };

export default async function ProjectsPage() {
  const projects = await getCrmProjects();

  return (
    <main className="mx-auto max-w-7xl p-8 text-slate-100">
      <p className="text-xs font-bold tracking-[.15em] text-cyan-300">DELIVERY WORKSPACE</p>
      <h1 className="mt-2 text-3xl font-black">Projects</h1>
      <p className="mt-3 text-slate-400">
        Start a project after a lead becomes a customer. New projects are stored securely in the CRM Google Sheet.
      </p>
      <ProjectBoard initialProjects={projects} />
    </main>
  );
}