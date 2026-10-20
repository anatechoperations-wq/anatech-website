"use client";

import { FormEvent, useState } from "react";

const statuses = ["Not started", "In progress", "Blocked", "Completed"];

type Project = { name: string };
type Employee = { name: string };
type Task = {
  row: number;
  project: string;
  title: string;
  owner: string;
  dueDate: string;
  status: string;
};

export function ProjectTaskBoard({ projects, initialTasks, employees }: { projects: Project[]; initialTasks: Task[]; employees: Employee[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      project: String(form.get("project") || ""),
      title: String(form.get("title") || "").trim(),
      owner: String(form.get("owner") || "").trim(),
      dueDate: String(form.get("dueDate") || ""),
      status: "Not started",
    };
    if (!payload.project || !payload.title) {
      setMessage("Choose a project and enter the task.");
      return;
    }

    setSaving(0);
    setMessage("");
    try {
      const response = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) {
        setMessage(data?.error || "Could not save the task.");
        return;
      }
      window.location.reload();
    } catch {
      setMessage("Could not reach the CRM task service.");
    } finally {
      setSaving(null);
    }
  }

  async function updateStatus(row: number, status: string) {
    setSaving(row);
    setMessage("");
    try {
      const response = await fetch("/api/admin/tasks/" + row, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        setMessage("Could not update this task.");
        return;
      }
      setTasks((current) => current.map((task) => task.row === row ? { ...task, status } : task));
    } catch {
      setMessage("Could not reach the CRM task service.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-slate-700 bg-slate-900/70 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-lg font-bold">Project tasks</h2><p className="mt-1 text-sm text-slate-400">Track delivery work from planning to completion.</p></div>
        <button disabled={projects.length === 0} className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white disabled:opacity-50" onClick={() => setIsAdding((open) => !open)}>{isAdding ? "Close form" : "+ Add task"}</button>
      </div>

      {projects.length === 0 && <p className="mt-4 text-sm text-amber-200">Create a project first, then add its tasks.</p>}

      {isAdding && (
        <form className="mt-5 rounded-xl border border-slate-700 bg-slate-950/60 p-5" onSubmit={addTask}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">Project<select name="project" className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" defaultValue="">{<><option value="" disabled>Select project</option>{projects.map((project) => <option key={project.name}>{project.name}</option>)}</>}</select></label>
            <label className="grid gap-2 text-sm text-slate-300">Task<input name="title" className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" placeholder="e.g. Approve homepage content" /></label>
            <label className="grid gap-2 text-sm text-slate-300">Owner<input name="owner" list="active-team-members" className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" placeholder="Choose or enter team member" /><datalist id="active-team-members">{employees.map((employee) => <option key={employee.name} value={employee.name} />)}</datalist></label>
            <label className="grid gap-2 text-sm text-slate-300">Due date<input name="dueDate" type="date" className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" /></label>
          </div>
          <button disabled={saving !== null} className="mt-5 rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white disabled:opacity-60" type="submit">{saving === 0 ? "Saving..." : "Save task"}</button>
        </form>
      )}

      {message && <p className="mt-4 text-sm text-cyan-200" role="status">{message}</p>}

      {tasks.length ? (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-700 text-slate-400"><tr><th className="p-3">Project</th><th className="p-3">Task</th><th className="p-3">Owner</th><th className="p-3">Due</th><th className="p-3">Status</th></tr></thead>
            <tbody>{tasks.map((task) => <tr className="border-b border-slate-800" key={task.row}><td className="p-3">{task.project}</td><td className="p-3 font-medium">{task.title}</td><td className="p-3">{task.owner || "—"}</td><td className="p-3">{task.dueDate || "—"}</td><td className="p-3"><select disabled={saving === task.row} value={task.status} onChange={(event) => updateStatus(task.row, event.target.value)} className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-white">{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody>
          </table>
        </div>
      ) : <p className="mt-4 text-slate-400">No tasks have been added yet.</p>}
    </section>
  );
}