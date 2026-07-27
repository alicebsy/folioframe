"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message ?? "로그인할 수 없습니다.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("네트워크 연결을 확인하고 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-shell">
      <section className="login-story">
        <a className="brand login-brand" href="/">
          <span className="brand-mark">✦</span>
          <span>Folioframe</span>
        </a>
        <div>
          <span className="eyebrow">YOUR WORK, CLEARLY TOLD</span>
          <h1>
            경험을 나열하지 말고,
            <br />
            <em>해결한 이야기</em>로
            <br />
            보여주세요.
          </h1>
          <p>
            역할, 문제, 해결 과정, 성과를 하나의 흐름으로 정리해
            채용 담당자가 이해하기 쉬운 포트폴리오를 만듭니다.
          </p>
        </div>
        <div className="login-story-card">
          <span>01</span>
          <div>
            <strong>담당 역할</strong>
            <small>내가 직접 책임진 범위를 분명하게</small>
          </div>
          <i />
          <span>02</span>
          <div>
            <strong>문제와 해결</strong>
            <small>판단과 행동의 과정을 구체적으로</small>
          </div>
          <i />
          <span>03</span>
          <div>
            <strong>구체적 성과</strong>
            <small>결과를 수치와 변화로 설득력 있게</small>
          </div>
        </div>
        <small className="login-caption">
          프로젝트 경험이 곧 당신의 경쟁력이 되도록.
        </small>
      </section>

      <section className="login-panel">
        <div className="login-box">
          <span className="eyebrow">
            {mode === "login" ? "WELCOME BACK" : "START YOUR PORTFOLIO"}
          </span>
          <h2>{mode === "login" ? "다시 만나 반가워요." : "첫 포트폴리오를 시작해요."}</h2>
          <p>
            {mode === "login"
              ? "작성 중인 프로젝트를 이어서 정리해 보세요."
              : "이메일과 비밀번호만 있으면 바로 시작할 수 있어요."}
          </p>

          <form onSubmit={submit} className="login-form">
            <label>
              이메일
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
              />
            </label>
            <label>
              비밀번호
              <input
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="8자 이상 입력해 주세요"
              />
            </label>
            {error && <div className="form-error">{error}</div>}
            <button className="button primary login-submit" disabled={loading}>
              {loading
                ? "처리 중..."
                : mode === "login"
                  ? "로그인"
                  : "간단 회원가입"}
            </button>
          </form>

          <button
            className="login-switch"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
          >
            {mode === "login"
              ? "처음인가요? 간단 회원가입"
              : "이미 계정이 있나요? 로그인"}
          </button>
          <p className="login-security">
            비밀번호는 암호화되어 저장되며, 로그인 세션은 보안 쿠키로
            관리됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}
