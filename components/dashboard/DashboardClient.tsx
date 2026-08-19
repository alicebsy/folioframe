"use client";

import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import type {
  CareerEntry,
  CertificateEntry,
  DashboardData,
  EducationEntry,
  Portfolio,
  PortfolioTheme,
  Project,
  ProjectAttachment,
  ProjectMedia,
  ProjectLink,
} from "@/lib/models";
import { projectIsComplete, projectQualityChecks } from "@/lib/models";
import { projectPeriod } from "@/lib/project-period";
import { RichText } from "@/lib/rich-text";

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
  media: [],
  attachments: [],
  isPublic: false,
  isFeatured: false,
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

type PickerName = "contribution" | "tech" | null;
type ChoiceKind = "frontend" | "backend" | "general" | "fullstack" | "planning" | "design" | "data" | "qa" | "ops";

const contributionChoices: Array<{ label: string; kind: ChoiceKind }> = [
  { label: "프론트엔드 개발", kind: "frontend" },
  { label: "백엔드 개발", kind: "backend" },
  { label: "풀스택 개발", kind: "fullstack" },
  { label: "기획", kind: "planning" },
  { label: "UI/UX 디자인", kind: "design" },
  { label: "데이터 분석", kind: "data" },
  { label: "테스트·QA", kind: "qa" },
  { label: "배포·운영", kind: "ops" },
];

const techChoices: Array<{ label: string; kind: ChoiceKind }> = [
  { label: "React", kind: "frontend" },
  { label: "Next.js", kind: "frontend" },
  { label: "TypeScript", kind: "frontend" },
  { label: "JavaScript", kind: "frontend" },
  { label: "HTML", kind: "frontend" },
  { label: "CSS", kind: "frontend" },
  { label: "Tailwind CSS", kind: "frontend" },
  { label: "Vue", kind: "frontend" },
  { label: "Angular", kind: "frontend" },
  { label: "Node.js", kind: "backend" },
  { label: "Express", kind: "backend" },
  { label: "NestJS", kind: "backend" },
  { label: "Python", kind: "backend" },
  { label: "Django", kind: "backend" },
  { label: "FastAPI", kind: "backend" },
  { label: "Java", kind: "backend" },
  { label: "Spring", kind: "backend" },
  { label: "Go", kind: "backend" },
  { label: "PostgreSQL", kind: "backend" },
  { label: "MySQL", kind: "backend" },
  { label: "MongoDB", kind: "backend" },
  { label: "Redis", kind: "backend" },
  { label: "Git", kind: "general" },
  { label: "Docker", kind: "general" },
  { label: "AWS", kind: "general" },
  { label: "Vercel", kind: "general" },
  { label: "Figma", kind: "general" },
  { label: "Jest", kind: "general" },
  { label: "Playwright", kind: "general" },
  { label: "AI", kind: "general" },
  { label: "Swift", kind: "frontend" },
  { label: "SwiftUI", kind: "frontend" },
  { label: "iOS", kind: "frontend" },
  { label: "PhotoKit", kind: "general" },
  { label: "Apple Vision", kind: "general" },
  { label: "OCR", kind: "general" },
  { label: "Android", kind: "general" },
  { label: "Android Studio", kind: "general" },
  { label: "Flutter", kind: "frontend" },
  { label: "Dart", kind: "frontend" },
  { label: "Google ML Kit", kind: "general" },
  { label: "Gemini", kind: "general" },
];

function getChoiceKind(value: string, choices: Array<{ label: string; kind: ChoiceKind }>): ChoiceKind {
  const exact = choices.find((choice) => choice.label === value)?.kind;
  if (exact) return exact;
  if (/프론트엔드|frontend/i.test(value)) return "frontend";
  if (/백엔드|backend/i.test(value)) return "backend";
  return "general";
}

function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("이미지를 읽지 못했습니다."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("이미지를 불러오지 못했습니다."));
      image.onload = () => {
        const maxSize = 1000;
        const scale = Math.min(1, maxSize / image.width, maxSize / image.height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("이미지를 처리하지 못했습니다."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/webp", 0.7));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("파일을 읽지 못했습니다."));
    reader.readAsDataURL(file);
  });
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size}B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)}KB`;
  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
}

function projectMedia(project: Pick<Project, "media" | "coverImageUrl" | "videoUrl">): ProjectMedia[] {
  const legacy: ProjectMedia[] = [
    ...(project.coverImageUrl ? [{ id: "legacy-cover", type: "image" as const, url: project.coverImageUrl }] : []),
    ...(project.videoUrl ? [{ id: "legacy-video", type: "video" as const, url: project.videoUrl }] : []),
  ];
  const media = [...(project.media ?? []), ...legacy].filter(
    (item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index,
  );
  if (!project.coverImageUrl) return media;
  const coverIndex = media.findIndex((item) => item.url === project.coverImageUrl);
  if (coverIndex <= 0) return media;
  return [media[coverIndex], ...media.slice(0, coverIndex), ...media.slice(coverIndex + 1)];
}

function formatPeriod(start: string, end: string) {
  const format = (value: string) => value.replace("-", ".");
  if (!start && !end) return "";
  return `${start ? format(start) : "시작일 미입력"} – ${end ? format(end) : "진행 중"}`;
}

function Icon({
  name,
}: {
  name: "plus" | "eye" | "edit" | "trash" | "check" | "link" | "close" | "logout";
}) {
  const paths = {
    plus: "M12 5v14M5 12h14",
    eye: "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Zm9.5 3.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z",
    edit: "m4 16-.7 4.1L7.4 19 18.7 7.7a2.1 2.1 0 0 0-3-3L4.4 16Z",
    trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
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

async function uploadFile(file: File): Promise<{ url: string; name: string; size: number; type: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const contentType = response.headers.get("content-type") || "";
  let result: any;
  if (contentType.includes("application/json")) {
    try {
      result = await response.json();
    } catch {
      result = { message: `서버 응답을 처리할 수 없습니다. (상태 코드: ${response.status})` };
    }
  } else {
    const text = await response.text();
    result = { message: text || `서버 오류가 발생했습니다. (상태 코드: ${response.status})` };
  }
  if (!response.ok || !result?.ok) {
    throw new Error(result?.message || "파일 업로드에 실패했습니다.");
  }
  return result;
}

async function api(path: string, body?: unknown) {
  const response = await fetch(path, {
    method: body === undefined ? "GET" : "POST",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const contentType = response.headers.get("content-type") || "";
  let result: any;
  if (contentType.includes("application/json")) {
    try {
      result = await response.json();
    } catch {
      result = { message: `서버 응답을 처리할 수 없습니다. (상태 코드: ${response.status})` };
    }
  } else {
    const text = await response.text();
    result = { message: text || `서버 오류가 발생했습니다. (상태 코드: ${response.status})` };
  }
  if (!response.ok) throw result;
  return result;
}

function RichTextField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength?: number;
}) {
  return (
    <label className="rich-text-field">
      <span className="rich-text-label-row">
        <span>{label}</span>
        <small>줄을 나누면 문단으로, 선택 후 형광펜 버튼을 누르면 하이라이트</small>
      </span>
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </label>
  );
}

function RichTextEditor({
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength?: number;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showLivePreview, setShowLivePreview] = useState(false);

  const emphasizeSelection = () => {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = value.slice(start, end);

    if (selected.startsWith("**") && selected.endsWith("**") && selected.length >= 4) {
      const unwrapped = selected.slice(2, -2);
      const nextValue = `${value.slice(0, start)}${unwrapped}${value.slice(end)}`;
      onChange(nextValue);
      requestAnimationFrame(() => {
        input.focus();
        input.setSelectionRange(start, start + unwrapped.length);
      });
      return;
    }

    const replacement = selected ? `**${selected}**` : "**강조할 문구**";
    const nextValue = `${value.slice(0, start)}${replacement}${value.slice(end)}`;
    onChange(nextValue);
    requestAnimationFrame(() => {
      input.focus();
      const cursorStart = selected ? start : start + 2;
      const cursorEnd = selected ? start + replacement.length : start + 2 + "강조할 문구".length;
      input.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === "b" || e.key === "B" || e.key === "h" || e.key === "H")) {
      e.preventDefault();
      emphasizeSelection();
    }
  };

  return (
    <div className="rich-text-input-wrap">
      <div className="rich-text-toolbar" role="toolbar" aria-label="본문 서식 도구">
        <div className="rich-text-toolbar-actions">
          <button
            type="button"
            className="highlight-toolbar-btn"
            onClick={emphasizeSelection}
            aria-label="선택한 문장 형광펜 하이라이트"
            title="선택한 단어/문장을 드래그 후 누르면 초록색 형광펜 하이라이트가 적용됩니다 (단축키: Cmd+B)"
          >
            <span className="marker-icon" aria-hidden="true">✦</span> 형광펜 하이라이트
          </button>
          <span className="rich-text-hint">드래그 후 버튼 클릭(또는 Cmd+B) · **문구** 입력 시 밑줄 하이라이트</span>
        </div>
        {value ? (
          <button
            type="button"
            className="highlight-preview-toggle"
            onClick={() => setShowLivePreview((prev) => !prev)}
            title="하이라이트 적용 결과 미리보기"
          >
            {showLivePreview ? "편집기로 돌아가기" : "미리보기"}
          </button>
        ) : null}
      </div>
      {showLivePreview ? (
        <div className="rich-text-live-preview">
          <RichText value={value} />
        </div>
      ) : (
        <textarea
          ref={inputRef}
          value={value}
          maxLength={maxLength}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      )}
    </div>
  );
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
  const [openPicker, setOpenPicker] = useState<PickerName>(null);
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
  const selectedContributions = projectDraft.contribution.split(",").map((item) => item.trim()).filter(Boolean);
  const selectedMedia = projectMedia(projectDraft);
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
    if (project) {
      const media = projectMedia(project);
      const coverImageUrl = project.coverImageUrl || media.find((item) => item.type === "image")?.url || "";
      setProjectDraft({ ...project, coverImageUrl, media });
    } else {
      setProjectDraft({ ...emptyProject, links: [] });
    }
    setOpenPicker(null);
    setProjectModal(true);
  };

  const toggleTechStack = (tech: string) => {
    setProjectDraft((current) => ({
      ...current,
      techStacks: current.techStacks.includes(tech)
        ? current.techStacks.filter((item) => item !== tech)
        : current.techStacks.length < 15
          ? [...current.techStacks, tech]
          : current.techStacks,
    }));
  };

  const toggleContribution = (contribution: string) => {
    setProjectDraft((current) => {
      const selected = current.contribution.split(",").map((item) => item.trim()).filter(Boolean);
      const knownSelections = selected.filter((item) => contributionChoices.some((choice) => choice.label === item));
      const baseSelections = selected.length === knownSelections.length ? knownSelections : [];
      const next = baseSelections.includes(contribution)
        ? baseSelections.filter((item) => item !== contribution)
        : [...baseSelections, contribution];
      return { ...current, contribution: next.join(", ") };
    });
  };

  const handleMediaUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    if (files.some((file) => !file.type.startsWith("image/"))) {
      notify("이미지 파일만 여러 장 선택할 수 있어요. 영상은 URL로 추가해 주세요.");
      return;
    }
    setLoading(true);
    try {
      const uploaded = await Promise.all(
        files.map(async (file, index) => {
          let url: string;
          if (!previewMode) {
            try {
              const res = await uploadFile(file);
              url = res.url;
            } catch {
              url = await compressImageFile(file);
            }
          } else {
            url = await compressImageFile(file);
          }
          return {
            id: `image-${Date.now()}-${index}`,
            type: "image" as const,
            url,
          };
        }),
      );
      setProjectDraft((current) => {
        const nextMedia = [...projectMedia(current), ...uploaded].filter(
          (item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index,
        ).slice(0, 12);
        // 새로 올린 사진을 대표 이미지로 바로 반영합니다. 기존 사진을 대표로
        // 유지하고 싶다면 미디어 목록의 "대표 지정" 버튼으로 되돌릴 수 있어요.
        const uploadedCover = uploaded.find((item) => item.type === "image");
        return { ...current, media: nextMedia, coverImageUrl: uploadedCover?.url || current.coverImageUrl || "" };
      });
      notify(`${files.length}장의 이미지를 추가하고 첫 사진을 대표로 지정했습니다.`);
    } catch (error) {
      notify((error as { message?: string }).message ?? "이미지를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAttachmentUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    const maxBytes = 25_000_000;
    const oversized = files.find((file) => file.size > maxBytes);
    if (oversized) {
      notify(`${oversized.name}은(는) 25MB 이하 파일만 추가할 수 있어요.`);
      return;
    }
    setLoading(true);
    try {
      const uploaded = await Promise.all(
        files.slice(0, 8).map(async (file, index): Promise<ProjectAttachment> => {
          if (previewMode) {
            return {
              id: `attachment-${Date.now()}-${index}`,
              name: file.name,
              type: file.type || "application/octet-stream",
              size: file.size,
              url: await readFileAsDataUrl(file),
            };
          }
          try {
            const serverFile = await uploadFile(file);
            return {
              id: `attachment-${Date.now()}-${index}`,
              name: serverFile.name,
              type: serverFile.type,
              size: serverFile.size,
              url: serverFile.url,
            };
          } catch {
            return {
              id: `attachment-${Date.now()}-${index}`,
              name: file.name,
              type: file.type || "application/octet-stream",
              size: file.size,
              url: await readFileAsDataUrl(file),
            };
          }
        }),
      );
      setProjectDraft((current) => ({
        ...current,
        attachments: [...(current.attachments ?? []), ...uploaded].slice(0, 8),
      }));
      notify(`${uploaded.length}개의 파일을 추가했습니다.`);
    } catch (error) {
      notify((error as { message?: string }).message ?? "파일을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const removeProjectAttachment = (id: string) => {
    setProjectDraft((current) => ({
      ...current,
      attachments: (current.attachments ?? []).filter((item) => item.id !== id),
    }));
  };

  const addVideoMedia = () => {
    const url = projectDraft.videoUrl.trim();
    if (!url) return;
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error();
    } catch {
      notify("http 또는 https 형식의 영상 URL을 입력해 주세요.");
      return;
    }
    setProjectDraft((current) => {
      const nextMedia = [...projectMedia(current), { id: `video-${Date.now()}`, type: "video" as const, url }].filter(
        (item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index,
      ).slice(0, 12);
      return { ...current, media: nextMedia, videoUrl: "" };
    });
    notify("영상을 추가했습니다.");
  };

  const removeProjectMedia = (id: string) => {
    setProjectDraft((current) => {
      const nextMedia = projectMedia(current).filter((item) => item.id !== id);
      const nextCover = nextMedia.some((item) => item.url === current.coverImageUrl)
        ? current.coverImageUrl
        : nextMedia.find((item) => item.type === "image")?.url ?? "";
      return {
        ...current,
        media: nextMedia,
        coverImageUrl: nextCover,
        videoUrl: nextMedia.find((item) => item.type === "video")?.url ?? "",
      };
    });
  };

  const moveProjectMedia = (id: string, direction: -1 | 1) => {
    setProjectDraft((current) => {
      const nextMedia = [...projectMedia(current)];
      const index = nextMedia.findIndex((item) => item.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= nextMedia.length) return current;
      [nextMedia[index], nextMedia[nextIndex]] = [nextMedia[nextIndex], nextMedia[index]];
      const firstImage = nextMedia.find((item) => item.type === "image");
      const cover = nextMedia[0]?.type === "image" ? nextMedia[0].url : (current.coverImageUrl || firstImage?.url || "");
      return { ...current, media: nextMedia, coverImageUrl: cover };
    });
  };

  const setProjectCover = (id: string) => {
    setProjectDraft((current) => {
      const allMedia = projectMedia(current);
      const selected = allMedia.find((item) => item.id === id && item.type === "image");
      if (!selected) return current;
      const restMedia = allMedia.filter((item) => item.id !== id);
      const nextMedia = [selected, ...restMedia];
      return { ...current, coverImageUrl: selected.url, media: nextMedia };
    });
  };

  const handleProfileImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    setLoading(true);
    try {
      let profileImageUrl: string;
      if (!previewMode) {
        try {
          const res = await uploadFile(file);
          profileImageUrl = res.url;
        } catch {
          profileImageUrl = await compressImageFile(file);
        }
      } else {
        profileImageUrl = await compressImageFile(file);
      }
      setProfileDraft((current) => ({ ...current, profileImageUrl }));
      notify("프로필 사진을 변경했습니다.");
    } catch (error) {
      notify((error as { message?: string }).message ?? "프로필 사진을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
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
          media: projectMedia(projectDraft),
          attachments: projectDraft.attachments ?? [],
          isPublic: projectDraft.isPublic,
          isFeatured: projectDraft.isFeatured,
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

  const toggleFeatured = async (project: Project) => {
    if (previewMode) {
      setData((current) => ({
        ...current,
        projects: current.projects.map((item) =>
          item.id === project.id ? { ...item, isFeatured: !project.isFeatured } : item,
        ),
      }));
      notify(project.isFeatured ? "대표 프로젝트에서 제외했습니다." : "대표 프로젝트로 설정했습니다.");
      return;
    }
    try {
      await api(`/api/projects/${project.id}/featured`, { isFeatured: !project.isFeatured });
      await refreshData();
      notify(project.isFeatured ? "대표 프로젝트에서 제외했습니다." : "대표 프로젝트로 설정했습니다.");
    } catch (error) {
      notify((error as { message?: string }).message ?? "대표 프로젝트를 변경하지 못했습니다.");
    }
  };

  const deleteProject = async (project: Project) => {
    if (!window.confirm(`“${project.title}” 프로젝트를 삭제할까요? 삭제한 내용은 복구할 수 없습니다.`)) return;
    if (previewMode) {
      setData((current) => ({
        ...current,
        projects: current.projects.filter((item) => item.id !== project.id),
      }));
      notify("프로젝트를 삭제했습니다.");
      return;
    }
    setLoading(true);
    try {
      await api(`/api/projects/${project.id}/delete`, {});
      await refreshData();
      notify("프로젝트를 삭제했습니다.");
    } catch (error) {
      notify((error as { message?: string }).message ?? "프로젝트를 삭제하지 못했습니다.");
    } finally {
      setLoading(false);
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
        <a className="brand" href="/">
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
          {!previewMode && data.user.isAdmin && (
            <a className="button secondary" href="/admin">
              관리자
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
          <div
            className={`profile-avatar ${profileDraft.profileImageUrl ? "has-image" : ""}`}
            style={profileDraft.profileImageUrl ? { backgroundImage: `url("${profileDraft.profileImageUrl.replaceAll('"', "%22")}")` } : undefined}
          >
            {!profileDraft.profileImageUrl && (
              <span className="profile-default-avatar" aria-label="기본 프로필 사진">
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="31" r="18" />
                  <path d="M14 88c2-22 16-34 36-34s34 12 36 34Z" />
                </svg>
              </span>
            )}
            {profileEditing && (
              <label className="profile-avatar-picker" aria-label="프로필 사진 추가 또는 수정">
                <input type="file" accept="image/*" onChange={handleProfileImageUpload} />
              </label>
            )}
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
              <RichTextField
                label="한 줄 소개"
                value={profileDraft.bio}
                onChange={(value) => setProfileDraft({ ...profileDraft, bio: value })}
                placeholder="나를 설명하는 한 문장을 입력하세요. (단어를 드래그하고 형광펜 버튼을 누르면 밑줄 하이라이트됩니다)"
                maxLength={150}
              />
              <details className="editor-disclosure profile-disclosure" open>
                <summary><span>나를 소개합니다</span><small>소개 · 일하는 방식 · 가치관 · 방향 · 마무리</small></summary>
                <div className="disclosure-content identity-editor">
                  <RichTextField label="나에 대한 소개" value={profileDraft.aboutMe} onChange={(value) => setProfileDraft({ ...profileDraft, aboutMe: value })} placeholder="핵심 성향과 경험을 2~3개의 짧은 문단으로 적어 주세요." maxLength={700} />
                  <div className="form-row two">
                    <RichTextField label="일하는 방식" value={profileDraft.workStyle} onChange={(value) => setProfileDraft({ ...profileDraft, workStyle: value })} placeholder="한 문단에 한 가지 방식만 적어 주세요." maxLength={400} />
                    <RichTextField label="중요하게 생각하는 가치" value={profileDraft.values} onChange={(value) => setProfileDraft({ ...profileDraft, values: value })} placeholder="가장 중요한 기준을 짧고 선명하게 적어 주세요." maxLength={300} />
                  </div>
                  <RichTextField label="앞으로의 방향" value={profileDraft.lookingFor} onChange={(value) => setProfileDraft({ ...profileDraft, lookingFor: value })} placeholder="앞으로의 방향은 한두 문장으로 정리해 주세요." maxLength={300} />
                  <label>마무리 제목<input value={profileDraft.aspirationTitle ?? ""} onChange={(event) => setProfileDraft({ ...profileDraft, aspirationTitle: event.target.value })} placeholder="예: 오래 쓰이는 제품을 만드는 개발자" /></label>
                  <RichTextField label="마무리 문구" value={profileDraft.aspiration ?? ""} onChange={(value) => setProfileDraft({ ...profileDraft, aspiration: value })} placeholder="마지막에 남기고 싶은 말을 짧게 적어 주세요." maxLength={500} />
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
                      <RichTextField
                        label="주요 경험"
                        value={entry.description}
                        onChange={(value) => updateCareer(entry.id, "description", value)}
                        placeholder="무엇을 맡았고 어떤 변화를 만들었는지 적어 주세요. (강조할 부분에 형광펜 버튼 적용 가능)"
                        maxLength={600}
                      />
                      <button type="button" className="career-remove" onClick={() => setProfileDraft({ ...profileDraft, careers: profileDraft.careers.filter((item) => item.id !== entry.id) })}>이 항목 삭제</button>
                    </div>
                  ))}
                  <button type="button" className="button secondary career-add" onClick={addCareer}><Icon name="plus" />경력 추가</button>
                </div>
              </details>
              <details className="editor-disclosure profile-disclosure">
                <summary><span>학력과 배움</span><small>{profileDraft.educations.length}개 등록</small></summary>
                <div className="disclosure-content career-editor-list">
                  {profileDraft.educations.map((entry) => (
                    <div className="career-editor-row" key={entry.id}>
                      <div className="form-row three">
                        <label>학교<input value={entry.school} onChange={(event) => updateEducation(entry.id, "school", event.target.value)} placeholder="학교명" /></label>
                        <label>전공·과정<input value={entry.major} onChange={(event) => updateEducation(entry.id, "major", event.target.value)} placeholder="컴퓨터공학과" /></label>
                        <label>기간<input value={entry.period} onChange={(event) => updateEducation(entry.id, "period", event.target.value)} placeholder="2022.03 – 2026.02" /></label>
                      </div>
                      <RichTextField
                        label="배운 내용·활동"
                        value={entry.description}
                        onChange={(value) => updateEducation(entry.id, "description", value)}
                        placeholder="개발과 관련해 배운 내용, 동아리, 연구, 수상 등을 적어 주세요. (강조할 부분에 형광펜 버튼 적용 가능)"
                        maxLength={600}
                      />
                      <button type="button" className="career-remove" onClick={() => setProfileDraft({ ...profileDraft, educations: profileDraft.educations.filter((item) => item.id !== entry.id) })}>이 항목 삭제</button>
                    </div>
                  ))}
                  <button type="button" className="button secondary career-add" onClick={addEducation}><Icon name="plus" />학력·교육 추가</button>
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
              <p>{data.portfolio.bio ? <RichText value={data.portfolio.bio} /> : "한 줄 소개를 입력하면 공개 페이지에 표시됩니다."}</p>
              {data.portfolio.aboutMe && <div className="profile-about-preview"><RichText value={data.portfolio.aboutMe} /></div>}
              {(data.portfolio.experienceLevel || data.portfolio.strengths.length > 0) && (
                <div className="profile-summary-chips">
                  {data.portfolio.experienceLevel && <span>{data.portfolio.experienceLevel}</span>}
                  {data.portfolio.strengths.map((strength) => <b key={strength}>{strength}</b>)}
                  {!!data.portfolio.careers.length && <span>경력·활동 {data.portfolio.careers.length}</span>}
                  {!!data.portfolio.educations.length && <span>학력·교육 {data.portfolio.educations.length}</span>}
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
                        {project.contribution.split(",").map((item) => item.trim()).filter(Boolean).map((contribution) => {
                          const kind = getChoiceKind(contribution, contributionChoices);
                          return <b className={`keyword-chip contribution-chip ${kind}`} key={contribution}>{contribution}</b>;
                        })}
                        {project.role && <b className="keyword-chip role-chip">{project.role}</b>}
                        {project.techStacks.filter(Boolean).slice(0, 5).map((tech) => {
                          const kind = getChoiceKind(tech, techChoices);
                          return <b className={`keyword-chip tech-chip ${kind}`} key={tech}>{tech}</b>;
                        })}
                      </div>
                      <div className={`project-highlight ${project.result ? "has-result" : "empty"}`}>
                        <span>KEY RESULT</span>
                        <strong>{project.result ? <RichText value={project.result} /> : "대표 성과를 입력하면 여기에 보여요."}</strong>
                      </div>
                    </div>
                    <div className="project-controls" onClick={(event) => event.stopPropagation()}>
                      <div className="visibility-row">
                        <button
                          className={`featured-toggle ${project.isFeatured ? "on" : ""}`}
                          onClick={() => toggleFeatured(project)}
                          aria-label={project.isFeatured ? "대표 프로젝트에서 제외" : "대표 프로젝트로 설정"}
                          aria-pressed={project.isFeatured}
                          title={project.isFeatured ? "대표 프로젝트에서 제외" : "대표 프로젝트로 설정"}
                        >
                          <span className="featured-toggle-icon" aria-hidden="true">★</span>
                          <span className="featured-toggle-label">대표</span>
                        </button>
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
                        <button className="project-delete-button" onClick={() => deleteProject(project)} aria-label={`${project.title} 삭제`}>
                          <Icon name="trash" /><span>삭제</span>
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
              <RichTextField
                label="프로젝트 개요"
                value={projectDraft.summary}
                onChange={(value) => setProjectDraft({ ...projectDraft, summary: value })}
                placeholder="프로젝트의 목적과 배경을 설명해 주세요."
                maxLength={500}
              />
              <div className="project-facts">
                <label>시작 월<input type="month" value={projectDraft.periodStart} onInput={(event) => setProjectDraft((current) => ({ ...current, periodStart: event.currentTarget.value }))} onChange={(event) => setProjectDraft((current) => ({ ...current, periodStart: event.currentTarget.value }))} /></label>
                <label>종료 월<input type="month" value={projectDraft.periodEnd} onInput={(event) => setProjectDraft((current) => ({ ...current, periodEnd: event.currentTarget.value }))} onChange={(event) => setProjectDraft((current) => ({ ...current, periodEnd: event.currentTarget.value }))} /></label>
                <label>참여 인원<input maxLength={40} value={projectDraft.teamSize} onChange={(event) => setProjectDraft({ ...projectDraft, teamSize: event.target.value })} placeholder="예: 4명" /></label>
                <div className="picker-field">
                  <span className="picker-label">기여 범위</span>
                  <button
                    type="button"
                    className={`picker-trigger contribution-trigger ${projectDraft.contribution ? "has-value" : ""}`}
                    onClick={() => setOpenPicker((current) => current === "contribution" ? null : "contribution")}
                    aria-expanded={openPicker === "contribution"}
                  >
                    <span>{selectedContributions.length ? `${selectedContributions.length}개 기여 범위 선택됨` : "내가 맡은 역할을 선택해 주세요"}</span><b>⌄</b>
                  </button>
                  {selectedContributions.length > 0 && (
                    <div className="selected-chip-list contribution-chip-list">
                      {selectedContributions.map((contribution) => {
                        return <span className={`selected-chip ${getChoiceKind(contribution, contributionChoices)}`} key={contribution}>{contribution}<button type="button" onClick={() => toggleContribution(contribution)} aria-label={`${contribution} 선택 해제`}>×</button></span>;
                      })}
                    </div>
                  )}
                  {openPicker === "contribution" && (
                    <div className="picker-menu contribution-menu">
                      {contributionChoices.map((choice) => (
                        <button
                          type="button"
                          className={`picker-option ${choice.kind} ${selectedContributions.includes(choice.label) ? "selected" : ""}`}
                          key={choice.label}
                          onClick={() => toggleContribution(choice.label)}
                        ><span>{choice.label}</span>{selectedContributions.includes(choice.label) && <b>✓</b>}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="picker-field tech-picker-field">
                <div className="picker-label-row">
                  <span className="picker-label">프로젝트 기술 스택</span>
                  <small>{projectDraft.techStacks.length}/15 선택</small>
                </div>
                <button
                  type="button"
                  className={`picker-trigger tech-trigger ${projectDraft.techStacks.length ? "has-value" : ""}`}
                  onClick={() => setOpenPicker((current) => current === "tech" ? null : "tech")}
                  aria-expanded={openPicker === "tech"}
                >
                  <span>{projectDraft.techStacks.length ? `${projectDraft.techStacks.length}개 기술 스택 선택됨` : "사용한 기술을 선택해 주세요"}</span><b>⌄</b>
                </button>
                {projectDraft.techStacks.length > 0 && (
                  <div className="selected-chip-list">
                    {projectDraft.techStacks.map((tech) => {
                      return <span className={`selected-chip ${getChoiceKind(tech, techChoices)}`} key={tech}>{tech}<button type="button" onClick={() => toggleTechStack(tech)} aria-label={`${tech} 선택 해제`}>×</button></span>;
                    })}
                  </div>
                )}
                {openPicker === "tech" && (
                  <div className="picker-menu tech-menu">
                    <div className="picker-menu-heading"><span>기술을 눌러 추가하거나 해제하세요</span><b>프론트엔드 / 백엔드</b></div>
                    <div className="picker-option-grid">
                      {techChoices.map((choice) => (
                        <button
                          type="button"
                          className={`picker-option ${choice.kind} ${projectDraft.techStacks.includes(choice.label) ? "selected" : ""}`}
                          key={choice.label}
                          onClick={() => toggleTechStack(choice.label)}
                        ><span>{choice.label}</span>{projectDraft.techStacks.includes(choice.label) && <b>✓</b>}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="media-editor">
                <div className={`media-preview ${selectedMedia.length ? "has-image" : ""}`} style={selectedMedia[0]?.type === "image" ? { backgroundImage: `url("${selectedMedia[0].url.replaceAll('"', "%22")}")` } : undefined}>
                  {selectedMedia[0]?.type === "video" ? <video src={selectedMedia[0].url} poster={selectedMedia.find((item) => item.type === "image")?.url || undefined} muted loop autoPlay playsInline /> : !selectedMedia.length && <><span>MEDIA</span><b>프로젝트의 사진과 영상을 여러 개 추가하세요.</b></>}
                </div>
                {selectedMedia.length > 0 && (
                  <div className="media-asset-list" aria-label="추가된 프로젝트 미디어">
                    {selectedMedia.map((item, index) => (
                      <div className={`media-asset ${item.type}`} key={`${item.id}-${item.url}`}>
                        {item.type === "video" ? <video src={item.url} muted playsInline /> : <span style={{ backgroundImage: `url("${item.url.replaceAll('"', "%22")}")` }} />}
                        <small>{item.type === "video" ? "영상" : `사진 ${index + 1}`}{item.url === projectDraft.coverImageUrl && item.type === "image" ? " · 대표" : ""}</small>
                        <div className="media-asset-actions">
                          {item.type === "image" && <button type="button" className={item.url === projectDraft.coverImageUrl ? "is-cover" : ""} onClick={() => setProjectCover(item.id)} aria-label={item.url === projectDraft.coverImageUrl ? "대표 사진으로 선택됨" : "대표 사진으로 지정"}>{item.url === projectDraft.coverImageUrl ? "대표" : "대표 지정"}</button>}
                          <button type="button" onClick={() => moveProjectMedia(item.id, -1)} aria-label="미디어 앞으로 이동" disabled={index === 0}>↑</button>
                          <button type="button" onClick={() => moveProjectMedia(item.id, 1)} aria-label="미디어 뒤로 이동" disabled={index === selectedMedia.length - 1}>↓</button>
                          <button type="button" onClick={() => removeProjectMedia(item.id)} aria-label="미디어 삭제">×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="upload-field">
                  <span className="upload-label">프로젝트 사진 <em>여러 장 선택 가능</em></span>
                  <label className="file-upload-button">
                    <input type="file" accept="image/*" multiple onChange={handleMediaUpload} />
                    <span>내 기기에서 사진 추가</span>
                  </label>
                  <small>컴퓨터나 휴대폰에서 여러 장을 선택하세요. 큰 이미지는 자동으로 최적화됩니다. 최대 12개까지 추가할 수 있어요.</small>
                </div>
                <label>
                  프로젝트 영상 URL <em>여러 개 추가 가능</em>
                  <input type="url" value={projectDraft.videoUrl} onChange={(event) => setProjectDraft({ ...projectDraft, videoUrl: event.target.value })} placeholder="https://.../project-demo.mp4" />
                  <button type="button" className="media-add-button" onClick={addVideoMedia}>영상 추가</button>
                  <small>브라우저에서 직접 재생할 수 있는 MP4·WebM 주소를 입력하고 추가하세요. 추가된 영상도 위에서 삭제할 수 있습니다.</small>
                </label>
                <div className="attachment-editor">
                  <span className="upload-label">프로젝트 파일 <em>최대 8개</em></span>
                  <small>PDF, 발표자료, 문서처럼 프로젝트를 더 설명해 줄 자료를 첨부할 수 있어요. 파일당 25MB 이하입니다.</small>
                  {(projectDraft.attachments ?? []).length > 0 && (
                    <div className="attachment-list">
                      {(projectDraft.attachments ?? []).map((file) => (
                        <div className="attachment-item" key={file.id}>
                          <span className="attachment-type">{file.type.includes("pdf") ? "PDF" : "FILE"}</span>
                          <span className="attachment-copy"><strong>{file.name}</strong><small>{formatFileSize(file.size)}</small></span>
                          <button type="button" onClick={() => removeProjectAttachment(file.id)} aria-label={`${file.name} 삭제`}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <label className="file-upload-button">
                    <input type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip,application/pdf" onChange={handleAttachmentUpload} />
                    <span>파일 추가</span>
                  </label>
                </div>
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
                      <RichTextEditor
                        maxLength={key === "troubleshooting" ? 1000 : 500}
                        value={String(projectDraft[key as keyof ProjectDraft] ?? "")}
                        onChange={(value) =>
                          setProjectDraft({
                            ...projectDraft,
                            [key]: value,
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
                    <RichTextField label="대상 사용자" value={projectDraft.targetAudience} onChange={(value) => setProjectDraft({ ...projectDraft, targetAudience: value })} placeholder="누구의 어떤 상황을 위한 프로젝트였나요?" />
                    <RichTextField label="프로젝트 목표" value={projectDraft.goal} onChange={(value) => setProjectDraft({ ...projectDraft, goal: value })} placeholder="달성하려던 사용자·사업 목표는 무엇이었나요?" />
                  </div>
                  <RichTextField label="제약 조건" value={projectDraft.constraints} onChange={(value) => setProjectDraft({ ...projectDraft, constraints: value })} placeholder="시간, 인력, 기술, 정책 등 고려한 제약을 적어 주세요." />
                  <RichTextField label="가장 중요한 결정" value={projectDraft.keyDecision} onChange={(value) => setProjectDraft({ ...projectDraft, keyDecision: value })} placeholder="어떤 대안 중 무엇을 선택했고, 그 이유는 무엇인가요?" />
                  <RichTextField label="협업 방식" value={projectDraft.collaboration} onChange={(value) => setProjectDraft({ ...projectDraft, collaboration: value })} placeholder="누구와 어떻게 소통하고 의견을 조율했나요?" />
                </div>
              </details>
              <details className="editor-disclosure project-disclosure" open>
                <summary><span>개발 구현과 운영</span><small>아키텍처 · 테스트와 품질 · 배포와 운영</small></summary>
                <div className="disclosure-content">
                  <RichTextField label="아키텍처와 기술 선택" value={projectDraft.architecture} onChange={(value) => setProjectDraft({ ...projectDraft, architecture: value })} placeholder="어떤 구조와 기술을 선택했으며, 다른 대안 대신 선택한 이유는 무엇인가요?" maxLength={700} />
                  <div className="form-row two">
                    <RichTextField label="테스트와 품질" value={projectDraft.qualityAssurance} onChange={(value) => setProjectDraft({ ...projectDraft, qualityAssurance: value })} placeholder="단위·통합·E2E 테스트, 성능, 접근성, 코드 리뷰를 어떻게 확인했나요?" maxLength={700} />
                    <RichTextField label="배포와 운영" value={projectDraft.deployment} onChange={(value) => setProjectDraft({ ...projectDraft, deployment: value })} placeholder="CI/CD, 배포 환경, 모니터링, 장애 대응 방식을 적어 주세요." maxLength={700} />
                  </div>
                </div>
              </details>
              <RichTextField label="성과 근거" value={projectDraft.evidence} onChange={(value) => setProjectDraft({ ...projectDraft, evidence: value })} placeholder="성과를 어떻게 측정했는지, 어떤 자료로 확인할 수 있는지 적어 주세요." maxLength={500} />
              <details className="editor-disclosure project-disclosure">
                <summary><span>회고와 다음 단계</span><small>배운 점 · 다시 한다면 바꿀 점</small></summary>
                <div className="disclosure-content form-row two">
                  <RichTextField label="배운 점" value={projectDraft.learnings} onChange={(value) => setProjectDraft({ ...projectDraft, learnings: value })} placeholder="이 경험을 통해 무엇을 새롭게 알게 되었나요?" />
                  <RichTextField label="다시 한다면" value={projectDraft.nextTime} onChange={(value) => setProjectDraft({ ...projectDraft, nextTime: value })} placeholder="다음에는 무엇을 다르게 시도하고 싶나요?" />
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
              <p>{previewProject.summary ? <RichText value={previewProject.summary} /> : "프로젝트 개요가 여기에 표시됩니다."}</p>
              <div className="evidence-meta preview-evidence-meta">
                {(() => { const period = projectPeriod(previewProject); return formatPeriod(period.start, period.end) && <span>{formatPeriod(period.start, period.end)}</span>; })()}
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
