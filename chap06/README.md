# Chap 06. 複合元件

> 元件組合的概念  
> 產生大量同類元件  
> 動態產生元件  
> 元件間的通訊  
> Children  
> Refs

元件是 React 中的基本單元，而元件組合則是 React 很重要的設計精神，本章將討論如何組合、嵌套各式各樣的元件，並介紹各種元件間的通訊方式、特殊屬性等等，並配合範例說明概念。

## 元件組合的概念

React 元件原則上就是一段 JavaScript 的程式碼，依據外部傳入的 prop 參數與內部維護的 state 屬性，最後生成客戶端的 DOM 節點，呈現前端視圖。React 的基本單元是元件，而元件組合則是 React 很重要的設計思維，不同於**傳統 HTML**，是**以元素來組合出一張網頁**，**React** 則是**以大大小小不同的元件來拼湊出一張網頁**。

比起繼承，React 更推薦你使用組合的方式，你可以自由混合各種小型、簡單的子元件，組成大型、功能完整且較複雜的元件，最後組織出一張網頁。Props 和組合性給了你很大的彈性去定義一個元件的外觀與行為，元件可以接受任意的 Props 值，包含原始值、React 元素和函數等等。因此，在初期設計應用時，應該先思考如何將整個網頁視圖拆分成數個元件，抽離重複的部分，並一一實作各個元件，重複利用並將它們合併為你需要的網頁應用程式。

接下來以一個簡單的問卷調查表，來說明元件組合的概念。

問卷調查表的元件階層關係如下：

- 問卷調查表 (Questionnaire)：主要元件，顯示標題及各項問題
  - 標題 (QuesTitle)：顯示標題以及未回答問題數量顯示
  - 清單 (QuesList)：列出調查表所有問題清單
    - 項目 (QuesItem)：各調查項目

從最上層的問卷調查表元件開始建立起，在逐一往下實作各個子元件：

```javascript
class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <QuesTitle/>
        <QuesList/>
      </div>
    );
  }
}
```

接下來實作 QuesTitle 元件：

```javascript
class QuesTitle extends React.Component {
  render() {
    return (
      <div>
        <h1>問卷調查表</h1>
        <small>0 項問題待填寫</small>
      </div>
    );
  }
}
```

最後一個元件是 QuesList：

```javascript
class QuesList extends React.Component {
  render() {
    return (
      <div>
        <p>請撥冗填寫本問卷，提供寶貴的資訊，謝謝！</p>
        <ul>
          <li>性別</li>
          <label>
            <input type="radio"/> 男
          </label>
          <label>
            <input type="radio"/> 女
          </label>
          <li>年齡</li>
          <label>
            <input type="radio"/> 18 歲以下
          </label>
          <label>
            <input type="radio"/> 18~25 歲
          </label>
          <label>
            <input type="radio"/> 26~35 歲
          </label>
          <label>
            <input type="radio"/> 35 歲以上
          </label>
          <li>婚姻狀況</li>
          <label>
            <input type="radio"/> 未婚
          </label>
          <label>
            <input type="radio"/> 已婚
          </label>
        </ul>
      </div>
    );
  }
}
```

到目前為止，我們僅僅是打造整個應用程式的基本框架，透過元件組合的方式，將整體的外觀雛形建立出來，尚未提供任何動態的輸入資料，元件之間也還沒有通訊的行為，接下來，我們會一步一步完成這些功能。

## 產生大量同類元件

QuesList 元件中，可發現有一段類似的程式碼一直在重複：

```html
<li>年齡</li>
<label>
  <input type="radio"/> 18 歲以下
</label>
<label>
  <input type="radio"/> 18~25 歲
</label>
<label>
  <input type="radio"/> 26~35 歲
</label>
<label>
  <input type="radio"/> 35 歲以上
</label>
```

React 元件除了具有組合的特性外，還具有重用性，因此，當你發現有一段程式碼這樣不斷出現，可試著將重複部分獨立出來，額外建立一個元件。接下來建立一個 QuesItem 元件，此元件單單負責顯示一個問題，以及列出該問題的各個選項。

QuesItem 是一個通用的元件，因此要將它的資料抽離出來，改由父元件 QuesList 透過 props 屬性傳入，這種作法讓一個元件的職責變得更單純，它只需要接收外部資料，並排版顯示出來。在實作之前，我們先定義 QuesItem 需要的 props 資料：

- 問卷的問題描述
- 讓使用者選取的各個選項

```javascript
class QuesItem extends React.Component {
  generateOps() {
    return this.props.options.map((option, i) => (
      <label key={'option' + i}>
        <input type="radio"/> {option}
      </label>
    ));
  }

  render() {
    return (
      <div>
        <li>{this.props.question}</li>
        {this.generateOps()}
      </div>
    );
  }
}
```

上面程式碼中，是採用動態的方式去產生各個選項，下一小節會針對這種方式做更詳細地說明。下一步，我們要改寫QuesList，各個項目改使用 QuesItem 元件去產生：

```javascript
class QuesList extends React.Component {
  render() {
    return (
      <div>
        <p>請撥冗填寫本問卷，提供寶貴的資訊，謝謝！</p>
        <ul>
          <QuesItem question="性別" options={['男', '女']}/>
          <QuesItem question="年齡" options={['18 歲以下', '18~25 歲', '26~35 歲', '35 歲以上']}/>
          <QuesItem question="婚姻狀況" options={['未婚', '已婚']}/>
        </ul>
      </div>
    );
  }
}
```

將重複的 HTML 程式碼抽象成一個元件後，你可以很快速地大量產生同類元件，現在，要繼續增加問題項目，只需要新增 QuesItem 元件，將問題描述與選項陣列填入，這就是 React 元件重用性帶給你的好處!

## 動態產生元件

在實際的使用情況，元件中的資料通常是存在外部資料庫，而不是寫死在各個元件中，現在，我們將 QuesList 中的問題與選項轉換成 JSON 物件資料，來模擬實際的使用情況。

```javascript
var questions = [
  {
    "question": "性別",
    "options": ["男", "女"]
  },
  {
    "question": "年齡",
    "options": ["18 歲以下", "18~25 歲", "26~35 歲", "35 歲以上"]
  },
  {
    "question": "婚姻狀況",
    "options": ["未婚", "已婚"]
  },
];
```

接下來，我們修改 Questionnaire 元件，將剛剛定義的問題清單 JSON 物件傳入 QuesList，並再次改寫 QuesList 元件：

```javascript
class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.questions = [
      {
        "question": "性別",
        "options": ["男", "女"]
      },
      {
        "question": "年齡",
        "options": ["18 歲以下", "18~25 歲", "26~35 歲", "35 歲以上"]
      },
      {
        "question": "婚姻狀況",
        "options": ["未婚", "已婚"]
      },
    ];
  }

  render() {
    return (
      <div>
        <QuesTitle/>
        <QuesList questions={this.questions}/>
      </div>
    );
  }
}

class QuesList extends React.Component {
  render() {
    let quesItems = this.props.questions.map((quesInfo, i) => (
      <QuesItem
        key={i}
        question={quesInfo.question}
        options={quesInfo.options}/>
    ));
    return (
      <div>
        <p>請撥冗填寫本問卷，提供寶貴的資訊，謝謝！</p>
        <ul>
          {quesItems}
        </ul>
      </div>
    );
  }
}
```

上面程式碼中，我們可以看到，在動態產生各種問題項目元件時，會為該元件填入一個 key 屬性。在第四章 Diffing 演算法曾提到，當建立一個集合的元件時，需要為集合中的每個元件指定一個唯一的 key 屬性， key 屬性的存在是為了避免在進行 diffing 演算法時，對元件不必要的重建，提高渲染效能。

動態產生元件這種作法幫助你可以將靜態資料從各個元件中抽離出來，因此，在實作的過程中，你只需要一個迭代器，就可以將所有問題項目的元件動態生成出來，而每當需要增加題目時，也只要修改 questions 這個 JSON 物件，不用再更動 QuesList 元件的內容。

## 元件間的通訊

在 React 中，所有元件都是彼此獨立的，我們可以透過組合、嵌套的方式將大大小小的元件組織成一個完整的應用程式元件，那麼各個獨立的元件之間應該如何通訊呢? 我們可以依照元件之間的嵌套關係，將通訊方法區分為以下兩種類別：

- 父子元件間的通訊
  - 父元件向子元件通訊
  - 子元件向父元件通訊
  - 兄弟元件間互相通訊
- 非父子元件間的通訊

### 父元件向子元件通訊

React 資料的傳遞是單向的，資料一律都是由上而下，由父元件向下傳遞到各個子元件，而傳遞的媒介就是透過 Props 屬性，搭起父子之間的通訊橋梁，這就是父元件向子元件通訊，也是 React 中最常見的一種通訊方式。

這裡來複習一下：

```javascript
class QuesList extends React.Component {
  render() {
    let quesItems = this.props.questions.map((quesInfo, i) => (
      <QuesItem
        key={i}
        question={quesInfo.question}
        options={quesInfo.options}/>
    ));
    return (
      <div>
        <p>請撥冗填寫本問卷，提供寶貴的資訊，謝謝！</p>
        <ul>
          {quesItems}
        </ul>
      </div>
    );
  }
}
```

在 QuesList 元件中，透過父元件傳入 questions 物件，去巡訪陣列中的每一筆資料，渲染出問題項目清單，這就是透過 props，達到父子元件間的通訊。

### 子元件向父元件通訊

子元件向父元件通訊，通常是發生在子元件要通知父元件它的內部 state 狀態發生改變時，這種通訊方式，同樣地需要依賴 props 屬性，但是傳遞的不是資料，而是一支函數，我們將它稱之為回呼函數 (callback)，子元件在呼叫該函數時，可以將想要傳遞的資料或狀態，作為函數參數，傳遞到父元件中。

現在，我們要藉由 QuesItem 元件來說明。QuesItem 為一個問題項目，該問題中會有多個選項，正常情況下，應該只能有一個選項被選取，因此，我們要修改此元件，並新增一個選項元件 (RadioInput)，這個元件負責渲染出一個問題選項，當使用者點選選項的單選框，應該發出訊息通知父元件，再由父元件決定哪個選項應顯示為被選取：

```javascript
class RadioInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    if (evt.target.checked)
      this.props.onChange(this.props.option);
  }

  render() {
    return (
      <label>
        <input type="radio"
               checked={this.props.checked}
               onChange={this.handleChange}/>
        {this.props.option}
      </label>
    )
  }
}
```

當 RadioInput 元件發生變化時，會觸發 handleChange() 函數，在函數內部中去呼叫父親傳入的回呼函數，通知父元件此選項被點選，父元件要做的事就是改變選項的 checked 值，並透過 props 重新傳入 RadioInput 元件中，以渲染出該選項被選取，接下來看看父元件 QuesItem 如何修改：

```javascript
class QuesItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);

    this.state = {
      option: ''
    };
  }

  onChange(option) {
    this.setState({option});
  }

  generateOps() {
    return this.props.options.map((option, i) => (
      <RadioInput
        key={'option' + i}
        option={option}
        checked={this.state.option === option}
        onChange={this.onChange}
      />
    ));
  }

  render() {
    return (
      <div>
        <li>{this.props.question}</li>
        {this.generateOps()}
      </div>
    );
  }
}
```

QuesItem 元件新增了一個名稱為 option 的 state，用來表示哪個選項被選取，另外也增加了要傳入各個 RadioInput 選項的 onChange() 回呼函數，當某選項被點選時，RadioInput 應該透過此回呼函數通知 QuesItem，接著 QuesItem 會重新設定內部 option 狀態，改變選項的選取狀態。

### 兄弟元件間互相通訊

若是兩個沒有直接關聯的元件想要互相通訊，一種做法是透過 props 向更高層級的元件層層傳遞資料和方法，以我們的問卷調查表為例，為了要完成問卷調查表的最後一項功能：提示問卷作答者尚未填寫的問題數，QuesList 元件需要跟 QuesTitle 元件通訊，由於它們之間不是直接的父子關係，因此 QuesList 要先與父元件 Questionnaire 進行通訊，再由 Questionnaire 將訊息轉交到 QuesTitle 元件。

首先修改 QuesList 下的 QuesItem 元件，當 QuesItem 元件中的任一選項第一次被點選時，應該透過回呼函數通知 QuesList 元件該問題項目已被回答，因此我們要在 onChange() 函數中呼叫父元件傳入的 handleAnswer() 回呼函數，判斷 option 狀態是否為空字串是為了確認該問題是否初次被回答，若不是就不需要再往上通知了。

```javascript
class QuesItem extends React.Component {
  // ...略

  onChange(option) {
    if (this.state.option === '') {
      this.props.handleAnswer();
    }
    this.setState({option});
  }
  
  // ...略
}
```

QuesList 需要新增一個 answered 狀態來紀錄已回答問題數，並且將要傳遞給 QuesItem 的回呼函數 handleAnswer() 準備好，當該函數被呼叫時，計算出尚未填寫的問題數，然後呼叫上層提供的 answerHandler() 回呼函數，將剩餘數量作為參數傳遞到 Questionnaire 元件：

```javascript
class QuesList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      answered: 0
    };
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleAnswer() {
    let newAnswered = this.state.answered + 1,
      toAnswer = this.props.questions.length - newAnswered;

    this.setState({answered: newAnswered});
    this.props.answerHandler(toAnswer);
  }

  render() {
    let quesItems = this.props.questions.map((quesInfo, i) => (
      <QuesItem
        key={i}
        question={quesInfo.question}
        options={quesInfo.options}
        handleAnswer={this.handleAnswer}/>
    ));
    // ...略
  }
}
```

Questionnaire 同樣地需要新增一個 toAnswer 狀態去記錄尚未回答之問題數，預設值即為所有問題的數量，toAnswer 狀態會做為 props 傳遞給 QuesTitle 標題元件，讓它去渲染顯示尚未回答的問題數。另外，將 answerHandler() 回呼函數準備好，當填寫者回答問題時由 QuesList 呼叫通知 Questionnaire，此函數會接收到新的待回答問題數，並呼叫 setState() 重新渲染視圖。

```javascript
class Questionnaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toAnswer: 0
    };
    this.answerHandler = this.answerHandler.bind(this);
  }

  answerHandler(toAnswer) {
    this.setState({toAnswer});
  }

  componentWillMount() {
    this.questions = [
      {
        "question": "性別",
        "options": ["男", "女"]
      },
      {
        "question": "年齡",
        "options": ["18 歲以下", "18~25 歲", "26~35 歲", "35 歲以上"]
      },
      {
        "question": "婚姻狀況",
        "options": ["未婚", "已婚"]
      },
    ];
    this.setState({toAnswer: this.questions.length});
  }

  render() {
    return (
      <div>
        <QuesTitle toAnswer={this.state.toAnswer}/>
        <QuesList questions={this.questions}
                  answerHandler={this.answerHandler}/>
      </div>
    );
  }
}
```

最後修改 QuesTitle：

```javascript
class QuesTitle extends React.Component {
  render() {
    return (
      <div>
        <h1>問卷調查表</h1>
        <small>{this.props.toAnswer} 項問題待填寫</small>
      </div>
    );
  }
}
```

到目前為止，整個問卷調查表已經大致完成了，在這個範例中，你可以看到整個訊息的傳遞是透過 props，一層一層地向上傳遞到要通訊的兩個元件間的共同父元件，再由父元件往下送給要接收訊息的元件，若是中間間隔許多其他的元件，那麼整個程式碼就會顯得非常冗餘、不優雅。

若是你想降低元件之間的依賴關係，不想透過 props 在整個元件樹下去層層傳遞你的資料，那麼 React 提供了你另一種方式，就是透過 context API。以一個簡單例子說明：

```javascript
class Button extends React.Component {
  render() {
    return (
            <button style={{background: this.context.color}}>
                Send
            </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
            <div>
                <form>
                    <input type="text" name="message"/>
                </form>
                <Button/>
            </div>
    );
  }
}

class MessageBox extends React.Component {
  getChildContext() {
    return {color: 'green'};
  }

  render() {
    return (
            <div>
                <p>Please enter a message</p>
                <Message/>
            </div>
    );
  }
}

MessageBox.childContextTypes = {
  color: PropTypes.string
};

ReactDOM.render(
        <MessageBox/>,
  document.querySelector('#app')
);
```

頂層元件 MessageBox 不是透過 props 將 color 傳遞給 Button，而是透過 getChildContext() 函數去定義一個 childContext，並透過 childContextTypes 去指定該 childContext 的型別。如此一來，MessageBox 下的所有子元件就可以直接透過 this.context 去取得定義的 context，也就是此例中的 color，減少傳遞的相依性。


context 雖然可以解決 props 層層傳遞的問題，但是 React 官方並不建議你過度頻繁地使用它，特別是當應用程式結構複雜的時候，因為 context 就類似一個全域變數，各個元件無法得知 context 是由哪裡傳入的，這會導致應用程式變得難以掌握。context 較好的使用場景應該是用來傳遞登入用戶、網頁語言、背景主題等這種意義上真正的全域資料，要改善元件間的依賴關係，更好的解決方式是採用 Redux 模式，我們將在第十章介紹它。

### 非父子元件間的通訊

若是兩個毫無嵌套關係的元件想要相互通訊，可以透過定義全域事件去實現：由傳遞資料的元件發起事件，接收資料的元件負責監聽，在事件處理函數中去觸發 setState() 來改變視圖或是作其他操作。事件處理讓 React 元件擺脫單向資料流機制，因此資料不需要在一層層地被傳遞。

事件機制也就是使用發佈 / 訂閱者模式的一種實現，需要注意的是，我們要在元件掛載完成後訂閱事件；元件卸載完成前取消訂閱事件，避免每次初始化元件時重複訂閱該事件。

我們使用剛剛的 MessageBox 範例來改寫並說明這種通訊方式，在本範例中使用 PubSubJS 模組 ([https://github.com/mroderick/PubSubJS](https://github.com/mroderick/PubSubJS)) 來完成：

```javascript
class Message extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let message = evt.target.value;
    this.setState({message});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    PubSub.publish('addMsg', this.state.message);
  }

  render() {
    return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                            type="text"
                            value={this.state.message}
                            onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
    );
  }
}

class MessageBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {messages: []};
  }

  componentDidMount() {
    this.token = PubSub.subscribe('addMsg', (context, msg) => {
      console.log('1234');
      this.state.messages.push(msg);
      this.setState({messages: this.state.messages});
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    const msgField = this.state.messages.map((msg, i) => (
            <p key={'msg' + i}>{msg}</p>
    ));
    return (
            <div>
                <div>{msgField}</div>
                <p>Please enter a message</p>
                <Message/>
            </div>
    );
  }
}
```

## Children

在 JSX 表達式中，會包含有開始與結束標籤，在標籤中的內容，會被傳遞到 React 元件中一個特殊的 prop：`props.children`，因此，在父元件中可以透過這個 prop 去取得所有子元件的資料。

元件中可能會包含一個、多個或者沒有子元件，props.children 的型別會依據你傳入的子元件而有所不同：

```javascript
<ParentComponent>Hello World</ParentComponent>
```

下面這個則是一個陣列：

```javascript
<ParentComponent>
  <Children1 />
  <Children2 />
  <Children3 />
</ParentComponent>
```

props.children 這個屬性提供了你一個更方便的管道——利用子元件去組成你的 UI 介面，舉例來說，假設我們現在有一個 CardBlock 元件，它允許使用者添加區塊之間的內容，如下列程式碼：

```javascript
class MyApp extends React.Component {
  render() {
    return (
            <CardBlock>
                <Card content="This is card A."/>
                <Card content="This is card A."/>
                <Card content="This is card A."/>
            </CardBlock>
    );
  }
}
```

CardBlock 可以利用 props.children 將所有子元件渲染出來，而不需要明確地知道開發者究竟傳入了什麼內容：

```javascript
class CardBlock extends React.Component {
  render() {
    return (
            <div>
              {this.props.children}
            </div>
    );
  }
}

class Card extends React.Component {
  render() {
    const cardStyle = {
      width: '50x',
      height: '30px',
      marginBottom: '20px',
      backgroundColor: 'gray'
    };
    return (
            <div style={cardStyle}>{this.props.content}</div>
    );
  }
}
```

若沒有 this.props.children 的協助，你就必須透過額外的 prop 將那些內容傳入，這會讓你的程式碼變得非常醜陋且不優雅：

```javascript
<CardBlock content={<div><Card content="This is card A."/>
                         <Card content="This is card A."/>
                         <Card content="This is card A."/>
                    </div>}>
</CardBlock>
```

在某些情況下，你可能會想要將元件渲染之前對所有子元件做一些處理，譬如說為他們增加額外的屬性或是樣式，我們可以使用像是 map() 這種迭代函數去操作每一個子元件，但 this.props.children 會依據你的內容而有所不同，若開發者只有傳入一個子元件，那麼對它使用迭代函數就會發生錯誤。

React 在 React.Children 下提供了一組工具函數來幫助開發者處理 this.props.children 資料結構，像是 React.Children.map()，在使用該函數迭代時，即使你的子元件只有一個，甚至沒有傳入，React.Children.map() 也不會丟錯，它會在背後為我們處理好檢查的這些事情。

另外要介紹 React.cloneElement() 這隻函數，它是用來讓你修改或新增一些 props 到原有的元件中，該函數最後會返回一個新的元件，該元件中包含了原有的 props 與填入的新 prop。以剛剛 CardBlock 範例做說明，假設我們現在要迭代 Block 中的每一張 Card，並為它們加上文字顏色為紅色的樣式：

```javascript
class CardBlock extends React.Component {
  render() {
    const childrenWithNewStyle = React.Children.map(this.props.children, (child) => (
      React.cloneElement(child, {fontColor: 'red'})
    ));
    return (
            <div>
              {childrenWithNewStyle}
            </div>
    );
  }
}

class Card extends React.Component {
  render() {
    const cardStyle = {
      width: '50x',
      height: '30px',
      marginBottom: '20px',
      backgroundColor: 'gray',
      color: this.props.fontColor,
    };
    return (
            <div style={cardStyle}>{this.props.content}</div>
    );
  }
}
```