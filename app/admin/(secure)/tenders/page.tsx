import { TenderWorkspace } from "@/components/admin/TenderWorkspace";
import { getTenders } from "@/lib/admin-tenders";
export const dynamic = "force-dynamic";
export default async function TendersPage() { return <TenderWorkspace tenders={await getTenders()} />; }