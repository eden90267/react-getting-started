## 元件的重新渲染

當一個元件經初次渲染之後，便進入了存在期，而在元件存在期所涉及的便是元件更新(重新渲染)。有三個方法能夠觸發元件的重新渲染，分別是 setProps、setState 與 forceUpdate。

### setProps

React 0.13 版本以前，元件的 props 可以透過元件的 setProps 方法來進行變更，但此方法在 0.14 版本已標記為過時，0.15 版本正式被移除。這裡仍提及 setProps 方法的目的在於提醒讀者此一變化。

由於 React 單向資料流的特性，元件的資料來源皆從父元件所投入，當父元件重新渲染時，也會一併引發子元件的重新渲染。所以以程式碼角度看來，setProps 這樣的實例方法似乎沒有絕對的必要。要變更 props 的話，直接以新的 props 再一次呼叫 ReactDOM.render 即可。官方建議，如果你還是需要 setProps 的話，那麼請自己在元件上實作這個方法，而這方法只是對 ReactDOM.render 的一層包裏而已。

### setState

#### 原型

- setState(stateChange[, callback])
- setState(updater[, callback])

#### 說明

當元件的狀態需要變更時，開發者必須呼叫元件的 setState 方法來執行變更，而不是直接修改 this.state 的值。它大概是所有 React 開發者最常使用的方法了！它也是觸發 UI 更新的主要方法。我們在前面的生命週期中也看到了，除非本次渲染週期中的 shouldComponentUpdate() 傳回 false，不然執行 setState() 就總是引發重新渲染。

在 React v15 版本的中期以前，setState 方法的函數簽署為 setState(fuction | object nextState[, callback])，意指 setState 方法的一個參數可以接受一個函數或是一個 nextState 物件。在 React v15 最新穩定版本及 v16 起，官方文件將 setState 根據第一個參數是函數或物件分開說明。此外，最新文件也將舊的 nextState 這個參數名稱改成了 stateChange。相信對有 React 經驗的開發者會同意對 setState 的最新官方文件說明與用法是更加清晰的。

要正確運用 setState，認識它的行為是絕對必要的。setState 是一支非同步的方法，有沒有注意到 setState 方法最後是一個可選的 callback 函數呢? 這是非同步函數一個很典型的簽署，只是我們在使用 setState 或是閱讀文件的多數時候，很少有機會看到在最後一參數投入 callback 的情況，這在程式碼的書寫上造成了 setState() 的執行是同步的錯覺。

因為 setState 的行為是非同步的，當我們執行它的時候，元件的 state 並不保證會立即被更新 (有時會，有時不會)。這是因為每次執行 setState() 的時候，React 會將此次變更安排進一個佇列之中，在稍後才將佇列中的一批 (batched) 變更，一口氣地執行更新，藉此提升效能。因此這裡的陷阱是，當執行 setState() 之後就馬上讀取 this.state 的話，你還是有可能拿到還未經過變更的值，因而造成城市臭蟲，開發者不得不慎。

- setState(stateChange[, callback])

當投入 setState 的第一個參數是 stateChange 物件的時候，React 在執行變更時後會將目前的 state 與新的 stateChange 進行淺層合併為一個新的物件，也就是將 stateChange 合入 state 之中。stateChange 物件可以內含 0 個或多個欲更新的鍵值對，看起來會像下面這樣：

```javascript
this.setState({
  myKey: 'my new value',
  quantity: 8
});
```

由於 setState 方法是非同步的，因此在同一個渲染週期之中多次呼叫它的話，那麼多個變更可能會被組合起來，因此遇到多個相同鍵的屬性時，新值將會直接取代掉舊值，故對於相同鍵的多次變更，React 實際上很可能只會以最新的那個來實施更新。例如：

```javascript
this.setState({quantity: state.quantity + 1});
this.setState({quantity: state.quantity + 1});
this.setState({quantity: state.quantity + 1});
```

但，React 內部可能會以下列方式來進行合併：

```javascript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1}
)
```

這會使得較新的變更會往前合併而覆蓋較早的變更，因而讓 quantity 只會往上加 1 而非加 3。不過，到底 state 會如何被更新還是取決於 React，有時候 setState 時狀態值馬上被更新了，但有時候又不會，使得上面這種做法失去了預設性，讓程式變得很不保險。

從這裡我們也可以看到，React 將參數名稱從 nextState 改成 stateChange 的用意。第一是傳達了在一個渲染週期中的新 state 是可以透過呼叫多次 setState 將不同的變更物件片段合併起來的；第二則是避免開發者被 nextState 的字面意義給誤導，因 next 字眼容易讓人覺得有累積推進的效果。

以同一案例來說，如果必須在同一渲染週期中透過多次呼叫來累計 quantity 的值，那就得以另外一種方式來使用 setState，從第一個參數傳入一個 updater 更新函數。

- setState(updater[, callback])

首先看一下 updater 函數的簽署如下：

```javascript
function (prevState, props) {}
```

它接受兩個參數，一個是上一個狀態 prevState 以及當前的 props。它是一支同步函數，並且應該傳出新的下一個狀態 nextState。

過去官方文件將儲出的狀態物件稱為 newState，但目前新的文件已經將這字眼換成 nextState。這樣目的已經不言自明，因為這提示了開發者會使用 updater 在同一個渲染週期之中來進行狀態變更，這個變化是有累績效果的。原因是，React 同樣會將 updater 安排近一個佇列之中，不過在真正執行變更的時候，每一個 updater 函數都將被忠實地執行。React 在執行一個 updater 函數之時，會將最新的 prevState 以及 props 傳給 updater。你可以把 prevState 想像成一個狀態片段，這個狀態片段可以將一次次 updaters 執行後的改變累積下來，最終再與當前的 state 合併起來。

因此，以剛剛 quantity 的例子而言，可以將程式修改如下，那麼在同一個渲染週期中多次呼叫 setState 的變更就能夠有累積效果：

```javascript
this.setState(function (prevState, props) {
  return {quantity: prevState.quantity + 1};
});
this.setState(function (prevState, props) {
  return {quantity: prevState.quantity + 1};
});
this.setState(function (prevState, props) {
  return {quantity: prevState.quantity + 1};
});
```

如果 quantity 的累積量是由 props.step 屬性值決定的話，那麼 updater 看起來會像以下這樣：

```javascript
this.setState(function (prevState, props) {
  return {quantity: prevState.quantity + props.steo}
});
```

而開發者在呼叫 setState 方法時，可在第二個參數投入一個 callback，這個 callback 會在 setState 確實執行且元件也完成重新渲染之後被呼叫。通常，如果有什麼邏輯是需要在確認狀態完成變更後執行的話，官方建議將邏輯寫在 componentDidUpdate 方法之中，而不是寫在這個 callback 裏頭。