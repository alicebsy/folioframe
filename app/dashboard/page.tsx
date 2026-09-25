import DashboardClient from "@/components/dashboard/DashboardClient";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ portfolioId?: string }>;
}) {
  const user = await requireUser();
  const { portfolioId } = await searchParams;
  const data = await getDashboardData(user, portfolioId);
  return <DashboardClient initialData={data} />;
}
