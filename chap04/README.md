




#### 事件

事件也是元件的屬性之一，我們在元件身上可以透過事件，來監聽特定的條件或使用者行為，並做出相對應的處理或反應，例如，監聽到滑鼠點擊按鈕時，網頁就會開始播放音樂。

在標籤中，開發者可以透過 JavaScript 表達式來綁定監聽並處理事件。React使事件規範化，因此監聽事件在不同的瀏覽器中會得到擁有相同屬性的事件物件。

```javascript
var hello = function(event) {
  
}
<div onClick={hello}/>
```

#### 樣式

若想要改變元件的外觀樣式，則是透過樣式(Style)屬性將樣式添加到元件中。但要注意，樣式屬性的屬性值是一個物件，所以必須使用 JavaScript 表達式。

要注意樣式屬性的屬性值物件的各個屬性名稱是以駝峰式命名，而不是以減號做分隔，主要是為了與HTML的style屬性名稱座間隔。

```javascript
<div style={{height: 150, width: 150, color: 'blue', fontSize: '24pt'}}>
  Hello, World!
</div>

// or

var helloStyle = {height: 150, width: 150, color: 'blue'};
<div style={helloStyle}>Hello, World!</div>
```

#### 自定義元件

在使用 JSX 時，若想要程式看起來優雅的話，自定義元件是必要的工具。它可以將複雜的樹狀結構指定為一個自定義元件，將其重複使用，以有效的簡化程式。

需要注意的是，在建立或使用自定義元件時，要注意自定義標籤的字首必須為大寫英文字母。

```javascript
<Menu />
```

## Hello World，使用 CDN 安裝 React

正式使用 React 前，必須要先知道該怎麼建置 React 的開發環境。React 有兩種常見的開發方式，第一種是使用模組打包工具 webpack，第二種是使用另一種模組打包工具 browserify，並搭配任務自動化管理工具 gulp。

這裡先使用 CDN 方式來介紹，之後將介紹如何使用 webpack。

下面提供一個簡單的範例：

1. index.html

  ```html
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>React!</title>
  </head>
  <body>
  
  </body>
  </html>
  ```

2. head 中，使用 CDN 方式引入 react、react-dom 以及 babel-core browser 版 script。目前瀏覽器並不支援 JSX 與 ES6+，所以需要 babel-core 來翻譯。

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.min.js"></script>
  ```

3. 需要在 body 中加入要將 React 元件插入所需的節點，節點的類型不限，但慣例是使用區塊標籤(div)。並且我們必須指定節點的 id 屬性，這樣才能為 React 指出節點。

  ```html
  <div id="app"></div>
  ```

4. 為讓 babel 翻譯 JSX 和 ES6+ 的程式碼，我們必須要新增一個包含 JSX 和 ES6+ 的腳本標籤(script)，並將它的 type 指定為 "text/babel"。

  ```html
  <script type="text/babel">
      
  </script>
  ```

5. 接著在腳本標籤中呼叫 ReactDOM 模組的 render 方法來將元件插入節點中。

  ```javascript
  ReactDOM.render(
    <h1>Hello, World!</h1>,
    document.getElementById('app')
  );
  ```

6. 接著在瀏覽器上打開剛寫好的網頁

## DOM 的特殊屬性

在 React 中，所有的 DOM 屬性都是駝峰式，例如：HTML 的 maxlength 屬性在 React 中則以 maxLength 表示