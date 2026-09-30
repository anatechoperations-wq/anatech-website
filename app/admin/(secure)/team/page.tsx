import { EmployeeDirectory } from "@/components/admin/EmployeeDirectory";
import { getEmployees } from "@/lib/admin-employees";
export const dynamic = "force-dynamic";
export default async function TeamPage() { return <EmployeeDirectory employees={await getEmployees()} />; }