import type { ReactNode } from "react";

function renderInline(value: string): ReactNode[] {
  const parts = value.split(/(\*{2}[^*]+?\*{2}|==[^=]+?==)/g);
  return parts.map((part, index) => {
    if (
      (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
      (part.startsWith("==") && part.endsWith("==") && part.length > 4)
    ) {
      return (
        <strong key={index} className="rich-text-highlight">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

/** 소개글의 줄바꿈과 **강조** 표기만 안전하게 화면 요소로 바꿉니다. */
export function RichText({ value, autoEmphasis = false }: { value: string; autoEmphasis?: boolean }) {
  if (!value || typeof value !== "string") return null;
  const emphasizeLine = (line: string) => {
    if (!autoEmphasis || value.includes("**") || value.includes("==")) return line;
    const trimmed = line.trim();
    if (!trimmed) return line;
    const sentence = trimmed.match(/^([^.!?\n]{4,}[.!?])(?:\s|$)/);
    if (!sentence) return line;
    const prefixIndex = line.indexOf(trimmed);
    const leadingSpaces = line.slice(0, prefixIndex);
    return `${leadingSpaces}**${sentence[1]}**${trimmed.slice(sentence[1].length)}`;
  };

  return (
    <>
      {value.split(/\n{2,}/).map((paragraph, index) => (
        <span className="rich-text-paragraph" key={index}>
          {paragraph.split("\n").map((line, lineIndex) => (
            <span key={lineIndex}>
              {lineIndex > 0 && <br />}
              {renderInline(emphasizeLine(line))}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}
