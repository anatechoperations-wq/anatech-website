import { ProjectBoard } from "@/components/admin/ProjectBoard";
import { ProjectTaskBoard } from "@/components/admin/ProjectTaskBoard";
import { getCrmProjects } from "@/lib/admin-projects";
import { getCrmTasks } from "@/lib/admin-tasks";
import { getEmployees } from "@/lib/admin-employees";

export const metadata = { title: "CRM Projects" };

export default async function ProjectsPage() {
  const [projects, tasks, employees] = await Promise.all([getCrmProjects(), getCrmTasks(), getEmployees()]);

  return (
    <main className="mx-auto max-w-7xl p-8 text-slate-100">
      <p className="text-xs font-bold tracking-[.15em] text-cyan-300">DELIVERY WORKSPACE</p>
      <h1 className="mt-2 text-3xl font-black">Projects</h1>
      <p className="mt-3 text-slate-400">
        Start a project after a lead becomes a customer. Projects and delivery tasks are stored in the CRM Google Sheet.
      </p>
      <ProjectBoard initialProjects={projects} />
      <ProjectTaskBoard projects={projects} initialTasks={tasks} employees={employees.filter((employee) => employee.status === "Active")} />
    </main>
  );
}