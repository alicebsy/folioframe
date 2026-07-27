# Folioframe

프로젝트 경험을 역할·문제·해결 과정·성과 중심으로 작성하고 고유 주소로 공개하는 포트폴리오 MVP입니다.

## 기술 스택

- Next.js
- PostgreSQL
- Vercel

## 로컬 실행

1. 의존성을 설치합니다.

   ```bash
   pnpm install
   ```

2. 환경변수를 만듭니다. Neon을 사용한다면 앱에는 pooled URL을,
   스키마 적용에는 direct URL을 사용합니다.

   ```bash
   cp .env.example .env.local
   ```

3. PostgreSQL에 스키마를 적용합니다. 별도 `psql` 설치 없이 실행됩니다.

   ```bash
   pnpm db:schema
   ```

4. 개발 서버를 실행합니다.

   ```bash
   pnpm dev
   ```

## 필수 환경변수

| 이름 | 용도 |
|---|---|
| `DATABASE_URL` | 앱 런타임용 pooled PostgreSQL 연결 문자열 |
| `DATABASE_URL_UNPOOLED` | 최초 스키마 적용용 direct PostgreSQL 연결 문자열 |
| `SESSION_SECRET` | 세션 토큰 해시 키, 32자 이상 |
| `NEXT_PUBLIC_APP_URL` | 공개 서비스 주소 |

`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `SESSION_SECRET`은 서버에서만
사용하며 브라우저 코드에 노출하지 않습니다.

## Vercel 배포

1. 코드를 Git 저장소에 올리고 Vercel 프로젝트로 가져옵니다.
2. Vercel Marketplace에서 **Neon**을 설치하고 이 프로젝트에 연결합니다.
3. 연결 후 생성된 pooled 값을 `DATABASE_URL`, direct 값을
   `DATABASE_URL_UNPOOLED`로 확인합니다.
4. Vercel의 Production 환경변수에 32자 이상의 `SESSION_SECRET`을 등록하고,
   `NEXT_PUBLIC_APP_URL`에는 실제 Vercel 주소를 입력합니다.
5. 로컬 환경에 Neon의 두 URL을 잠시 설정한 뒤 `pnpm db:schema`을 한 번
   실행합니다. 또는 Neon/Vercel SQL 편집기에서 `db/schema.sql`을 실행합니다.
6. Vercel에서 재배포합니다.
7. 배포 주소의 `/api/health`가 `database: "connected"`를 반환하는지 확인한 뒤
   회원가입 → 대시보드 → 프로젝트 작성 → 발행 흐름을 테스트합니다.

### 실제 사용자 흐름

```text
/login
  → 간단 회원가입
  → /dashboard
  → 프로필·프로젝트 작성
  → 공개 전환 및 발행
  → /p/{고유주소}
```

## 구현 범위

- 이메일·비밀번호 회원가입과 로그인
- 서버 세션과 사용자별 데이터 접근 제한
- 프로필과 공개 주소 저장
- 프로젝트 직접 작성과 텍스트 링크
- 공개 상태 검증
- 발행 성공·실패 화면
- 로그인 없는 공개 포트폴리오

상세 기준은 [docs/SPEC.md](docs/SPEC.md)를 참고하세요.
