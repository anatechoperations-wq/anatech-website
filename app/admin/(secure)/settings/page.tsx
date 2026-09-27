import { MasterSettings } from "@/components/admin/MasterSettings";
import { getMasterSettings } from "@/lib/admin-master-settings";

export const metadata = { title: "CRM Settings" };

export default async function SettingsPage() {
  const settings = await getMasterSettings();
  return <MasterSettings initialSettings={settings} />;
}
