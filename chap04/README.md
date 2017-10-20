# Chap 04. React 起手式

> JSX 基礎語法  
> Hello World，使用 CDN 安裝 React  
> DOM 特殊屬性  
> React 元件基礎類別  
> ReactDOM 類別  
> 訂製自己的 Hello World 元件  
> Props  
> PropTypes  
> 預設 Prop  
> State 與初始化  
> setState 與 render  
> Inline Style  
> Pure Components  
> Virtual DOM  
> 使用 JSX 與 Component 的好處

## JSX 基礎語法

HTML、CSS 與 JavaScript。在傳統的前端網頁開發模式，都會強調要將這三者分離，但我們是否也曾因為這三者的分離而感到困擾呢?

React 不同於傳統的開發模式，它認為一切皆以元件 (Component) 為基礎，並將同一個元件的程式與資源封裝在一起。因此在設計 React 元件時，我們通常會使用 JSX 語法來使程式碼更加的簡潔。

JSX 就像是在 JavaScript 中使用 XML 的語法，它能定義包含屬性的樹狀結構。由於瀏覽器並沒有支援 JSX，所以它必須透過轉譯器來轉譯成 JavaScript。

### 使用 JSX 的優點

#### 直覺

既然 JSX 會透過轉譯器轉譯成 JavaScript，那為什麼不直接使用 JavaScript 就好了? 這是因為使用 JSX 可以讓程式碼看起來更加直覺。由於 JSX 是類似 XML 語法，所以對於比較沒有開發經驗的人來說更容易閱讀，下面的範例將比較有使用 JSX 和沒使用 JSX 的差異：

不使用 JSX：

```javascript
React.createElement('div', {className: 'hello'}, 'Hello World');
```

使用 JSX：

```javascript
<div className="hello">Hello, World</div>;
```

#### 簡潔

JSX 可以定義包含屬性的樹狀結構，來提供自定義的標籤，這可以讓程式碼變得更加簡潔且語意化，若我們使用 HTML 來表示簡易的表單，通常會是下面這樣表示：

```html
<div class="textBox">
  <input type="text">
  <input type="submit">
</div>
```

而在 JSX 中，我們將標籤定義好後，就可以在程式中重複使用自定義標籤，如此一來程式碼就變得非常的簡潔：

```javascript
const TextBox = () => {
  <div className="textBox">
    <input type="text"/>
    <input type="submit"/>
  </div>
};
<TextBox>
<TextBox>
<TextBox>
```

#### 與原生 JavaScript 語法結合

JSX 可以與 JavaScript 結合使用，透過 JavaScript 的力量，可以簡化許多繁雜的程式碼，也可以做出許多不一樣的變化。下面例子是透過 JavaScript 陣列的方法 map，來將陣列中的各個值已迭代的方式取出，並且將這些放入項目(li)標籤中來產生一個列表：

```javascript
var list = ['black tea', 'green tea', 'oolong'];

function Menu() {
  return (
    <ul>
      {
        list.map(function(result) {
          return (<li>{result}</li>);
        })
      }
    </ul>
  );
}

<Menu/>;
```

### JSX 基礎語法介紹

看完 JSX 的優點後，我們接著來詳細介紹 JSX 的基礎語法。在這些基礎語法中，大家也許會發現 JSX 的許多語法都和 HTML 相似，如果已經具備基本 HTML 知識肯定會覺得很熟悉。

#### 標籤

一個網頁是由非常多的元件所組成，若想要在網頁上新增元件，只需要在程式碼中新增對應的標籤就可以了。JSX 支援大部分的 HTML 元件。

```javascript
<h1>Hello World!</h1>
```

我們還可以將 JSX 標籤指定給變數，且此變數可用於任何地方。在習慣上，當 JSX 標籤不只一行時，我們會用一個小括號把它包起來，這樣子程式碼會較為易讀：

```javascript
var hello = <h1>Hello World!</h1>;
var welcome = (
  <div>
    <h1>Hello</h1>
    <p>Welcome to React!</p>
  </div>
);
```

#### JavaScript 表達式

JSX 最大的特點就是可以自由的與 JavaScript 結合使用，也因為這個特點，可以讓我們透過 JavaScript 的力量，創造更多可能。當我們想要在 JSX 中使用 JavaScript 的語法時，需要用一對大括號，將 JavaScript 的程式碼包在其中。

```javascript
var a = 1, b = 2;

<div>{a + b}</div>
```

#### 屬性

元件標籤內可以擁有任意數量的屬性，用來提供關於元件的訊息。一般來說屬性值要放在雙引號中，但也有例外，像是有些屬性是以 Boolean 表示，其屬性值就要用 JavaScript 表達式表示。

這裡要注意的是，有些 JSX 標籤的屬性名會與 HTML 不同，像是在 JavaScript 中的 `class` 和 `for` 是保留關鍵字，所以在 JSX 要改用 `className` 和 `htmlFor`。

```javascript
<div className="buttonBox">
  <input type="button" disabled={true}/>
</div>
```

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
