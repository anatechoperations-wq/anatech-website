import { FinanceWorkspace } from "@/components/admin/FinanceWorkspace";
import { getCrmDocuments } from "@/lib/admin-documents";
import { getFinanceData } from "@/lib/admin-finance";
export const dynamic="force-dynamic";
export default async function FinancePage(){const [finance,invoices]=await Promise.all([getFinanceData(),getCrmDocuments("Invoice")]);return <FinanceWorkspace {...finance} invoices={invoices}/>;}