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