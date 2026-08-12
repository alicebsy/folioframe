"use client";

import { useMemo, useState } from "react";
import type { AdminMember } from "@/lib/admin";

function formatDate(value: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeZone: "Asia/Seoul",
  }).format(new Date(value));
}

export default function AdminMembersClient({
  initialMembers,
}: {
  initialMembers: AdminMember[];
}) {
  const [query, setQuery] = useState("");
  const members = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return initialMembers;
    return initialMembers.filter((member) =>
      [member.email, member.portfolioName, member.slug]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [initialMembers, query]);
  const publishedCount = initialMembers.filter((member) => member.isPublished).length;
  const projectTotal = initialMembers.reduce((sum, member) => sum + member.projectCount, 0);

  return (
    <main className="admin-shell">
      <header className="topbar admin-topbar">
        <a className="brand" href="/dashboard">
          <span className="brand-mark">✦</span>
          <span>Folioframe</span>
        </a>
        <div className="top-actions">
          <span className="admin-badge">ADMIN</span>
          <a className="button secondary" href="/dashboard">내 포트폴리오</a>
        </div>
      </header>

      <section className="admin-content">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">ADMIN CONSOLE</span>
            <h1>회원 관리</h1>
            <p>Folioframe에 가입해 서비스를 사용하고 있는 회원을 확인하는 공간입니다.</p>
          </div>
          <div className="admin-heading-note">회원 데이터는 관리자 계정으로만 볼 수 있습니다.</div>
        </div>

        <div className="admin-stats">
          <article><span>전체 회원</span><strong>{initialMembers.length}</strong><small>가입한 계정</small></article>
          <article><span>발행 중인 포트폴리오</span><strong>{publishedCount}</strong><small>공개 페이지</small></article>
          <article><span>등록 프로젝트</span><strong>{projectTotal}</strong><small>회원이 작성한 경험</small></article>
        </div>

        <section className="admin-members-panel">
          <div className="admin-panel-heading">
            <div><span className="eyebrow">MEMBERS</span><h2>가입 회원</h2></div>
            <label className="admin-search">
              <span className="sr-only">회원 검색</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이메일·이름·공개 주소 검색" />
            </label>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>회원</th><th>포트폴리오</th><th>프로젝트</th><th>상태</th><th>가입일</th><th /></tr></thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td><strong>{member.email}</strong><small>최근 수정 {formatDate(member.updatedAt)}</small></td>
                    <td><strong>{member.portfolioName}</strong><small>{member.slug ? `/p/${member.slug}` : "공개 주소 미설정"}</small></td>
                    <td><strong>{member.projectCount}</strong><small>개</small></td>
                    <td><span className={`admin-status ${member.isPublished ? "published" : "draft"}`}>{member.isPublished ? "공개 중" : "작성 중"}</span></td>
                    <td>{formatDate(member.createdAt)}</td>
                    <td>{member.isPublished && member.slug ? <a className="admin-view-link" href={`/p/${member.slug}`} target="_blank">페이지 보기 ↗</a> : <span className="admin-muted">-</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!members.length && <div className="admin-empty">검색 조건에 맞는 회원이 없습니다.</div>}
          </div>
        </section>
      </section>
    </main>
  );
}
