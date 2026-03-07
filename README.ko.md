# 📝 Focusdo App — 집중 타이머 및 생산성 분석 앱

[English](./README.md) | [한국어] | [日本語](./README.ja.md)

---

FocusDo는 할 일 관리와 집중 세션 기록을 결합한 생산성 웹 애플리케이션입니다.

집중 시간 데이터는 `focus_sessions` 테이블에 세션 단위의 raw 데이터로 저장됩니다.
집중 시간 합계와 같은 통계 데이터는 별도로 저장하지 않고 세션 데이터를 기반으로 동적으로 계산됩니다.

세션 데이터는 Supabase에서 조회되고 React Query 훅을 통해 클라이언트에서 aggregation이 수행됩니다.
이후 Todo 데이터와 결합하여 분석 데이터를 생성하고 D3 차트를 통해 시각화됩니다.

이 구조는 이중 데이터 저장(dual write)을 방지하고
데이터 수집, 분석, 시각화 레이어를 분리한 구조를 제공합니다.

---

## ✨ 주요 기능

- ⏱️ 집중 타이머
- 📝 Todo 관리
- 📊 일일 생산성 대시보드
- 📈 주간 집중 시간 분석
- 🗂️ 집중 기록 히스토리
- 📉 D3 기반 데이터 시각화
- ⚡ React Query 기반 데이터 캐싱

---

## 🗂️ 페이지 구성

- **Today Page**  
  일일 Todo를 추가, 수정, 관리하는 메인 페이지이며  
  대시보드 요약 정보를 함께 제공합니다.

- **Focus Page**  
  선택한 Todo에 대해 집중 세션을 실행하는 전용 페이지입니다.

- **Focus History Page**  
  주간 집중 기록은 차트로 시각화하고,  
  일간 기록은 요약 카드와 상세 모달 구조로 제공합니다.

---

## 🛠️ 기술 스택

Frontend

- **React + TypeScript**

Routing

- **React Router**

State Management

- **Zustand**

Server State

- **TanStack Query**

Backend / Database

- **Supabase (PostgreSQL)**

Data Visualization

- **D3.js**

Styling

- **Tailwind CSS**
- **shadcn/ui**

Date Library

- **Day.js**

---

## 📊 아키텍처

애플리케이션은 데이터 조회, 분석 계산, 시각화 레이어로 분리된 구조입니다.
집중 시간은 세션 데이터로 저장되며 통계 데이터는 동적으로 계산됩니다.

---

## 🏗 설계 원칙

- **페이지 단위 오케스트레이션**  
  페이지 컴포넌트는 도메인 로직을 직접 구현하지 않고  
  store와 custom hook을 조합하여 UI 흐름을 조정합니다.

- **도메인 로직 분리**  
  Todo 및 집중 시간 관련 비즈니스 로직은  
  store와 custom hook 내부에 분리되어 있습니다.

- **명시적인 UI 상태 모델링**  
  Loading, Empty, Read-only, Error 상태를  
  의도적으로 구분하여 렌더링합니다.

- **과도한 최적화 지양**  
  리스트 가상화나 무한 스크롤은  
  실제 사용 패턴이 확인된 이후 도입하도록 설계했습니다.

---

## 🔄 데이터 흐름

```
Today 페이지에서 Todo 생성
        ↓
Focus 페이지에서 Timer 실행
        ↓
Focus Session 저장
        ↓
Supabase Database (focus_sessions)
        ↓
React Query 데이터 훅
(useDailyAggregation)
        ↓
클라이언트 aggregation
        ↓
Analytics 훅
(useHistoryDashboard)
        ↓
시각화 레이어
(D3 차트 + Dashboard UI)
```

---

## 🧩 Analytics 구조

분석 시스템은 세 개의 레이어로 구성됩니다.

Data Fetch Layer

- `useDailyAggregation`
- Supabase에서 세션 데이터를 가져와 일별 집중 시간을 계산

Analytics Layer

- `useHistoryDashboard`
- 집중 시간 데이터와 Todo 완료 데이터를 결합

Visualization Layer

- `FocusTrendChart`
- `FocusTimeBarChart`
- `DayHistoryCard`

차트는 D3.js로 구현되었습니다.

---

## 📂 프로젝트 구조

```
src
 ├ api
 ├ components
 ├ constants
 ├ features
 │   ├ dashboard
 │   ├ date
 │   ├ history
 │   └ todo
 ├ hooks
 ├ lib
 ├ pages
 └ provider
 └ store
 └ types
```

도메인 로직과 UI 컴포넌트를 분리하여 확장성과 유지보수성을 고려한 구조입니다.

---

## 🧠 Design Decisions

- 읽기 전용 날짜는 명시적인 UI 상태로 모델링하여
  오해의 소지가 있는 인터랙션을 방지합니다.
- Empty 상태는 현재 날짜 컨텍스트에서
  사용자 입력 가능 여부를 반영하여 렌더링됩니다.
- 날짜 네비게이션 로직은 상태를 가지지 않도록 설계해
  페이지 간 숨은 결합을 방지했습니다.

---

## ⚖️ 절충 사항

- 모든 데이터는 현재 메모리 기반으로 관리됩니다.
- 집중 히스토리 시각화는 대규모 데이터 성능보다
  가독성과 명확성을 우선합니다.
- 모바일 UX는 기본적인 대응은 되어 있으나,
  매우 작은 화면에 대한 세부 최적화는 추가 개선 여지가 있습니다.

---

## 🚀 실행 방법

```bash
npm install
npm run dev
```

---

## 📈 향후 개선 사항

- 리스트 가상화 또는 무한 스크롤
- ~~영속 저장소 또는 백엔드 동기화~~
- 확장된 집중 분석 기능
- 모바일 UX 추가 개선
- 다크모드
- DB View 기반 aggregation
- DB 인덱스 최적화
- 타이머 세션 복구 기능

---

## 🔗 라이브 데모

focus-based-todo.vercel.app

---

## 📄 라이선스

MIT
