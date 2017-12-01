# Chap 10. Flux 與 Redux

> Flux 基本介紹  
> Redux 基本介紹  
> Redux 安裝與使用  
> 定義行為 (Action)  
> 設計歸納器 (Reducer)  
> 拆分歸納器 (Reducer)  
> 實作儲存器 (Store)  
> React 與 Redux 結合  
> 非同步資料流

在 React 中，元件不是單獨存在的，在元件之間會有資料的流動，而且這個資料的流動只能從父元件傳遞給子元件，因此我們稱之單向資料流。當 React 應用越做越複雜，可能會遇到動態資料的處理、儲存資料和更新資料，此時就需要更好的架構來管理資料流，並讓程式邏輯更容易預測和了解。本章目標在於介紹資料流的應用程式架構。

## Flux 基本介紹

Flux 是 Facebook 用於建構客戶端網頁應用的應用程式架構，其特色在於它實現了單向資料流的應用程式架構，它不是框架或模組，它是一種模式，它是一個**描述單向資料流**、**搭配特定事件和註冊監聽的設計模式**，在開發複雜的大型應用時，我們可以使用 Flux 來更容易的管理元件的 state。

Flux 的應用主要會包含四個部分：

- 分派器 (Dispatcher)

  分派器是整個 Flux 架構的核心，每個 Flux 的應用中，只會有一個分派器，它主要負責將應用程式所發生的行為 (Action) 及其資料 (Payload) 透過事件來分派給儲存器 (Store)。

  分派器設定很簡單，其中有兩個功能為重要的核心，分別為註冊 (Register) 和分派 (Dispatch)，若儲存器想要收到行為 (Action) 的事件，就必須透過註冊功能向分派器登記；當行為發生時，透過分派功能將行為的事件及其資料發送給所有註冊的儲存器。

  Facebook 官方提供一個分派器的模組：[https://github.com/facebook/flux](https://github.com/facebook/flux)

- 行為 (Action)

  每當有應用程式有來自使用者介面的操作或是來自伺服器端的資料更新，在 Flux 應用裡，我們會將行為傳遞給分派器來間接更改 state。反過來說，如果想要改變 state 的話，就只能透過行為。

  根據應用而定，每個不同的操作和資料更新會定義到不同的行為，而這些行為其實只是一個描述其動作的物件。一般來說，行為的物件中會帶有兩個屬性，分別為類別 (type) 與資料 (payload)，類別是用來區分所觸發的行為，而資料則是行為所夾帶的資料。

- 儲存器 (Store)

  儲存器是狀態與邏輯的容器，它負責監聽來自分派器 (Dispatcher) 的行為 (Action) 事件，根據開發者設計的邏輯來更改狀態，並且讓視圖 (View) 取得狀態來改變它的 state。

  在一個應用程式當中，通常會有許多的儲存器，每個儲存器管理不同的狀態，它們都需要向分派器註冊，並且定義特定行為的業務邏輯。這樣當分派器將行為事件發送給儲存器時，儲存器就會根據開發者所設計的業務邏輯，來更改儲存器內部儲存的狀態。當儲存器的狀態改變時，它會發出改變事件通知視圖，而為了讓視圖能取得 state 所需的資料，儲存器還需要提供取得狀態的方法。

- 視圖 (View)

  Flux 中的視圖就是 React 的元件，元件需要監聽儲存器的改變事件，當有改變事件發生時，元件再從儲存器取得狀態來更新元件的 state 並渲染，接著可以透過子元件的 props 屬性，來將狀態傳遞給子元件，讓子元件也跟著重新渲染。

這裡用 Todo list 作為例子：

1. 當使用者透過 view 點選元件企圖新增一個待辦事項，會產生一個 action，而這個 action 會將新增代辦事項的類別與資料傳遞給 dispatcher
2. dispatcher 接收到 action 後，會將 action 分派給所有註冊的 store
3. 當 store 接收到行為後，根據開發者設計的邏輯，將內部狀態改變，並且發出改變事件
4. 元件接收到改變事件時，透過 store 提供的方法，取得最新的狀態來改變 state，讓元件重新渲染，此時 View 就會出現使用者所新增的待辦事項

以下是節錄至官方 flux 應用程式的流程圖：

![](https://github.com/facebook/flux/raw/master/docs/img/flux-diagram-white-background.png)

這裡可能會有個疑問，為何我們不直接使用元件來接收行為的事件，還要額外透過一個儲存器呢？這是為了將業務邏輯抽離出來，讓 React 元件只單純的負責渲染，以達到模組 - 視圖 - 控制器 (Model-View-Controller) 的分離。Flux 只是將 React 原本就能做到的事情，進一步往上抽象成幾個各司其職的單元。

Flux 的架構在實作上有些地方可以精簡和改善，因此延伸許多以 Flux 架構為基礎延伸的實作，例如 Redux、Reflux、Alt 等。接下來會帶大家認識 Redux 這一個 Flux 的實作，並使用一個應用程式做練習。

## Redux 基本介紹

Redux 是根據 Flux 架構延伸的實作，它希望提供一個**可以預測的狀態管理容器**，讓開發者可以更容易的開發複雜的大型專案。Redux 保留了 Flux 架構的優點，並改善了 Flux 的複雜性。那為什麼選 Redux？主要是 Redux 概念簡單、擁有完善的開發工具 (devtools)，以及擁有眾多的開發者。

這裡敘述 Redux 與 Flux 最重要的四點不同之處：

- 增加歸納器 (Reducer)

  在 Redux 中，當我們要讓 store 中的 state 依照 action
  來改變時，必須要透過 reducer，它需要傳入當前的 state 與
  action，接著根據開發者設計的邏輯，回傳新的 state，簡單來說 reducer
  的工作就是在決定當發生行為時，應用程式的 state 該如何去做改變。

- 刪除分派器 (Dispatcher)

  Redux 沒有 dispatcher 的概念，取而代之將 action 分配的工作交給 store
  來做，因此我們可以在元件中直接呼叫 store 的分派方法，來將 action
  分配給 store。

- 單一資料源

Flux架構中會有許多儲存不同狀態的 store，但 Redux 的應用程式只用一個
store，並將所有狀態儲存在一個物件中。如果想要把資料處理邏輯拆分，可以設計多個
reducer，並將他們組合起來，而不是使用多個 store。

- 用回呼函數取代事件發射

  當 store 中的 state 改變時，Redux 的 store
  並不會發射改變事件，而是呼叫元件透過訂閱方法所傳入的回呼函數

這裡一樣用一個 Todo list 做例子：

1. 當使用者透過 view 元件新增一個代辦事項，此時就會產生一個
   action，並透過 store 的分派方法，將包含新增代辦事項類別與資料傳遞給 store
2. store 接收到 action 後，會將當前 state 與 action 傳遞給
   reducer，reducer 就會根據開發者設計的邏輯行為回傳新的 state 給 store
3. 接著 store 利用 reducer 所回傳的 state，取代 store 原先的
   state，並且呼叫所有元件訂閱的回呼函數
4. 元件在訂閱方法的回呼函數中，透過 store 提供的方法取得 store 新的
   state，並根據 store 新的 state 來改變元件中的
   state，讓元件重新渲染，此時 view 中就會出現使用者所新增的代辦事項

以上就是 Redux
應用中一次完整的資料傳遞。根據上面例子，我們可以整理出簡單的 Redux 流程圖：

![](https://imgur.com/OZBouIo.png)

Redux 架構實作起來相較於 Flux 架構簡單許多，要完成一個 Redux 的應用程式，你只需要做好以下三件事：

- 定義 Action
- 設計 Reducer
- 實作 Store

## Redux 安裝與使用

我們根據第 9 章節介紹的步驟來建置環境，實作範例在此：[https://github.com/eden90267/redux-todolist](https://github.com/eden90267/redux-todolist)

```shell
npm i redux -S
```

這裡介紹 redux 模組提供了哪些 API 給開發者使用：

### createStore(reducer, [preloadedState], [enhancer])

createStore 是用來產生 Redux 應用程式中的 store，createStore() 第一個參數要傳入開發者所設計好的 reducer，若是有多個 reducer，則需要使用 combineReducers() 將 reducer 組合後再傳入；第二參數可以選擇是否傳入預設載入的 state；第三個參數可選擇第三方功能來增強應用程式的功能，例如 middlewares。此方法會回傳一個 store 的實例。

### combineReducers(reducers)

當應用程式有多個 reducers，我們就要透過 combineReducers() 來將 reducers 組合成單一個。combineReducers() 要傳入的參數是一個物件，物件的每一個值對應的不同的 reducer，而 key 的名稱將會決定最終 state 的形狀，例如：

```javascript
combineReducers({
  foo: fooReducer,
  bar: barReducer
});
```

而最後 store 所產生的 state 將會包含 foo 與 bar 兩個 key，而它們的值則是對應到其 reducer 所回傳的值：

```javascript
{
  foo: {...},
  bar: {...}
}
```

### applyMiddleware(...middlewares)

若想要使用 Middleware，在建立 store 時，我們要先將設計好的 Middleware 傳入 applyMiddleware()，然後再將 applyMiddleware() 回傳的函數傳入 createStore() 中。

applyMiddleware() 要傳入的參數沒有限制數量，需要多少 Middleware 就將它們全部都傳入，而每個 Middleware 會接收到 store 分派的 action 和 getState 的函數，並且 Middleware 需要回傳一個函數，這個函數將會接收到下個 Middleware 的分派方法，我們可以在 Middleware 中呼叫下個 Middleware 的分派方法，並將 action 傳入，這樣行為就會傳遞給下個 Middleware，直到最後一個 Middleware 呼叫分派方法時，才會將行為傳遞給 reducer。

### bindActionCreators(actionCreators, dispatch)

bindActionCreators() 是用來將行為產生器 (ActionCreators) 與分派方法結合，它所需要傳入的第一個參數是一個 actionCreator，或是包含多個 actionCreator 的物件，第二個參數是 store 的分派方法，如果傳入的是單一個 actionCreator 的函數，bindActionCreators() 將會回傳一個組合好的函數；若是傳入包含多個 actionCreator 的物件，bindActionCreators() 將會回傳一個模仿原始物件的物件，但是每個值都會是組合好的函數。

### compose(...functions)