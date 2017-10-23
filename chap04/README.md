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

在 React 中，所有的 DOM 屬性都是駝峰式，例如：HTML 的 maxlength 屬性在 React 中則以 maxLength 表示。但是 aria-* 和 data-* 屬性則是用和 HTML 相同的表示方法，例如：data-toggle。

在 React 和 HTML 之間，有數個屬性的用法和所使用的名稱有不同之處，接下來將會一一介紹這些屬性。

### checked

checked 屬性是由單選框 (checkbox) 或複選框 (radio) 的輸入元件 (input) 所支援。它可以用來設置該元件是否被選中。而 defaultChecked 是設置在首次插入元件時的初始值。

```html
<input type="radio" checked={true} />
```

### className

由於 class 為 JavaScript 保留關鍵字，所以在 JSX 中以 className 取而代之。

```javascript
<div className='title'>Hello, world!</div>
```

### dangerouslySetInnerHtml

一般來說，使用 InnerHtml 設置元件的 HTML 程式碼是有風險的，因為它會讓網頁有機會遭受到跨站指令碼 (Cross-site Scripting) 攻擊。所以 React 用 dangerouslySetInnerHTML屬性來取代 InnerHtml，好讓開發者提醒自己這樣做是有危險的。在使用時須傳入一個帶有 __html 屬性的物件，範例如下：

```javascript
<div dangerouslySetInnerHtml={{__html: 'Hello, world!'}} />
```

### htmlFor

由於 for 為 JavaScript 保留關鍵字，所以在 JSX 中以 htmlFor 取而代之。

```javascript
<label htmlFor='name'>Enter your name:</label>
```

### onChange

React的開發者認為，HTML 中的 onchange 事件對於瀏覽器中現有的行為是個誤稱，因此在 React 中， onChange 事件是用來即時處理使用者的輸入，也就是每當更改表單內容時，將會觸發 onChange 事件。

```javascript
<input type='radio' onChange={handleChanged} />
```

### selected

selected屬性是由選項元件 (option) 所支援，它是用來設置是否選取到該元件。這在建構受控元件時很常用到。

```javascript
<option selected={false}>Apple</option>
```

### suppressContentEditableWarning

當一個元件的編輯內容屬性 (contentEditable) 被設置為 true 時，但該元件帶有子元件 (children) 時，會導致編輯內容的功能出現不正常的工作，並且 React 會發出警告，suppressContentEditableWarning 屬性是用來讓 React 不會發出上述的警告。

```javascript
<div suppressContentEditableWarning={true}></div>
```

### value

value 屬性是由輸入元件 (input) 和文字欄位元件 (textarea) 所支援，它可以用來設置元件的內容，這在建構受控元件時會很常使用到。

React元件支援大部分的 DOM 屬性。

## React 元件基礎類別

在使用 React 開發的時候，我們大多數的工作都是圍繞在 React 元件 (Component)，一般的做法是先依照功能做出幾個小元件，然後再將一個個小元件組成一個大元件，在由大元件來組成整個應用程式，所以我們也可以說使用 React 開發其實就是在開發許許多多的元件。

這個章節會介紹 React 元件這個基礎類別。

### Classes

想要使用 React 元件的第一個步驟就是必須要定義元件，元件在被定義後，才能透過標籤的方式來使用。在 15.0 版定義元件的方式有三種，第一種是利用 JavaScript ES6 的 classes 語法來定義 React 元件，這種方法也是目前最常見的方法。

在 React 中，我們使用 class 來創造元件類別，並使用 extends 來讓元件繼承 React.Component 類別：

```javascript
class Hello extends React.Component {
  // ...
}
```

在定義一個元件的時候，必須要實作元件的 render 方法，用意是讓 React 了解該怎麼將元件渲染到 DOM 節點上，因此如果想要渲染多的元素，它們必須背包在一個根節點中回傳：

```javascript
// 錯誤寫法
class Hello extends React.Component {
  render() {
    return (
      <h1>Hello, </h1>
      <h1>world!</h1>
    );
  }
}

// 正確寫法
class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, </h1>
        <h1>world!</h1>
      </div>
    );
  }
}
```

### create-react-class

由於在 ES6 之前還沒有 classes 的語法，所以我們必須透過第二種方式來定義元件，也就是使用一個額外的模組 create-react-class，create-react-class 模組本身就是用來定義元件的函數。

```javascript
var createReactClass = require('create-react-class');

var Hello = createReactClass({
  render: function() {
    return <h1>Hello</h1>;
  }
});
```

這邊要注意的是，在 React 15.5.0 版之前，可直接透過 React 模組中的 createClass 方法來定義元件，但這個方法在 15.5.0 版就被列為過期。

### Functional Component

若要定義的元件是個單純渲染介面的無狀態元件，也就是元件沒有內部狀態、沒有實作物件、沒有參考 (ref)、也沒有生命週期函數，此時就可以使用第三種方法函數元件 (Functional Component) 來定義。

使用函數元件來定義時，只需要一個定義渲染的函數，這種定義元件的方式不僅帶來便利性，還可以提升渲染的效能：

ES6：

```javascript
const Hello = (props) => (
  <h1>Hello, {props.name}</h1>
);
```

ES5：

```javascript
function Hello(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## ReactDOM 類別

在 React 中，當我們想要渲染元件或是取得真實的 DOM 做操作時，我們就要使用 ReactDOM。在 React 過去的版本中，這些功能本來是在 react 中的，但是為了使 React 能在更多不同的環境下更快速且更容易地建構，於是在 0.14版，React 就把 ReactDOM 從 react 的核心抽離，因此就分成 react 和 react-dom 兩個模組。

下面將介紹 react-dom 模組提供了哪些功能。

### render

語法：

`ReactDOM.render(element, container)`

`ReactDOM.render` 是用來渲染 React 元素到指定的 DOM 節點，有了這樣的功能，我們才能把建立好的 React 元件顯示出來。

`render()` 的第一個參數是欲渲染的 React 元素；第二個參數是欲插入元件的位置，它必須是一個 DOM 節點。如果成功將 React 元素渲染至 DOM，它將會回傳元件的參考 (ref)；如果是無狀態的元件則會回傳 null。

若我們要將 React 元件渲染出來，就必須要先在 HTML 中開一個洞，這樣才能使用 `render()` 將元件插入。所以我們要先在 HTML 中建立一個 DOM 元素，並加上 id 屬性。

```html
<div id="app"></div>
```

接著就可以透過 `render()` 將元件渲染，其中的 DOM 節點可以透過 `document.getElementById` 方法來取得前面先建立好的 DOM。

```javascript
ReactDOM.render(
  <h1>HellO, World!</h1>,
  document.getElementById('app')
);
```

### unmountComponentAtNode

語法：

`ReactDOM.unmountComponentAtNode(container)`

React 有插入元件的功能，相反的也會有移除元件的功能，`ReactDOM.unmountComponentAtNode` 就是用來移除元件的方法，它可以移除一個已經插入到 DOM 的 React 元素，並切除對應的事件處理器和狀態。

`unmountComponentAtNode()` 只需要一個參數，那就是欲移除 React 元素的 DOM 節點。如果節點中的 React 元素成功移除，則會回傳 true；如果節點中並沒有 React 元素，則不會做任何操作，並回傳 false。

```javascript
ReactDOM.unmountComponentAtNode(document.getElementById('app'));
```

### findDOMNode

語法：

`ReactDOM.findDOMNode(component)`

若要取得真實的 DOM 節點，可使用 `ReactDOM.findDOMNode()` 來取得已經被掛載完成元件的真實節點，下面範例示範如何使用 findDOMNode() 取得真實節點：

```javascript
import {findDOMNode} from 'react-dom';

class Hello extends React.Component {
  componentDidMount() {
    const e1 = findDOMNode(this);
  }
  render() {
    return <h1>Hello, World</h1>
  }
}
```

## 訂製自己的 Hello World 元件

1. 創造一個 app.js 檔案
2. 在 app.js 定義一個 React 元件，然後將元件渲染到 DOM 節點

  ```javascript
  class Hello extends React.Component {
    render() {
      return <h1>Hello, World!</h1>;
    }
  }
  
  ReactDOM.render(
    <Hello/>,
    document.getElementById('app')
  );
  ```

1. index.html 的腳本標籤將 app.js 讀取進來

  ```html
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>React!</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.min.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <script type="text/babel" src="./app.js"></script>
  </body>
  </html>
  ```

1. 瀏覽器上打開剛寫好的網頁，完成第一個 React 元件的應用程式

## Props

在 React 中，資料的傳遞統一都是由上而下，由父元件傳到各個子元件中，這是 React 單向資料流的概念，而傳遞的方法，則是透過 Props 這個屬性，你可以將其視為**父子元件間溝通的橋樑**。因此，元件可接受外部傳入的 props 作為它的資料來源，渲染自身的視圖。若是父元件的某個 prop 發生變化，React 會向下遍歷整顆元件樹，去重新渲染所有使用到該 prop 的元件。

在元件中，你可透過 `this.props` 來存取到 prop 的內容，下列為一個簡單的例子：

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
```

你可以在實例化時將 prop 傳入，如下列程式碼：

```javascript
ReactDOM.render(
  <Greeting name="Amy" />,
  document.getElementById('app')
);
```

或是你也可以呼叫 `setProps()` 方法去設置元件的 prop，但是通常我們會直接將 prop 傳入，比較少會使用到 `setProps()` 方法去修改元件的 prop。這邊要注意的一點是，`setProps()` 方法只能在元件外使用。請記得，永遠不要在元件內部呼叫 `setProps()` 去修改自己的 prop，prop 在元件內部為不可變動的資料。

前面我們提到過，prop 一律都是由父元件向下傳到子元件中，那若是子元件想要跟父元件溝通呢? 同樣是透過 props，父元件可透過 props 傳入一個回呼函數 (callback) 到子元件，那麼當**子元件 state 發生變化**，或是**有事件想要向上通知到父元件**時，就可以呼叫該回呼函數，如同下列程式碼：

```javascript
class AlertButton extends React.Component {
  render() {
    return (
      <Button onClick={this.props.handleClick}>
        Hello
      </Button>
    );
  }
}

class App extends React.Component {
  handleClick() {
    alert('The button was pressed');
  }
  render() {
    return <AlertButton handleClick={this.handleClick}/>
  }
}
```

## PropTypes

當你的元件越來越複雜，prop 的**驗證**就變得十分重要，它可以確保你的元件正常運作，避免不必要的錯誤發生。

當開始使用 PropTypes 來驗證我們的 Component 前，需要先了解 props 有哪些驗證方法可以使用，React 目前定義了 18 種 PropTypes 供開發者使用：

| PropType                                                                             | 描述                                                                                |
|:-------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------|
| PropTypes.array                                                                      | 驗證 prop 是否為陣列                                                                |
| PropTypes.bool                                                                       | 驗證 prop 是否為布林值                                                              |
| PropTypes.func                                                                       | 驗證 prop 是否為函數                                                                |
| PropTypes.func                                                                       | 驗證 prop 是否為函數                                                                |
| PropTypes.number                                                                     | 驗證 prop 是否為數值                                                                |
| PropTypes.object                                                                     | 驗證 prop 是否為物件                                                                |
| PropTypes.string                                                                     | 驗證 prop 是否為字串                                                                |
| PropTypes.symbol                                                                     | 驗證 prop 是否為符號                                                                |
| PropTypes.node                                                                       | 驗證 prop 是否為任何可以被渲染的 (像是字串、數值或是一個 element)                   |
| PropTypes.element                                                                    | 驗證 prop 是否為 React.element                                                      |
| PropTypes.instanceOf(ClassName)                                                      | 驗證 prop 是否為 Class 的實例                                                       |
| PropTypes.oneOf(['News', 'Photos'])                                                  | 驗證 prop 是否符合陣列中的其中一個值                                                |
| PropTypes.oneOfType([PropTypes.string, PropTypes.number])                            | 驗證 prop 類型是否符合陣列中的其中一個 PropType                                     |
| PropTypes.arrayOf(PropTypes.number)                                                  | 驗證 prop 是否為指定類型的陣列                                                      |
| PropTypes.objectOf(PropTypes.number)                                                 | 驗證 prop 是否為物件且 prop 值類型皆符合傳入參數                                    |
| PropTypes.shape({color: PropTypes.string, fontSize: PropTypes.number})               | 驗證 prop 是否為物件並符合傳入物件的類型 (與該 prop 值類型)                         |
| PropTypes.[type].isRequired                                                          | 該 prop 為必要的且為指定 type 類型，type 用以指定 prop 的類型                       |
| PropTypes.any.isRequired                                                             | 該 prop 為必要的且可為任何類型                                                      |
| function(props, propName, componentName) {}                                          | 自定義類型檢查函數                                                                  |
| PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName){}) | 用於 arrayOf 與 objectOf 的自定義類型檢查函數，用以迭代並檢查陣列或物件中的每個元素 |

在 React v15.5 版本前，React 提供了一個內建的 prop 驗證方法：`React.PropTypes`，但是在 v15.5 版本後，這個方法已經被棄用了，你必須改用 prop-types 模組 ([https://www.npmjs.com/package/prop-types](https://www.npmjs.com/package/prop-types))去幫助你驗證元件中各個 prop 的型別，以及是否為必要的，以下為簡單的範例：

1. 先引入 prop-types 模組：

```html
<head>
<meta charset="UTF-8">
<!-- 略 -->
<script src="https://unpkg.com/prop-types/prop-types.js"></script>
</head>
```

2. 接下來進行型別驗證：

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};
```

or 你可直接在元件內部宣告 propTypes 來定義 prop 型別：

```javascript
class Greeting extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };
  
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
```

上面範例中，propTypes 規範了 name 屬性接受字串值且為必要的，如果你的 prop 是選用，則不需要再設置 isRequired。若是傳入的 prop 沒有符合 propTypes 的規範，就會出現一個 console.warn 的警告。

宣告 propTypes 為非必要的做法，因此你可以只規範一部分的 prop 定義，但是一般不建議這麼做，因為 propTypes 除了可以幫助你驗證 prop 資料，同時也具有元件屬性說明的隱含功能，使用者只要檢視 propTypes 的定義，就能了解元件有哪些 prop 可以使用，不需要再去詳閱 render() 函數的內容。

## 預設 Prop

React 提供你元件的 prop 設置一組預設值，特別是你在 prop 值未提供會毀壞你的元件時，你必須確保元件能夠正常運作。當然，你也可以寫一些防禦性的程式碼來避免它發生，但最好的方式是直接為它們指定預設值。

設置 prop 預設值的方式就是為元件中的 defaultProps 屬性指定一個 Props 預設值，請注意，你只能為那些選用的 prop (也就是沒加上 isRequired 的) 指定預設值：

```javascript
class Profile extends React.Component {
  static defaultProps = {
    age: 0,
    email: ''
  };
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    email: PropTypes.string,
  };
  
  render() {
    // ...
  }
}
```

## State 與初始化

目前為止，你已經可以了解到元件如何利用 prop 接受外部資料，作為它的資料來源，但我們可發現到，只有 prop 的元件是非常靜態的，prop 一旦傳入，就決定了整個元件的視圖呈現，不會再發生改變。

為了讓元件是具有可互動性的，React 為元件添加了狀態的概念，也就是 state，state 會根據使用者的操作發生變化，而 state 的變化，則會促使 React 去刷新整個元件的視圖結構。因此，元件就像是被賦予了生命，開始有自己的行為。

不同於 prop，state 是元件本身自行維護的資料，因此，當你需要使用 state 時，你必須在元件的建構式中，去指定元件需要用到的 state，以及它們的初始值，為 this.state 賦予一個 state 物件就是在完成 state 的初始化，見下面範例：

```javascript
class ColorChanger extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      text: '',
      color: 'gray'
    };
  }
  
  handleChange() {
    // ...
  }
  handleSubmit() {
    // ...
  }
  render() {
    // ...
  }
}
```

上面範例中，時做的事一個色彩轉換器，它會根據使用者輸入的顏色字串，去改變輸入文字的顏色，因此我們為元件設置了兩個 state，text 用於紀錄使用者輸入的文字，而 color 則是用於維護文字色彩。後續會繼續說明如何更新 state，並重新渲染元件，以達成更改文字顏色的功能。

## setState 與 render

在元件內部中，一律都是透過 `this.setState()` 方法去改變元件的，而不是直接更改 this.state 屬性，因為直接更改 this.state 屬性，React 會不知道該 state 發生改變，也不知道應該要幫你重新渲染元件，元件也就不可能更新為新的視圖樣貌。this.setState() 的使用方法就是將內含最新的 state 的物件投入該方法中，旨在通知 React 該元件的 state 發生改變，接著 React 會自動呼叫 render() 方法，去重新渲染元件，更新前端視圖。

你可以將元件想像成是一個狀態機，你只需要將最新的 state 投入，React 會自動幫你的視圖更新為最新 state。也因此，使用者只需要將注意力放在資料的更新，不必再擔心視圖的調整與維護，因為那些工作 React 都在背後幫你完成了！

接下來，我們要繼續實作前面的色彩轉換器範例，以說明 state 的變化是如何影響元件的視圖顯示。首先，我們先完成render() 方法，描繪出元件整體的視覺藍圖：

```javascript
class ColorChanager extends React.Component {
  // ...略
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                 onChange={this.handleChange}
                 value={this.state.text}
                 style={{color: this.state.color}}/>
          <button>Enter </button>
        </form>
      </div>
    );
  }
}
```

色彩轉換器就是由一個輸入欄位與按鈕組成的基本表單，在元件內部，你可以用 this.state 去存取元件的 state，並用這些資料去渲染元件本身，在本範例中，將 this.state.text 的 state 指定到輸入欄位的 value 是為了即時顯示使用者鍵入的文字，而將 this.state.color 指定到輸入欄位的 color 樣式則是為了動態改變文字顏色。

接下來實作兩個事件處理器：handleSubmit() 與 handleChange()，分別指定至 onSubmit 與 onChange。

```javascript
class ColorChanger extends React.Component {
  constructor(props, context) {
     super(props, context);
    
     this.state = {
       text: '',
       color: 'gray'
     };
     
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      color: this.state.text
    });
  }
  
  render() {
    // ...
  }
}
```

React 的事件處理函數會接收到事件相關的物件，我們用 event 變數來代表它。

handleChange() 處理函數，讓 input 欄位中的文字可以即時更新。

handleSubmit() 處理函數，先呼叫了 event.preventDefault() 方法，這是為了通知瀏覽器取消對事件的預設動作 (本例為提交表單)，接著將使用者點擊 Enter 時輸入色彩文字設置為 color 狀態，以更新文字的顏色。

