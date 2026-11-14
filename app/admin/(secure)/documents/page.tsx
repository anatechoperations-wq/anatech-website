import { DocumentVaultWorkspace } from "@/components/admin/DocumentVaultWorkspace";
import { getDocumentVaultRecords } from "@/lib/admin-document-vault";
export const dynamic = "force-dynamic";
export default async function DocumentsPage() { return <DocumentVaultWorkspace documents={await getDocumentVaultRecords()} />; }