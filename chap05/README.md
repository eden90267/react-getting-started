# Chap 05. 事件處理與表單

> DOM 事件  
> React 的事件系統與合成事件  
> 事件與狀態更新  
> 表單

## DOM 事件

DOM 是由 W3C 所制定的標準，它定義了一個以節點和物件來表示 HTML 文件的樹狀結構方法，而且也定義了一套與平台無關的介面，讓程式能夠動態存取或改變文件的內容與架構，同時也讓節點能夠附掛上事件處理器 (event handler)，一旦事件觸發的時候就能執行相應的處理程式。

概括來說，我們可以把 DOM 視為是 HTML 文件的模型同時也是一套 API，而 DOM Level 則是指 DOM 規範的版本。W3C 對 DOM 的標準化至今總共歷經了 Level 1、Level 2 與 Level 3 三代，也會稱作 DOM 1 級、DOM 2 級和 DOM 3 級。至於常見的 DOM 0 級則是指 W3C 尚未對此完成標準化之前的初級階段，當時的主流瀏覽器為 Netscape Navigator 4 與 Microsoft IE。關於 DOM 的事件處理是本章所欲關注的重點。

### DOM 事件處理器的綁定方式

假設我們在 HTML 文件中製作了一個按鈕如下，我們希望當它被點擊的時候可以產生一些效果。這裡首先介紹第一種方法，我們可以透過將它的 onclick 屬性指定為 "clickHandler()" 直接在 DOM 元素上綁定事件處理器，當它被點擊便會執行 clickHandler 函數：

```html
<button type="button" onclick="clickHandler()">
  Click Me!
</button>
```

clickHandler函數的實作：

```javascript
function clickHandler() {
  alert("I'm the button click handler.");
}
```

又或者可以採用第二種方法，在 JS 程式碼中將事件處理器賦値予元素的onclick屬性來進行綁定：

```html
<button type="button" id="btn">Click Me!</button>
```

```javascript
function clickHandler() {
  alert("I'm the button click handler.");
}
var btn = document.getElementById('btn');
btn.onclick = clickHandler;
```

如果我們想移除事件處理器，只需要將節點的 onclick 屬性指定為 null 即可。例如：

```javascript
document.getElementById('app').onclick = null;
```

這種將事件處理器直接指定給 onclick 作為監聽器的方式，是最一般也是最直接的做法，也是 DOM 0 級所提供事件處理器綁定的方式。這樣的方式在任何的瀏覽器上使用都沒有問題，不會發生相容性的問題，但是這種做法有個問題，onclick 屬性每次只能指向某個函數作為處理器，因此如果多次指定處理器給它的話，後者將會覆蓋前者，所以沒辦法同時對一個元素添加多個事件處理器。DOM 2 級為這個問題提供了解決辦法。

DOM 2 級讓你可以透過 addEventListener 這個 API 來為元素附掛多個事件處理器，這是綁定事件處理的第三種方法，介面如下：

```
element.addEventListener(event, function[, useCapture]);
```

- event：事件字串名稱
- function：事件處理函數
- useCapture：布林值，用來決定該事件是在捕獲階段(true)還是冒泡階段(false)被處理，該參數是選填的，預設值是 false。採用冒泡階段來處理事件也是最常使用的方式。下述為 DOM 2 級方式作修改：

```javascript
function clickHandler() {
  alert("I'm the button click handler.");
}
function clickHandler2() {
  alert("I'm the other click handler.");
}
var btn = document.getElementById('app');
btn.addEventListener('click', clickHandler);
btn.addEventListener('click', clickHandler2);
```

上述會依序跳出兩個警告視窗訊息。

如果想要移除事件處理器，可使用元素的 removeEventListener 這支 API 來完成。

```
element.removeEventListener(event, function[, useCapture]);
```

- event：事件字串名稱
- function：事件處理函數
- useCapture：布林值，用來決定該事件是在捕獲階段(true)還是冒泡階段(false)被處理

要移除剛剛的第二個事件處理器：

```javascript
btn.removeEventListener('click', clickHandler2);
```

我們現在對 DOM 的事件處理器附掛方式有了初步的了解。接下來看一下當一個事件處理器被呼叫時，它將收到什麼參數。

### DOM 的 event 物件

每當一個事件觸發時，對應的事件處理器將會被呼叫，在呼叫處理器函數會伴隨傳入一個 event 物件。這個 event 物件的定義可以在 DOM 2 級規範 ([https://www.w3.org/TR/DOM-Level-2-Events/events.html](https://www.w3.org/TR/DOM-Level-2-Events/events.html)) 中找到。

這個 event 物件帶有一些基本的屬性如 type、target、currentTarget、eventPhase，其中最常被使用的就屬 target 了。event.type 指明了事件的名稱、event.target 指向了觸發此事件的元素、event.currentTarget 指向了目前正在處理此事件的元素，而 event.eventPhase 則指出此事件正在何種階段中被處理。此外，event 物件還帶有 preventDefault 與 stopPropagation 方法，前者用於阻止預設行為，後者用於阻止事件的傳遞。對於不同類型的事件而言，例如滑鼠事件、鍵盤事件等，還有屬於它們各自專用的屬性，用以代表事件發生時元素的狀態，例如滑鼠事件的 altKey 屬性可以用來指示滑鼠事件發生時 alt 鍵是否也同時被按下。

剛剛提到，event 是作為參數傳入事件處理器的。不過在 IE 中，event 物件是全域 window 物件的屬性，要獲取觸發此事件的**來源元素**則需要透過讀取 event.srcElement 來完成。因此對於不同瀏覽器，在事件處理方面會有相容性的問題。所以為了兼顧相容性，在事件處理器中要使用到 event 物件的程式碼，就會寫成像下面這樣：

```javascript
btn.onclick = function(event) {
  event = event || window.event;
  var src = event.target || event.srcElement;
  // ... 略
}
```

如此一來就能夠在不同的瀏覽器中使用同一份程式碼，但是看起來還是有點麻煩。所幸，React 已經幫我們照顧好了相容性問題，因此開發者使用 React 就可以很容易寫出跨瀏覽器的程式碼。

### DOM 的事件流：事件冒泡與事件捕獲機制

在這裡需要花點時間來了解它們是什麼，而第一步應該先看看什麼是 DOM 的事件流 (event flow)。

W3C 在事件模型規範中對事件流的說明是：「事件流是一個在事件產生之後，於 DOM 樹狀模型中傳遞的過程。事件捕獲與事件冒泡機制，搭配幾種事件註冊技巧，讓事件能夠以幾種方式被處理。事件可以在事件來源的元素上被處理，又或者是在文件樹更頂層的地方被處理。」簡單來說，就是事件在發生之後的流動是從觸發事件的來源節點由內往外擴散，還是由文件最頂層從外往內收斂。

由內往外擴散的方式是 IE 所提出的 DOM 實作，事件始自具體的節點，稱之為事件冒泡機制 (event bubbling)；從外往內收斂則是 Netscape 提出的 DOM 實作，事件始自於最不具體的節點 (文件的最頂層)，稱之為事件捕獲機制 (event capturing)。兩者的事件傳遞順序正好相反。在傳播過程所歷經的節點，如果也監聽了相同的事件，那麼那些節點上對應於該事件的處理器都將會被呼叫。

現代的瀏覽器同時支援這兩種機制 (較舊的瀏覽器可能不支援事件捕獲)，我們在前面所看到的 addEventListener 方法可以透過 useCapture 這個選填參數來決定事件是由哪一種機制來處理。當事件自傳遞起總共會歷經三個階段，首先是事件捕獲階段 (capturing phase)，再來是目標階段 (target phase)，最後則是事件冒泡階段 (bubbling phase)。線圖是一個虛擬結構，說明了事件傳遞時將依序歷經的三個階段。

![](https://imgur.com/4smtoUi.png)

現在來看一個實際的例子，就可很快的了解事件捕獲與事件冒泡的意思了。

```html
<div id="top">
  <div id="middle">
    <button type="button" id="btn">
      Click Me!
    </button>
  </div>
</div>
```

我們將為這三個元素都掛上同一事件處理器，然後觀察按鈕被按下時他們的執行順序：

```javascript
var PHASE = ['', 'CAPTURING', 'AT_TARGET', 'BUBBLING'];

function clickHandler(event) {
  var eventName = event.type,
    targetId = event.target.id,
    currentTargetId = event.currentTarget.id,
    phase = event.eventPhase,
    text = "Event: " + eventName + ", Source: " + targetId + "\n" +
      "Phase: " + PHASE[phase] + "\n" +
      "Handler Executed at: " + currentTargetId;
  alert(text);
}

var topDiv = document.getElementById('top'),
  middleDiv = document.getElementById('middle'),
  btn = document.getElementById('btn');

topDiv.addEventListener('click', clickHandler);
middleDiv.addEventListener('click', clickHandler);
btn.addEventListener('click', clickHandler);
```

此範例在附掛事件處理器時，都使用了預設的冒泡機制，執行結果如下：

```
(1) Event: click, Source: btn
    Phase: AT_TARGET
    Handle Executed at: btn
(2) Event: click, Source: btn
    Phase: BUBBLING
    Handle Executed at: middle
(3) Event: click, Source: btn
    Phase: BUBBLING
    Handle Executed at: top
```

現在我們將最外層與中層的 <div> 改用捕獲機制來附掛事件處理器：

```javascript
topDiv.addEventListener('click', clickHandler, true);
middleDiv.addEventListener('click', clickHandler, true);
btn.addEventListener('click', clickHandler, true);
```

現在執行順序會像這樣：

```
(1) Event: click, Source: btn
    Phase: CAPTURING
    Handle Executed at: top
(2) Event: click, Source: btn
    Phase: CAPTURING
    Handle Executed at: middle
(3) Event: click, Source: btn
    Phase: AT_TARGET
    Handle Executed at: btn
```

再來僅將 middleDiv 改用捕獲模式

```
(1) Event: click, Source: btn
    Phase: CAPTURING
    Handle Executed at: middle
(2) Event: click, Source: btn
    Phase: AT_TARGET
    Handle Executed at: btn
(3) Event: click, Source: btn
    Phase: BUBBLING
    Handle Executed at: top
```

這裡要注意一點，呼叫 addEventListener 時，**使用捕獲機制與冒泡機制的事件處理器將會被維護在不同的陣列之中**，因此當我們呼叫 removeEventListener 時，如果是使用捕獲機制的事件處理器，則必須確實指定 useCapture 參數為 true。

### 阻止事件傳遞

前面我們已經看到事件傳遞所歷經的三個階段。如果我們想要阻止事件傳遞的話，可以使用事件的 stopPropagation 這支方法來達成目的。我們將上例做一點修改，將事件處理器都以冒泡機制註冊。

```javascript
btn.onclick = function(event) {
  event = event || window.event;
  var src = event.target || event.srcElement;
  alert(src);
  event.stopPropagation(); // 阻止事件冒泡
}
```

如此一來即便上層元素監聽了同類事件，但事件在首次被執行後，便不會再繼續傳遞下去了。執行結果僅會有 btn 元素的事件處理器被觸發。

這裡要注意的是，stopPropagation 可以用於阻止事件冒泡，而**不能阻止事件捕獲**。要阻止事件捕獲必須使用 DOM 3 級的 stopImmediatePropagation (同時阻止捕獲與冒泡)。

對於阻止事件傳遞，一樣會遇到瀏覽器相容性的問題。在 IE 裡面 (IE 9 以下)，若想要阻止事件傳遞，必須透過設定 window.event 的 cancelBubble 屬性來實現。因此，兼具相容性的程式碼就應該要修改如下：

```javascript
btn.onclick = function(event) {
  event = event || window.event;
  var src = event.target || event.srcElement;
  if (event.stopPropagation)
    event.stopPropagation(); // 阻止事件冒泡
  else
    event.cancelBubble = true;
}
```

### 取消預設的事件行為

另外還有一支 API，用於阻止預設事件發生時的行為，就是 preventDefault() 方法，我們使用 Mozilla MDN 上面的例子來說明。假設我們在 HTML 中製作了一個輸入表單，我們希望限制只能輸入小寫字母，這可在 keypress 事件處理器中檢測使用者輸入的字元，如果該字元不屬於小寫字母，那麼就呼叫事件的 preventDefault() 方法來略過該字元：

```html
<form>
  <input type="text" id="my-textbox">
</form>
```

```javascript
function checkName(event) {
  var charCode = event.charCode;
  if (charCode !== 0){
    if (charCode < 97 || charCode > 122){
      event.preventDefault();
      alert('Please use lowercase letters only.' + '\n' + 'charCode: ' + charCode + '\n');
    }
  }
}

var myTextbox = document.getElementById('my-textbox');
myTextbox.addEventListener('keypress', checkName, false);
```

對於取消事件的預設行為，同樣會遇到瀏覽器相容性的問題，在 IE 裡面是依靠設定 window.event 的 returnValue 屬性為 true 或 false 來實現的，所以兼具相容性的 checkName 函數程式碼應該修改成下面這樣：

```javascript
function checkName(event) {
  var charCode = event.charCode;
  if (charCode !== 0){
    if (charCode < 97 || charCode > 122){
      if (event.preventDefault)
        event.preventDefault();
      else
        event.returnValue = true;
      
      alert('Please use lowercase letters only.' + '\n' + 'charCode: ' + charCode + '\n');
    }
  }
}
```

如果處理相容性的程式碼一直重複出現，你可以自己將這些事情封裝成獨立的函數或模組，使用呼叫函數的方式來避免重複的程式碼。當然，有一些框架與函數庫幫開發者彌平了這種瀏覽器間相容性的問題，React 就是一個很好的例子。

我們把 DOM 事件的基礎很快複習了一遍，總算要進入 React 的事件系統了，來看看 React 怎麼做的吧!

## React 的事件系統與合成事件

React 將 DOM 往上抽象成一個以 JavaScript 物件所描述的虛擬 DOM，據此為開發者提供了既一致又簡潔的程式設計模型。React 的虛擬 DOM 實作了一個合成事件系統，將所接收到的瀏覽器事件統一封裝成一個合成事件物件 (SyntheticEvent)，它不只符合 W3C 所定義的標準，而且經由合成事件物件的一層封裝也為事件處理提供了一致的介面，兼顧了性能與瀏覽器相容的問題。React 在虛擬 DOM 上所實現的一套事件處理機制，將真實 DOM 與虛擬 DOM 之間解耦開來。

React 在整個真實 DOM 結構的最頂層掛上了一個事件監聽器作為代理 (event delegating)，每當事件被觸發時，React的事件代理機制會將事件分派到正確的元件上。事件合成系統 (SyntheticEvent) 同樣支援冒泡機制，而且 SyntheticEvent 物件也提供了和原生瀏覽器相同的 API，因此也可以使用 `stopPropagation()` 來阻止事件傳遞或是使用 `preventDefault()` 來取消事件的預設觸發行為。SyntheticEvent 物件也提供了一個 nativeEvent 屬性，好讓使用者在需要瀏覽器原生事件時，可以存取得到它。接下來看一下 React 的事件代理機制是什麼意思。

React 實際上並不將每個事件處理器直接綁到真實的 DOM 節點上，而是在 DOM 的最頂層使用了單一個事件監聽器作為代理，它維護了一張元件事件處理器與其所監聽事件的映射表。

當元件被掛載時，React 會將元件所監聽的事件及其處理器的對應關係添加到映射表之中。所有原生事件都會委由此代理監聽器來負責分派處理，當事件發生時，代理監聽器會從映射表中找出元件對應的事件處理器，並以 SyntheticEvent 物件作為參數來呼叫相應的事件處理器。當一個元件被卸載時，React 也會自動地從映射表中刪除該元件的事件處理器。

### React 事件處理器的綁定方式

真實 DOM 的事件處理器綁定，最典型的方式就是以像是 onclick 這樣的標籤屬性來指定事件處理器。在 React 中，元件的事件處理器綁定方式也很類似，而且事件的涵義和觸發的場景也與 DOM 是一致的，只不過在語法上有一些差異：

- 在 React 裡，事件名稱是以小寫駝峰式 (camelCase) 來書寫的，例如 onClick；而在 HTML 中則是以全小寫的方式來書寫。
- 使用 JSX 語法來綁定元件的事件處理器，即傳入事件處理函數　(**指向函數的參考**)。在 HTML 中則是寫出**執行處理器函數的字面值**。以下舉例：

  - HTML：

  ```html
  <button onclick="startEngine()">
    Engine Starting
  </button>
  ```

  - React：

  ```javascript
  <button onClick={startEngine}>
    Engine Starting
  </button>
  ```

上面兩個例子雖有些微差異，但看起來還是蠻像的。雖然 React 具有事件代理機制，所以不會將事件處理器綁定到 DOM 節點上，不過附掛事件處理器的方式也借鑑了 HTML 的寫法，相當符合開發者的習慣。

在 React 中，事件與處理器的綁定只有上述一種方式。當元件進行初次渲染時，React 的事件代理機制就會自動地將元件所監聽的事件和其處理器建立起映射關係。使用 React 之後，你應該就不再需要呼叫 DOM 元素的 addEventListener 來將事件處理器直接添加在 DOM 節點上。

#### 在建構式中以 bind 方法來綁定 this

如果你覺得每次在附掛事件處理器的時候都需要寫bind很麻煩，那麼可以在元件建構式裡面一次完成this的綁定。因為 ES5 風格有自動綁定的功能，所以這裡只看 ES6 風格的寫法：

```javascript
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello World!'};
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    alert(this.state.message);
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>
        Try Me!
      </button>
    );
  }
}
```

由於 React 將視圖類別化，藉此提升了視圖元件的複用性和組合性，因此一般的手法也會將事件處理器作為元件的實例方法而直接寫在元件類別裡面。因此附掛事件處理器常常見到的程式碼都會多出個 this：

```javascript
<button onClick={this.handleClick}>
  Handle the click event
</button>
```

對於 React 元件類別，我們希望它和 JavaScript 的類別一樣，讓每個方法的上下文 (this) 都要能夠指向該元件的實例，也就是將存在於方法內的 this 綁定為當前的元件實例。如果你使用 ES5 的風格來撰寫 React 元件類別。那麼 React 會自動地將方法的 this 綁定至元件實例本身 (autobinding)。因為自動綁定可能會造成 JS 開發者的困惑，所以 React 新的 ES6 風格已經不再這樣做。如果你是使用 ES6 的 Class 來撰寫元件類別或使用純函數的話，那麼就需要自己顯式地為方法或函數綁定 this。

要為方法綁定 this 的做法有好幾種，最簡單的就是使用 .bind(this) 來產生綁定後的函數。以下是幾種綁定 this 的作法，我們會分別來看看它們：

- 在指定事件處理器時以 bind 來綁定 this
- 在建構式中以 bind 方法來綁定 this
- 使用箭頭函數
- 使用屬性初始化方法 (property initializer syntax) 來綁定 this

#### 在指定事件處理器時以 bind 方法來綁定 this

```javascript
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello World!'};
  }
  
  handleClick() {
    alert(this.state.message);
  }
  
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Try Me!
      </button>
    );
  }
}
```

如果你忘記為 this.handleClick 進行 this 的綁定後再傳給 onClick，那麼在此事件處理器被呼叫的時候，它的 this 將會是 undefined。

現在來看看 ES5 風格的寫法，請注意現在 React 會自動地將方法的 上下文 this 綁定到元件實例本身：

```javascript
var Greeting = createReactClass({
  getInitialState: function() {
    return {message: 'Hello World!'}
  },
  handleClick: function() {
    alert(this.state.message)
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>
        Try Me!
      </button>
    );
  }
})
```

那麼使用 ES5 的時候，是不是也可以將上面的 this.handleClick 寫成 this.handleClick.bind(this) 呢? 答案當然是可以的：

```javascript
var Greeting = createReactClass({
  // ...
  render: function() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Try Me!
      </button>
    )
  }
})
```

這裡你可能會有疑問，因為在 JavaScript 中使用 .bind(this) 實際上會產生一個新的函數，那麼當我們在 React 中每次為元件的方法執行 .bind(this) 的時候，會不會因此而降低效能。答案是不會的，因為 React 內部設計有快取機制，只要方法 bind 過之後，後續的 binding 都不會再產生新的函數，從而避免了效能降低的問題。

#### 在建構式中以 bind 的方法來綁定 this

如果你覺得每次在附掛事件處理器的時候都需要寫 bind 很麻煩，那麼可以在元件建構式裡面一次完成 this 的綁定。因為 ES5 風格有自動綁定功能，這裡只看 ES6 風格的寫法。

```javascript
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello World!'};
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    alert(this.state.message);
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>
         Try Me!
       </button>
    );
  }
}
```

#### 使用箭頭函數

箭頭函數是 ES6 的語法，它不僅僅是函數的語法糖而已，而且還會**自動綁定到定義此函數作用域的 this**。我們在 `<button>` 的 onClick 指定了一個箭頭函數作為 callback，這個箭頭函數被呼叫時的上下文即元件本身，因此在它內部的 this.handleClick(event) 也會指向同樣的上下文：

```javascript
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello World!'};
  }
  
  handleClick() {
    alert(this.state.message);
  }
  
  render() {
    return (
      <button onClick={(event) => this.handleClick(event)}>
         Try Me!
       </button>
    );
  }
}
```