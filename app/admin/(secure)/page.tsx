import styles from "@/components/admin/AdminShell.module.css";
import { getLeads } from "@/lib/admin-leads";

export const metadata = { title: "CRM Dashboard" };

function isToday(value: string) {
  const date = new Date(value);
  const now = new Date();
  return !Number.isNaN(date.getTime()) &&
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
}

export default async function DashboardPage() {
  const leads = await getLeads();
  const cards = [
    ["Total leads", String(leads.length)],
    ["Today's leads", String(leads.filter((lead) => isToday(lead.date)).length)],
    ["New leads", String(leads.filter((lead) => lead.status === "New").length)],
    ["Won", String(leads.filter((lead) => lead.status === "Won").length)],
  ];

  return (
    <main className={styles.page}>
      <div className={styles.eyebrow}>OVERVIEW</div>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.grid}>
        {cards.map(([label, value]) => (
          <section className={styles.card} key={label}>
            <div className={styles.label}>{label}</div>
            <div className={styles.metric}>{value}</div>
          </section>
        ))}
      </div>
      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Lead pipeline</h2>
        {leads.length ? (
          <p className={styles.empty}>
            {leads.filter((lead) => lead.status === "Contacted").length} contacted ·{" "}
            {leads.filter((lead) => lead.status === "Proposal Sent").length} proposal sent ·{" "}
            {leads.filter((lead) => lead.status === "Negotiation").length} in negotiation
          </p>
        ) : (
          <p className={styles.empty}>
            Connect the Google Sheets credentials in Vercel to display live lead metrics here.
          </p>
        )}
      </section>
    </main>
  );
}