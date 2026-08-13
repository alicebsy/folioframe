import type { Project } from "./models";

// 일정 입력이 아직 비어 있는 기존 프로젝트도 공개 포트폴리오에서
// 확인된 개발 기간을 잃지 않도록 하는 보정값입니다. 사용자가 직접
// 입력한 기간은 항상 이 값보다 우선합니다.
const knownPeriods: Record<string, [string, string]> = {
  // 2024년 9월 팀 프로젝트로 시작해 2025년 6월 졸업프로젝트를
  // 마무리했고, 2025년 7월부터 개인 고도화를 이어간 프로젝트입니다.
  CapLog: ["2024-09", "2025-06"],
  "Ticker — Human Stock Market": ["2026-01", "2026-02"],
  "Love Algorithm — 알고리즘보다 어려운 건 사랑이었다": ["2026-01", "2026-01"],
  "EGGO — 농꾸하고 작심삼일 타파하자": ["2026-01", "2026-01"],
  "자율 추종 스마트 카트 — Aruco·LiDAR 센서 융합": ["2026-06", "2026-06"],
  "Localhost — 멀티플레이어 뮤직 퀴즈 게임": ["2026-01", "2026-01"],
  "도다(DODA) — 정보 장벽을 낮추는 콘텐츠 플랫폼": ["2025-07", "2025-07"],
};

export function projectPeriod(project: Pick<Project, "title" | "periodStart" | "periodEnd">) {
  const fallback = knownPeriods[project.title];
  return {
    start: project.periodStart || fallback?.[0] || "",
    end: project.periodEnd || fallback?.[1] || "",
  };
}
