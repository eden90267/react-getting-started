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

在附掛事件處理器時使用箭頭函數會有個問題，那就是每次 Greeting 的實例在渲染時都會重新產生一個新的 callback。在多數的情況，影響並不算大。但是，若 callback 被當成 props 來傳遞給更內層的元件時。React 官方建議最好是直接在建構式中先做綁定，又或者使用下面的屬性初始化語法 (property initializer syntax) 來避免這樣的效能問題。

#### 使用屬性初始化語法來綁定 this

這裡我們使用仍處在實驗階段的屬性初始化語法，它的概念就是在撰寫元件方法時，直接使用箭頭函數來寫它。

```javascript
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello World!'};
  }
  
  handleClick = (e) => {
    alert(this.state.message);
  };
  
  render() {
    render (
      <button onClick={this.handleClick}>
        Try Me!
      </button>
    );
  }
}
```

由於屬性初始化語法是 Babel 的實驗性語法，React 官方並不保證此方法未來能持續可用，這一點要請讀者在撰寫程式時自行衡量是否使用這個還未穩定的語法。

### 合成事件物件

前面我們談過了 React 的事件代理機制，React 在 DOM 結構的最頂層實作了一個事件監聽器做為代理，當事件發生時，由事件代理器負責將轉化後的 SyntheticEvent 物件分派給相應的事件處理器。

SyntheticEvent 是 React 事件系統的一部分，它封裝了瀏覽器原生事件的部分子集，進而達到跨瀏覽器相容的效果。因為它是跨瀏覽器相容的，而且和原生事件有一樣的介面，因此你可以放心使用它而不需要再考慮程式碼是執行在何種瀏覽器上。此外，當你需要瀏覽器的原生事件，也能透過 SyntheticEvent 物件的 nativeEvent 屬性來存取到。

每個 SyntheticEvent 物件具有以下屬性與方法，你可以在 React 的 SyntheticEvent.js (react/src/renders/shared/shared/event/SyntheticEvent.js) 原始碼看到它們。

| (傳出)型別     | 屬性或方法名稱         |
|:---------------|:-----------------------|
| boolean        | bubbles                |
| boolean        | cancelable             |
| DOMEventTarget | currentTarget          |
| boolean        | defaultPrevented       |
| number         | eventPhase             |
| boolean        | isTrusted              |
| DOMEvent       | nativeEvent            |
| string         | type                   |
| void           | preventDefault()       |
| boolean        | isDefaultPrevented()   |
| void           | stopPropagation()    |
| boolean        | isPropagationStopped() |


#### 支援的事件

React 將事件進行了正規化，所以在不同瀏覽器也使用了一致的事件屬性，事件處理器預設只會在事件的冒泡階段被觸發。如果想要在捕獲階段處理事件，可以在事件名稱之後加上Capture後綴來附掛事件處理器，例如將 onClick 為 onClickCapture 就可以在捕獲階段來處理點擊事件。

React 所支援的事件實作可以在 React 原始碼的 /syntheticEvents (react/src/renderers/dom/shared/syntheticEvents/) 中找到。

#### 事件池 (Event Pooling)

為了提升效能，React 內部會將產生的 SyntheticEvent 實例放在一個物件池中管理，當某個合成事件物件不再被使用時 (在事件的處理器被執行完畢之後)，它的屬性都將會被設為 null，因此 SyntheticEvent 實例是一種會被淨空的物件 (nullified object)。這除了表示 SyntheticEvent 事件物件可以被重複使用之外，也意味著你絕對要避免使用非同步的方式來存取合成事件物件。因為當你在稍後存取它的時候，實例雖然還存在，但它的屬性可能都已經被重置了。看看以下例子：

```javascript
function onClick(event) {
  console.log(event); // nullified object
  alert(event.type);  // "click"
  const eventType = event.type;
  
  setTimeout(function() {
    alert(event.type); // null
    alert(eventType);  // "click"
  }, 0);
  
  // 不能正常工作，setState 是非同步方法
  // 因此 this.state.clickEvent 指向的物件可能被淨空
  this.setState({clickEvent: event});
  // 雖然能存取到 event.type，但可能會得到 null，無法正常工作
  this.setState({eventType: event.type});
}
```

讓我們修改一下前面的 Hello World 的例子來試試看：

```javascript
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello World!'};
  }
  
  handleClick = (event) => {
    alert(event.type); // "click"
    const eventType = event.type;
    
    setTimeout(function() {
      alert(event.type); // null
      alert(eventType);  // "click"
    }, 0);
  };
  
  render() {
    return (
      <button onClick={this.handleClick}>
        Try Me!
      </button>
    );
  }
}
```

如果你還是想要以非同步的方式來存取事件的屬性，那麼就應該要呼叫事件的 `event.persist()` 方法，這可以讓 React 把該合成事件物件從池子中移出來，好讓合成事件物件不被淨空，使用者程式碼可以保留指向該事件物件的參考，對它進行後續的存取。

### 虛擬 DOM 的事件流：事件冒泡與事件捕獲機制

React 的虛擬 DOM 也具有與真實 DOM 相同的事件冒泡與捕獲機制。預設，React 會在事件傳遞的冒泡階段觸發事件處理器，不過你也可讓 React 在捕獲階段來觸發事件處理器。使用一個被兩個 `<div>` 包裏住的 `<button>` 來測試一下 React 的冒泡機制。

```javascript
class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    var PHASE = ['', 'CAPTURING', 'AT_TARGET', 'BUBBLING'];
    
    var eventName = event.type,
        targetId = event.target.id,
        currentTargetId = event.currentTarget.id,
        phase = event.eventPhase,
        text = "Event: " + eventName + ", Source: " + targetId + "\n" + 
               "Phase: " + PHASE[phase] + "\n" + 
               "Handler Executed at: " + currentTargetId;
    alert(text);
  }
  
  render() {
    return (
      <div id="top" onClick={this.handleClick}>
        <div id="middle" onClick={this.handleClick}>
          <button type="button" id="btn" onClick={this.handleClick}>Click Me!</button>
        </div>
      </div>
    )
  }
}
```

測試結果：

```
(1) Event: click, Source: btn
    Phase: BUBBLING
    Handle Executed at: btn
(2) Event: click, Source: btn
    Phase: BUBBLING
    Handle Executed at: middle
(3) Event: click, Source: btn
    Phase: BUBBLING
    Handle Executed at: top
```

特別注意 (1) 處，當 `<button>` 的事件處理器被觸發時，所處的階段是冒泡階段，而不是預想中的目標階段。

這是由於 React 的事件系統實際上只是實現了冒泡機制 (因捕獲模式有擴瀏覽器相容的問題)，React 從底層獲取事件之後，於事件系統的抽象層次再安排內外層元素的事件處理器執行順序，以模擬的方式創造了類似於真實 DOM 的內外流邏輯。故使用 onClickCapture 所附掛的監聽器，它的執行階段也會是冒泡階段，但執行的順序會被往前調整 (模擬事件捕獲機制)。

### 阻止事件傳遞

前面所述的阻止事件傳遞的方法，只需使用事件的 `stopPropagation()` 方法或是令 `window.event.cancelBubble` 為 true (IE 9 以下) 即可。由於 React 幫開發者照顧了跨瀏覽器相容性的問題，因此在 React 中一律使用合成事件的 `stopPropagation()` 方法即可 (在 React v0.14 版本之前，可以讓事件處理器傳回 false 來停止事件傳遞，但自 v0.14 版起，都必須手動顯式地呼叫合成事件的 `stopPropagation()` 方法才行)。

```javascript
class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    var currentTargetId = event.currentTarget.id;
    
    alert('click handler executed at ' + currentTargetId);
    
    event.stopPropagation();
  }
  
  render() {
    return (
      <div id="top" onClick={this.handleClick}>
        <div id="middle" onClick={this.handleClick}>
          <button type="button" id="btn" onClick={this.handleClick}>Click Me!</button>
        </div>
      </div>
    );
  }
}
```

### 取消預設的事件行為

與 `stopPropagation()` 一樣，自 React v0.14 版本起，要取消預設的事件行為必須手動顯式地呼叫合成事件的 `preventDefault()` 方法，無法透過讓事件處理器傳回 false 來取消預設的事件行為。以下是個例子，在單純的 HTML 中，要阻止打開新頁面連結的預設行為：

```html
<a href="http://www.google.com" onclick="console.log('Link clicked.'); return false;">
  Try Me
</a>
```

在 React 中則是這樣做，簡單易懂：

```javascript
class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    alert('Link clicked.');
    event.preventDefault();
  }
  
  render() {
    return (
      <a href="http://www.google.com" onClick={this.handleClick}>
        Try Me
      </a>
    )
  }
}
```

## 事件與狀態更新

在 Web 應用程式中，視圖的狀態往往和使用者的操作有著密不可分的關係。由於使用者的操作經常是以觸發事件的方式來體現，因此在 React 中，事件與狀態更新的程式碼特別常見。之前已有類似的程式碼外，之後討論到表單，會一直看見這種模式，特別是受控元件的設計。

底下我們用按鈕來模擬一個開關，這個 OnOffSwitch 元件會渲染出一個按鈕，讓使用者可在每次按下按鈕切換它的 ON 或 OFF 狀態。

```javascript
class OnOffSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }));
  }

  render() {
    return (
            <button onClick={this.handleClick}>
              {this.state.isOn ? 'ON' : 'OFF'}
            </button>
    );
  }
}

ReactDOM.render(
        <OnOffSwitch/>,
  document.getElementById('app')
);
```

## 表單

在 Web 應用程式開發之中，表單 (form) 是和使用者能夠進行互動的重要元素之一。特別是在需要使用者輸入的場合，例如輸入帳號、密碼來登入網站、送出一個留言、提交一篇部落格文章、進行一次搜尋引擎檢索等等，都需要透過表單來完成。在開始介紹 React 表單的特性之前，先看看表單元素包含哪些類型。

| 元素                      | Props 中的表單元素值屬性 | 事件處理器 | 從合成事件物件取值   |
|:--------------------------|:-------------------------|:-----------|:---------------------|
| `<input type="text">`     | value="字串"             | onChange   | event.target.value   |
| <textarea />              | value="字串"             | onChange   | event.target.value   |
| <select>                  | value="字串"             | onChange   | event.target.value   |
| <input type="radio" />    | checked=true or false    | onChange   | event.target.checked |
| <input type="checkbox" /> | checked=true or false    | onChange   | event.target.checked |
| <input type="button" />   | -                        | onClick    | event.target         |
| <input type="submit" />   | -                        | onSubmit   | event.target         |

上表的整理算是在 React 中使用表單的小總結。

### 受控與未受控元件

學習 React 表單之前，需要先了解什麼是 受控元件 (controlled components) 與 未受控元件 (uncontrolled components)。在 React 中，元件的視圖狀態是由元件的 props 與 state 所決定的，可以說資料決定了元件的狀態。

顯然，和輸入資料有關的表單元件和其自身的狀態有著密不可分的關係。若表單的資料是由 React 的狀態變更機制所決定的話，那麼這個表單就是一個受控的元件；例如，當輸入資料發生變化時，透過元件的 `setState()` 以新的資料來引發表單重新渲染，並呈現表單的最新資料。簡單來說，**如果一個輸入表單的值是由 React 所控制的話，那麼它就是一個受控的元件**。以撰寫程式碼的角度來看，如果你是透過表單元素的 props 來設定表單的 value (或 checked) 屬性的話，那麼它就是一個受控的元件。

反之，如果表單的資料是由 DOM 自身所維護的話，那麼這個表單就是一個未受控的元件 (不受 React 的機制控制)。對於未受控的元件而言，它的資料並非受元件自身的 state 或 props 所控制，通常需要透過 ref prop 從真實 DOM 找出其值。

在 React 的世界裡，應用程式的狀態必須受到良好的管理，因此以受控的方式來製作表單，能夠有效避免用程式出現難以掌控的局部零碎狀態；這種做法保持了應用程式的可控性，也是 React 官方所推薦的表單元件製作方式。另一種使用未受控的做法，通常被認為是一種反模式；但也有一派開發者認為，到底要採用受控或未受控的模式來設計表單，端看開發上的需求來採取合適的做法即可，兩者並沒有好壞之分。

#### 受控元件

典型上，HTML 的 `<input>`、`<textarea>` 和 `<select>` 等表單元素會由 DOM 來維護他們自身的狀態，並且依據使用者的輸入來更新狀態。而在 React 中，典型上的元件會以 state 屬性來維護它自身的狀態，而且只能用 setState() 來更新狀態。當我們在 React 中將這兩個概念結合在一起，便可以讓 React 元件的狀態符合單一資料來源的原則 (single source of truth)。總結來說，一個輸入表單元素，如果它的值是由 React 所控制的話，就稱之為一個受控元件。

一個受控表單的特徵是這樣的，它的 props 會接受一個 value 屬性來作為它的當前值，同時也會接受一個 callback 用來改變其值。這個 callback 通常是一個事件處理器，在偵測到輸入發生變化時，用來變更表單的狀態。下面是一個輸入表單元素的典型例子：

```javascript
<input type="text" value={someValue} onChange={handleChange}/>
```

因為事件處理器將會變更元件的狀態，所以表單的輸入值就必須要存活在元件的 state 之中 (或是存活在應用程式某個儲存 state 的地方)，儲存在 state 中的某個值，也恰好會是 props 的 value 屬性值。

底下程式碼至一個比較完整的表單實作範例：

```javascript
class MyInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  
  handleTestChange(event) {
    let text = event.target.value;
    this.setState({text});
  }
  
  render() {
    return (
      <div>
        <input type="text" 
               value={this.state.text} 
               onChange={this.handleTextChange}/>
      </div>
    );
  }
}
```

這樣表示表單的資料和視圖總是能夠保持同步，表單所顯示的值會在使用者輸入內容的時候隨之改變。

這裡很清楚看到，一個受控元件每次的狀態變化都和一個事件處理函數有關。這使得要修改或驗證使用者的輸入變得很值觀，而且表單元件也能夠即時地對輸入做出反應，像是輸入資料的驗證、強制輸入資料格式等等。例如，若我們想要將輸入的 text 內容同步地轉換成大寫字母:

```javascript
handleTestChange(event) {
  let text = event.target.value.toUpperCase();
  this.setState({text});
}
```

接下來我們將這個例子寫的完整一點，MyInputForm 的實例將渲染出一個 `<form>` 表單，讓使用者在按下表單提交的時候可以將他所輸入的 text 內容印出來。這裡運用 `<input type="submit">` 的輸入元素以及 `<form>` 的 onSubmit 屬性來指定提交事件的處理器。

```javascript
class MyInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(event) {
    let text = event.target.value;
    this.setState({text});
  }

  handleSubmit(event) {
    alert("Text: " + this.state.text + " is submitted");
    event.preventDefault();
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <label>
                  Text:
                  <input type="text"
                         value={this.state.text}
                         onChange={this.handleTextChange}/>
              </label>
              <input type="submit" value="Submit"/>
          </form>
      </div>
    );
  }
}
```

#### 未受控元件

對於 HTML 的 `<input>`、`<textarea>` 和 `<select>` 等表單元素，它們自身的狀態會由 DOM 來自動維護，因此 DOM 會自己記住你所輸入的東西。這裡同樣先以一個輸入元素為例：

```javascript
render() {
  return <input type="text"/>;
}
```

這段程式碼所渲染的僅僅是一個典型的 HTML 輸入表單元素。簡單來說，如果一個表單元素的 props 並未帶有 value 屬性 (或是 checked 屬性) 的話，那麼它就是一個未受控的元件。當你在瀏覽器中對它輸入值的時候，它所顯示的值也會隨著你的輸入而產生變化，它在 DOM 的層級維持了 source of truth。這表示，雖然畫面上的輸入值會隨著使用者輸入而改變，但如果我們在 React 的層級拿不到它的值，那麼一個未受控的元件就沒有什麼用處了。在 React 中，你可以透過 ref prop 取得元素在真實 DOM 裡的當前值。

我們用上一節的程式碼作範例，只不過現在改用未受控的方式來撰寫表單元件：

```javascript
class MyInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("Text: " + this.textInput.value + " is submitted");
    event.preventDefault();
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <label>
                  Text:
                  <input type="text"
                         ref={(input) => this.textInput = input}/>
              </label>
              <input type="submit" value="Submit"/>
          </form>
      </div>
    );
  }
}
```

這個範例使用了未受控的方式所實作，達到的效果和受控的方式一樣。

這裡要引起讀者注意的是，較早的 React 版本讓開發者可以為元件設定 ref 為字串，再從 this.refs 物件以此字串為鍵來索引出元件在 DOM 中的參照。不過這種方法存在一些缺陷，因此新版的 React 已經建議讓開發者改用如上面範例的回調式 ref 來處理元件在 DOM 的參照，並且宣布可能在為了的某個版本就會將字串式 ref 的支援給拿掉。所以此處就不再以字串式 ref 來撰寫範例了。

未受控元件通常可以用在**不需要任何驗證**或**輸入控制**的表單之中。由於未受控元件在 DOM 維持了 source of truth，因此使用它可以讓某些需要整合 React 跟 non-React 程式碼的情況變得容易一些。雖然使用未受控元件來實作表單通常會有比較少的程式碼，因此製作起來會感覺比較快。但是使用未受控元件可能會帶來應用程式局部狀態的管理問題，因此在一般的情況下，React 官方建議都應該使用受控元件來製作表單。

### Default Values

對於受控的表單元件，其初始值只要透過初始的 state 來設定即可。而對於未受控的表單，你可能會想要讓 React 來指定它的初始值 (預設值)，然後將後續的更新動作交給未受控的行為來自動處理。對於這種情況，你可以在撰寫 React 程式碼時直接透過表單元件 props 的 defaultValue (或 defaultChecked) 屬性來指定預設值。

```javascript
render() {
  return <input type="text" defaultValue="Hello World"/>;
}
```

對於 `<input>` 的 checkbox 和 radio 類型而言，預設值可透過 props 的 defaultChecked 屬性加以設定。

這裡要附帶說明一點，defaultValue 與 defaultChecked 只會在元件初次渲染時會使用到，後續的值就由未受控元件自身去管理了。對於受控元件而言，表單的初始值可在建構式中直接設定於 state 物件上 (ES5 寫法則透過 getInitialState 方法傳出初始 state 物件來完成)。

### 受控與未受控元件的比較

受控元件。受控元件將會涉及一個事件發生時的回呼函數 (事件處理器)，用以變更元件的狀態：

```javascript
<input type="text" 
       value={this.state.text}
       onChange={this.handleTextChange}/>
```

未受控元件：

```javascript
<input type="text"
       defaultValue={this.state.text}
       onChange={event => this.setState({text: event.target.value.toUpperCase()})}/>
```

雖然這個未受控的輸入表單元素的 defaultValue 使用了 this.state.text 來設定，但它只會在元件初次渲染的時候會使用到；另外，因為 props 不存在有 value 屬性，因此這個輸入元素的值將由 DOM 管理，而不由 React 來管理。所以，就算掛上了 onChange 事件處理器，也沒有辦法將輸入表單元素的值更改為大寫字串。

至此，相信你對受控與未受控元件已經相當有感覺了。接下來看看 `<textarea />`、`<input type="radio" />`、`<input type="checkbox" />` 以及 `<select>` 這幾個表單元素。

#### 文字框 `<textarea />`

文字框 <textarea /> 元素是由它的 children 來決定文字內容的：

```javascript
<textarea>
  You can put some text in a text area.
</textarea>
```

這裡要請讀者注意的是，在 React 中 `<textarea>` 被改成更像 `<input />`，因此它的用法和 `<input type="text" />` 也很類似，同樣可以透過 props 的 value 屬性來表示表單元素的值。

另外，textarea 標籤在沒有 children 的時候可以使用自閉合的語法 `<textarea />`。當 <textarea /> 做為未受控元件使用時，也可以利用 defaultValue 來為其設定設定值。由於 props 已有 value 或 defaultValue，因此當你使用它們來設定文字框的值時，就不應該再使用 children 了。

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'input here'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({value});
  }

  handleSubmit(event) {
    alert(`Your name was submitted: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <label>
                  Your Name:
                  <textarea
                          value={this.state.value}
                          onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit"/>
          </form>
      </div>
    );
  }
}
```

#### 單選按鈕 `<input type="radio">`

radio 類型與 checkbox 類型的表單元素，value 值一般不會變化，主要是透過 props 的 checked 屬性 來表示選項的選取狀態。

```javascript
class MyRadioInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {radioValue: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let radioValue = event.target.value;
    this.setState({radioValue});
  }

  render() {
    return (
            <div>
                <label>boy:
                    <input type="radio"
                           value="boy"
                           checked={this.state.radioValue === 'boy'}
                           onChange={this.handleChange}/>
                </label>
                <label>girl:
                    <input type="radio"
                           value="girl"
                           checked={this.state.radioValue === 'girl'}
                           onChange={this.handleChange}/>
                </label>
            </div>
    );
  }
}
```

#### 複選框 `<input type="checkbox">`

```javascript
class MyCheckboxInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favFood: ['sandwich']};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let {favFood} = this.state;
    let {checked, value} = event.target;

    if (checked && favFood.indexOf(value) === -1) {
      favFood.push(value);
    } else {
      favFood = favFood.filter(item => item !== value);
    }
    
    this.setState({favFood});
  }

  render() {
    let {favFood} = this.state;
    return (
            <div>
                <label>sandwich
                    <input type="checkbox"
                           value="sandwich"
                           checked={favFood.indexOf('sandwich') !== -1}
                           onChange={this.handleChange}/>
                </label>
                <label>rice
                    <input type="checkbox"
                           value="rice"
                           checked={favFood.indexOf('rice') !== -1}
                           onChange={this.handleChange}/>
                </label>
                <label>noodle
                    <input type="checkbox"
                           value="noodle"
                           checked={favFood.indexOf('noodle') !== -1}
                           onChange={this.handleChange}/>
                </label>
            </div>
    );
  }
}
```

#### 下拉式選單 `<select>`

一個典型的 HTML 下拉式選單看起來像下面這樣：

```html
<select>
  <option value="apple">apple</option>
  <option value="banana">Banana</option>
  <option selected value="cherry">Cherry</option>
  <option value="papaya">Papaya</option>
</select>
```

HTML 的 `<select>` 元素有單選和複選兩種類型，這可以透過 multiple 屬性來加以設定：

```html
<select multiple>
  <option value="apple">apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
  <option value="papaya">Papaya</option>
</select>
```

在 React 中，同樣可以設定 `<select />` 元素 props 的 multiple 屬性來實現一個複選下拉式選單，例如 `<select multiple={true}>`。在說明 multiple 屬性之前，有件事情需要先請讀者留意，那就是 React 和 HTML 處理被選取選項方式有很明顯的不同。HTML 是使用 `<option>` 的 selected 屬性，而 React 則是使用 <select> 元素 props 的 value 屬性來表示被選取的選項。React 官方不建議使用 `<option>` 的 selected 屬性來指定被選取的選項 (但可以透過檢查一個 <option> 的 selected 屬性來確認它是否被選取)，若使用將會引發警告。

```javascript
<select value="B">
  <option value="A">Apple</option>
  <option value="B">Banana</option>
  <option value="C">Cherry</option>
</select>
```

複選：

```javascript
<select multiple={true} value={['B', 'C']}>
  <option value="A">Apple</option>
  <option value="B">Banana</option>
  <option value="C">Cherry</option>
</select>
```

接下來看單選和複選下拉式選單比較完整的範例。