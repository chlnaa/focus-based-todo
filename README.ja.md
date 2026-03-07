# 📝 Focusdo App — 集中タイマー & 生産性分析アプリ

[English](./README.md) | [한국어](./README.ko.md) | [日本語]

---

FocusDo はタスク管理と集中セッション記録を組み合わせた生産性アプリケーションです。

集中時間は `focus_sessions` テーブルにセッション単位の raw データとして保存されます。
統計データは別途保存せず、セッションデータから動的に計算されます。

セッションデータは Supabase から取得され、React Query フックによってクライアント側で aggregation が実行されます。
その後 Todo データと結合され、D3 チャートで可視化されます。

この構造により dual write を防ぎ、データ取得・分析・可視化のレイヤーを分離しています。

---

## ✨ 主な機能

- ⏱️ 集中タイマー
- 📝 Todo 管理
- 📊 デイリー生産性ダッシュボード
- 📈 週間集中時間分析
- 🗂️ 集中記録ヒストリー
- 📉 D3によるデータ可視化
- ⚡ React Queryによるデータキャッシュ

---

## 🗂️ ページ構成

- **Today Page**  
  日々のTodoを追加・編集・管理するメインページです。  
  ダッシュボードによるサマリー表示を含みます。

- **Focus Page**  
  選択したTodoに対して集中セッションを実行する専用ページです。

- **Focus History Page**  
  週間単位の集中記録はチャートで可視化し、  
  日別の記録は日付ごとのサマリーカードとして表示し、選択するとモーダルで詳細を確認できます。

---

## 🛠️ 技術スタック

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

## 📊 アーキテクチャ設計

本アプリケーションはデータ取得・分析計算・可視化レイヤーに分離された構造です。

集中時間はセッションデータとして保存され、統計データは動的に計算されます。

---

## 🏗 アーキテクチャ原則

- **ページ単位のオーケストレーション**  
  ページコンポーネントはドメインロジックを直接持たず、  
  ストアやカスタムフックを組み合わせてUIフローを制御します。

- **ドメインロジックの分離**  
  Todoおよび集中時間に関するビジネスロジックは  
  storeとcustom hook内に分離されています。

- **UI状態の明示的なモデリング**  
  Loading、Empty、Read-only、Error状態を意図的に分けて扱います。

- **過度な最適化を行わない方針**  
  仮想化や無限スクロールは、
  実際の利用パターンが確認でき次第導入予定です。

---

## 🔄 データフロー

```
TodayページでTodo作成
        ↓
FocusページでTimer実行
        ↓
Focus Session保存
        ↓
Supabase Database (focus_sessions)
        ↓
React Query Data Hooks
(useDailyAggregation)
        ↓
Client Aggregation
        ↓
Analytics Hooks
(useHistoryDashboard)
        ↓
Visualization Layer
(D3 Charts + Dashboard UI)
```

---

## 🧩 Analytics構造

分析システムは三つのレイヤーで構成されています。

Data Fetch Layer

- `useDailyAggregation`
- Supabaseからセッションデータを取得し日別集中時間を計算

Analytics Layer

- `useHistoryDashboard`
- 集中時間データとTodo完了データを統合

Visualization Layer

- `FocusTrendChart`
- `FocusTimeBarChart`
- `DayHistoryCard`

チャートは D3.js で実装されています。

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

ドメインロジックとUIコンポーネントを分離し、拡張性と保守性を考慮した構造です。

---

## 🧠 デザイン上の判断

- 読み取り専用の日付は明示的なUI状態として扱い、
  誤解を招く操作を防止しています。
- Empty状態は、現在の日付コンテキストにおける
  操作可否を反映して表示されます。
- 日付ナビゲーションはステートレスに保ち、
  ページ間の隠れた依存を避けています。

---

## ⚖️ トレードオフ

- データは現在メモリ上で管理されています。
- 集中履歴の可視化は、大規模データでの性能より
  可読性と明確さを優先しています。
- モバイルUXは基本的な対応は行っていますが、
  極小画面向けの最適化は今後の改善対象です。

---

## 🚀 起動方法

```bash
npm install
npm run dev
```

---

## 📈 今後の改善予定

- リストの仮想化または無限スクロール
- ~~永続ストレージまたはバックエンド同期~~
- 集中データの高度な分析
- モバイルUXのさらなる改善
- ダークモード
- DB View ベース aggregation
- DB インデックス最適化
- タイマーセッション復元

---

## 🔗 ライブデモ

focus-based-todo.vercel.app

---

## 📄 ライセンス

MIT
