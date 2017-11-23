# Chap 07. 元件的生命週期

> 元件的生命週期  
> 生命週期中的方法  
> 元件的重新渲染  
> State 與生命週期範例

本章將討論 React 元件從誕生開始一直到消亡之間所經歷的過程。本章也會對元件 setState 實例方法的行為進行詳細的說明。最後援引 React 官網所提供的一個時鐘範例並稍做修改，用以觀察 React 元件的一生。

## 元件的生命週期

在 React 中，每個元件從誕生到其消亡的歷程稱之為元件生命週期，概略可分成誕生期、存在期和消亡期。

- 誕生期：元件的掛載(mounting)
- 存在期：元件的更新(updating)
- 消亡期：元件的卸載(unmounting)


在不同的週期中，React 為元件準備了幾個鉤子函數 (hooks)，或稱為生命週期方法，開發者可以在建立元件時宣告或覆寫 (override) 這些方法，以便在**元件生命週期中某個階段執行特定的程式碼**。了解生命週期中的每個方法，可以讓開發者知道如何在**元件被建立與銷毀時執行一些操作**，同時也讓開發者**有機會觸及 props 與 state 更新的過程**。在**處理效能的問題**方面，認識生命週期方法是必要的基礎。

React 對生命週期方法的命名慣例：

- 某事情發生之前被呼叫：will 為前綴，componentWillMount
- 某事情發生之後被呼叫：did 為前綴，componentDidMount

下圖整理出一個 React 元件生命週期不同階段的歷程：

![](https://imgur.com/YwmNuCd.png)

### 誕生期

一個元件的誕生所涉及的即是從它的實例產生開始，將它渲染到 Virtual DOM，以及最後 React 將它掛載到 Real DOM 的歷程。

在整個歷程中，元件的幾個方法將會被 React 所呼叫，首先是 getDefaultProps() 與 getInitialState()，這兩隻方法是元件建構式中最早被呼叫的方法，它們用於初始化一個元件實例的 props 與 state。接著，componentWillMount() 被呼叫，這代表 React 正準備將它掛載至 Virtual DOM。

隨後 render() 被呼叫，元件實例就會由 React 掛載到 Virtual DOM 之中。React 會在適當的時機並且經過一些演算之後，將元件真正地掛載到 Real DOM 之中，componentDidMount() 會在元件被正式掛載到 Real DOM 之後馬上被呼叫。在 componentDidMount() 被呼叫後也就確立了在 Virtual DOM 中的實例元件在 Real DOM 中已經產生了對應的實體。

### 存在期

一個元件誕生後，便進入了存在期。一個元件大部分時間都處在這個期間，存在期所涉及的是元件的更新，而更新是透過設定 props 或 state 所產生的變化來引發。

當元件的更新來自於 props 的變化，那麼元件的 componentWillReceiveProps() 將首先被呼叫，接著 React 呼叫 shouldComponentUpdate() 依據它所回傳的布林值已決定是否應該繼續往下執行元件的重新渲染。

如果元件更新是來自於 state 的變化，那麼首先被呼叫就直接是 shouldComponentUpdate() 這個生命週期方法。如果  shouldComponentUpdate() 傳回 false，那麼元件會維持現狀；如果是 true，那麼 React 會繼續往下呼叫元件實例的 componentWillUpdate()，接著再呼叫一次 render() 來重新渲染 Virtual DOM 中的元件實體。

同樣地，React 會在適當的時機並且經過一些演算之後，將更新應用到該元件在 Real DOM 中的對應實體。隨後 componentDidUpdate() 將被呼叫，此時元件實例在 Virtual DOM 與 Real DOM 中的實體之間即同步完成，有了一致的對應。

這裡必須提醒的是，render() 渲染方法所實施的對象是 Virtual DOM 上的實體，而 Real DOM 上的實體則由 React 本身來負責處理。React 建議開發者不要自己直接操作 Real DOM，以免影響元件在 Virtual DOM 與 Real DOM 中實體的同步性；假若真的需要操作 Real DOM 不可，那麼開發者就必須要注意同步性的問題。

### 消亡期

元件誕生後，不一定會隨著應用程式持續存活。一旦它不再被需要，那麼就是它走向消亡的時候了。消亡期所涉及的是元件的卸載，那些應該被銷毀的元件會由 React 負責在 Virtual DOM 與 Real DOM 中處理。當 React 決定要銷毀一個元件時會呼叫其生命週期方法 componentWillUnmount()，開發者可在此函數進行一些清理工作，例如清除定時器等等。隨後，元件就會正式被 React 銷毀。

## 生命週期中的方法

### getDefaultProps()

此方法只會在 Class 建立的時候被呼叫一次，它的用途是為此類別實例產生預設的 props，因此 props 的預設值會被 cache 起來。這個方法中不可以使用任何與實例相關的數據。如果使用 ES6 的 Class 寫法，可以將 props 的預設值寫在 Class 的 defaultProps 靜態屬性上。

### getInitialState()

此方法只會在每個實例建立時被呼叫一次，此方法用途在於初始化實例的 state。在此方法中，你可使用 this.props。這裡對於 state 資料的提醒是，任何可以透過計算而求得的值，都不應該作為 state 以避免資料同步問題。如果沒有資料同步的考量，那麼 state 才可以使用 props 提供的資料。

如果使用 ES6 的 Class 寫法，可在建構式直接將狀態預設值指定給 this.state。

### componentWillMount()

此方法在元件被掛載到 Virtual DOM 之前被執行，也就是在元件的 render() 方法被呼叫之前執行，在這方法設定 state 並不會觸發元件的重新渲染，從另一方面來說，這個方法提供了一個讓你在元件被渲染之前再次修改 state 的最後一次機會。此外，須注意要避免在這個方法中引入具有副作用的程式碼。

### render()

此渲染方法會為此元件在 Virtual DOM 之中建立起對應的節點實體。在此方法內，嚴禁改變元件的 state 與 props。若該元件已存在於 Real DOM 中的話，也嚴禁修改元件在 Real DOM 的實體。此方法可傳回 null、false 或 React 元件。如果是傳回 React 元件的話，所傳回的結果必須是一個頂級元件。所有求值計算與視圖邏輯，均在此方法中實作。

### componentDidMount()

此方法在元件被掛載到 Real DOM 之後立即被呼叫。一些需要運用到 DOM 節點的初始化工作，都應該在此處進行。又或者，若 DOM 節點所需的資料需要從遠端載入的話，那麼此處是一個可以發起網路請求的好地方。在這個方法內設定 state 的話，將會觸發元件的重新渲染。

這個方法只會在元件初次渲染時被執行一次，生命週期過了此點之後，元件就會真正有對應的 Real DOM 節點可以被存取到。在這階段由於 Real DOM 節點已經產生了，因此可以透過一些方法來直接獲取元件的 Real DOM 節點。

因為在此階段已經可以取得 Real DOM 節點，故所有使用 Real DOM 的第三方函數庫 (例如 jQuery) 都可以在此階段使用。不過對於獲取 Real DOM 節點的方法這裡要進行一些補充，在 React 0.13 版本以前可以使用 this.getDOMNode() 或 this.refs.foo.getDOMNode() 來完成。在 React 0.14 版本中 getDOMNode 已標示過時但仍可使用，請改用 ReactDOM.findDOMNode(this) 或 ReactDOM.findDOMNode(this.refs.foo) 來取得 Real DOM 中的節點。但在 React 0.15 版本中 getDOMNode 已經被正式拔除。另外，在 React 0.14 版本之後，透過 refs 所參照的實體直接就是 Real DOM 節點了，所以開發者可以直接運用元素的 ref 以備之後用於獲取 Real DOM 節點。

### componentWillReceiveProps(nextProps, nextContext)

元件的 props 在任何時刻都可以透過它的父元件來進行修改，而此方法則會在元件準備接收新的 props 之前被呼叫。如果你需要根據 prop 的變化來決定更新 (例如重置它)，你可在此進行 this.props 和 nextProps 的比較，並在此方法內使用 this.setState() 來引發狀態轉移。在這個方法中，你將有機會更改 props 與更新 state。此方法中呼叫 this.setState() 可以引發狀態轉移，但不會觸發另一條額外的渲染流程。

這裡要注意的是，當父元件連帶引發子元件重新渲染的時候，即使 props 沒有任何變化，React 還是可能會呼叫此方法。因此，若你想處理這些變化，就需要自己比較 props 的當前值與新值。React 只會在元件某些 props 可能變更的時候才會呼叫這個方法，在元件初次被掛載的時候，React 並不會以初始的 props 來呼叫此方法。

此外，呼叫 this.setState 通常不會觸發 componentWillReceiveProps 方法的呼叫。因此，新的 props 可能引發 state 的改變，但是 state 的變更沒有辦法引發 props 的改變。如果要對 state 變化做出一些相應的操作，可以在後面將看到的 componentWillUpdate 方法中完成。

### shouldComponentUpdate(nextProps, nextState, nextContext)

開發者可以透過 shouldComponentUpdate() 的回傳值來讓 React 知道，一個元件的輸出是否受到當前 state 或 props 的影響。當每次元件接收到新的 props 或 state 時，這個方法會在渲染之前被呼叫，它預設會傳回 true，因此 React 預設的行為就是執行重新渲染。多數情況大概都仰賴預設行為。在元件初次渲染或是執行元件的 forceUpdate() 時，這個方法並不會被呼叫。另外，請勿在此方法中呼叫 this.setState() 以避免元件陷入重新渲染的無限迴圈之中。

如果元件又含有子元件，當子元件的 state 發生改變時，此元件的 shouldComponentUpdate() 即使傳回 false 也不會避免子元件的重新渲染，它們各自的 shouldComponentUpdate() 是彼此獨立的。

目前當 shouldComponentUpdate() 傳回 false，那麼元件的 componentWillUpdate、render 以及 componentDidUpdate 方法通通不會被執行。不過這裡要注意一點，React 在未來可能會把 shouldComponentUpdate() 的傳回結果視為一種提示，而不再嚴格影響後續生命週期方法的執行。

如果你在進行效能分析 (profiling) 之後，發現有個元件的速度很慢，那麼你很有可能會想要讓你的元件繼承自 React.PureComponent，這個類別以 props 和 state 的淺層比較 (shallow comparison) 來實作 shouldComponentUpdate，所以有助於性能的提升。當然也可以自己進行 props 與 state 的比較來傳回 false 告訴 React 可忽略更新。

總之，這個生命週期正是可以讓你進行性能調校的地方。不過，多數情形你大概不太需要用到它，有效能瓶頸再利用它。

### componentWillUpdate(nextProps, nextState, nextContext)

當新的 props 或 state 接收到，且 shouldComponentUpdate() 也傳回 true，那麼 React 就會在元件準備重新渲染前呼叫它的 componentWillUpdate 生命週期方法。如果元件在真正被更新之前需要進行一些其他準備，那麼此處是個好地方。這個方法在元件初次渲染與 shouldComponentUpdate 傳回 false 不會被呼叫。

此外，這個方法應該用於為即將進行的更新做準備，請勿在此方法中呼叫 this.setState() 再次觸發更新，以避免元件陷入重新渲染的無限迴圈之中。如果你需要根據 props 的改變來發起 state 的更新，請在 componentWillReceiveProps 方法中完成。

### componentDidUpdate(prevProps, prevState, prevContext)

此方法會在元件的更新應用到 Real DOM 之後馬上被執行。元件的 Real DOM 節點和 Virtual DOM 節點也在此時同步完畢，因此在這裡，你也有機會透過 componentDidMount 所提到獲取 Real DOM 節點的方式，來對 Real DOM 節點進行操作。這個方法在元件初次渲染與 shouldComponentUpdate() 傳回 false 不會被呼叫。

類似在 componentDidMount 所提過的概念，componentDidUpdate 這個方法也是一個可以用來發起網路請求的好地方。你可在此處透過比較先前的 prevProps 和當前 this.props 的資料來決定是否需要進一步發起網路請求。

### componentWillUnmount()

此生命週期方法會在元件卸載和銷毀之前被執行。開發者可以在這個方法之中執行任何所需清理工作，像是清除計時器、移除監聽器、取消網路請求等等，或者清除掉之前在 componentDidMount 方法中所建立出來，卻不是由 React 所管理的 Real DOM 元素。

## 元件的重新渲染

當一個元件歷經初次渲染之後，便進入了存在期，而在元件存在期所涉及的便是元件的更新 (重新渲染)。有三個方法能夠觸發元件的重新渲染：setProps、setState 以及 forceUpdate。

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

### forceUpdate

#### 原型

component.forceUpdate(callback)

#### 說明

在大部分情況下，開發者在元件的 state 或 props 變化的時候引發元件的重新渲染。但有些時候，元件在渲染時所用到的資料可能既不是 state，也不屬於 props，又或者開發者就是想要強制再將元件渲染一次；這種特殊情況下，開發者可以呼叫 forceUpdate() 來告訴 React 這個元件需要重新渲染。正常來說，應該試著避免 forceUpdate() 的使用，請盡量使用一般的方式 (靠 state 和 props) 來試著重新渲染。

執行 forceUpdate() 將會引發元件的 render 方法被執行，但會直接跳過執行元件的 shouldCmponentUpdate() 生命週期方法這一道程序，這很正常，都要強制更新了。但要注意，元件所屬的子元件當然也會一併執行重新渲染，但是子元件的重新渲染同樣會遵照一般的流程，所以每個元件的 shouldComponentUpdate 同樣會被執行。

## State 與生命週期範例

這裡援引 React 官網的例子並稍微修改一下來做說明。

這裡我們撰寫一個 Clock 類別的 React 元件，然後在它的實例生命週期方法之中列出一些字串，方便觀察一個實例走過誕生期、存在期與消亡期的行為。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Clock</title>
</head>

<body>
  <div id="app"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.min.js"></script>
  <script type="text/babel" src="all.js"/>
</body>

</html>
```

```javascript
class Clock extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      date: new Date()
    };
  }

  componentWillMount() {
    console.log('[MOUNT] clock will mount.');
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>Hi, {this.props.visitor}! 現在時間是: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }

  componentDidMount() {
    console.log('[MOUNT] clock did mount');
    console.log('        > curent vistor: ' + this.props.visitor);
    console.log('        > set a timer to tick every second.');
    this.timeID = setInterval(() => this.tick(), 1000);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('[ALIVE] clock will receive props.');
    console.log('        > next vistor: ' + nextProps.visitor);
  }

  shouldComponentUpdate() {
    let shouldUpdate = true;
    console.log('[ALIVE] clock should update?');
    console.log('   > ' + shouldUpdate ? 'YES' : 'NO');

    return true;
  }

  componentWillUpdate() {
    console.log('[ALIVE] clock will update.');
  }

  componentDidUpdate() {
    console.log('[ALIVE] clock did update.');
    console.log('        > Tick-Tock!');
  }

  componentWillUnmount() {
    console.log('[UNMOUNT] clock will unmount.');
    clearInterval(this.timeID);
    console.log('       > Timer is cleared.');
  }
}

var Home = (<Clock visitor="John" />);

ReactDOM.render(
  Home,
  document.getElementById('app')
);

setTimeout(() => {
  Home = ( < Clock visitor = "Mary" / > );

  ReactDOM.render(
    Home,
    document.getElementById('app')
  );
}, 3000);

setTimeout(() => {
  Home = (
    <div>
      <h2>Clock is gone</h2>
    </div>
  );
  ReactDOM.render(
    Home,
    document.getElementById('app')
  );
}, 6000);
```

執行結果:

```
[MOUNT] clock will mount.
[MOUNT] clock did mount
        > curent vistor: John
        > set a timer to tick every second.
[ALIVE] clock should update?
YES
[ALIVE] clock will update.
[ALIVE] clock did update.
        > Tick-Tock!
[ALIVE] clock should update?
YES
[ALIVE] clock will update.
[ALIVE] clock did update.
        > Tick-Tock!
[ALIVE] clock should update?
YES
[ALIVE] clock will update.
[ALIVE] clock did update.
        > Tick-Tock!
[ALIVE] clock will receive props.
        > next vistor: Mary
[ALIVE] clock should update?
YES
[ALIVE] clock will update.
[ALIVE] clock did update.
        > Tick-Tock!
[ALIVE] clock should update?
YES
[ALIVE] clock will update.
[ALIVE] clock did update.
        > Tick-Tock!
[ALIVE] clock should update?
YES
[ALIVE] clock will update.
[ALIVE] clock did update.
        > Tick-Tock!
[ALIVE] clock should update?
YES
[ALIVE] clock will update.
[ALIVE] clock did update.
        > Tick-Tock!
[UNMOUNT] clock will unmount.
       > Timer is cleared.
```