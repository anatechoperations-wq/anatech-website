import { GoLiveWorkspace } from "@/components/admin/GoLiveWorkspace";
import { getGoLiveState } from "@/lib/admin-go-live";
export const dynamic = "force-dynamic";
export default async function GoLivePage() { return <GoLiveWorkspace initialChecklist={await getGoLiveState()} />; }