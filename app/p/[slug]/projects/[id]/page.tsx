import PublicProjectDetail from "@/components/PublicProjectDetail";
import { getPublicPortfolio } from "@/lib/data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PublicProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; id: string }>;
  searchParams: Promise<{ media?: string }>;
}) {
  const { slug, id } = await params;
  const mediaIndex = Number.parseInt((await searchParams).media ?? "0", 10);
  const data = await getPublicPortfolio(slug);
  if (!data) notFound();
  const project = data.projects.find((item) => item.id === id);
  if (!project) notFound();
  return <PublicProjectDetail portfolio={data.portfolio} project={project} backHref={`/p/${slug}`} mediaIndex={Number.isFinite(mediaIndex) ? mediaIndex : 0} />;
}
