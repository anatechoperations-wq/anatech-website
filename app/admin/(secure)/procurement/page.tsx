import { ProcurementWorkspace } from "@/components/admin/ProcurementWorkspace";
import { getEmployees } from "@/lib/admin-employees";
import { getProcurementData } from "@/lib/admin-procurement";
import { getCrmProjects } from "@/lib/admin-projects";
import { getWorkOrders } from "@/lib/admin-work-orders";
export const dynamic = "force-dynamic";
export default async function ProcurementPage() { const [data, projects, workOrders, employees] = await Promise.all([getProcurementData(), getCrmProjects(), getWorkOrders(), getEmployees()]); return <ProcurementWorkspace {...data} projects={projects} workOrders={workOrders} employees={employees.filter(item => item.status === "Active")} />; }