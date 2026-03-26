# 📝 FocusDo App — 집중 타이머 및 생산성 분석 앱

[English](./README.md) | [한국어] | [日本語](./README.ja.md)

---

FocusDo는 할 일 관리와 집중 세션 추적을 결합한 생산성 웹 애플리케이션입니다.

집중 세션은 `focus_sessions` 테이블에 가공되지 않은 이벤트 데이터로 저장됩니다.

집계된 지표를 별도로 저장하는 대신, 다음과 같은 하이브리드 방식으로 분석을 수행합니다:

- API 레이어에서의 부분 집계 (일별 그룹화)
- 클라이언트에서의 최종 집계 (대시보드 및 히스토리 로직)
- 시각화를 위한 데이터 가공 (누락된 날짜 채우기, D3 포맷 변환)

세션 데이터는 React Query를 사용하여 Supabase에서 가져오며, 클라이언트에서 집계되어 생산성 인사이트를 생성합니다.

대시보드 지표는 다음 두 가지를 기반으로 도출됩니다:

- 할 일 상태 (완료율)
- 집중 세션 데이터 (총 집중 시간)

본 시스템은 페이지가 UI 구성을 조율하고, 훅이 도메인 로직을 캡슐화하며, 기능 모듈이 대화형 UI 컴포넌트를 구현하는 계층형 클라이언트 아키텍처를 따릅니다.

---

## 🔗 라이브 데모

focus-based-todo.vercel.app

---

## ✨ 주요 기능

- ⏱️ Focus Timer (25분 / 50분 / 사용자 정의)
- 📝 Todo 관리
- 📊 일일 생산성 대시보드
- 📈 주간 집중 시간 분석
- 🗂️ Focus Session 히스토리
- 📉 D3 기반 데이터 시각화
- ⚡ React Query 기반 데이터 캐싱
- ♾️ 무한 스크롤 (커서 기반 페이지네이션)
- ⚡ 낙관적 UI 업데이트 (Optimistic UI)

---

## 🗂️ 페이지 구성

### Today Page

메인 생산성 허브입니다.

사용자는 다음을 수행할 수 있습니다:

- 주간 캘린더 확인
- 일일 할 일 관리
- 집중 세션 시작
- 일일 생산성 지표 확인

대시보드 요약 내용:

- 총 집중 시간
- 할 일 완료율
- 완료된 작업 수

과거 및 미래 날짜는 읽기 전용 모드로 표시됩니다.

---

### Focus Page

선택한 할 일에 대해 집중 타이머를 실행합니다.

타이머가 종료되거나 사용자가 조기에 중단하면 확인 모달이 표시됩니다.

확인 시, 다음과 같은 데이터가 데이터베이스에 저장됩니다:

- `user_id`, `todo_id`, `start_time`, `end_time`, `duration`

---

### Focus History Page

집중 기록을 확인하는 페이지입니다.

- 주간 트렌드 → 라인 차트
- 집중 시간 → 바 차트
- 일별 요약 → 카드 형태

---

## 🛠️ 기술 스택

### Frontend

- React
- TypeScript

### Routing

- React Router

### State Management

- Zustand (UI state)

### Server State

- TanStack Query

### Backend / Database

- Supabase (PostgreSQL + Auth)

### Visualization

- D3.js

### Styling

- Tailwind CSS
- shadcn/ui

### Date Handling

- Day.js

---

## 📊 아키텍처 개요

이 애플리케이션은 **관심사 분리**가 명확한 **계층형 아키텍처**를 따릅니다.

아래의 시스템 흐름도는 데이터가 구조적으로 흐르는 파이프라인을 나타냅니다.

```
Client UI (Pages / Components)
        ↓
React Query Hooks (queries / mutations)
        ↓
API Layer (api/*.ts)
        ↓
Supabase (PostgREST)
        ↓
PostgreSQL (focus_sessions, todo)
        ↓
Raw Data Response
        ↓
Client Aggregation Layer (hooks + lib/chart-utils)
        ↓
Derived State (dashboard / history hooks)
        ↓
Visualization (D3 / UI Components)
```

---

## 🏗 설계 원칙

### 페이지 단위 오케스트레이션

페이지는 UI 구성을 조율하지만 도메인 로직은 피합니다.

---

### 도메인 로직 분리

비즈니스 로직은 훅과 기능 모듈에 위치합니다.

---

### 명시적인 UI 상태 모델링

- loading
- empty
- read-only
- error

---

### 하이브리드 집계 전략

- API 레이어 → 부분 집계 (API 함수 내부에서 클라이언트 측 reduce를 통한 일별 그룹화)
- 클라이언트 → 최종 계산 (완료율, 집중 시간 지표)

---

## 🔄 데이터 흐름

다음은 사용자 기반의 상호작용 흐름을 설명합니다:

```
[사용자 액션]

1. Todo 작업
   → useMutation (React Query)
   → Supabase (insert/update/delete)
   → Query 무효화 및 낙관적 업데이트

2. Focus 시작 (Focus Page)
   → useTimer (클라이언트 상태)

3. Focus 완료
   → Confirmation modal
   → createFocusSession (mutation)
   → Supabase insert

4. 데이터 조회
   → useQuery / useInfiniteQuery
   → Supabase fetch

5. 클라이언트 집계
   → getDailyAggregation / getAllDailyAggregation (API 레이어 — 원시 데이터 조회)
   → client-side reduce (날짜 기준 duration 합산)
   → useWeeklyFocusAggregation / useAllFocusAggregation (React Query 래핑)
   → useDayDashboard / useHistoryDashboard (완성률 및 통계 계산)
   → chart-utils.ts (누락된 날짜 보정 및 D3용 데이터 변환)

6. UI 렌더링
   → Dashboard / Charts (D3)
```

---

## 🧩 Analytics 구조

### Data Fetch Layer

- `useTodayFocusTime`
- `useTodoFocusTime`
- `useWeeklyFocusAggregation`
- `useAllFocusAggregation`

---

### Analytics Layer

- API aggregation (daily grouping)
- Client aggregation (dashboard & history)

---

### Visualization Layer

- Dashboard
- D3 charts

---

## 📂 프로젝트 구조

```
src
 ├── api/
 ├── components/
 ├── constants/
 ├── features/
 │   ├── dashboard/
 │   ├── date/
 │   ├── history/
 │   └── todo/
 ├── hooks/
 ├── lib/
 ├── pages/
 ├── provider/
 ├── stores/
 ├── types/
 ├── App.tsx
 └── main.tsx
```

---

## 🧠 설계 결정

### 읽기 전용 날짜 모델

과거와 미래의 날짜는 수정할 수 없습니다. 사용자는 현재 날짜의 할 일만 수정할 수 있습니다.

이는 `TodayPage`의 `readOnlyVariant` 플래그와 `TodoItems`의 `isReadOnly` 플래그를 통해 강제됩니다.

---

### 낙관적 업데이트

`useUpdateTodo`와 `useDeleteTodo`는 서버가 응답하기 직전에 React Query 캐시를 즉시 업데이트합니다.

오류 발생 시, `onMutate` / `onError` 롤백 패턴을 통해 이전 캐시 상태로 복구됩니다.

이를 통해 네트워크 왕복을 기다리지 않고 UI 응답성을 유지합니다.

---

### 월-클락 타이머

`useTimer`는 매 인터벌 틱마다 카운터를 감소시키는 대신 `Date.now()` 스냅샷으로부터 경과 시간을 계산합니다.

이는 탭 전환, 기기 절전 또는 일시 중지 중 발생하는 타이머 드리프트(상태 이탈)를 방지합니다.

---

### 세션 관리

`SessionProvider`는 Supabase Auth 상태 변경을 감지하고 세션을 Zustand에 기록합니다.

초기 세션 확인이 완료될 때까지 `GlobalLoader`가 표시되어, 인증 상태가 해결되기 전에 렌더링되는 것을 방지합니다.

---

### 상태 없는 날짜 네비게이션

`useWeekNavigation`은 내부 상태 없이 `currentDate` prop으로부터 모든 날짜 값을 도출하며,

네비게이션 로직을 UI와 분리된 상태로 유지합니다.

---

### 클라이언트 측 분석

분석은 데이터베이스 뷰를 사용하는 대신 클라이언트의 원시 레코드로부터 계산됩니다.

이는 백엔드를 단순화하지만, 유연성을 위해 약간의 확장성을 희생합니다.

---

## ⚖️ 절충 사항

- 미리 계산된 데이터베이스 집계 대신 클라이언트 측 집계 사용
- `FocusHistoryPage`는 서버 측 페이지네이션 대신 모든 할 일과 집중 기록을 한 번에 가져옴 — 개별 사용자에게는 실용적이지만 대량의 데이터에는 적합하지 않음
- 두 가지 페이지네이션 전략(Today의 커서 기반, History의 클라이언트 측 슬라이싱)은 데이터 액세스 패턴에 따라 의도적으로 다르게 설계됨
- 제한적인 모바일 UX 최적화
- 사용자가 세션 중간에 탭을 닫을 경우 집중 세션 복구 불가

---

## 🚀 실행 방법

```bash
npm install
npm run dev
```

---

## 📈 향후 개선 사항

- 대규모 데이터셋을 위한 리스트 가상화
- 확장된 생산성 분석 기능
- 모바일 경험 개선
- 다크 모드 지원
- 데이터베이스 뷰 기반의 집계 방식 도입
- 인덱스를 활용한 쿼리 성능 최적화
- 타이머 세션 복구 기능

---

## 📄 라이선스

MIT
