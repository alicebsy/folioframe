import type { ReactNode } from "react";

function renderInline(value: string): ReactNode[] {
  const parts = value.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

/** 소개글의 줄바꿈과 **강조** 표기만 안전하게 화면 요소로 바꿉니다. */
export function RichText({ value, autoEmphasis = false }: { value: string; autoEmphasis?: boolean }) {
  const emphasizeLine = (line: string) => {
    if (!autoEmphasis || value.includes("**")) return line;
    const sentence = line.match(/^(.+?[.!?])(?:\s|$)/);
    if (!sentence) return line;
    return `**${sentence[1]}**${line.slice(sentence[1].length)}`;
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
