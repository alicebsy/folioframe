import PublicProjectDetail from "@/components/PublicProjectDetail";
import { getPublicPortfolio } from "@/lib/data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PublicProjectPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const data = await getPublicPortfolio(slug);
  if (!data) notFound();
  const project = data.projects.find((item) => item.id === id);
  if (!project) notFound();
  return <PublicProjectDetail portfolio={data.portfolio} project={project} backHref={`/p/${slug}`} />;
}
