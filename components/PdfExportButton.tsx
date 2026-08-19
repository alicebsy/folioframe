"use client";

export default function PdfExportButton() {
  return (
    <button
      type="button"
      className="pdf-export-btn"
      onClick={() => window.print()}
      title="포트폴리오를 PDF로 저장하거나 인쇄합니다."
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      <span>PDF 저장</span>
    </button>
  );
}
