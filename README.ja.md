# 📝 Focusdo App — 集中タイマー & 生産性分析アプリ

[English](./README.md) | [한국어](./README.ko.md) | [日本語]

---

FocusDoは、タスク管理とフォーカスセッションの追跡を組み合わせた生産性向上Webアプリケーションです。
フォーカスセッションは、`focus_sessions`テーブルに生のイベントデータ（Raw data）として保存されます。集計された指標を保存する代わりに、セッション記録から動的に分析データを導き出します。
セッションデータはReact Queryを使用してSupabaseから取得され、日次の統計や生産性に関するインサイトを生成するためにクライアント側で集計されます。
ToDo統計とフォーカスセッションデータは、ダッシュボードおよび履歴の可視化（Visualization）の基盤となります。
システムは、ページ（Page）がUI構成を調整し、フック（Hooks）がドメインロジックをカプセル化し、機能（Feature）モジュールがインタラク티브なUIコンポーネントを実装する階層型クライアントアーキテクチャに従います。
このアーキテクチャは、データ保存、分析計算、および可視化を分離することで、フォーカス追跡ドメインをシンプルに保ちます。

---

## 🔗 ライブデモ

focus-based-todo.vercel.app

---

## ✨ 主な機能

- ⏱️ Focus Timer
- 📝 Todo 管理
- 📊 デイリー生産性ダッシュボード
- 📈 週間集中時間分析
- 🗂️ Focus Session 履歴
- 📉 D3によるデータ可視化
- ⚡ React Queryによるデータキャッシュ

---

## 🗂️ ページ構成

## Today Page

メインの生産性ページです。
ユーザーは以下の操作ができます。

- 週間カレンダーの確認
- 今日のTodo管理
- 集中セッション開始
- 今日の生産性指標の確認

---

## Focus Page

選択したTodoに対して集中タイマーを実行します。
タイマー終了後、次の情報がデータベースに保存されます。

- `user_id`
- `todo_id`
- `duration`
- `start_time`

---

## Focus History Page

集中履歴を表示するページです。

- 週間の集中トレンドはチャートで表示
- 日別の記録はカード形式で表示
- 詳細はモーダルで確認可能

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

- Supabase (PostgreSQL)

### Visualization

- D3.js

### Styling

- Tailwind CSS
- shadcn/ui

### Date Handling

- Day.js

---

## 📊 アーキテクチャの概要

アプリケーションは、UIレンダリング、ドメインロジック、およびサーバー状態（Server State）を分離しています。
次の図は、アプリケーションで使用される単方向データフローとクライアント側の集計パイプライン（Aggregation Pipeline）を示しています。

![architecture-diagram-img](./public/images/architecture-diagram.png)

PageはアプリケーションのフローとUI構成を制御する役割を担い、ドメインロジックは再利用可能なhooksにカプセル化しました。
Featureモジュールは、これらのhooksを組み合わせてユーザーインタラクションを実装するUIコンポーネントを担当します。

---

## 🏗 アーキテクチャ原則

### ページ単位のオーケストレーション

ページコンポーネントはUI構成を制御（調整）しますが、ドメインロジックを直接実装することは避けます。
代わりに、振る舞いをカプセル化するフック（Hooks）やストア（Stores）を組み合わせて構成します。

---

### ドメインロジックの分離

ToDo操作、フォーカス追跡、および分析ロジックは、ページコンポーネントではなく、フックや機能（Feature）モジュールに実装されます。
これにより、メンテナンス性とテスト可能性が向上します。

---

### UI状態の明示的なモデリング

UIは、以下の重要な状態を明示的にモデリングします：

- loading
- empty
- read-only
- error

これらの状態は、専用のUIコンポーネントによって表現されます。

---

### 過度な最適化を行わない方針

仮想化（Virtualization）やページネーション（Pagination）などの複雑な最適化は、実際の使用パターンで必要とされるまで意図的に後回しにします。

---

## 🔄 データフロー

```
TodayページでTodo作成
        ↓
Focus Timer (Focus Page)
        ↓
Focus Session完了
        ↓
Focus Session保存
        ↓
Supabase Database (focus_sessions)
        ↓
React Query Hooks
        ↓
Client-side Aggregation
        ↓
Dashboard / Analytics Hooks
        ↓
Visualization Components
```

---

## 🧩 Analytics構造

分析データは、生のセッション記録からクライアント側で計算されます。

### Data Fetch Layer

- `useDailyAggregation`
- Supabaseからセッションデータを取得し日別集中時間を計算

フォーカスセッションの記録を取得し、合計時間を算出します。

---

### Analytics Layer

- `useHistoryDashboard`
- 集中時間データとTodo完了データを統合

フォーカス統計とToDo完了指標を組み合わせ、ダッシュボード用のデータを生成します。

---

### Visualization Layer

- `FocusTrendChart`
- `FocusTimeBarChart`
- `DayHistoryCard`

これらのコンポーネントは、集計されたデータをチャートやサマリーカードとして表示します。

---

## 📂 プロジェクト構造

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

この構造は、UI、ドメインロジック、およびデータアクセス層を分離しています。
システムのモジュール化と拡張性を維持するため、ドメインロジックはUIコンポーネントから分離されています。

---

## 🧠 デザイン上の判断

### 読み取り専用の日付モデル

誤解を招くインタラクションを防ぐため、過去および未来の日付は読み取り専用として扱われます。
ユーザーは当日（今日）のToDoのみを変更できます。

---

### 明示的な空の状態 (Empty States)

現在のコンテキストでユーザーが操作可能かどうかを伝えるため、空の状態（Empty states）を意図的にモデリングしています。

---

### ステートレスな日付ナビゲーション

ページ間の隠れた結合を避けるため、カレンダーのナビゲーションロジックはステートレスなユーティリティとして実装されています。

---

## ⚖️ トレードオフ

- データベースビューを使用する代わりに、クライアント側で分析データを計算します。
- フォーカス履歴の可視化は、拡張性よりも明快さを優先しています。
- モバイルUXは機能していますが、小さな画面に対して完全には最適化されていません。

---

## 🚀 起動方法

```bash
npm install
npm run dev
```

---

## 📈 今後の改善予定

- 大規模データセットのためのリスト仮想化（Virtualization）
- 拡張された生産性分析機能
- モバイルエクスペリエンスの向上
- ダークモードへの対応
- データベースビューベースの集計導入
- インデックスによるクエリパフォーマンスの最適化
- タイマーセッションの復旧機能

---

## 📄 ライセンス

MIT
