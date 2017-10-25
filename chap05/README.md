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

我們現在對 DOM 的事件處理器附掛方式有了初步的了解。

