# 📝 FocusDo App — 集中タイマー & 生産性分析アプリ

[English](./README.md) | [한국어](./README.ko.md) | [日本語]

---

FocusDoは、タスク管理と集中セッションの追跡を組み合わせた生産性向上Webアプリケーションです。

集中セッションは、`focus_sessions`テーブルに生のイベントデータとして保存されます。

集計されたメトリクスを保存する代わりに、以下のハイブリッドアプローチで分析を計算します：

- APIレイヤーでの部分集計 (日次グルーピング)
- クライアントでの最終集計 (ダッシュボードおよび履歴ロジック)
- 可視化のためのデータ整形 (欠損日の補完、D3フォーマットへの変換)

セッションデータはReact Queryを使用してSupabaseから取得され、クライアント側で集計して生産性に関するインサイトを生成します。

ダッシュボードのメトリクスは以下の両方から導出されます：

- ToDoの状態 (完了率)
- 集中セッションデータ (総集中時間)

システムは階層型クライアントアーキテクチャに従い、ページがUI構成を調整し、フック（Hooks）がドメインロジックをカプセル化し、機能モジュールがインタラクティブなUIコンポーネントを実装します。

---

## 🔗 ライブデモ

focus-based-todo.vercel.app

---

## ✨ 主な機能

- ⏱️ Focus Timer (25分 / 50分 / カスタム)
- 📝 Todo 管理
- 📊 デイリー生産性ダッシュボード
- 📈 週間集中時間分析
- 🗂️ Focus Session 履歴
- 📉 D3によるデータ可視化
- ⚡ React Queryによるデータキャッシュ
- ♾️ 無限スクロール (カーソルベースのページネーション)
- ⚡ 楽観的UIアップデート (Optimistic UI)

---

## 🗂️ ページ構成

## Today Page

メインの生産性ページです。

ユーザーは以下の操作ができます。

- 週次カレンダーの表示
- 日次のToDo管理
- 集中セッションの開始
- 日次の生産性メトリクスの確認

ダッシュボードの要約：

- 総集中時間
- ToDo完了率
- 完了したタスク数
  過去および未来の日付は読み取り専用モードで表示されます。

---

## Focus Page

選択したToDoに対して集中タイマーを実行します。

タイマーが完了するか、ユーザーが途中で停止すると確認モーダルが表示されます。

確認後、以下のデータがデータベースに保存されます：

- `user_id`, `todo_id`, `start_time`, `end_time`, `duration`

---

## Focus History Page

集中履歴を表示するページです。

- 週次トレンド → ラインチャート
- 集中時間 → バーチャート
- 日次サマリー → カード形式

---

## 🛠️ 技術スタック

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

## 📊 アーキテクチャの概要

このアプリケーションは、**関心の分離**が明確な**階層型アーキテクチャ**を採用しています。

以下のシステムフローは、構造的なデータパイプライン(Structural Data Pipeline)を説明したものです。

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

## 🏗 アーキテクチャ原則

### ページ単位のオーケストレーション

ページはUI構成を調整しますが、ドメインロジックは避けます。

---

### ドメインロジックの分離

ビジネスロジックはフックと機能モジュールに位置します。

---

### UI状態の明示的なモデリング

- loading
- empty
- read-only
- error

---

### ハイブリッド集計戦略

- APIレイヤー → 部分集計 (API関数内でのクライアント側reduceによる日次グルーピング)
- クライアント → 最終計算 (完了率、集中時間メトリクス)

---

## 🔄 データフロー

以下は、ユーザー駆動のインタラクションフローを説明しています：

```
[ユーザー操作]

1. Todo 操作
   → useMutation (React Query)
   → Supabase (insert/update/delete)
   → クエリ無効化 & 楽観的更新

2. Focus 開始 (Focus Page)
   → useTimer (クライアント状態)

3. Focus 完了
   → createFocusSession (mutation)
   → Supabase insert

4. データ取得
   → useQuery / useInfiniteQuery
   → Supabase fetch

5. クライアント集計
   → getDailyAggregation / getAllDailyAggregation (API層 — 生データ取得)
   → client-side reduce（日付ごとにdurationを集計）
   → useWeeklyFocusAggregation / useAllFocusAggregation (React Queryラップ)
   → useDayDashboard / useHistoryDashboard（統計計算）
   → chart-utils.ts（欠損日補完 & D3用データ整形）

6. UI レンダリング
   → Dashboard / Charts (D3)
```

---

## 🧩 Analytics構造

分析データは、生のセッション記録からクライアント側で計算されます。

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

## 📂 プロジェクト構造

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

## 🧠 デザイン上の判断

### 読み取り専用の日付モデル

過去および未来の日付は編集できません。ユーザーは当日のみToDoを修正できます。

これは、`TodayPage`の`readOnlyVariant`フラグと`TodoItems`の`isReadOnly`フラグを通じて強制されます。

---

### 楽観的アップデート

`useUpdateTodo`と`useDeleteTodo`は、サーバーが応答する直前にReact Queryキャッシュを即座に更新します。

エラー時には、`onMutate` / `onError` ロールバックパターンを通じて以前のキャッシュ状態が復元されます。

これにより、ネットワークの往復を待たずにUIの応答性を維持します。

---

### ウォールクロックタイマー

`useTimer`は、各インターバルティックごとにカウンターを減らすのではなく、`Date.now()`のスナップショットから経過時間を計算します。

これにより、タブの切り替え、デバイスのスリープ、または一時停止中のタイマードリフトを防ぎます。

---

### セッション管理

`SessionProvider`はSupabase Authの状態変更をリッスンし、セッションをZustandに書き込みます。

初期セッションチェックが完了するまで`GlobalLoader`が表示され、認証状態が解決される前のレンダリングを防止します。

---

### ステートレス日付ナビゲーション

`useWeekNavigation`は、内部状態を持たず`currentDate`プロップからすべての記日付値を導出し、

ナビゲーションロジックをUIから分離した状態に保ちます。

---

### クライアントサイド分析

分析はデータベースビューを使用するのではなく、クライアント上の生のレコードから計算されます。

これによりバックエンドを簡素化できますが、柔軟性と引き換えにスケーラビリティが一部犠牲になります。

---

## ⚖️ トレードオフ

- 事前に計算されたデータベース集計の代わりにクライアントサイド集計を採用
- `FocusHistoryPage`はサーバーサイドのページネーションを行わず、すべてのToDoと集中記録を一度に取得 — 個人ユーザーには実用的だが、大規模なデータボリュームには不向き
- 2つのページネーション戦略（Todayのカーソルベース、Historyのクライアントサイドスライシング）は、データアクセスパターンに基づいて意도的に異なっている
- モバイルUXの最適化が限定的
- ユーザーがセッションの途中でタブを閉じた場合、集中セッションの復旧は不可

---

## 🚀 起動方法

```bash
npm install
npm run dev
```

---

## 📈 今後の改善予定

- 大規模データセットのためのリスト仮想化
- 拡張された生産性分析機能
- モバイルエクスペリエンスの向上
- ダークモードへの対応
- データベースビューベースの集計導入
- インデックスによるクエリパフォーマンスの最適化
- タイマーセッションの復旧機能

---

## 📄 ライセンス

MIT
