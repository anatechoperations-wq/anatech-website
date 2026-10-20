"use client";

import { FormEvent, useState } from "react";

const stages = ["Discovery", "Planning", "In progress", "Review", "Completed"] as const;

type Project = {
  createdAt: string;
  name: string;
  client: string;
  stage: string;
};

export function ProjectBoard({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function addProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const client = String(form.get("client") || "").trim();
    const stage = String(form.get("stage") || stages[0]);

    if (!name || !client) {
      setMessage("Enter both the project name and client name.");
      return;
    }

    setIsSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, client, stage }),
      });
      const data = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) {
        setMessage(data?.error || "Could not save the project.");
        return;
      }
      setProjects((current) => [{ createdAt: new Date().toISOString(), name, client, stage }, ...current]);
      setMessage("Project saved to CRM.");
      setIsAdding(false);
      event.currentTarget.reset();
    } catch {
      setMessage("Could not reach the CRM project service.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <div className="mt-5 flex justify-end">
        <button className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-500" onClick={() => setIsAdding((open) => !open)}>
          {isAdding ? "Close form" : "+ New project"}
        </button>
      </div>

      {isAdding && (
        <form className="mt-5 rounded-xl border border-slate-700 bg-slate-900/70 p-6" onSubmit={addProject}>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm text-slate-300">Project name<input className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" name="name" placeholder="e.g. Company website" /></label>
            <label className="grid gap-2 text-sm text-slate-300">Client name<input className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" name="client" placeholder="Client or organisation" /></label>
            <label className="grid gap-2 text-sm text-slate-300">Delivery stage<select className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" name="stage" defaultValue={stages[0]}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label>
          </div>
          <button disabled={isSaving} className="mt-5 rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white disabled:opacity-60" type="submit">{isSaving ? "Saving..." : "Save project"}</button>
        </form>
      )}

      {message && <p className="mt-4 text-sm text-cyan-200" role="status">{message}</p>}

      <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-6">
        <h2 className="text-lg font-bold">Project pipeline</h2>
        {projects.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-700 text-slate-400"><tr><th className="p-3">Project</th><th className="p-3">Client</th><th className="p-3">Stage</th><th className="p-3">Created</th></tr></thead>
              <tbody>{projects.map((project, index) => <tr className="border-b border-slate-800" key={project.createdAt + project.name + index}><td className="p-3 font-medium">{project.name}</td><td className="p-3">{project.client}</td><td className="p-3">{project.stage}</td><td className="p-3 text-slate-400">{project.createdAt ? new Date(project.createdAt).toLocaleDateString("en-IN") : "—"}</td></tr>)}</tbody>
            </table>
          </div>
        ) : <p className="mt-3 text-slate-400">No projects have been added yet. Create one when a lead becomes a customer.</p>}
      </section>
    </>
  );
}