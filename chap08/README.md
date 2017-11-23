# Chap 08. 專案結構與建置工具

> Node.js 與 npm  
> 安裝與使用 Node.js  
> 使用 npm 安裝第三方模組  
> Semantic UI 是什麼?  
> Webpack 2 與 ES7 的基本環境建置  
> koa2 的基本操作

這裡以專案開發形式來使用 React ! 這裡使用同樣由 JavaScript 所構成的應用程式框架 Node.js 與套件管理工具 npm 來帶大家建構一套 JS 的基本專案。

## Node.js 與 npm

Node.js 一套開源的 Application Framework，從 v7.6 版本後，Node.js 已全面支援 ES7 的撰寫方式，所以開發者不須再透過複雜的編譯套件 (Babel) 包裝，即可在後端大膽地使用 Async / Await 的方式來處理許多非同步 function，這對開發者而言真是一大福音。

另外 Node.js 最讓人感到高興的就是擁有數不盡的第三方模組 (Third-party Module) 可以使用，無論是什麼樣的應用與工具，例如資料庫、Web、硬體控制、嵌入式應用、各類網路通訊協定等等，只要是你需要的，這裡幾乎都能找到相應的現成方案，而這些解決方案只需要透過 npm 就能輕鬆地套用在我們專案中作使用，現在就來開始安裝 Node.js 吧!

## 安裝與使用 Node.js

Node.js 支援多平台：Windows、Linux 或是 Mac 的作業系統。

基本上都官網下載來安裝即可，如果是使用 Mac 的 homebrew 的愛用者，可在 terminal 中輸入：

```sh
$ brew install node
```

homebrew 就會為你安裝最新的 Node.js 囉!

## 使用 npm 安裝第三方模組

從 Node.js v0.6 之後，npm 就已經內建在 Node.js 裡面，想搜尋有哪些模組可使用，可直接至 npm 官方網站(www.npmjs.com/)尋找你需要的模組。

安裝模組：

```sh
$ npm install react
```

下完指令，npm 就會將已下載的模組放置在專案目錄裡的「node_modules」裏頭，當 JS 程式想要使用該模組，就可直接引入使用了：

```javascript
var React = require('react');
```

ES6、ES7：

```javascript
import React from 'react';
```

如果是在 HTML 檔案裏頭引用的話，則需要指定相對位置的路徑來引入使用，撰寫方式如下：

```html
<script src="./node_modules/react/dist/react.js"></script>
```

使用 npm 來管理模組還有一個好處，尤其當你的專案用到不止一兩個模組的時候，如果是用網路下載檔案的方式來引用的話，遇到更新還得一個個個別下載，npm 只需要一條指令：

```sh
npm update
```

也可用 npm 檢查哪些模組需要更新：

```sh
npm outdated
```

現在來用 npm 引入模組的方式來撰寫一支 Hello World 的程式吧!

### 初始化專案

專案一開始 npm 會需要設定資訊，如不想輸入任何資訊，方法如下：

```sh
npm init -y
```

初始化的 package.json：

```json
{
  "name": "hello-wprld",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### 安裝模組

當我們在專案底下進行安裝，通常會加上 --save 或 -S，如此一來 npm 就會在 package.json 記錄你安裝過的模組和期版本資訊，專案打包也不需要把這些模組一起包進去，當別人要使用你的專案時，只要透過 npm 安裝指令來直接安裝需要的模組就可以了，專案也會簡潔許多。

這裡安裝執行 React 需要的基本模組：

```sh
npm i react react-dom babel-standalone -S
```

回到 package.json，你會發現多出了這些資訊

```javascript
"dependencies": {
  "babel-standalone": "^6.26.0",
  "react": "^16.1.1",
  "react-dom": "^16.1.1"
}
```

這表示模組已被安裝至 node_modules 資料夾裡面囉!

### 在 HTML 頁面引入模組使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Hello World</title>
</head>

<body>
  <div id="app"></div>
  <script src="./node_modules/react/dist/react.js"></script>
  <script src="./node_modules/react-dom/dist/react-dom.js"></script>
  <script src="./node_modules/babel-core/browser.js"></script>
  <script type="text/babel">
    ReactDOM.render(
      <h1>Hello World</h1>, 
      document.getElementById('app')
    );
  </script>
</body>

</html>
```

這樣就大功告成囉!

如果你覺得全部寫在一個檔案裏面有點擁擠，我們也可將 React 程式碼抽出：

```
- js
  - index.js
- view
  - index.html
```

js/index.js

```javascript
ReactDOM.render(
  <h1> Hello World </h1>, 
  document.getElementById('app')
);
```

view/index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Hello World</title>
</head>

<body>
  <div id="app"></div>
  <script src="../node_modules/react/dist/react.js"></script>
  <script src="../node_modules/react-dom/dist/react-dom.js"></script>
  <script src="../node_modules/babel-core/browser.js"></script>
  <script type="text/babel" src="../js/index.js"></script>
</body>

</html>
```

## Semantic UI 是什麼

Semantic UI (semantic-ui.com/) 是一套開放原始碼的網頁前端模板，相較於 Bootstrap 來說，Semantic UI 比較少人認識，使用 Semantic UI 有以下幾個優點：

- 樣式多元
- 詳細介紹多種主流前端框架的引用方式
- 具備多種動畫效果可供自由搭配
- 多樣的版面配置方式：Grid System、Rail、Sticky
- 提供多種 CSS Class，支援 RWD 多種需求：mobile only row、tablet reversed 等

