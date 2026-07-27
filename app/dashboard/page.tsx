import DashboardClient from "@/components/dashboard/DashboardClient";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const data = await getDashboardData(user);
  return <DashboardClient initialData={data} />;
}
