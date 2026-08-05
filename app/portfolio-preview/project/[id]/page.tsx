import PublicProjectDetail from "@/components/PublicProjectDetail";
import { portfolio, previewThemes, projects } from "@/app/portfolio-preview/page";
import type { PortfolioTheme } from "@/lib/models";
import { notFound } from "next/navigation";

export default async function PreviewProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  const { id } = await params;
  const requestedTheme = (await searchParams).theme as PortfolioTheme | undefined;
  const theme = requestedTheme && previewThemes.has(requestedTheme) ? requestedTheme : portfolio.theme;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();
  return <PublicProjectDetail portfolio={{ ...portfolio, theme }} project={project} backHref={`/portfolio-preview?theme=${theme}`} />;
}
