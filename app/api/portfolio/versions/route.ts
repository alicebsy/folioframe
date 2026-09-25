import { NextResponse } from "next/server";
import { query, transaction } from "@/lib/db";
import { ensurePortfolioVersions, ensureProjectAttachmentsColumn, ensureProjectMediaColumn, ensureFeaturedColumns } from "@/lib/data";
import { apiUser, badRequest, serverError } from "@/lib/http";

function slugPart(value: string) {
  const lower = value.toLowerCase();
  const roleSlug = /qa|품질|테스트/.test(lower)
    ? "qa"
    : /backend|back-end|백엔드/.test(lower)
      ? "backend"
      : /pm|product|제품|기획/.test(lower)
        ? "pm"
        : lower.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (roleSlug || "portfolio").slice(0, 20);
}

type ExistingProject = Record<string, any> & { id: string };

export async function POST(request: Request) {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });
    await ensurePortfolioVersions();
    await query(
      `ALTER TABLE portfolios
         ADD COLUMN IF NOT EXISTS profile_image_url TEXT NOT NULL DEFAULT '',
         ADD COLUMN IF NOT EXISTS aspiration TEXT NOT NULL DEFAULT '',
         ADD COLUMN IF NOT EXISTS aspiration_title TEXT NOT NULL DEFAULT ''`,
    );
    await ensureProjectMediaColumn();
    await ensureProjectAttachmentsColumn();
    await ensureFeaturedColumns();

    const body = await request.json();
    const sourcePortfolioId = String(body.sourcePortfolioId ?? "");
    const versionName = String(body.versionName ?? "").trim().slice(0, 80);
    if (!sourcePortfolioId) return badRequest("복제할 포트폴리오를 선택해 주세요.");
    if (!versionName) return badRequest("새 포트폴리오의 이름을 입력해 주세요.");

    const result = await transaction(async (client) => {
      const sourceResult = await client.query<Record<string, any>>(
        `SELECT * FROM portfolios WHERE id = $1 AND owner_id = $2 FOR SHARE`,
        [sourcePortfolioId, user.id],
      );
      const source = sourceResult.rows[0];
      if (!source) return null;

      const versionSlug = slugPart(versionName);
      const slugBase = `${String(source.slug).slice(0, 22).replace(/-+$/g, "")}-${versionSlug}`.slice(0, 42);
      const slug = `${slugBase}-${crypto.randomUUID().slice(0, 6)}`;
      const portfolioResult = await client.query<{ id: string }>(
        `INSERT INTO portfolios (
           owner_id, version_name, name, profile_image_url, job_title, bio, contact_email,
           slug, is_published, featured_configured, published_at, theme, experience_level,
           interests, strengths, core_skills, about_me, work_style, personal_values,
           looking_for, aspiration, aspiration_title, resume_url, github_url, linkedin_url,
           blog_url, careers, educations, certificates
         ) VALUES (
           $1,$2,$3,$4,$5,$6,$7,$8,FALSE,$9,NULL,$10,$11,$12,$13,$14,$15,$16,$17,
           $18,$19,$20,$21,$22,$23,$24,$25::jsonb,$26::jsonb,$27::jsonb
         ) RETURNING id`,
        [
          user.id, versionName, source.name, source.profile_image_url ?? "", source.job_title,
          source.bio, source.contact_email, slug, source.featured_configured ?? false,
          source.theme, source.experience_level, source.interests, source.strengths ?? [],
          source.core_skills ?? [], source.about_me, source.work_style, source.personal_values,
          source.looking_for, source.aspiration, source.aspiration_title, source.resume_url,
          source.github_url, source.linkedin_url, source.blog_url,
          JSON.stringify(source.careers ?? []), JSON.stringify(source.educations ?? []),
          JSON.stringify(source.certificates ?? []),
        ],
      );
      const targetPortfolioId = portfolioResult.rows[0].id;

      const projects = await client.query<ExistingProject>(
        `SELECT id, title, summary, role, problem, troubleshooting, result, target_audience,
                goal, constraints, key_decision, collaboration, learnings, next_time, evidence,
                period_start, period_end, team_size, contribution, tech_stacks, architecture,
                quality_assurance, deployment, cover_image_url, video_url, media, attachments,
                is_public, is_featured, display_order
           FROM projects WHERE portfolio_id = $1 ORDER BY display_order, created_at`,
        [sourcePortfolioId],
      );

      for (const project of projects.rows) {
        const copy = await client.query<{ id: string }>(
          `INSERT INTO projects (
             portfolio_id, title, summary, role, problem, troubleshooting, result,
             target_audience, goal, constraints, key_decision, collaboration, learnings,
             next_time, evidence, period_start, period_end, team_size, contribution,
             tech_stacks, architecture, quality_assurance, deployment, cover_image_url,
             video_url, media, attachments, is_public, is_featured, display_order
           ) VALUES (
             $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,
             $20,$21,$22,$23,$24,$25,$26::jsonb,$27::jsonb,$28,$29,$30
           ) RETURNING id`,
          [
            targetPortfolioId, project.title, project.summary, project.role, project.problem,
            project.troubleshooting, project.result, project.target_audience, project.goal,
            project.constraints, project.key_decision, project.collaboration, project.learnings,
            project.next_time, project.evidence, project.period_start, project.period_end,
            project.team_size, project.contribution, project.tech_stacks ?? [], project.architecture,
            project.quality_assurance, project.deployment, project.cover_image_url, project.video_url,
            JSON.stringify(project.media ?? []), JSON.stringify(project.attachments ?? []),
            project.is_public, project.is_featured, project.display_order,
          ],
        );
        const links = await client.query<{ label: string; url: string; display_order: number }>(
          `SELECT label, url, display_order FROM project_links WHERE project_id = $1 ORDER BY display_order`,
          [project.id],
        );
        for (const link of links.rows) {
          await client.query(
            `INSERT INTO project_links (project_id, label, url, display_order) VALUES ($1,$2,$3,$4)`,
            [copy.rows[0].id, link.label, link.url, link.display_order],
          );
        }
      }

      return { portfolioId: targetPortfolioId, slug, projectCount: projects.rowCount ?? 0 };
    });

    if (!result) return NextResponse.json({ ok: false, message: "포트폴리오를 찾을 수 없습니다." }, { status: 404 });
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error.code === "23505") {
      return badRequest("공개 주소 생성 중 충돌이 발생했습니다. 다시 시도해 주세요.");
    }
    return serverError(error);
  }
}
