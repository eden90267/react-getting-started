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
- 提供多種 CSS Class，支援 RWD 多種需求：mobile only row、tablet reversed (在平板顯示時更動區塊順序) 等

Semantic UI 有兩種安裝方式：CDN 與 npm

### 使用 CDN 安裝 Semantic UI

安裝 Semantic UI 最簡單方式就是直接使用 CDN：

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css" />
```

這裡以按鈕為例：

```html
<button class="ui button">
  Follow
</button>
```

改寫成 React 方式：

```js
ReactDOM.render(
  <button className="ui button">
    Button
  </button>,
  document.getElementById('app')
);
```

如果你想提升使用者體驗，我們也可以使用一點簡單的動畫效果：

```javascript
<div className="ui animated button" tabIndex="0">
  <div className="visible content">Next</div>
  <div className="hidden content">
    <i className="right arrow icon"></i>
  </div>
</div>
```

我們甚至可以用 Semantic UI 提供的動畫效果，所有動畫效果我們都可以在官網上面的 transition 這個章節裡面找到!

不過在開始撰寫動畫前，先載入 Semantic UI 的 JS 檔案：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.js"></script>
```

Semantic UI v2.2.9 的 JS 對應 jQuery 版本為 v3.1.1。現在開始來我們第二個動畫效果：

```javascript
function App() {
  function handleClick() {
    $('.elliot').transition('jiggle');
  }
  return (
    <img src="./elliot.jpg" className="ui medium image elliot" onClick={handleClick}/>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
```

現在只要用滑鼠去戳戳圖片，他就會動給你看！

### 使用 npm 安裝 Semantic UI

在使用之前 npm 安裝 Semantic UI 前，先安裝一個流程管理工具 Gulp (全域安裝)：

```shell
npm i gulp -g
```

再來是安裝 semantic-ui：

```shell
npm i semantic-ui
```

接著依照安裝程式的步驟指示就可以順利完成安裝。

1. 選擇安裝方式
2. 確認專案位置
3. 確認安裝位置

安裝完後，你會發現專案底下多一個 semantic 的資料夾，接著我們進入資料夾，下一個 gulp 的指令：

```shell
cd semantic
gulp build
```

Gulp 就會把相關套件包好放在 semantic 資料夾裡面的 dist 裡面囉！接下來只要在網頁裡面載入就可以使用了：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Document</title>
  <link rel="stylesheet" href="semantic/dist/semantic.min.css" />
</head>
<body>
  
  <script src="semantic/dist/semantic.min.js"></script>
</body>
</html>
```

如果你想要更換某些樣式的話，只要進 semantic 資料夾的 src 裏頭找到 theme.config 的檔案，再來只要找到模組進行風格更換就行囉！

這裡以 Button 為例，把 default 改成 round (所有可用樣式都可以在官網上面找到)：

```
/* Elements */
@button     : 'round';
```

接著重新用 Gulp 打包一次，就會發現按鈕的樣式已經被換掉了。

## Webpack 2 與 ES7 的基本環境建置

JavaScript 最方便的應用之一，就是能將所有相關的程式模組化，尤其在日益複雜的前端開發中，我們開始需要一些方便打包，或管理流程的工具來整理 LESS、SASS、JSON、JPEG、PNG、ES7 這些琳琅滿目的開發資源與模組。解決這些模組相依性與流程等問題，如果還是使用一般手動方式解決，往往會造成開發效率的嚴重低落；因此，開始有一些相應的解決方案產生，管理流程如：Grunt or Gulp，近期也有像 Browserify、Webpack 等優秀的模組化工具出現，大大的幫開發者們解決了開發上的各種問題。

### 建置 Webpack 的撰寫環境

就整體而言 Webpack 具有 Grunt 和 Gulp 的自動化建構靜態資源的能力，進一步的，Webpack 也彌補了 requireJS 在模組化方面的缺陷，而且也兼容 AMD 與 CMD 載入模組的規範，可說是一套功能相當完整而且強大的一套工具。接著開始用 webpack 來打造 React 的開發環境吧！

先採用 npm 做全域安裝：

```shell
npm i webpack -g
```

想確認安裝版本，可透過 list 指令執行：

```shell
npm list webpack -g
```

現在我們來開始規劃專案：

```
- src
  - images
  - js
- view
```

現在就來用 Webpack 打包我們第一個 JavaScript 檔案吧！

1. 專案根目錄開一個 webpack.config.js 檔案
2. 在 webpack.config.js 裡面，指定要打包的檔案，以及輸出到哪裡

  ```javascript
  var path = require('path');
  
  module.exports = {
    entry: './src/js/firstApp.js',
    output: {
      filename: 'bundle.js',
      publicPath: '/assets/',
      path: path.join(__dirname, 'public', 'assets')
    }
  };
  ````

  - entry：指定我們撰寫的原始檔，也是需要透過 Webpack 打包的 JS 檔案
  - output：可用 Object 的形式撰寫
    - filename：用來命名原始檔打包之後所產生的 JS 檔案
    - publicPath：webpack 使用 require 時參考的路徑
    - path：設定檔案建置的路徑位置

3. src/js/firstApp.js：

  ```javascript
  var name = 'Leon';
  document.getElementById('app').innerHTML = '<h1>Hello World !! by ' + name + '</h1>';
  ```

4. view/index.html：

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>React Started</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="../public/assets/bundle.js"></script>
  </body>
  </html>
  ```

這裡將 JavaScript 的檔案路徑指向 Webpack 打包後所產生的檔案，再來到有 webpack.config.js 檔案的目錄下執行一道指令：

```shell
webpack
```

你就會發現，根目錄底下多了一個 public 資料夾，裡面就是打包後所產生的 bundle.js。現在可以嘗試執行結果！

另外介紹一下 webpack 幾個常用的啟動方式：

- webpack：一次性建置
- webpack -p：會建置一次壓縮過的檔案
- webpack -w：會在原始檔更動時，因應變換而持續更新建置

接下來，讓我們開始運用 Webpack 來建置 React 的開發環境吧！

1. 先將 React、React-dom 和 create-react-class 安裝起來：

  ```shell
  npm i react react-dom create-react-class -S
  ```

2. 設定 React 開發環境

  在這個步驟，我們會使用 Babel 來建置 React 的開發環境；Babel 是一套 JavaScript 的編譯器，無論是 ES6、ES7、React 等各種 JavaScript 的撰寫方式與功能，我們都能夠透過 Babel 進行編譯，轉換成各類的瀏覽器都可以執行的 JavaScript 程式碼。本節使用的是目前最新釋出的 Babel 7。

  由於 Babel 可用資源相當多，這裡就以建置 React 的基本開發環境為主，挑選出幾項常會用到的套件：

  - babel-loader：讓 Webpack 打包套件的時候，同時進行 babel 轉換的工具
  - babel-core：在原始檔案裡面使用 Babel 的 API 進行程式編譯
  - babel-cli：指定 Babel 資源的調用路徑
  - babel-preset：Babel 的編譯功能來源，如 es2015、es2016、react、env、stage 等等，以 babel-preset-react 來說，將是讓 js 檔案可以直接使用 React 的語法
  - babel-polyfill：這個功能對前端開發相當重要，因為它可以將很多語法轉譯成各個瀏覽器都可以執行的程式

  安裝 babel 套件：

  ```shell
  npm i babel-core babel-loader babel-cli babel-preset-react -S
  ```

  接著我們在專案裡頭再一次的安裝 Webpack，這樣 babel-cli 在編譯 react 的時候，路徑才不會跑到 global 去

  ```shell
  npm i webpack -S
  ```

  接著對 webpack.config.js 裏頭檔案稍作修改。

  首先是 entry 的部分，我們在 entry 的上方加一段 context，設定原始路徑：

  ```javascript
  context: path.join(__dirname, 'src', 'js'),
  entry: './appES5.jsx',
  ````

  再來就是 module 的部分加進來：

  ```javascript
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        enforce: 'pre',
        options: {
          presets: ['react']
        }
      }
    ]
  }
  ```

  test 裡描述的是可轉譯的檔案類型，敘述則是採用正規表達式，留意一下 presets 的部分，裡面的 react 就是我們剛剛安裝的 babel-preset-react，因此這邊的設定就是描述 js 或是 jsx 的檔案，可以使用 React 語法來撰寫。

3. 開一個 src/js/appES5.jsx，可以開始撰寫 React 元件了：

  ```javascript
  import createReactClass from 'create-react-class';
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  var App = createReactClass({
    render: function () {
      return (
        <div className="ui buttons">
          <button className="ui button active">Cancel</button>
          <div className="or"></div>
          <button className="ui positive button">Save</button>
        </div>
      )
    }
  });
  
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
  ```

4. CDN 方式加進 Semantic UI

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css"/>
  ```

這就是用 Webpack 打包後的第一支 React 元件囉！

### 建置 ES7 的撰寫環境

最後，我們將原本的環境加強一下，直接升上去採用現在最流行的 ES7 語法來撰寫。

1. 安裝轉譯的 ES7 的相關 presets 套件

  ```shell
  npm i babel-preset-es2017 babel-preset-stage-0 -S
  ```

2. 將套件載入 webpack 中，打開 webpack.config.js

  ```javascript
  var path = require('path');
  
  module.exports = {
    context: path.join(__dirname, 'src', 'js'),
    entry: {
      bundle: './appES7.jsx',
      vendors: [
        'babel-polyfill'
      ]
    },
    output: {
      filename: '[name].js',
      publicPath: '/assets/', /* webpack 使用 require 時參考的路徑 */
      path: path.join(__dirname, 'public', 'assets')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2017', 'stage-0']
          }
        }
      ]
    }
  };
  ```

  - entry：改成 object 的形式，這裡我們多載入了 babel-polyfill 來解決各個瀏覽器的問題
  - output：filename 的部分改寫成 [name].js，這樣 webpack 就會根據 entry 裡面不同的 key 產生出不同的檔案，以這裡為例，webpack 就會產生 bundle 和 vendors 兩個檔案
  - module：在 presets 當中把剛剛安裝的 es2017 和 stage-0 加進來

3. 用 ES7 語法撰寫 appES7.jsx：

  ```javascript
  import React, {Component} from 'react';
  import {render} from 'react-dom';
  
  class App extends Component {
    render () {
      return (
        <div className="ui buttons">
          <button className="ui button active">Cancel</button>
          <div className="or"/>
          <button className="ui positive button">Save</button>
        </div>
      );
    }
  }
  
  render(
    <App/>,
    document.getElementById('app')
  );
  ````

4. index.html，加新產生的檔案 vendor.js (其實不需要)

  ```javascript
  <script src="../public/assets/vendors.js"></script>
  ```

然後可以看結果。

## koa 2 的基本操作

