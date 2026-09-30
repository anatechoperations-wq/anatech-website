import { WorkOrderWorkspace } from "@/components/admin/WorkOrderWorkspace";
import { getCrmDocuments } from "@/lib/admin-documents";
import { getWorkOrders } from "@/lib/admin-work-orders";
export const dynamic = "force-dynamic";
export default async function WorkOrdersPage() {
  const [workOrders, quotations] = await Promise.all([getWorkOrders(), getCrmDocuments("Quotation")]);
  return <WorkOrderWorkspace workOrders={workOrders} quotations={quotations} />;
}