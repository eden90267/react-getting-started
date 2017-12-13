# Chap 11. 路由

> React 路由的基本使用與歷史紀錄  
> 引入元件  
> 透過路由傳遞變數  
> 設定路由  
> 重導 (Redirect) 路徑

過去使用路由的時候大部分是由伺服器 (Server) 端來渲染整個頁面之後提供，但在近來引進 SPA (Single Page Application) 的設計模式後，渲染頁面這個動作已慢慢交由前段接手一些處理。舉例來說，當我們想要替換一個頁面的部分內容，但又需要在瀏覽器上有歷史紀錄 (換頁效果)，以前我們大多採用多頁式 (Multi-page) 的做法，但這樣的做法有以下幾個缺點：

- 網頁開發效能不彰，程式碼通常是前後端混雜在一起，不容易進行分工和維護
- 所有頁面都需要伺服器來經手，造成許多伺服器不必要的負荷
- 每個頁面都要重新整理 (Reload)，常常產生冗長的等待時間，造成使用者體驗低落

為解決上述問題，現在開發者大多採用 Single-page 的做法，採用這個做法有兩個準備步驟：

1. 將 UI 從伺服器移到前端來實作
2. 前端實作應用邏輯 (Application Logic)

因此我們通常會選用一個好的框架來幫忙解決以上兩個問題。在 React 框架上，除了前面提到的元件架構外，路由的部分我們通常會使用 React-Router 來實作，目前已經更新到 v4.1.1 的版本，這次的改版針對許多不同的應用做了一些分類，核心的部分還是 react-router，網頁的部分已拆出來由 react-router-dom 來處理，另外拆開的還有給開發手機 App (React-Native) 使用的 react-router-native，分類的相當細，這裡就用之前建立好的 React 環境來針對幾個常用到的功能進行練習吧！

## React 路由的基本使用與歷史紀錄

```shell
npm i react-router react-router-dom -S
```

src/app.jsx：

```javascript
import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route} from "react-router-dom";


require('Source/less/theme.less');

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = () => (
  <div>
    <h2>Topics</h2>
  </div>
);

ReactDOM.render(
  (
    <BrowserRouter>
      <div className="ui raised segment">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </BrowserRouter>
  ),
  document.querySelector('#app')
);
```

- 使用 react-router 的歷史記錄功能，將設定路由與元件包起來
- BrowserRouter 裡面只能包一個元件
- 使用 react-router 提供的 Link 來實現簡單的路由連結
- Route 設定路由與相對應的元件做關聯

## 引入元件

現在來把元件獨立出來，用引入的方式來做路由，首先我們先到 src 裡頭的 components 資料夾，撰寫共用會用到的連結列表：

```javascript
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';


class Links extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <ul className="ui list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
    );
  }
}

export default Links;
```

接著分別撰寫三個不同的元件 Home、About、Topics，以 Home 為例：

```javascript
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Links from "Source/components/Links";

class Home extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div className="ui raised segment">
        <Links />
        <h1>Home</h1>
      </div>
    )
  }
}

export default Home;
```

app.jsx：

```javascript
import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";

require('Source/less/theme.less');

import Home from "Source/components/Home";
import About from "Source/components/About";
import Topics from "Source/components/Topics";

ReactDOM.render(
  (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </BrowserRouter>
  ),
  document.querySelector('#app')
);
```

完成後重新 webpack 打包並啟動就完成囉！

## 透過路由傳遞變數

第三個練習是經常會用到的功能，透過網址來傳遞變數，src/app.jsx：

```javascript
import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import Index from "Source/components";
import User from "Source/components/User";

require('Source/less/theme.less');

ReactDOM.render(
  (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Index}/>
        <Route path="/user/:name" component={User}/>
      </div>
    </BrowserRouter>
  ),
  document.querySelector('#app')
);
```

我們在路由設定一個名為 name 的變數，並將路徑對應到 User 的元件。

components/Index.jsx：

```javascript
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";


class Index extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return (
      <div className="ui raised segment">
        <ul className="ui list">
          <li>
            <Link to="/user/leon">Designer</Link>
          </li>
          <li>
            <Link to="/user/fred">Programmer</Link>
          </li>
        </ul>

        <h1>Index</h1>
      </div>
    );
  }
}

export default Index;
```

components/User.jsx：

```javascript
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";


class User extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      name: this.props.match.params.name
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      name: nextProps.match.params.name
    })
  };

  render() {
    return (
      <div className="ui raised segment">
        <ul className="ui list">
          <li>
            <Link to="/">Index</Link>
          </li>
        </ul>

        <h1>User: Hello {this.state.name}</h1>
      </div>
    );
  }
}

export default User;
```

- 透過 url 傳送過來的變數會放在 props.match.params 裡面

最後打包再啟動 server 就可以順利看到結果了！

## 設定路由

依據專案化的需求，react-router 也有提供 config 套件的模組 react-router-config，透過 config 我們可以將設定的部分獨立成一個檔案，未來維護也比較方便清楚，目前還在 beta.4 階段，不過可以嘗試使用，就先來安裝 react-router-config 吧！

```shell
npm i react-router-config -S
```

src/app.jsx：

```javascript
import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import renderRoutes from 'react-router-config';

import Home from "Source/components/Home";
import About from "Source/components/About";
import Topics from "Source/components/Topics";

require('Source/less/theme.less');

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,

  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/topic',
    exact: true,
    component: Topics,
  }
];

ReactDOM.render(
  (
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  ),
  document.querySelector('#app')
);
```

exact 是路徑比對的設定，建議設定為 true，exact 設定介紹如下表。

| 設定路徑 | 實際路徑  | exact | 吻合 |
|:--------|:---------|:------|:----|
| /one    | /one/two | true  | no  |
| /one    | /one/two | false | yes |

最後回到 webpack.config.js 的資料夾進行打包，啟動 server 就好囉！

再來我們嘗試將設定檔獨立出來，src/router.jsx：

```javascript
import About from "Source/components/About";
import Home from "Source/components/Home";
import Topics from "Source/components/Topics";

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,

  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/topic',
    exact: true,
    component: Topics,
  }
];

export default routes;
```

最後切回 app.jsx 做修改：

```javascript
import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import renderRoutes from 'react-router-config';

import routes from "Source/router";

require('Source/less/theme.less');

ReactDOM.render(
  (
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  ),
  document.querySelector('#app')
);
```

完成後回到 webpack.config.js 的資料夾進行打包再啟動 server，就完成囉！

## 重導 (Redirect) 路徑

最後一個練習是同樣會在登入或是登出時用到的重導路徑，我們沿用上一小節的最後一個練習，首先，先切到 src/router.jsx 更新元件與路由：

```javascript
import Start from "Source/components/Start";
import Timer from "Source/components/Timer";
import TimeUp from "Source/components/TimeUp";

const routes = [
  {
    path: '/',
    exact: true,
    component: Start,

  },
  {
    path: '/timer',
    exact: true,
    component: Timer,
  },
  {
    path: '/timeup',
    exact: true,
    component: TimeUp,
  }
];

export default routes;
```

components/Start.jsx：

```javascript
import React, {Component} from "react/lib/ReactBaseClasses";
import ReactDOM from 'react-dom';

import {Link} from "react-router-dom";

class Start extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return (
      <div className="ui raised segment">
        <ul className="ui list">
          <Link to="/timer">Start</Link>
        </ul>

        <h1>Get Started！</h1>
      </div>
    )
  }
}


export default Start;
```

components/Timer.js：

```javascript
import React, {Component} from "react/lib/ReactBaseClasses";
import ReactDOM from 'react-dom';
import {Redirect} from "react-router";

class Timer extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      number: 10
    };
  }

  tick = () => {
    if (this.state.number === 0) {
      return;
    }
    this.setState({
      number: this.state.number - 1
    });
  };

  render() {
    if (this.state.number === 0) {
      return (
        <Redirect to={'/timeup'}/>
      );
    }
    return (
      <div className="ui raised segment">
        <h1>{this.state.number}</h1>
      </div>
    )
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
  }
}


export default Timer;
```

components/TimeUp.jsx：

```javascript
import React, {Component} from "react/lib/ReactBaseClasses";
import ReactDOM from 'react-dom';

class TimerUp extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return (
      <div className="ui raised segment">
        <h1>Time's Up !!</h1>
      </div>
    )
  }
}


export default TimerUp;
```

接著回到 webpack.config.js 的資料夾進行打包再啟動 server 就可以順利看到結果！