import { ServiceDeskWorkspace } from "@/components/admin/ServiceDeskWorkspace";
import { getCrmProjects } from "@/lib/admin-projects";
import { getServiceTickets } from "@/lib/admin-service-tickets";
import { getWorkOrders } from "@/lib/admin-work-orders";
export const dynamic = "force-dynamic";
export default async function ServiceDeskPage() {
  const [tickets, workOrders, projects] = await Promise.all([getServiceTickets(), getWorkOrders(), getCrmProjects()]);
  return <ServiceDeskWorkspace tickets={tickets} workOrders={workOrders} projects={projects} />;
}