# 5.2.4 React Form Dynamic Input

ReactのControlledコンポーネントを使用して、入力欄を動的に追加できるフォームを実装する練習アプリです。

「追加」ボタンをクリックすると新しい入力欄が追加され、各入力欄の値を文字列配列として管理します。

---

## 目次

* [1. 概要](#1-概要)
* [2. 学習内容](#2-学習内容)
* [3. 要件](#3-要件)
* [4. ファイル構成](#4-ファイル構成)
* [5. 実装内容](#5-実装内容)

  * [5.1 入力値のState管理](#51-入力値のstate管理)
  * [5.2 入力欄の追加](#52-入力欄の追加)
  * [5.3 入力値の変更](#53-入力値の変更)
  * [5.4 mapによる入力欄の生成](#54-mapによる入力欄の生成)
  * [5.5 配列をコピーする理由](#55-配列をコピーする理由)
* [6. 動作イメージ](#6-動作イメージ)
* [7. 活用例](#7-活用例)
* [8. 起動方法](#8-起動方法)

---

## 1. 概要

ReactのControlledコンポーネントを使用して、ユーザーの操作によって入力欄を動的に追加できるフォームを作成します。

入力された値は文字列配列として管理し、各入力欄の値をリアルタイムで更新します。

---

## 2. 学習内容

このアプリでは、以下の内容を学習します。

* Controlledコンポーネント
* `useState`
* 文字列配列のState管理
* `map()`
* `index`
* 配列のコピー
* 配列の特定要素の更新
* 動的な入力フォーム
* カスタムフック
* Tailwind CSS

---

## 3. 要件

以下の条件で実装します。

* `useState`で文字列配列を管理する
* 「追加」ボタンで入力欄を追加する
* 各入力欄をControlledコンポーネントとして管理する
* 各入力欄を独立して更新できるようにする
* 入力内容を配列としてリアルタイムに管理する
* Tailwind CSSで各入力欄に以下のクラスを指定する

```text
border p-2 mb-2
```

---

## 4. ファイル構成

```text
src/
├── hooks/
│   └── useDynamicInputForm.ts
├── Pages/
│   └── DynamicInput.tsx
├── App.tsx
├── index.css
└── main.tsx
```

### ファイルの役割

| ファイル                     | 役割                 |
| ------------------------ | ------------------ |
| `useDynamicInputForm.ts` | 入力値のStateと操作処理を管理  |
| `DynamicInput.tsx`       | 入力欄と追加ボタンを表示       |
| `App.tsx`                | アプリ全体の構成           |
| `index.css`              | Tailwind CSSの読み込み  |
| `main.tsx`               | Reactアプリのエントリーポイント |

---

## 5. 実装内容

### 5.1 入力値のState管理

文字列配列をStateとして管理します。

```ts
const [inputs, setInputs] = useState<string[]>([""]);
```

初期状態では、空の入力欄を1つ用意します。

```ts
[""]
```

入力を追加すると、

```ts
["React", "TypeScript", "Next.js"]
```

のように配列で管理されます。

---

### 5.2 入力欄の追加

「追加」ボタンをクリックしたときに、新しい空の要素を配列へ追加します。

```ts
const handleInput = () => {
  setInputs([...inputs, ""]);
};
```

例えば、

```ts
["React"]
```

の状態で追加すると、

```ts
["React", ""]
```

になります。

さらに追加すると、

```ts
["React", "", ""]
```

となります。

---

### 5.3 入力値の変更

各入力欄の値を変更するために、配列のインデックスを使用します。

```ts
const handleChangeInput = (
  index: number,
  value: string,
) => {
  const newInputs = [...inputs];

  newInputs[index] = value;

  setInputs(newInputs);
};
```

例えば、

```ts
["React", "TypeScript", "Next.js"]
```

の2番目の入力欄を変更すると、

```ts
["React", "JavaScript", "Next.js"]
```

のように特定の要素だけを更新できます。

---

### 5.4 mapによる入力欄の生成

配列の要素から入力欄を動的に生成します。

```tsx
{inputs.map((input, index) => (
  <input
    key={index}
    type="text"
    value={input}
    onChange={(event) =>
      handleChangeInput(index, event.target.value)
    }
    className="border p-2 mb-2"
  />
))}
```

`map()`の引数は、

```tsx
inputs.map((input, index) => ...)
```

の順番で指定します。

```text
input → 配列の要素
index → 配列の位置
```

例えば、

```ts
["React", "TypeScript", "Next.js"]
```

の場合、

```text
input = "React"      index = 0
input = "TypeScript" index = 1
input = "Next.js"    index = 2
```

となります。

---

### 5.5 配列をコピーする理由

Stateの配列を直接変更せず、新しい配列を作成してから更新します。

```ts
const newInputs = [...inputs];

newInputs[index] = value;

setInputs(newInputs);
```

`...inputs`によって既存の配列をコピーしています。

```text
inputs
  ↓
[...inputs]
  ↓
新しい配列を作成
  ↓
指定した要素を変更
  ↓
setInputs()
```

例えば、

```ts
const inputs = ["React", "TypeScript", "Next.js"];

const newInputs = [...inputs];

newInputs[1] = "JavaScript";
```

とすると、

```ts
inputs
// ["React", "TypeScript", "Next.js"]

newInputs
// ["React", "JavaScript", "Next.js"]
```

となります。

元の配列を直接変更せず、新しい配列をStateに設定することがポイントです。

---

## 6. 動作イメージ

初期状態：

```text
入力欄1 [                    ]

[追加]
```

「追加」をクリックすると、

```text
入力欄1 [React              ]
入力欄2 [                    ]

[追加]
```

さらに追加すると、

```text
入力欄1 [React              ]
入力欄2 [TypeScript         ]
入力欄3 [                    ]

[追加]
```

Stateでは、

```ts
[
  "React",
  "TypeScript",
  "",
]
```

のように管理されます。

---

## 7. 活用例

動的入力フォームは、入力する項目数が最初から決まっていない場合に利用できます。

例えば、

* タグの追加
* レシピの材料追加
* ToDoの追加
* 電話番号の追加
* メールアドレスの追加
* 複数のキーワード入力

などに応用できます。

また、今回学習した文字列配列のState管理は、複数のタグを選択するフォームなどにも応用できます。

---

## 8. 起動方法

### パッケージのインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

表示されたURLにアクセスして、動作を確認します。
