# 概要
`HTML`,`CSS`,`JavaScript`を設定ファイルをもとに読み込んでWebページに表示するモジュールです。複数のHTMLファイルに埋め込む際に一か所編集するだけで更新が可能なため便利です。JavaScriptを有効にする必要があります。

# 使い方
設定ファイルを表示するファイルに記述します。

```html
<head>
    <script src="{PresetJSのパス}"></script>
    <script src="{設定ファイルのパス}"></script>
</head>
````

## 設定ファイル
```js
PresetJs.HtmlLoad([
    ["id","LoadFilePass"]
]);

PresetJs.CssLoad([
    "LoadFilePass"
]);

PresetJs.JsLoad([
    "LoadFilePass"
]);
```
*相対パスの場合、設定ファイルから見た位置を指定してください。

## 対応記法
```
// 絶対パス
/assets/js/example.js

// 相対パス
./assets/js/example.js
../assets/js/example.js

// 外部リンク
http://example.com
https://example.com

// 外部リンク
//example.com

```
*`example.js`や`assets/example.js`などの表現方法は意図して対応させていません。

## 挿入位置
HTML: idを指定した要素の中
CSS: `<meta>`タグ下部
JavaScript: `<body>`タグ下部

# 更新履歴

## Ver0.0.1 / 暫定完成版
Release: 2022/12/11
とりあえず全部動く(はず)

Future:
- コードを整理
- テストを作る

<!--
開発メモ:

- Ver0.0.1 -
load.jsの位置はScriptに記述されているsrc情報を取得して位置を取得する。
あとはそれが相対パスだとかでまずload.jsの位置を出した後にそこを起点に読み込み設定されてるファイルの位置を出して絶対パスを見つける。

DOM読み込み中に実行するから設定されたパスを読み取れるっていう強引な技。
whileとforではforのほうが早いらしいのでforを使っていくことにしよう。
無茶苦茶なパスも一応対応できるように。

これ実行順番をJSからにしたら階層読み込みがうまくいかなさそう。後でやろう。
あと一応DOM読み終わってから処理させるようにしたい。

- - 

# Version

Ver0.0.1 2022/12/11 - 3h25min
-->