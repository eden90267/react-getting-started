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

ActionCreators 就是一個產生 action 的函數，因為有些 action 會帶有資料，而那些資料可能每次都不一樣，這樣在產生 action 的時候就必須要重複的建立 action 的物件，actionCreators 就是在簡化這個步驟，只需要將資料傳入，它就會自動產生一個 action 出來，下面舉一個簡單的例子：

```javascript
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}
```

這邊要注意，Redux 的 actionCreators 就只是單純的產生一個 action，產生出來的 action 必須再另外透過 store 的分派方法分派出去。在 Flux 架構中也有 actionCreators，但是它並不只是單純產生 action 而已，他會在 action 產生後直接將 action 分派出去。

### compose(...functions)

compose() 可以將傳入的函數從右到左組合起來，並回傳一個新的函數，這是為了方便 createStore() 傳入增強功能時，可能同時會有多種性質的功能要加入，而傳入 compose() 每個函數都會將左邊的函數所回傳的值當作傳入的參數。

接下來以 Todo List 為範例，來介紹如何時做一個 Redux 的應用程式。

## 定義 Action

actions/todoActions.js：

```javascript
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  };
}

export function changeTodoInput(text) {
  return {
    type: 'CHANGE_TODO_INPUT',
    text
  };
}

export function changeSearchInput(text) {
  return {
    type: 'CHANGE_SEARCH_INPUT',
    text
  };
}
```

## 設計 Reducer

state 的樣子：

```javascript
// state：
var state = {
  search: 'search something',
  todos: {
    todo: 'new todo input',
    list: ['foo', 'bar']
  }
};
```

決定好 state 的樣子後，我們就開始設計我們的 reducer。reducer 是一個純函數 (Pure function)，在 action 被分派時，store 會將 store 當前的 state 和 action 當作參數傳入 reducer 中，reducer 會計算出下一個 state 並且將它回傳。

reducers/todoReducers.js：

```javascript
const initialState = {
  search: '',
  todos: {
    todo: '',
    list: []
  }
};

function todos(state = initialState, action) { // 回傳 state 必須是一個完全新的一個 state 物件，而不是修改原本的 state 物件。
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          list: [...state.todos.list, action.text]
        }
      };
    case 'CHANGE_TODO_INPUT':
      return {
        ...state,
        todos: {
          ...state.todos,
          todo: action.text
        }
      };
    case 'CHANGE_SEARCH_INPUT':
      return {
        ...state,
        search: action.text
      };
    default: // 沒遇到定義的 action.type 時，直接回傳原本的 state
      return state;
  }
}

export default todos;
```

這裡將 actionCreator 的 action.type 匯出，並將 actionCreator 中的 action.type 改為對應的變數：

```javascript
export const ADD_TODO = 'ADD_TOTO';
export const CHANGE_TODO_INPUT = 'CHANGE_TODO_INPUT';
export const CHANGE_SEARCH_INPUT = 'CHANGE_SEARCH_INPUT';

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  };
}

export function changeTodoInput(text) {
  return {
    type: CHANGE_TODO_INPUT,
    text
  };
}

export function changeSearchInput(text) {
  return {
    type: CHANGE_SEARCH_INPUT,
    text
  };
}
```

並在 reducer 中將他們引入，這樣可以避免筆誤而引發的錯誤：

```javascript
import {ADD_TODO, CHANGE_SEARCH_INPUT, CHANGE_TODO_INPUT} from "../actions/todoActions";

// [ ...略 ]

function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          list: [...state.todos.list, action.text]
        }
      };
    case CHANGE_TODO_INPUT:
      return {
        ...state,
        todos: {
          ...state.todos,
          todo: action.text
        }
      };
    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        search: action.text
      };
    default:
      return state;
  }
}
```

專案更複雜，我們也可以將 action 的 type 用另外一個檔案來管理。過於簡單的話用字串表示就好了。

## 拆分 reducer

當遇到龐大且複雜的應用程式，它所要處理的 action 就會越來越多，這時候就可將 reducer 拆分管理。

那該依據什麼來拆分？我們會依據 state 來拆分，第一個管理與 todos state 相關的行為；第二個管理與 search state 相關的行為。現在我們來改寫 todoReducers.js：


```javascript
import {ADD_TODO, CHANGE_TODO_INPUT} from "../actions/todoActions";

const initialState = {
  todo: '',
  list: []
};

function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: [...state.list, action.text]
      };
    case CHANGE_TODO_INPUT:
      return {
        ...state,
        todo: action.text
      };
    default:
      return state;
  }
}
```

接著新增一個管理 search state 的檔案 searchReducers.js：

```javascript
import {CHANGE_SEARCH_INPUT} from "../actions/todoActions";

function search(state = '', action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return action.text;
    default:
      return state;
  }
}

export default search;
```

這樣就完成了 reducer 的拆分，但在新增 store 之前，我們要將拆分的 reducer 透過 combineReducers() 組合起來，所以我們需要新增一個負責組合的 reducer 的檔案 index.js。

在 index.js 我們引入 combineReducers() 方法與所有的 reducers，然後將 reducers 用一個物件包裝起來，在物件中我們要將 reducer 指定為對應的 state 值，這樣 store 就會將對應的 state 傳入 reducer 中，並且 store 會將 reducer 所回傳的資料放置到對應的 state，接著再傳入 combineReducer() 中，最後匯出 combineReducer() 所回傳的函數：

```javascript
import {combineReducers} from "redux";

import todos from './todoReducers';
import search from './searchReducers';

const todoApp = combineReducers({
  todos,
  search
});

export default todoApp;
```

通常在實作一個 Redux 應用程式時，都會為了讓程式碼更容易理解，而根據 state 來設計多個 reducer，並在最後將他們根據對應的 state 組合起來。

## 實作 Store

store/index.js：

```javascript
import {createStore} from "redux";
import todoApp from "../reducers";

let store = createStore(todoApp);

export default store;
```

接下來介紹 createStore() 提供了哪些 API：

### getState()

要拿到 store 的 state 時，要透過 getState() 這個方法。

### dispatch(action)

dispatch() 是在 Redux 應用程式中唯一能改變 state 的方法，它需要傳入一個 Action 當作參數，接著 store 會將當前的 state 與此 action 分派出去，如果在創造 store 有傳入增強功能的話，當前的 state 與行為會先被分派到增強功能當中，然後再由增強功能分派給下一個增強功能，最後才分派到 reducer。

### subscribe(listener)

當 action 分派出去後，我們需要有一個監聽狀態改變的監聽器，所以在元件中我們要使用 subscribe 方法來增加一個監聽器，當 action 的分派完成後，這個監聽器將會被呼叫。我們可在監聽器中呼叫 getState() 來讀取新的 state。這個方法會回傳一個函數，當我們想取消這個監聽器訂閱時，只要呼叫它回傳的函數就可以了。

這邊注意，基本上我們不建議開發者在監聽器中呼叫 dispatch()，因為這樣有可能會導致無窮迴圈的發生。

### replaceReducer(nextReducer)

這個方法是用來替換 reducer，當開發者想要改變 reducer 的邏輯時，可以透過這個方法，用新的 reducer 來取代原本在創造 store 時所傳入的 reducer。

接下來我們將 action、reducer、store 與 react 元件結合起來，並完成 Todo List 應用程式。

首先新增 components/TodoList.jsx，然後修改 src/app.jsx：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from "./components/TodoList";

ReactDOM.render(
  <TodoList/>,
  document.querySelector('#app')
);
```

components/TodoList.jsx：

```javascript
import React, {Component} from "react";

class TodoList extends Component {
  render() {
    return (
      <div>
        <p>Search:</p>
        <input type="text"/>
        <br/>
        <p>New Todo:</p>
        <input type="text"/>
        <br/>
        <button type="button">Add</button>
        <ul>
          <li>Todo</li>
        </ul>
      </div>
    )
  }
}

export default TodoList;
```

接著開始將前面設計好的功能加入元件中，首先實作 Todo 輸入欄位的功能：

```javascript
// ...
class TodoList extends Component {
  constructor(props) {
    super(props);
    let state = store.getState();
    this.state = {
      todos: state.todos.list,
      todoInputText: state.todos.todo,
      searchInputText: state.search
    };
  }
  // ...
}
// ...
```

接著定義元件的 componentDidMount 方法，讓元件被掛載到真實的 DOM 時，透過 store 的 subscribe 方法向 store 訂閱，並在監聽器中透過 getState 方法取得最新的 state 來更新元件的 state：

```javascript
// ...
class TodoList extends Component {
  // ...
  componentDidMount() {
    var self = this;
  
    store.subscribe(function () {
      let state = store.getState();
      self.setState({
        todos: state.todos.list,
        todoInputText: state.todos.todo,
        searchInputText: state.search
      });
    });
  }
  
  // ...
}
// ...
```

再來修改 render 方法：

```javascript
// ...
class TodoList extends Component {
  // ...
  render() {
    const self = this;
    const todoList = this.state.todos.map(function (todo, idx) {
      if (todo.includes(self.state.searchInputText)) {
        return <li key={idx}>{todo}</li>;
      }
      return null;
    });
    return (
      <div>
        <p>Search:</p>
        <input type="text" value={this.state.searchInputText} onChange={this.handleSearchInput}/>
        <br/>
        <p>New Todo:</p>
        <input type="text" value={this.state.todoInputText} onChange={this.handleTodoInput}/>
        <br/>
        <button type="button" onClick={this.handleClick}>Add</button>
        <ul>
          <li>{todoList}</li>
        </ul>
      </div>
    );
  }
}
// ...
```

到這邊就完成整個 Todo List 的 Redux 應用程式了！

## React 與 Redux 結合

Redux 並非專為 React 所設計，它是為 JavaScript 應用程式提供一個可以預測的狀態管理容器，所以我們也可以用 Angular、JQuery 或原生的 JavaScript 來實作 Redux 應用。

Redux 開發者提供了一個 React 專用的模組 React Redux，它讓 React 與 Redux 更緊密結合，並讓開發者更容易使用 React 開發 Redux 應用程式。

React Redux 模組提供了兩個 API：

### `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

connect() 將 React 元件與 Store 連接起來，它不會修改原本傳入的元件，而是回傳一個新的元件，然後在新的元件上訂閱 store、分派 action，並將 state 以 props 傳入元件。因此我們就可以將元件設計成純元件 (Presentational Component)，也可以稱為函數元件 (Functional Component)，就是此元件只負責描述如何渲染，而不帶有任何業務邏輯，並且沒有自己的狀態，所有資料都是由 props 提供。

那如果將元件設計成純元件的話，業務邏輯該在哪設計？業務邏輯就要靠 mapStateToProps 與 mapDispatchToProps 這兩個參數提供，這兩個參數都是要傳入一個函數，mapStateToProps 負責將 store 的 state 轉換成純元件所需要的資料並以 props 傳入；mapDispatchToProps 負責將純元件所要分派的行為包裝成函數並以 props 傳入。

mergeProps 參數是一個函數，它負責接收 mapStateToProps 與 mapDispatchToProps 的結果和父元件傳入的 props 當作參數，並且回傳一個物件到元件的 props。一般來說我們不會用到這個參數，此參數在被省略時，它將預設為：

```javascript
{...ownProps, ...stateProps, ...dispatchProps}
```

options 參數是一個物件，它是用來讓我們自己定義 connect() 的行為，它可以接受以下選項：

- pure：它是一個布林值，如果 pure 的值為 true，代表後面所要包裝的元件是一個純元件，而 connect() 將會避免重複渲染，並且呼叫 mapStateToProps、mapDispatchToProps 和 mergeProps，其預設為 true
- areStatesEqual：它是一個函數，當元件為純元件時，將傳入的 state 與之前的值作比較，其預設為 strictEqual (===)
- areOwnPropsEqual：它是一個函數，當元件為純元件時，將父元件傳入的 props 與之前的值作比較，其預設為 shallowEqual
- areStatePropsEqual：它是一個函數，當元件為純元件時，將 mapStateToProps 的結果與之前的值做比較，其預設為 shallowEqual
- areMergedPropsEqual：它是一個函數，當元件為純元件時，將 mergeProps 的結果與之前的值做比較，其預設為 shallowEqual

connect() 在使用時，先將所需要的參數傳入，然後再將我們的元件傳入 connect 所回傳的 React 元件：

```javascript
connect(
  mapStateToProps,
  mapDispatchToProps
)(myComponent)
````

### `<Provider store={store}>...</Provider>`

使用 connect() 產生新的元件後，需要讓新的元件拿到 store，這時候要耨過 `<Provider>` 標籤，在最頂層根元件外面再用 `<Provider>` 標籤包一層，並將 store 當作 props 傳入，這樣在根元件下的所有由 connect() 所產生的元件就可以拿到 store。

接下來就來實際使用 React Redux 模組：

```shell
npm i react-redux -S
```

TodoaList.jsx，我們先定義第一個參數 mapStateToProps 函數，在 mapStateToProps 我們要將 connect() 所傳入的 state 轉換為元件所需的 props，並且將 props 包裝成物件回傳：

```javascript
// ...
const mapStateToProps = (state) => {
  return {
    todos: state.todos.list,
    todoInputText: state.todos.todo,
    searchInputText: state.search
  }
};
// ...
```

再來定義第二個參數 mapDispatchToProps 函數，connect() 會將 store 的 dispatch 方法傳入，我們將利用 dispatch 與 action 定義元件所需要的方法，並將方法包裝成物件回傳。這個函數其實就是代替我們在元件中所設計的方法，所以我們可以根據之前設計的方法來完成此函數：

```javascript
// ...
const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchInput: (text) => {
      dispatch(changeSearchInput(text));
    },
    handleTodoInput: (text) => {
      dispatch(changeTodoInput(text));
    },
    handleClick: (text) => {
      dispatch(addTodo(text));
      dispatch(changeTodoInput(''));
    }
  }
};
// ...
```

接下來我們來修改 TodoList 元件，現在元件的資料與重新渲染的工作都交給 connect() 處理了，所以在 constructor 方法中就不需要定義 state 的初始值，也不需在 componentDidMount 訂閱 store，並且元件所需的方法都會透過 props 來產生，所以也不需在元件中另外設計方法。

```javascript
import React, {Component} from "react";
import {addTodo, changeSearchInput, changeTodoInput} from "../actions/todoActions";
import {connect} from "react-redux";

class TodoList extends Component {
  render() {
    const self = this;
    const todoList = this.props.todos.map(function (todo, idx) {
      if (todo.includes(self.props.searchInputText)) {
        return <li key={idx}>{todo}</li>;
      }
      return null;
    });
    return (
      <div>
        <p>Search:</p>
        <input type="text" value={this.props.searchInputText} onChange={(evt) => this.props.handleSearchInput(evt.target.value)}/>
        <br/>
        <p>New Todo:</p>
        <input type="text" value={this.props.todoInputText} onChange={(evt) => this.props.handleTodoInput(evt.target.value)}/>
        <br/>
        <button type="button" onClick={() => this.props.handleClick(this.props.todoInputText)}>Add</button>
        <ul>
          <li>{todoList}</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.list,
    todoInputText: state.todos.todo,
    searchInputText: state.search
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchInput: (text) => {
      dispatch(changeSearchInput(text));
    },
    handleTodoInput: (text) => {
      dispatch(changeTodoInput(text));
    },
    handleClick: (text) => {
      dispatch(addTodo(text));
      dispatch(changeTodoInput(''));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

最後在 app.jsx 中頂層元件外加一層 `<Provider>` 標籤，並將之前設計的 store 傳入：

```javascript

```