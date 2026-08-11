"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  CareerEntry,
  CertificateEntry,
  DashboardData,
  EducationEntry,
  Portfolio,
  PortfolioTheme,
  Project,
  ProjectLink,
} from "@/lib/models";
import { projectIsComplete, projectQualityChecks } from "@/lib/models";

type ProjectDraft = Omit<Project, "id" | "displayOrder"> & { id?: string };
type PublishResult =
  | { type: "success"; url: string }
  | { type: "failure"; message: string; details: string[] }
  | null;

const emptyProject: ProjectDraft = {
  title: "",
  summary: "",
  role: "",
  problem: "",
  troubleshooting: "",
  result: "",
  targetAudience: "",
  goal: "",
  constraints: "",
  keyDecision: "",
  collaboration: "",
  learnings: "",
  nextTime: "",
  evidence: "",
  periodStart: "",
  periodEnd: "",
  teamSize: "",
  contribution: "",
  techStacks: [],
  architecture: "",
  qualityAssurance: "",
  deployment: "",
  coverImageUrl: "",
  videoUrl: "",
  isPublic: false,
  links: [],
};

const writingGuides = [
  {
    test: /개발|엔지니어|프론트|백엔드|software|developer/i,
    title: "개발 직무 작성 가이드",
    tips: ["기술 선택과 대안을 함께 적기", "구조·성능·장애 문제의 원인을 구체화하기", "테스트·배포·운영 방식을 근거와 함께 남기기"],
  },
  {
    test: /디자인|designer|ux|ui/i,
    title: "디자인 직무 작성 가이드",
    tips: ["사용자 맥락과 제약을 먼저 밝히기", "시안보다 판단 근거와 검증 과정을 적기", "전후 화면이나 리서치 링크를 연결하기"],
  },
  {
    test: /데이터|분석|data|analyst/i,
    title: "데이터 직무 작성 가이드",
    tips: ["가설과 지표 정의를 명확히 적기", "분석 방법과 데이터 한계를 함께 밝히기", "의사결정에 미친 변화를 근거로 남기기"],
  },
  {
    test: /마케팅|그로스|marketing|growth/i,
    title: "마케팅 직무 작성 가이드",
    tips: ["목표 고객과 채널 선택 이유를 적기", "실행 전후의 같은 지표를 비교하기", "성과 수치의 기간과 출처를 연결하기"],
  },
  {
    test: /.*/,
    title: "기획·PM 직무 작성 가이드",
    tips: ["문제의 사용자와 사업 맥락을 함께 적기", "우선순위와 의사결정 근거를 드러내기", "본인의 기여와 팀 성과를 구분하기"],
  },
];

const themeChoices: Array<{
  id: PortfolioTheme;
  name: string;
  description: string;
  available: boolean;
}> = [
  { id: "editorial", name: "에디토리얼", description: "글의 흐름과 판단 과정을 차분하게 보여줍니다.", available: true },
  { id: "minimal", name: "미니멀", description: "정보를 빠르게 훑는 흰색 기반 구성입니다.", available: true },
  { id: "bold", name: "볼드 그리드", description: "큰 제목과 이미지로 시선을 잡는 구성입니다.", available: true },
  { id: "noir", name: "누아르 쇼케이스", description: "큰 이미지와 절제된 빛으로 결과물을 강조합니다.", available: true },
];

function formatPeriod(start: string, end: string) {
  const format = (value: string) => value.replace("-", ".");
  if (!start && !end) return "";
  return `${start ? format(start) : "시작일 미입력"} – ${end ? format(end) : "진행 중"}`;
}

function Icon({
  name,
}: {
  name: "plus" | "eye" | "edit" | "check" | "link" | "close" | "logout";
}) {
  const paths = {
    plus: "M12 5v14M5 12h14",
    eye: "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Zm9.5 3.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z",
    edit: "m4 16-.7 4.1L7.4 19 18.7 7.7a2.1 2.1 0 0 0-3-3L4.4 16Z",
    check: "m5 12 4 4L19 6",
    link: "m9.5 14.5 5-5M7.2 16.8l-1 1a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0M16.8 7.2l1-1a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0",
    close: "m6 6 12 12M18 6 6 18",
    logout: "M10 5H5v14h5M14 8l4 4-4 4M8 12h10",
  };
  const fill = name === "eye";
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={fill ? 0 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

async function api(path: string, body?: unknown) {
  const response = await fetch(path, {
    method: body === undefined ? "GET" : "POST",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw result;
  return result;
}

export default function DashboardClient({
  initialData,
  previewMode = false,
}: {
  initialData: DashboardData;
  previewMode?: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [profileDraft, setProfileDraft] = useState<Portfolio>(initialData.portfolio);
  const [profileEditing, setProfileEditing] = useState(
    !initialData.portfolio.name,
  );
  const [projectModal, setProjectModal] = useState(false);
  const [projectDraft, setProjectDraft] = useState<ProjectDraft>(emptyProject);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [publishResult, setPublishResult] = useState<PublishResult>(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const completeCount = data.projects.filter(projectIsComplete).length;
  const publicCount = data.projects.filter(
    (project) => project.isPublic && projectIsComplete(project),
  ).length;
  const completion = useMemo(
    () =>
      data.projects.length
        ? Math.round((completeCount / data.projects.length) * 100)
        : 0,
    [completeCount, data.projects.length],
  );
  const incompleteProject = data.projects.find(
    (project) => !projectIsComplete(project),
  );
  const profileComplete = Boolean(
    data.portfolio.name && data.portfolio.jobTitle && data.portfolio.bio,
  );
  const incompletePublicProject = data.projects.find(
    (project) => project.isPublic && !projectIsComplete(project),
  );
  const canPublish = profileComplete && publicCount > 0 && !incompletePublicProject;
  const missingByProject = incompleteProject
    ? [
        ["summary", "개요"],
        ["role", "역할"],
        ["problem", "문제"],
        ["troubleshooting", "해결 과정"],
        ["result", "성과"],
      ]
        .filter(([key]) => !String(incompleteProject[key as keyof Project]).trim())
        .map(([, label]) => label)
    : [];
  const qualityChecks = projectQualityChecks(projectDraft);
  const qualityCount = qualityChecks.filter((item) => item.complete).length;
  const writingGuide = writingGuides.find((guide) =>
    guide.test.test(data.portfolio.jobTitle),
  )!;
  const selectedTheme = themeChoices.find((theme) => theme.id === data.portfolio.theme) ?? themeChoices[0];

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const refreshData = async () => {
    if (previewMode) return;
    const response = await api("/api/portfolio");
    setData(response.data);
    setProfileDraft(response.data.portfolio);
    router.refresh();
  };

  const saveProfile = async () => {
    if (previewMode) {
      setData((current) => ({ ...current, portfolio: { ...profileDraft } }));
      setProfileEditing(false);
      notify("미리보기 프로필을 저장했습니다.");
      return;
    }
    setLoading(true);
    try {
      await api("/api/portfolio/save", profileDraft);
      await refreshData();
      setProfileEditing(false);
      notify("프로필을 저장했습니다.");
    } catch (error) {
      notify((error as { message?: string }).message ?? "저장하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const selectTheme = async (theme: PortfolioTheme) => {
    const nextPortfolio = { ...data.portfolio, theme };
    setData((current) => ({ ...current, portfolio: nextPortfolio }));
    setProfileDraft((current) => ({ ...current, theme }));
    if (previewMode) {
      const themeName = themeChoices.find((item) => item.id === theme)?.name ?? "선택한";
      notify(`${themeName} 테마를 적용했습니다.`);
      return;
    }
    setLoading(true);
    try {
      await api("/api/portfolio/theme", { theme });
      notify("포트폴리오 테마를 저장했습니다.");
    } catch (error) {
      setData((current) => ({ ...current, portfolio: { ...current.portfolio, theme: data.portfolio.theme } }));
      setProfileDraft((current) => ({ ...current, theme: data.portfolio.theme }));
      notify((error as { message?: string }).message ?? "테마를 저장하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const openProject = (project?: Project) => {
    setProjectDraft(project ? { ...project } : { ...emptyProject, links: [] });
    setProjectModal(true);
  };

  const saveProject = async () => {
    if (!projectDraft.title.trim()) {
      notify("프로젝트명을 입력해 주세요.");
      return;
    }
    if (previewMode) {
      setData((current) => {
        const project: Project = {
          id: projectDraft.id ?? `preview-${Date.now()}`,
          displayOrder: projectDraft.id
            ? (current.projects.find((item) => item.id === projectDraft.id)
                ?.displayOrder ?? 0)
            : current.projects.length,
          title: projectDraft.title,
          summary: projectDraft.summary,
          role: projectDraft.role,
          problem: projectDraft.problem,
          troubleshooting: projectDraft.troubleshooting,
          result: projectDraft.result,
          targetAudience: projectDraft.targetAudience,
          goal: projectDraft.goal,
          constraints: projectDraft.constraints,
          keyDecision: projectDraft.keyDecision,
          collaboration: projectDraft.collaboration,
          learnings: projectDraft.learnings,
          nextTime: projectDraft.nextTime,
          evidence: projectDraft.evidence,
          periodStart: projectDraft.periodStart,
          periodEnd: projectDraft.periodEnd,
          teamSize: projectDraft.teamSize,
          contribution: projectDraft.contribution,
          techStacks: projectDraft.techStacks,
          architecture: projectDraft.architecture,
          qualityAssurance: projectDraft.qualityAssurance,
          deployment: projectDraft.deployment,
          coverImageUrl: projectDraft.coverImageUrl,
          videoUrl: projectDraft.videoUrl,
          isPublic: projectDraft.isPublic,
          links: projectDraft.links,
        };
        const exists = current.projects.some((item) => item.id === project.id);
        return {
          ...current,
          projects: exists
            ? current.projects.map((item) =>
                item.id === project.id ? project : item,
              )
            : [...current.projects, project],
        };
      });
      setProjectModal(false);
      notify("미리보기 프로젝트를 저장했습니다.");
      return;
    }
    setLoading(true);
    try {
      const path = projectDraft.id
        ? `/api/projects/${projectDraft.id}/update`
        : "/api/projects";
      await api(path, projectDraft);
      await refreshData();
      setProjectModal(false);
      notify(projectDraft.id ? "프로젝트를 수정했습니다." : "프로젝트를 추가했습니다.");
    } catch (error) {
      notify((error as { message?: string }).message ?? "저장하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (project: Project) => {
    if (previewMode) {
      if (!projectIsComplete(project)) {
        notify("필수 내용을 완성한 뒤 공개할 수 있어요.");
        return;
      }
      setData((current) => ({
        ...current,
        projects: current.projects.map((item) =>
          item.id === project.id
            ? { ...item, isPublic: !item.isPublic }
            : item,
        ),
      }));
      return;
    }
    try {
      await api(`/api/projects/${project.id}/visibility`, {
        isPublic: !project.isPublic,
      });
      await refreshData();
      notify(project.isPublic ? "프로젝트를 비공개로 전환했습니다." : "프로젝트를 공개로 전환했습니다.");
    } catch (error) {
      notify((error as { message?: string }).message ?? "상태를 변경하지 못했습니다.");
    }
  };

  const publish = async () => {
    if (previewMode) {
      const details: string[] = [];
      if (!data.portfolio.name || !data.portfolio.jobTitle || !data.portfolio.bio) {
        details.push("프로필의 이름, 희망 직무, 한 줄 소개를 완성해 주세요.");
      }
      if (!publicCount) details.push("공개 프로젝트를 1개 이상 선택해 주세요.");
      if (details.length) {
        setPublishResult({
          type: "failure",
          message: "포트폴리오를 발행할 수 없습니다.",
          details,
        });
      } else {
        setData((current) => ({
          ...current,
          portfolio: { ...current.portfolio, isPublished: true },
        }));
        setPublishResult({
          type: "success",
          url: `${window.location.origin}/portfolio-preview?theme=${data.portfolio.theme}`,
        });
      }
      return;
    }
    setLoading(true);
    try {
      const result = await api("/api/portfolio/publish", {});
      await refreshData();
      setPublishResult({
        type: "success",
        url: `${window.location.origin}${result.url}`,
      });
    } catch (error) {
      const failure = error as { message?: string; details?: string[] };
      setPublishResult({
        type: "failure",
        message: failure.message ?? "발행 중 문제가 발생했습니다.",
        details: failure.details ?? ["잠시 후 다시 시도해 주세요."],
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (previewMode) {
      router.push("/login");
      return;
    }
    await api("/api/auth/logout", {});
    router.push("/login");
    router.refresh();
  };

  const handlePrimaryAction = () => {
    if (canPublish) {
      publish();
      return;
    }
    if (!profileComplete) {
      setProfileEditing(true);
      notify("프로필 필수 내용을 먼저 완성해 주세요.");
      return;
    }
    if (incompleteProject) {
      openProject(incompleteProject);
      notify("남은 프로젝트 내용을 완성해 주세요.");
      return;
    }
    notify("작성 완료 프로젝트를 공개로 전환해 주세요.");
  };

  const addLink = () => {
    if (projectDraft.links.length >= 5) return;
    setProjectDraft({
      ...projectDraft,
      links: [...projectDraft.links, { label: "", url: "" }],
    });
  };

  const updateLink = (
    index: number,
    field: keyof ProjectLink,
    value: string,
  ) => {
    setProjectDraft({
      ...projectDraft,
      links: projectDraft.links.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link,
      ),
    });
  };

  const addCareer = () => {
    setProfileDraft({
      ...profileDraft,
      careers: [
        ...profileDraft.careers,
        { id: `career-${Date.now()}`, organization: "", role: "", period: "", description: "" },
      ],
    });
  };

  const updateCareer = (id: string, field: keyof CareerEntry, value: string) => {
    setProfileDraft({
      ...profileDraft,
      careers: profileDraft.careers.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    });
  };

  const addEducation = () => {
    setProfileDraft({
      ...profileDraft,
      educations: [
        ...profileDraft.educations,
        { id: `education-${Date.now()}`, school: "", major: "", period: "", description: "" },
      ],
    });
  };

  const updateEducation = (id: string, field: keyof EducationEntry, value: string) => {
    setProfileDraft({
      ...profileDraft,
      educations: profileDraft.educations.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    });
  };

  const addCertificate = () => {
    setProfileDraft({
      ...profileDraft,
      certificates: [
        ...profileDraft.certificates,
        { id: `certificate-${Date.now()}`, name: "", issuer: "", issuedAt: "", credentialUrl: "" },
      ],
    });
  };

  const updateCertificate = (id: string, field: keyof CertificateEntry, value: string) => {
    setProfileDraft({
      ...profileDraft,
      certificates: profileDraft.certificates.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    });
  };

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <a className="brand" href="/dashboard">
          <span className="brand-mark">✦</span>
          <span>Folioframe</span>
        </a>
        <div className="top-actions">
          {previewMode && <span className="preview-badge">DB 없는 화면 미리보기</span>}
          {previewMode && (
            <a
              className="button secondary"
              href={`/portfolio-preview?theme=${data.portfolio.theme}`}
              target="_blank"
            >
              <Icon name="eye" />
              발행된 포트폴리오
            </a>
          )}
          {!previewMode && data.portfolio.isPublished && (
            <a
              className="button secondary"
              href={`/p/${data.portfolio.slug}`}
              target="_blank"
            >
              <Icon name="eye" />
              공개 페이지
            </a>
          )}
          {!data.portfolio.isPublished && (
            <button
              className="button primary"
              disabled={loading}
              onClick={handlePrimaryAction}
            >
              {canPublish ? "발행하기" : "포트폴리오 완성하기"}
            </button>
          )}
          <button className="icon-button" onClick={logout} title="로그아웃">
            <Icon name="logout" />
          </button>
        </div>
      </header>

      <section className="workspace">
        <div className="page-intro">
          <div>
            <span className="eyebrow">MY PORTFOLIO</span>
            <h1>개발 과정이 증거가 되는 포트폴리오</h1>
            <p>기술 선택부터 구현, 테스트, 배포까지 정리하면 개발자의 판단이 선명해집니다.</p>
          </div>
          <div className="publish-summary">
            <div className={`status-dot ${data.portfolio.isPublished ? "live" : ""}`} />
            <div>
              <strong>
                {data.portfolio.isPublished ? "포트폴리오 공개 중" : "아직 발행 전이에요"}
              </strong>
              <span>
                {data.portfolio.isPublished
                  ? "저장한 변경사항이 공개 페이지에 즉시 반영됩니다."
                  : "공개 프로젝트를 선택하고 발행해 보세요."}
              </span>
            </div>
          </div>
        </div>

        <section className="profile-card panel">
          <div className="profile-avatar">
            <span>{(profileDraft.name || data.user.email).slice(0, 1).toUpperCase()}</span>
          </div>
          {profileEditing ? (
            <div className="profile-form">
              <div className="form-row three">
                <label>
                  이름
                  <input
                    value={profileDraft.name}
                    onChange={(event) =>
                      setProfileDraft({ ...profileDraft, name: event.target.value })
                    }
                    placeholder="홍길동"
                  />
                </label>
                <label>
                  희망 직무
                  <input
                    value={profileDraft.jobTitle}
                    onChange={(event) =>
                      setProfileDraft({ ...profileDraft, jobTitle: event.target.value })
                    }
                    placeholder="프로덕트 매니저"
                  />
                </label>
                <label>
                  공개 주소
                  <div className="slug-input">
                    <span>/p/</span>
                    <input
                      value={profileDraft.slug}
                      onChange={(event) =>
                        setProfileDraft({ ...profileDraft, slug: event.target.value })
                      }
                    />
                  </div>
                </label>
              </div>
              <label>
                한 줄 소개
                <input
                  value={profileDraft.bio}
                  onChange={(event) =>
                    setProfileDraft({ ...profileDraft, bio: event.target.value })
                  }
                  placeholder="나를 설명하는 한 문장을 입력하세요."
                />
              </label>
              <details className="editor-disclosure profile-disclosure" open>
                <summary><span>나를 소개합니다</span><small>소개 · 일하는 방식 · 가치관 · 방향</small></summary>
                <div className="disclosure-content identity-editor">
                  <label>나에 대한 소개<textarea value={profileDraft.aboutMe} onChange={(event) => setProfileDraft({ ...profileDraft, aboutMe: event.target.value })} placeholder="어떤 경험을 통해 지금의 내가 되었고, 어떤 문제를 풀 때 가장 몰입하는지 이야기해 주세요." /></label>
                  <div className="form-row two">
                    <label>일하는 방식<textarea value={profileDraft.workStyle} onChange={(event) => setProfileDraft({ ...profileDraft, workStyle: event.target.value })} placeholder="협업하고 판단하며 일을 끝내는 나만의 방식을 적어 주세요." /></label>
                    <label>중요하게 생각하는 가치<textarea value={profileDraft.values} onChange={(event) => setProfileDraft({ ...profileDraft, values: event.target.value })} placeholder="좋은 제품과 좋은 동료 관계에서 중요하게 보는 기준을 적어 주세요." /></label>
                  </div>
                  <label>앞으로의 방향<textarea value={profileDraft.lookingFor} onChange={(event) => setProfileDraft({ ...profileDraft, lookingFor: event.target.value })} placeholder="앞으로 맡고 싶은 역할과 함께 성장하고 싶은 환경을 적어 주세요." /></label>
                </div>
              </details>
              <details className="editor-disclosure profile-disclosure">
                <summary><span>개발자 프로필 한눈에 보기</span><small>경험 수준 · 개발 분야 · 핵심 역량 · 주력 기술</small></summary>
                <div className="disclosure-content">
                  <div className="form-row two">
                    <label>경험 수준<input value={profileDraft.experienceLevel} onChange={(event) => setProfileDraft({ ...profileDraft, experienceLevel: event.target.value })} placeholder="예: 신입 · 풀스택 프로젝트 경험" /></label>
                    <label>개발 관심 분야<input value={profileDraft.interests} onChange={(event) => setProfileDraft({ ...profileDraft, interests: event.target.value })} placeholder="예: 프론트엔드 · 웹 성능 · 개발자 도구" /></label>
                  </div>
                  <label>개발 강점 3개<input value={profileDraft.strengths.join(", ")} onChange={(event) => setProfileDraft({ ...profileDraft, strengths: event.target.value.split(",").map((item) => item.trim()).slice(0, 3) })} placeholder="성능 최적화, 설계, 협업" /></label>
                  <label>주력 기술 스택<input value={profileDraft.coreSkills.join(", ")} onChange={(event) => setProfileDraft({ ...profileDraft, coreSkills: event.target.value.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 12) })} placeholder="TypeScript, React, Next.js, Node.js, PostgreSQL" /></label>
                </div>
              </details>
              <details className="editor-disclosure profile-disclosure">
                <summary><span>경력과 활동</span><small>{profileDraft.careers.length}개 등록</small></summary>
                <div className="disclosure-content career-editor-list">
                  {profileDraft.careers.map((entry) => (
                    <div className="career-editor-row" key={entry.id}>
                      <div className="form-row three">
                        <label>조직·활동<input value={entry.organization} onChange={(event) => updateCareer(entry.id, "organization", event.target.value)} placeholder="회사, 동아리, 개인 프로젝트" /></label>
                        <label>역할<input value={entry.role} onChange={(event) => updateCareer(entry.id, "role", event.target.value)} placeholder="프로덕트 매니저" /></label>
                        <label>기간<input value={entry.period} onChange={(event) => updateCareer(entry.id, "period", event.target.value)} placeholder="2025.03 – 현재" /></label>
                      </div>
                      <label>주요 경험<textarea value={entry.description} onChange={(event) => updateCareer(entry.id, "description", event.target.value)} placeholder="무엇을 맡았고 어떤 변화를 만들었는지 적어 주세요." /></label>
                      <button type="button" className="career-remove" onClick={() => setProfileDraft({ ...profileDraft, careers: profileDraft.careers.filter((item) => item.id !== entry.id) })}>이 항목 삭제</button>
                    </div>
                  ))}
                  <button type="button" className="button secondary career-add" onClick={addCareer}><Icon name="plus" />경력 추가</button>
                </div>
              </details>
              <details className="editor-disclosure profile-disclosure">
                <summary><span>학력</span><small>{profileDraft.educations.length}개 등록</small></summary>
                <div className="disclosure-content career-editor-list">
                  {profileDraft.educations.map((entry) => (
                    <div className="career-editor-row" key={entry.id}>
                      <div className="form-row three">
                        <label>학교<input value={entry.school} onChange={(event) => updateEducation(entry.id, "school", event.target.value)} placeholder="학교명" /></label>
                        <label>전공·과정<input value={entry.major} onChange={(event) => updateEducation(entry.id, "major", event.target.value)} placeholder="컴퓨터공학과" /></label>
                        <label>기간<input value={entry.period} onChange={(event) => updateEducation(entry.id, "period", event.target.value)} placeholder="2022.03 – 2026.02" /></label>
                      </div>
                      <label>배운 내용·활동<textarea value={entry.description} onChange={(event) => updateEducation(entry.id, "description", event.target.value)} placeholder="개발과 관련해 배운 내용, 동아리, 연구, 수상 등을 적어 주세요." /></label>
                      <button type="button" className="career-remove" onClick={() => setProfileDraft({ ...profileDraft, educations: profileDraft.educations.filter((item) => item.id !== entry.id) })}>이 항목 삭제</button>
                    </div>
                  ))}
                  <button type="button" className="button secondary career-add" onClick={addEducation}><Icon name="plus" />학력 추가</button>
                </div>
              </details>
              <details className="editor-disclosure profile-disclosure">
                <summary><span>자격증</span><small>{profileDraft.certificates.length}개 등록</small></summary>
                <div className="disclosure-content career-editor-list">
                  {profileDraft.certificates.map((entry) => (
                    <div className="career-editor-row" key={entry.id}>
                      <div className="form-row three">
                        <label>자격증명<input value={entry.name} onChange={(event) => updateCertificate(entry.id, "name", event.target.value)} placeholder="정보처리기사" /></label>
                        <label>발급기관<input value={entry.issuer} onChange={(event) => updateCertificate(entry.id, "issuer", event.target.value)} placeholder="한국산업인력공단" /></label>
                        <label>취득일<input value={entry.issuedAt} onChange={(event) => updateCertificate(entry.id, "issuedAt", event.target.value)} placeholder="2025.06" /></label>
                      </div>
                      <label>검증 링크<input type="url" value={entry.credentialUrl} onChange={(event) => updateCertificate(entry.id, "credentialUrl", event.target.value)} placeholder="https://..." /></label>
                      <button type="button" className="career-remove" onClick={() => setProfileDraft({ ...profileDraft, certificates: profileDraft.certificates.filter((item) => item.id !== entry.id) })}>이 항목 삭제</button>
                    </div>
                  ))}
                  <button type="button" className="button secondary career-add" onClick={addCertificate}><Icon name="plus" />자격증 추가</button>
                </div>
              </details>
              <details className="editor-disclosure profile-disclosure">
                <summary><span>연락처와 외부 링크</span><small>이력서 · GitHub · LinkedIn · 블로그</small></summary>
                <div className="disclosure-content">
                  <div className="form-row two">
                    <label>공개 이메일<input type="email" value={profileDraft.contactEmail} onChange={(event) => setProfileDraft({ ...profileDraft, contactEmail: event.target.value })} placeholder="hello@example.com" /></label>
                    <label>이력서 URL<input type="url" value={profileDraft.resumeUrl} onChange={(event) => setProfileDraft({ ...profileDraft, resumeUrl: event.target.value })} placeholder="https://.../resume.pdf" /></label>
                    <label>GitHub<input type="url" value={profileDraft.githubUrl} onChange={(event) => setProfileDraft({ ...profileDraft, githubUrl: event.target.value })} placeholder="https://github.com/..." /></label>
                    <label>LinkedIn<input type="url" value={profileDraft.linkedinUrl} onChange={(event) => setProfileDraft({ ...profileDraft, linkedinUrl: event.target.value })} placeholder="https://linkedin.com/in/..." /></label>
                    <label>블로그·웹사이트<input type="url" value={profileDraft.blogUrl} onChange={(event) => setProfileDraft({ ...profileDraft, blogUrl: event.target.value })} placeholder="https://..." /></label>
                  </div>
                </div>
              </details>
            </div>
          ) : (
            <div className="profile-copy">
              <div className="profile-title">
                <h2>{data.portfolio.name || "프로필을 완성해 주세요"}</h2>
                <span>{data.portfolio.jobTitle || "희망 직무 미입력"}</span>
              </div>
              <p>{data.portfolio.bio || "한 줄 소개를 입력하면 공개 페이지에 표시됩니다."}</p>
              {data.portfolio.aboutMe && <p className="profile-about-preview">{data.portfolio.aboutMe}</p>}
              {(data.portfolio.experienceLevel || data.portfolio.strengths.length > 0) && (
                <div className="profile-summary-chips">
                  {data.portfolio.experienceLevel && <span>{data.portfolio.experienceLevel}</span>}
                  {data.portfolio.strengths.map((strength) => <b key={strength}>{strength}</b>)}
                  {!!data.portfolio.careers.length && <span>경력·활동 {data.portfolio.careers.length}</span>}
                  {!!data.portfolio.educations.length && <span>학력 {data.portfolio.educations.length}</span>}
                  {!!data.portfolio.certificates.length && <span>자격증 {data.portfolio.certificates.length}</span>}
                </div>
              )}
              <div className="mini-links">
                <span><Icon name="link" />/p/{data.portfolio.slug}</span>
                <span>{data.user.email}</span>
              </div>
            </div>
          )}
          <button
            className="button ghost profile-edit"
            disabled={loading}
            onClick={profileEditing ? saveProfile : () => setProfileEditing(true)}
          >
            <Icon name={profileEditing ? "check" : "edit"} />
            {profileEditing ? "저장" : "프로필 편집"}
          </button>
        </section>

        <section className="theme-panel panel" aria-labelledby="theme-panel-title">
          <div className="theme-panel-heading">
            <div>
              <span className="eyebrow">PORTFOLIO THEME · 04 / 04</span>
              <h2 id="theme-panel-title">보여주는 방식도 나답게</h2>
              <p>카드를 누르면 테마가 저장됩니다. 예시 페이지 보기는 선택을 바꾸지 않습니다.</p>
            </div>
            <span className="theme-current">현재 · {selectedTheme.name}</span>
          </div>
          <div className="theme-picker">
            {themeChoices.map((theme) => (
              <article
                key={theme.id}
                className={`theme-option theme-option-${theme.id} ${data.portfolio.theme === theme.id ? "selected" : ""}`}
              >
                <button
                  type="button"
                  className="theme-selection-button"
                  disabled={!theme.available || loading}
                  aria-pressed={data.portfolio.theme === theme.id}
                  onClick={() => selectTheme(theme.id)}
                >
                  <span className="theme-swatch" aria-hidden="true"><i /><i /><i /></span>
                  <span className="theme-option-copy"><strong>{theme.name}</strong><small>{theme.description}</small></span>
                  <b>{theme.available ? (data.portfolio.theme === theme.id ? "선택됨" : "이 테마 선택") : "다음 단계"}</b>
                </button>
                <a
                  className="theme-example-button"
                  href={`/portfolio-preview?theme=${theme.id}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${theme.name} 테마 예시 페이지 보기`}
                >예시 페이지 보기 ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-grid refined-stats">
          <div className="stat-card"><span>전체 프로젝트</span><strong>{data.projects.length}</strong><small>저장된 경험</small></div>
          <div className="stat-card"><span>공개 프로젝트</span><strong>{publicCount}</strong><small>포트폴리오 노출</small></div>
          <div className="stat-card next-action-card">
            <div className="next-action-copy">
              <span>NEXT STEP · 작성 완성도 {completion}%</span>
              {!profileComplete ? (
                <>
                  <strong>먼저 프로필을 완성해 주세요.</strong>
                  <small>이름, 희망 직무, 한 줄 소개가 공개 페이지의 첫인상이 됩니다.</small>
                </>
              ) : incompleteProject ? (
                <>
                  <strong>‘{incompleteProject.title}’을 이어서 작성하세요.</strong>
                  <small>남은 항목: {missingByProject.join(" · ")}</small>
                </>
              ) : publicCount === 0 ? (
                <>
                  <strong>보여줄 프로젝트를 공개로 전환하세요.</strong>
                  <small>작성 완료 프로젝트의 공개 스위치를 켜면 발행할 수 있어요.</small>
                </>
              ) : data.portfolio.isPublished ? (
                <>
                  <strong>현재 포트폴리오가 공개되어 있습니다.</strong>
                  <small>프로필과 공개 프로젝트를 저장하면 공개 페이지에 즉시 반영됩니다.</small>
                </>
              ) : (
                <>
                  <strong>발행할 준비가 끝났습니다.</strong>
                  <small>공개 화면을 확인하고 포트폴리오를 발행해 보세요.</small>
                </>
              )}
            </div>
            <div className="next-action-side">
              <b>{completion}%</b>
              <div className="progress-track"><span style={{ width: `${completion}%` }} /></div>
              <button
                className="next-action-button"
                onClick={() => {
                  if (!profileComplete) setProfileEditing(true);
                  else if (incompleteProject) openProject(incompleteProject);
                  else if (data.portfolio.isPublished) window.open(`/p/${data.portfolio.slug}`, "_blank");
                  else if (publicCount) publish();
                  else notify("작성 완료 프로젝트의 공개 스위치를 켜 주세요.");
                }}
              >
                {!profileComplete
                  ? "프로필 완성"
                  : incompleteProject
                    ? "계속 작성"
                    : data.portfolio.isPublished
                      ? "공개 페이지 보기"
                      : publicCount
                        ? "발행하기"
                      : "프로젝트 확인"}
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        <section className="projects-section">
          <div className="section-heading">
            <div><h2>내 개발 프로젝트</h2><p>기술 선택, 구현, 테스트, 배포 과정과 본인의 기여를 중심으로 작성하세요.</p></div>
            <button className="button dark" onClick={() => openProject()}>
              <Icon name="plus" />프로젝트 작성
            </button>
          </div>

          {data.projects.length ? (
            <div className="project-list">
              {data.projects.map((project, index) => {
                const complete = projectIsComplete(project);
                return (
                  <article
                    className={`project-card interactive-project-card ${complete ? "complete-card" : "needs-work"}`}
                    key={project.id}
                    tabIndex={0}
                    onClick={() => openProject(project)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openProject(project);
                      }
                    }}
                  >
                    <div className="project-visual-column">
                      <div className={`project-number tone-${(index % 3) + 1}`}>
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div
                        className={`project-thumb ${project.coverImageUrl ? "has-image" : ""}`}
                        role="img"
                        aria-label={`${project.title} 대표 이미지${project.coverImageUrl ? "" : " 미등록"}`}
                        style={project.coverImageUrl ? { backgroundImage: `url("${project.coverImageUrl.replaceAll('"', "%22")}")` } : undefined}
                      >
                        {!project.coverImageUrl && <span>{project.title.slice(0, 1)}</span>}
                        <em>{project.coverImageUrl ? "대표 이미지" : "이미지 추가"}</em>
                      </div>
                    </div>
                    <div className="project-main">
                      <div className="project-card-kicker">
                        <span>PROJECT {String(index + 1).padStart(2, "0")}</span>
                        <i>{project.isPublic ? "PUBLIC" : "PRIVATE"}</i>
                      </div>
                      <div className="project-title-row">
                        <h3>{project.title}</h3>
                        <span className={`completion-badge ${complete ? "complete" : ""}`}>
                          {complete ? "작성 완료" : "작성 중"}
                        </span>
                      </div>
                      <p className="project-summary-preview">
                        {project.summary || "프로젝트의 목적과 배경을 한두 문장으로 정리해 보세요."}
                      </p>
                      <div className="project-keywords" aria-label="프로젝트 핵심 키워드">
                        {project.contribution && <b>{project.contribution}</b>}
                        {project.role && <b>{project.role}</b>}
                        {project.techStacks.filter(Boolean).slice(0, 5).map((tech) => <b key={tech}>{tech}</b>)}
                      </div>
                      <div className={`project-highlight ${project.result ? "has-result" : "empty"}`}>
                        <span>KEY RESULT</span>
                        <strong>{project.result || "대표 성과를 입력하면 여기에 보여요."}</strong>
                      </div>
                    </div>
                    <div className="project-controls" onClick={(event) => event.stopPropagation()}>
                      <div className="visibility-row">
                        <button
                          className={`visibility-toggle ${project.isPublic ? "on" : ""}`}
                          onClick={() => toggleVisibility(project)}
                          aria-label="공개 상태 변경"
                        ><span /></button>
                        <span className={project.isPublic ? "public-text" : "private-text"}>
                          {project.isPublic ? "공개" : "비공개"}
                        </span>
                        <button className="project-edit-button" onClick={() => openProject(project)} aria-label={`${project.title} 수정`}>
                          <Icon name="edit" /><span>수정</span>
                        </button>
                      </div>
                      <span className="project-open-cue">카드 열어 상세 보기 <b>↗</b></span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-projects">
              <span>01</span>
              <h3>첫 프로젝트 이야기를 작성해 보세요.</h3>
              <p>결과 화면보다 본인의 기술 선택과 구현·검증 과정이 먼저 보이게 구성합니다.</p>
              <button className="button primary" onClick={() => openProject()}>
                <Icon name="plus" />첫 프로젝트 작성
              </button>
            </div>
          )}
        </section>
      </section>

      {projectModal && (
        <div className="modal-backdrop" onMouseDown={() => setProjectModal(false)}>
          <section className="modal project-modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="eyebrow">PROJECT STORY</span>
                <h2>{projectDraft.id ? "프로젝트 수정" : "프로젝트 작성"}</h2>
              </div>
              <button className="icon-button" onClick={() => setProjectModal(false)} aria-label="프로젝트 작성 닫기">
                <Icon name="close" />
              </button>
            </div>
            <div className="modal-body">
              <div className="writing-guide">
                <div>
                  <span>{writingGuide.title}</span>
                  <ul>{writingGuide.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
                </div>
                <div className="quality-score">
                  <strong>{qualityCount}/{qualityChecks.length}</strong>
                  <span>콘텐츠 품질</span>
                </div>
              </div>
              <label>
                프로젝트명 <em>필수</em>
                <input
                  maxLength={60}
                  value={projectDraft.title}
                  onChange={(event) =>
                    setProjectDraft({ ...projectDraft, title: event.target.value })
                  }
                  placeholder="프로젝트 이름"
                />
              </label>
              <label>
                프로젝트 개요
                <textarea
                  maxLength={500}
                  value={projectDraft.summary}
                  onChange={(event) =>
                    setProjectDraft({ ...projectDraft, summary: event.target.value })
                  }
                  placeholder="프로젝트의 목적과 배경을 설명해 주세요."
                />
              </label>
              <div className="project-facts">
                <label>시작 월<input type="month" value={projectDraft.periodStart} onChange={(event) => setProjectDraft({ ...projectDraft, periodStart: event.target.value })} /></label>
                <label>종료 월<input type="month" value={projectDraft.periodEnd} onChange={(event) => setProjectDraft({ ...projectDraft, periodEnd: event.target.value })} /></label>
                <label>참여 인원<input maxLength={40} value={projectDraft.teamSize} onChange={(event) => setProjectDraft({ ...projectDraft, teamSize: event.target.value })} placeholder="예: 4명" /></label>
                <label>기여 범위<input maxLength={80} value={projectDraft.contribution} onChange={(event) => setProjectDraft({ ...projectDraft, contribution: event.target.value })} placeholder="예: 기획·개발 전담" /></label>
              </div>
              <label>
                프로젝트 기술 스택
                <input value={projectDraft.techStacks.join(", ")} onChange={(event) => setProjectDraft({ ...projectDraft, techStacks: event.target.value.split(",").map((item) => item.trim()).slice(0, 15) })} placeholder="TypeScript, React, Next.js, PostgreSQL처럼 쉼표로 구분" />
              </label>
              <div className="media-editor">
                <div className={`media-preview ${projectDraft.coverImageUrl || projectDraft.videoUrl ? "has-image" : ""}`} style={!projectDraft.videoUrl && projectDraft.coverImageUrl ? { backgroundImage: `url("${projectDraft.coverImageUrl.replaceAll('"', "%22")}")` } : undefined}>
                  {projectDraft.videoUrl ? <video src={projectDraft.videoUrl} poster={projectDraft.coverImageUrl || undefined} muted loop autoPlay playsInline /> : !projectDraft.coverImageUrl && <><span>MEDIA</span><b>프로젝트를 대표하는 이미지나 영상을 추가하세요.</b></>}
                </div>
                <label>
                  대표 이미지 URL <em>권장</em>
                  <input type="url" value={projectDraft.coverImageUrl} onChange={(event) => setProjectDraft({ ...projectDraft, coverImageUrl: event.target.value })} placeholder="https://.../project-cover.jpg" />
                  <small>노션·피그마·블로그 등에 공개된 이미지 주소를 넣어 주세요. 16:9 비율을 권장합니다.</small>
                </label>
                <label>
                  대표 영상 URL <em>선택</em>
                  <input type="url" value={projectDraft.videoUrl} onChange={(event) => setProjectDraft({ ...projectDraft, videoUrl: event.target.value })} placeholder="https://.../project-demo.mp4" />
                  <small>브라우저에서 직접 재생할 수 있는 MP4·WebM 주소를 넣으면 메인 카드에서 자동 재생됩니다.</small>
                </label>
              </div>
              <div className="story-fields">
                {[
                  ["role", "01", "담당 역할", "본인이 책임지고 직접 수행한 일은 무엇인가요?"],
                  ["problem", "02", "문제 상황", "해결해야 했던 문제와 제약은 무엇이었나요?"],
                  ["troubleshooting", "03", "해결 과정", "무엇을 시도했고 어떤 근거로 선택했나요?"],
                  ["result", "04", "구체적 성과", "해결 후 어떤 수치나 변화가 있었나요?"],
                ].map(([key, number, label, placeholder]) => (
                  <label className="story-field" key={key}>
                    <span className="step-number">{number}</span>
                    <span className="field-copy">
                      <b>{label}</b>
                      <textarea
                        maxLength={key === "troubleshooting" ? 1000 : 500}
                        value={String(projectDraft[key as keyof ProjectDraft] ?? "")}
                        onChange={(event) =>
                          setProjectDraft({
                            ...projectDraft,
                            [key]: event.target.value,
                          })
                        }
                        placeholder={placeholder}
                      />
                    </span>
                  </label>
                ))}
              </div>
              <details className="editor-disclosure project-disclosure">
                <summary><span>프로젝트 맥락과 핵심 판단</span><small>대상 · 목표 · 제약 · 의사결정 · 협업</small></summary>
                <div className="disclosure-content">
                  <div className="form-row two">
                    <label>대상 사용자<textarea value={projectDraft.targetAudience} onChange={(event) => setProjectDraft({ ...projectDraft, targetAudience: event.target.value })} placeholder="누구의 어떤 상황을 위한 프로젝트였나요?" /></label>
                    <label>프로젝트 목표<textarea value={projectDraft.goal} onChange={(event) => setProjectDraft({ ...projectDraft, goal: event.target.value })} placeholder="달성하려던 사용자·사업 목표는 무엇이었나요?" /></label>
                  </div>
                  <label>제약 조건<textarea value={projectDraft.constraints} onChange={(event) => setProjectDraft({ ...projectDraft, constraints: event.target.value })} placeholder="시간, 인력, 기술, 정책 등 고려한 제약을 적어 주세요." /></label>
                  <label>가장 중요한 결정<textarea value={projectDraft.keyDecision} onChange={(event) => setProjectDraft({ ...projectDraft, keyDecision: event.target.value })} placeholder="어떤 대안 중 무엇을 선택했고, 그 이유는 무엇인가요?" /></label>
                  <label>협업 방식<textarea value={projectDraft.collaboration} onChange={(event) => setProjectDraft({ ...projectDraft, collaboration: event.target.value })} placeholder="누구와 어떻게 소통하고 의견을 조율했나요?" /></label>
                </div>
              </details>
              <details className="editor-disclosure project-disclosure" open>
                <summary><span>개발 구현과 운영</span><small>아키텍처 · 테스트와 품질 · 배포와 운영</small></summary>
                <div className="disclosure-content">
                  <label>아키텍처와 기술 선택<textarea maxLength={700} value={projectDraft.architecture} onChange={(event) => setProjectDraft({ ...projectDraft, architecture: event.target.value })} placeholder="어떤 구조와 기술을 선택했으며, 다른 대안 대신 선택한 이유는 무엇인가요?" /></label>
                  <div className="form-row two">
                    <label>테스트와 품질<textarea maxLength={700} value={projectDraft.qualityAssurance} onChange={(event) => setProjectDraft({ ...projectDraft, qualityAssurance: event.target.value })} placeholder="단위·통합·E2E 테스트, 성능, 접근성, 코드 리뷰를 어떻게 확인했나요?" /></label>
                    <label>배포와 운영<textarea maxLength={700} value={projectDraft.deployment} onChange={(event) => setProjectDraft({ ...projectDraft, deployment: event.target.value })} placeholder="CI/CD, 배포 환경, 모니터링, 장애 대응 방식을 적어 주세요." /></label>
                  </div>
                </div>
              </details>
              <label>
                성과 근거
                <textarea maxLength={500} value={projectDraft.evidence} onChange={(event) => setProjectDraft({ ...projectDraft, evidence: event.target.value })} placeholder="성과를 어떻게 측정했는지, 어떤 자료로 확인할 수 있는지 적어 주세요." />
              </label>
              <details className="editor-disclosure project-disclosure">
                <summary><span>회고와 다음 단계</span><small>배운 점 · 다시 한다면 바꿀 점</small></summary>
                <div className="disclosure-content form-row two">
                  <label>배운 점<textarea value={projectDraft.learnings} onChange={(event) => setProjectDraft({ ...projectDraft, learnings: event.target.value })} placeholder="이 경험을 통해 무엇을 새롭게 알게 되었나요?" /></label>
                  <label>다시 한다면<textarea value={projectDraft.nextTime} onChange={(event) => setProjectDraft({ ...projectDraft, nextTime: event.target.value })} placeholder="다음에는 무엇을 다르게 시도하고 싶나요?" /></label>
                </div>
              </details>
              <div className="quality-checklist">
                {qualityChecks.map((item) => (
                  <span className={item.complete ? "done" : ""} key={item.label}>
                    {item.complete ? "✓" : "○"} {item.label}
                  </span>
                ))}
              </div>
              <div className="links-editor">
                <div className="links-heading">
                  <div><b>프로젝트 자료와 링크</b><span>실제 서비스, Figma, GitHub, 발표 자료 등 확인 가능한 주소를 최대 5개까지 등록하세요.</span></div>
                  <button className="button secondary" onClick={addLink} type="button">
                    <Icon name="plus" />링크 추가
                  </button>
                </div>
                {projectDraft.links.map((link, index) => (
                  <div className="link-row" key={index}>
                    <input
                      value={link.label}
                      onChange={(event) => updateLink(index, "label", event.target.value)}
                      placeholder="링크 이름"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(event) => updateLink(index, "url", event.target.value)}
                      placeholder="https://example.com"
                    />
                    <button
                      className="icon-button"
                      onClick={() =>
                        setProjectDraft({
                          ...projectDraft,
                          links: projectDraft.links.filter((_, linkIndex) => linkIndex !== index),
                        })
                      }
                      aria-label={`${link.label || "링크"} 삭제`}
                    ><Icon name="close" /></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <span>프로젝트명만 입력해도 작성 중 상태로 저장됩니다.</span>
              <div>
                <button className="button ghost" onClick={() => setProjectModal(false)}>취소</button>
                <button className="button primary" disabled={loading} onClick={saveProject}>
                  {loading ? "저장 중..." : "프로젝트 저장"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {publishResult && (
        <div className="modal-backdrop">
          <section className="modal publish-modal">
            <button className="icon-button publish-close" onClick={() => setPublishResult(null)} aria-label="발행 결과 닫기">
              <Icon name="close" />
            </button>
            {publishResult.type === "success" ? (
              <>
                <span className="publish-symbol success"><Icon name="check" /></span>
                <span className="eyebrow">PUBLISHED</span>
                <h2>포트폴리오를 발행했습니다.</h2>
                <p>이제 아래 주소를 채용 담당자에게 공유할 수 있어요.</p>
                <div className="published-url">
                  <span>{publishResult.url}</span>
                  <button
                    className="button secondary"
                    onClick={async () => {
                      await navigator.clipboard.writeText(publishResult.url);
                      notify("공개 주소를 복사했습니다.");
                    }}
                  >주소 복사</button>
                </div>
                <div className="publish-actions">
                  <button className="button ghost" onClick={() => setPublishResult(null)}>대시보드로 돌아가기</button>
                  <a className="button primary" href={publishResult.url} target="_blank">포트폴리오 열기</a>
                </div>
              </>
            ) : (
              <>
                <span className="publish-symbol failure">!</span>
                <span className="eyebrow">PUBLISH FAILED</span>
                <h2>{publishResult.message}</h2>
                <p>아래 내용을 확인하고 다시 발행해 주세요.</p>
                <ul className="failure-list">
                  {publishResult.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                <div className="publish-actions">
                  <button className="button ghost" onClick={() => setPublishResult(null)}>미완성 항목 확인</button>
                  <button className="button primary" onClick={publish}>다시 시도</button>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {previewProject && (
        <div className="modal-backdrop" onMouseDown={() => setPreviewProject(null)}>
          <section
            className="modal preview-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="preview-modal-bar">
              <div>
                <span className="status-dot live" />
                공개 포트폴리오에서 이렇게 보여요
              </div>
              <button className="icon-button" onClick={() => setPreviewProject(null)} aria-label="공개 화면 미리보기 닫기">
                <Icon name="close" />
              </button>
            </div>
            <div className="mini-public-preview">
              <span className="portfolio-kicker">CASE STUDY · PREVIEW</span>
              <h2>{previewProject.title}</h2>
              <p>{previewProject.summary || "프로젝트 개요가 여기에 표시됩니다."}</p>
              <div className="evidence-meta preview-evidence-meta">
                {formatPeriod(previewProject.periodStart, previewProject.periodEnd) && <span>{formatPeriod(previewProject.periodStart, previewProject.periodEnd)}</span>}
                {previewProject.teamSize && <span>{previewProject.teamSize}</span>}
                {previewProject.contribution && <span>기여 {previewProject.contribution}</span>}
                {previewProject.techStacks.filter(Boolean).map((tech) => <b key={tech}>{tech}</b>)}
              </div>
              <div className="mini-story-grid">
                {[
                  ["01 · ROLE", "담당 역할", previewProject.role],
                  ["02 · PROBLEM", "문제 상황", previewProject.problem],
                  ["03 · PROCESS", "해결 과정", previewProject.troubleshooting],
                  ["04 · RESULT", "구체적 성과", previewProject.result],
                ].map(([number, label, value]) => (
                  <section className={value ? "" : "empty"} key={label}>
                    <span>{number}</span>
                    <h3>{label}</h3>
                    <p>{value || `${label}을 작성하면 이곳에 표시됩니다.`}</p>
                  </section>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {toast && <div className="toast"><Icon name="check" />{toast}</div>}
    </main>
  );
}
