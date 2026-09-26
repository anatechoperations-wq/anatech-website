"use client";

import { FormEvent, useState } from "react";
import styles from "@/components/admin/AdminShell.module.css";

const stages = ["Discovery", "Planning", "In progress", "Review", "Completed"];

type Project = {
  id: number;
  name: string;
  client: string;
  stage: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  function addProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const client = String(form.get("client") || "").trim();
    const stage = String(form.get("stage") || stages[0]);

    if (!name || !client) {
      setMessage("Enter both the project name and client name.");
      return;
    }

    setProjects((current) => [{ id: Date.now(), name, client, stage }, ...current]);
    setMessage("Project added to this workspace.");
    setIsAdding(false);
    event.currentTarget.reset();
  }

  return (
    <main className={styles.page}>
      <div className={styles.eyebrow}>DELIVERY WORKSPACE</div>
      <h1 className={styles.title}>Projects</h1>
      <p className={styles.empty}>
        Start a project after a lead becomes a customer. Your project data stays in this
        browser until the central CRM data store is connected.
      </p>

      <div className={styles.toolbar}>
        <button className={styles.actionButton} onClick={() => setIsAdding((open) => !open)}>
          {isAdding ? "Close form" : "+ New project"}
        </button>
      </div>

      {isAdding && (
        <form className={styles.card} onSubmit={addProject}>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              Project name
              <input className={styles.input} name="name" placeholder="e.g. Company website" />
            </label>
            <label className={styles.field}>
              Client name
              <input className={styles.input} name="client" placeholder="Client or organisation" />
            </label>
            <label className={styles.field}>
              Delivery stage
              <select className={styles.input} name="stage" defaultValue={stages[0]}>
                {stages.map((stage) => <option key={stage}>{stage}</option>)}
              </select>
            </label>
          </div>
          <button className={styles.primary} type="submit">Add project</button>
        </form>
      )}

      {message && <p className={styles.notice} role="status">{message}</p>}

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Project pipeline</h2>
        {projects.length === 0 ? (
          <p className={styles.empty}>No projects have been added in this session yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Project</th><th>Client</th><th>Stage</th></tr></thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}><td>{project.name}</td><td>{project.client}</td><td>{project.stage}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}