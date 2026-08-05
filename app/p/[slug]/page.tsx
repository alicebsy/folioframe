import PublicPortfolio from "@/components/PublicPortfolio";
import { getPublicPortfolio } from "@/lib/data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPublicPortfolio(slug);
  if (!data) notFound();
  return <PublicPortfolio data={data} projectBasePath={`/p/${slug}/projects`} />;
}
