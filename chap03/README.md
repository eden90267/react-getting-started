# Chap 03. 非同步處理的時代 ─ ECMAScript 6

> ES6 基礎語法  
> 定義類別 ─ Class語法糖  
> 繼承 ─ Extends語法糖  
> 非同步程式流程控制

2015年六月，JavaScript下一代標準 ECMAScript 6 (ECMAScript 2016) 正式發布，它的目標是使 JavaScript 可以用來開發複雜的大型應用程式，並成為企業級開發語言。

## ES6 基礎語法

### 變數宣告

在ES6中，新增了 let 和 const 兩個用來宣告的關鍵字。let 用法類似 var，一樣用來宣告變數，但是它只在 let 宣告所在的範疇中有效。

使用 var 時會有變數提升的特性，變數的宣告會被提升到該範疇的最頂端，所以在指定值之前，該變數的值為undefined，但 let 並沒有變數提升的特性，若在宣告之前使用該變數，將會引發錯誤。

關鍵字 const 是用來宣告常數，我們必須在宣告時就將常數值指定給它，若沒有在宣告時指定值，就會引發錯誤，且一旦宣告了，該常數的值就不可以再改變，否則也會引發錯誤。

```javascript
const foo; // SyntaxError
const bar = 100;

bar = 101; // TypeError
```

比較特別的是，當宣告 const 為物件或是陣列時，物件與陣列中的值還是可以改變，這是因為 const 宣告的常數是指向該物件或陣列的參考，也就是記憶體位置，只要參考不變，就不會引發錯誤。

```javascript
const foo = {};

foo.name = 'foo';
console.log(foo.name); // 'foo'

foo = {}; // TypeError
```

### 展開運算子

在 ES6 之前，我們若要將一個陣列中的所有值，放入另一個陣列或是當作函數的參數，我們通常需要將陣列中的值用迭代的方式處理，或是一個一個列出。

在 ES6 中，我們可以使用展開運算子(spread)，而它的使用方法是在陣列前面加上三個點(...)，就可以將該陣列中的值展開。

```javascript
const foo = [1, 2, 3];
const bar = [...foo, 4, 5];

console.log(bar); // [1, 2, 3, 4, 5]
console.log(...bar); // 1 2 3 4 5
```

而物件也可以使用展開運算子，但是物件的展開運算子目前仍然只是 ECMAScript Stage 3 的提案，但我們可使用如`babel-plugin-transform-object-rest-spread`之類的模組來使用這個語法。

物件的展開運算子與陣列相同，只要在物件的前面加上三個點，就可以將物件展開。

```javascript
const foo = {
  a: 1,
  b: 2,
  c: 3
};
const bar = {
  ...foo,
  d: 4,
  e: 5
};

console.log(bar); // {a: 1, b: 2, c: 3, d: 4, e: 5}
```

### 函數預設值

在 ES6 之前，我們無法指定預設值給函數的參數，我們只能在函數內去檢查參數值是否給定，沒有的話就使用我們設定的預設值。在 ES6 中，我們可以在函數中直接設定預設值給參數。

```javascript
function greet(text = 'world!') {
  console.log('Hello, ' + text);
}

greet(); // Hello, World!
```

### 定義函數

在 ES6 中，我們可使用箭頭符號 (`=>`) 來定義函數：

```javascript
// ES5
var foo = function() {
  console.log('Hello');
};

// ES6
var foo = () => {console.log('Hello');}
```

如果函數只需要回傳一條陳述句或是運算式的結果時，則可以省略大括號。

```javascript
// ES5
var foo = function(num1, num2) {
  return num1 + num2;
};

// ES6
var foo = (num1, num2) => num1 + num2;
```

如果函數的參數只有一個，則可以省略小括號：

```javascript
// ES5
var foo = function(num) {
  return num * 2;
}

// ES6
var foo = num => num * 2;
```

箭頭符號還有一個很重要的特性，那就是它所定義的函數中的this，會使用外面一層的this，也因為這個特性，我們可以用它來定義某些需要取得外面一層this的回呼函數。

```javascript
// ES5
var obj = {
  foo: 'Hello',
  greet: function() {
    var self = this;
    setTimeout(function() {
      console.log(self.foo);
    }, 1000);
  }
};
obj.greet(); // 'Hello'

// ES6
var obj = {
  foo: 'Hello',
  greet: function() {
    setTimeout(() => console.log(this.foo), 1000);
  }
};
obj.greet(); // 'Hello'
```

### 物件屬性表示法

在 ES6 中，如果將變數寫入物件，而前面沒有屬性名稱的話，物件就會用變數的名稱來當作屬性名稱。

```javascript
// ES5
var name = 'jack';
var age = 25;
var person = {name: name, age: age};
console.log(person); // {name: "jack", age: 25}

// ES6
var name = 'jack';
var age = 25;
var person = {name, age};
console.log(person); // {name: "jack", age: 25}
```

### 模組匯出語法

在 ES6 中，若我們想要匯出多個變數、方法或是類別時，我們可以使用 `export` 來匯出這個模組想要提供出去的變數、方法或是類別，但在引入模組時，必須要根據這些變數、方法或是類別的名稱來引入：

```javascript
export var foo = 'foo';
export var bar = 'bar';
export function greet() {
  console.log('Hello');
}
```

如果想讓模組有一個預設的匯出我們就要透過 `export default` 來將模組的預設匯出。而在引入這個模組時，若沒有透過名稱來引入，就會得到模組的預設匯出。

```javascript
// ES5
module.export = foo;

// ES6
export default foo;
```

### 模組引入語法

在 ES6 之前，我們要引入模組會透過 `require` 方法，來將模組指定到一個變數，而在 ES6 中，可以使用 `import` 來引入模組，如果我們要引入模組的預設匯出，就先在 `import` 的後面指定一個變數名稱，接著再用 `form` 來指定模組的檔案位置，這樣該變數就會接收我們所引入模組的預設匯出。

```javascript
// ES5
var fs = require('fs');

// ES6
import fs from 'fs';
```

如果我們想要引入一個模組單獨匯出的變數、方法或類別，而不是要引入預設的匯出時，我們必須要先知道該模組匯出的變數、方法或類別的名稱，通常這些資訊會在模組的文件中提到，在知道名稱後，我們將 `import` 後加入一個大括號，並在大括號中加入我們所要引入的變數、方法或類別的名稱，這樣我們就可以利用這些名稱來呼叫我們所引入的變數、方法或類別。

```javascript
// ES5
var fs = require('fs');
var readFile = fs.readFile('fs');

// ES6
import {readFile} from 'fs';
```

## 定義類別 ─ Class 語法糖

在過去 JavaScript 就有一些類似 class 的語法，為什麼說類似? 因為 JavaScript 並沒有所謂的類別的概念，像是 `new` 和 `instanceof` 的功能都是藉由動態物件所模擬出來，透過建構式來產生新的實例。

在 ES6 的語法中特別引入了class的概念，它只是現有 JavaScript 基於 prototype 繼承的語法糖，主要是想提供一種更簡單且更接近傳統物件導向語言的語法來建立物件和處理繼承。

### Class 基本語法

在 ES6 出現之前，傳統的方法是以建構式來做為類別，然後透過 `new` 運算子來產生實例。以下為簡單例子：

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  console.log('Hello! I am ' + this.name + '.');
}

var amy = new Person('Amy');
amy.sayHello();
```

Class類別就是在定義物件整體的結構藍圖，之後再利用這個已經定義好的類別，來產生多個相同結構的物件實例。而 ES6 的 class 關鍵字大部分的功能，在 ES5 其實也都能做到，新的語法基本上只是想讓物件原型的寫法更像物件導向的語法而已，並不是要引入什麼新的物件導向繼承模型到JavaScript中。上面範例改用class語法：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log('Hello! I am ' + this.name + '.');
  }
}

const amy = new Person('Amy');
amy.sayHello();
```

在上面程式碼中，可看到constructor方法，其實就是對應到傳統 ES5 的建構式，而 class 中的所有方法都是定義在 class 的 prototype 屬性上，且這些屬性都是不可列舉的(non-enumerable)，這裡的 sayHello 方法就等同於 Person.prototype.sayHello。要注意的是，在定義class物件時，不需要再加上 function 關鍵字。class 內的方法也不需要逗號。

### constructor 方法

建構式方法在使用 new 關鍵字建立實例時，會自動的被呼叫，所以 class 裡面必須要有這個方法。不過如果沒有實作這個建構式方法，預設 class 還是會幫你加上一個空的 `constructor() {}` 方法的。

在呼叫完 constructor 方法後，預設是會回傳實例物件 this。不過你也可以自己指定想要回傳的物件：

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

console.log(new Foo() instanceof Foo); // false
```

### this 指向

this 關鍵字它所代表的是函數執行時，所自動產生的一個內部物件。而 class 方法內部的 this 預設指向的就是 class 實例。因為 new 運算子的關係，this 會知道它應該指向哪一個物件實例。

因此，當函數呼叫或是實例化物件時，都會以 this 所指向的物件，作為執行期間的依據。函數呼叫在一般情況下 this 通常是指向全域物件。實例化物件則是透過 new 呼叫 class 方法，這個 this 會指向新建立的物件實例：

```javascript
const amy = new Person('Amy');
```

這裡面的 this 指向的就是 amy 這個物件實例。

### Getter 與 Setter

在 class 內部可以透過 get 與 set 關鍵字，作為某個屬性的取得函數和設定函數的修飾字，以確保該屬性的存取行為。一般只有在私有屬性或是特殊值，才會特別使用這兩種方法。對於一般公開的原始資料類型，不需要這兩種方法就能夠直接存取。

```javascript
class Person {
  constructor() {
    this._name = ' ';
  }
  get name() {
    return this._name;
  }
  set name(name) {
    console.log('setter: ' + name);
    this._name = name;
  }
}

const person = new Person();
person.name = 'Amy';      // 'setter: Amy'
console.log(person.name); // Amy
```

## 繼承 ─ Extends 語法糖

在繼承的部分 ES6 封裝了 `extends` 關鍵字來實作類別繼承這項功能，但內部實作的原理仍然是基於原型鏈完成的。而繼承父類別的子類別，必須在 `constructor` 方法中呼叫 `super` 方法，`super` 方法其實就是父類別的 `constructor` 方法，因為子類別並沒有自己的 `this` 物件，必須要透過 `super` 方法來繼承父類別的 `this` 物件。如果子類別沒有呼叫 `super` 方法，它就會拿不到 `this` 物件。`super` 也可以用來指向父類別，存取其屬性或呼叫其中的方法。以下為簡單範例：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return 'Hi! I am ' + this.name + '.';
  }
}

class Student extends Person {
  constructor(name, id) {
    super(name);
    this.id = id;
  }
  sayHi() {
    return super.sayHi() + ' ID: ' + this.id;
  }
}
```

在繼承時要注意的是，子類別的 `constructor` 方法中的 `super` 必須先呼叫之後，才可以使用 `this` 關鍵字，所以在 `constructor` 內的第一行就先呼叫比較保險。另外，子類別中的屬性或方法的名稱，不能與父類別相同，否則會覆蓋掉父類別的屬性或是方法。若是要使用父類別的方法，也是透過 `super` 關鍵字來取得。

## 非同步程式流程控制

JavaScript這種單執行緒、事件驅動的程式語言中，非同步流程控制是很重要的。

Node.js主要使用 Error-First 風格的 callback 來控制非同步流程，也就是當有錯誤發生時，會將錯誤訊息放在 callback 的第一個參數傳回，若沒有錯誤則第一個值會是 null，因此稱為 Error-First Callback，這也是處理非同步流程的一種方法。

```javascript
var fs = require('fs');

fs.readFile('/foo.txt', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

而一些剛接觸的開發者，在流程控制上可能聽過 Promise 的一些好處，目前 ES6 也原生支援了 Promise 及 Generator，且 ES7 也引進了 async/await 語法，讓開發者可以更容易控制非同步的程式流程，也能減少 callback 的使用，讓整個程式碼更好理解。

### Promise 是什麼 ?

一個 Promise 代表一個**非同步操作的結果**，它有三種狀態，一旦 Promise 的狀態變為 fulfilled 或 rejected，那麼它就不會再改變其狀態了。

- pending：一個 Promise 的初始狀態，或狀態未定。
- fulfilled：操作成功
- rejected：操作失敗

其實也有一些第三方模組實作了 Promise 的功能，例如 Q、when、WinJS 及 RSVP.js 等。不管是 JavaScript 原生的 Promise 或第三方模組，它們都遵守一個通用的、標準化規範：Promises/A+，接下來我們將以 JavaScript ES6 原生的 Promise 來做介紹。

#### 建立 Promise

```javascript
var promise = new Promise((resolve, reject) => {
  // 做一些非同步操作的事情，然後...
  
  if (/* 一切正常 */) {
    resolve('Stuff worked!');
  } else {
    reject(Error('It broke'));
  }
});
```

Promise 建構式接受一個函數作為參數，它會傳遞給這個回呼函數兩個變數 resolve 和 reject，所以當你在回呼函數中完成一些非同步的操作後，如果成功就呼叫 resolve，否則就會呼叫 reject。所以回呼函數最後透過呼叫 resolve 與 reject 來確定 promise 的狀態。在呼叫 reject 的時候，按照慣例是會傳遞一個 Error 物件，但並非必須，這就跟 JavaScript 中的 throw 一樣。傳遞 Error 物件在 debug 的時候能夠讓你方便追蹤呼叫的 stack。

#### Promise 的用法

Promise 的 then 方法接受兩個參數，這兩個參數即為兩支回呼函數，當成功的時候呼叫第一個回呼函數，失敗的時候則呼叫另一個，兩個都是可選的，所以你可以只處理成功的情況或是失敗的情況。

```javascript
promise.then(
  (result) => console.log(result), // "完美!" 
  (err) => console.log(err)        // "出問題了"
);
```

JavaScript Promise 的 API 會把任何包含有 then 方法的物件當作 "類 Promise" 的物件(thenable)，這些物件經過 `Promise.cast` 處理之後就和原生的 Promise 實例沒有任何區別了。所以如果你使用的是第三方的 Q 模組，返回一個 Q Promise，它跟原生 Promise 將會是相容的。

接著，讓我們看一下要如何將一個 callback function 包裝成 Promise。

```javascript
var fs = require('fs');

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
}

readFile('/foo.txt').then((data) => console.log(data));
```

Promise 的 `.then()` 裡面如果又傳出另一個 Promise 物件，那麼 `then()` 就可以隨意地一直串連下去，像是下面那樣：

```javascript
doSomething().then((result) => {
  console.log('第一個結果：' + result);
  return 88;
}).then((secondResult) => {
  console.log('第二個結果：' + secondResult);
  return 99;
}).then((thirdResult) => {
  console.log('第三個結果：' + thirdResult);
  return 200;
}).then((fourthResult) => {
  // 一直下去...
});
```

### Generator 是什麼?

一般的函數，在開始執行後，就會一直執行到整個函數結束為止。Generator有別於一般的函數，它可以在函數執行到一半的時候暫停，然後再回復執行，在暫停的這段時間，可以先處理其他的事情。

要暫停一個 generator function 必須在函數內部使用 `yield` 關鍵字，在函數外部是沒有辦法可以暫停 generator 的。暫停後要回復，則必須從外部呼叫 `next()` 方法來控制它回復，generator 本身沒有辦法自行回復。所以一個 generator 函數基本上可以一直重複的暫停又回復。以下為 generator 函數的宣告：

```javascript
function *gen() {
  var total = 1 + (yield 'foo');
}
```

這語法看起來可能有點奇怪，`*` 有點像函數指標，但這只是用來辨別這個函數是一個 generator 的函數。ES6 也沒有特別規定 `*` 應該寫在哪個位置，所以下面這幾種宣告方式都是正確的：

```javascript
function * gen(x, y) {}
function* gen(x, y) {}
function *gen(x, y) {}
function*gen(x, y) {}
```

看一下更完整的程式碼：

```javascript
function *gen() {
  console.log('before yied');
  var total = 1 + (yield 'foo');
  console.log('after yield, ' + total); // 10
}

var a = gen();
console.log(a.next());
console.log(a.next(9));
```

結果：

```
'before yied'
{value: "foo", done: false}
'after yield, 10'
{value: undefined, done: true}
```

這段程式碼在第一次呼叫 `gen()` 時會傳回一個 generator 物件。而 `next()` 會回傳一個 generator 產生的物件，包含 value 及 done 屬性。所以第一次呼叫 `next()` 方法時，程式碼執行到 yield 會暫停，然後函數會將 yield 右邊的 'foo' 字串作為 value 傳出