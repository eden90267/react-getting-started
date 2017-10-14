# Chap 02. 從 JavaScript 出發

## 基本介紹

JavaScript是一個自網頁瀏覽器發跡的腳本語言，設計理念就是方便使用、可動態擴充功能，所以語言的彈性相當大。

JavaScript語言大量運用物件(Object)機制，來達成非凡的擴充性。

物件是JavaScript語言的基本組成元素，所有的方法和變數型態，都是繼承原始的物件後擴充而來，甚至連函數(Function)都被視為一種物件類型。所以，JavaScript甚至容許開發者可以在程式執行的過程中，透過修改物件的屬性，來隨時替換語言原本的機制或功能，達到擴充功能和修正錯誤。舉例來說，很多時候在不同瀏覽器中的JavaScript功能有不同，但前端開發者仍然可以為缺少功能的瀏覽器，動態修正行為不如預期的方法。

## 變數型態

JavaScript變數宣告方式有兩種：

- 顯示宣告：使用var關鍵字進行宣告
- 隱性宣告：不使用var關鍵字就直接使用

JavaScript將根據使用情況自動進行資料類型的轉換，例如Number的變數與字串的變數作運算的時候，最後會變成字串的變數，在嚴格模式(strict
mode)下變數使用前都必須要宣告，所以在本章節中都會使用var關鍵字進行宣告。

變數命名規則也要注意：

- 變數名稱第一個字元不可以是數字，只能為字母，下底線或錢字號所組成
- 接下來的字元最好是數字、字母、下底線或錢字號
- 變數名稱不能是關鍵字或邏輯常數(true、false、null或undefined)

```javascript
var MyName;
```

```javascript
var MyName, YourName, HisName;
````

```javascript
var MyName = 'JavaScript';
```

```javascript
var MyName = 'JavaScript';
var myname = 'Hello';
```

本章會介紹到的變數型別：

- undefined：未宣告的變數，或宣告過卻沒初始化變數
- String
- Number：64bits 浮點數
- Boolean
- Function
- Null：當物件不再使用時可宣告為null
- Object
- Array

### 字串 (String)

只要用雙引號或單引號括起來都是字串類型，除非記憶體有限制，不然長度是沒有限制的。當然也有零長度的字串。

```javascript
var text = '';
var text2 = "";
```

如果要讓字串換行可使用跳脫字元，以下列出詳細介紹：

| Code | Outputs | Code                | Outputs            |
|:-----|:--------|:--------------------|:-------------------|
| `\n` | 換行鍵   | `\'`                | 單引號              |
| `\r` | Enter鍵 | `\"`                | 雙引號              |
| `\t` | Tab鍵   | `\\`                | 反斜線              |
| `\b` | 刪除鍵   | `\x00` - `\xFF`     | 16bits的字元        |
| `\f` | 換頁鍵   | `\u0000` - `\uFFFF` | 16bits的Unicode字元 |

所有跳脫字元也可以用16bits的Unicode字元表示。

### 16bits 浮點數 (Number)

Number可以初始化的數值範圍有以下幾點的重點：

- 第一字元：數字或是不多於一個的 + 、 - 字元
- 如果以數字字元為第一字元時有下面三種可能：
  - 如果是0x或0X開頭，則代表這是一個十六進位的Number
  - 如果是以0為開頭。代表這是一個八進位的Number
  - 其他情況下則代表這是一個十進位的整數或浮點數

當Number初始化為十六進位時，數值範圍可由 0~9 或 A~F 字元組成；為八進位時則由 0~7 字元組成；為十進位時由 0~9 字元所組成，可不允許多於一個的小數點字元(.)或 e、E 字元組。

下面四個Number是相同的：

```javascript
var num1 = .0001;
var num2 = 0.0001;
var num3 = 1E-4;
var num4 = 1.0E-4;
```

下列初始化則需注意：

```javascript
var num1 = 0x3.45; // 16進位不能有小數點，所以這變數等於3
var num2 = 0.0001; // 由於8進位不能有小數點，所以這變數等於0
```

另有兩個Number常數需要特別注意：

- `Infinity`：代表正無窮大，例如正數除以 0 則傳回Infinity。-Infinity則是負無窮大。
- `NaN`：代表非數字，如果變數未初始化就進行數字運算，將會回傳NaN

### 布林值 (Boolean)

Boolean的值是 true 或 false 中的其中一個，JavaScript也會適時地將值轉換成 1 或 0 。

### 函數 (function)

函數可使用關鍵字function宣告，如沒加關鍵字則是匿名(anonymous)函數，括弧變數是該函數參數，有兩個以上參數用逗號隔開，如函數沒有參數也必須有空括弧。如果函數有回傳值，可使用關鍵字return將值傳回。

### 物件 (object)

物件擁有自己的屬性(properties)和方法(methods)：

```javascript
objectName.propertyNam;      // 讀取屬性
objectName['propertyNam'];   // 讀取屬性

objectName.propertyName();   // 讀取變數方法
objectName['propertyName']();// 讀取變數方法
```

屬性用來描述物件的特性，方法則是物件的函數。屬性都有名稱與值，屬性的值可以是任何一種資料型態，甚至是物件型態，也就是物件中可以有物件。

```javascript
var company = new Object();
company.name = 'mandice';
company.url = 'www.mandice.com';
company.establishment = new Date().setFullYear(2010,1,1);
```

### 陣列 (array)

陣列也是一種物件類型，陣列可以是連續性的索引陣列，也可以是關聯性的陣列(Associative Array)，例如：

```javascript
var company = new Array();
company.name = 'mandice';
company.url = 'www.mandice.com';
company.establishment = new Date().setFullYear(2010,1,1);
company[0] = ' Mandice Company. All rights reserved.';

for (var i in company) {
  console.log(i + '=> ' + company[i]);
}
```

一開始宣告company這個陣列類型，總共有三個關聯性變數，一個索引變數。關聯性變數可以想像成，關聯性變數可以想像成"屬性表"，而屬性存取其實就是查表，從範例中也能得知，陣列中的元素不一定是要相同的資料類型，也可以是巢狀另外一個陣列。

陣列類型最主要是length屬性和陣列元素的結構，加上JavaScript的陣列具有動態特性，所以在執行以下陣列方法的時候將會動態重設length的屬性值：

- 使用push、pop、shift、unshift的方法增加或刪除元素時
- 使用splice方法刪除陣列中的元素時

## JSON

ECMAScript第五版其中一個最重要的特色就是增加了JSON物件描述語言的支援，JSON是由JavaScript所衍生出來的資料格式，非常輕量化且易於理解，如今已在IT界被廣泛使用，甚至是在許多應用中被用於取代XML。

JSON主要用於描述資料或交換資料，不僅人類可讀，也非常容易在各種程式語言或系統中交換資料。目前已有許多程式語言也支援JSON格式，在JSON的官網已經列舉超過200種僅有支援JSON的程式語言。

### JSON 應用

JSON 一開始被廣泛使用在Web資料的傳遞，用以取代臃腫且囉嗦的XML，是 Ajax 技術中不可或缺的一環。

近年來，拜 Web 和社群網站活躍發展所賜，日益增長的資料量和存取需求，讓新的資料庫系統更加要求能描述複雜的資料結構，因此，傳統關聯式資料已不敷使用，迫切需要新的資料庫解決方案出現，於是，大家紛紛尋求NoSQL技術。令人意外的是 JSON 輕量化和易於描述複雜資料結構的特性，剛好可以在 NoSQL 資料庫領域發揮出來，相對於傳統的關聯性資料結構，JSON 能賦予資料庫更有彈性的去記錄各種資料結構。

JavaScript中最常使用的 NoSQL 的資料庫管理系統有 MongoDB、CouchDB、RavenDB 等。

### 建立 JSON 字串

JSON 能夠描述並儲存 JavaScript 的各種類型的資料(字串、整數、浮點數、物件、陣列等)，但 JSON 是以純文字的格式去儲存或交換資料，不需要格外的加解密，可直接純文字編輯器編輯。

一般來說，JavaScript 程式中，我們常使用 JSON 建立一個 JavaScript 的物件(Object)或陣列(Array)，以下是使用 JSON 和標準方法的比較：

#### 建立物件

標準方法：

```javascript
var myObj = new Object();
```

JSON 建立物件：

```javascript
var myObj = {};
```

#### 建立陣列

```javascript
var myArr = new Array();
```

JSON 建立陣列：

```javascript
var myArr = [];
```

#### 建立含值物件

JSON 也可用來描述含鍵值物件，用「:」隔開，多組資料用「,」分隔不同資料，鍵用字串方式表示，值用JavaScript所支援的任何一種資料型態：

```
{
  KEY: VALUE,
  KEY: VALUE,
  ...
  KEY: VALUE
}
```

在JavaScript程式裡面，我們同樣可用JSON方法，建立一個含值物件：

標準方法：

```javascript
var myObj = new Object();
myObj.book = 'Node.js';
myObj.chapter = 2;
```

使用 JSON：

```javascript
var myObj = {
  'book': 'Node.js',
  'chapter': 2
};
```

#### 建立含值陣列

```
{ element1, element2, element3, ..., elements }
```

標準方法：

```javascript
var myArr = new Array('one', 'two', 'three', 'four', 'five');
```

使用 JSON：

```javascript
var myArr = ['one', 'two', 'three', 'four', 'five'];
```

不管是物件或是陣列，物件的值和陣列的元素都支援以下格式：

- 64bits 浮點數
- 字串
- 布林值
- 陣列
- 物件
- Null值
- 函數物件

你會發現幾乎所有JavaScript的物件和資料，都可以用 JSON 的形式表達。

### JSON 使用

JSON 在今天已經儼然成為Client和Server之間溝通的共通格式。

可用JavaScript內建的`JSON.parser()`和`JSON.stringify()`轉換 JavaScript 與 JSON。

- `JSON.parser()`：把JSON格式資料轉成物件或陣列
- `JSON.stringify()`：把物件或陣列轉成JSON格式的資料

## 基本語法

變數定義好後，不外乎就是要對這些變數進行賦值、運算或比較等處理，這些都有指定的運算符來完成。運算式由運算符和運算元所組成，運算元除了變數外，還包含函數的返回值與直接量。在JavaScript中，沒有存在任何運算符的運算式稱為簡單運算式，簡單運算式的結果是單值本身。由一個以上運算符組成稱為複合運算式。

下表則是根據運算元和結果值的不同做一個分類：

| 種類      | 描述               | 運算符                                                     | 運算元    | 結果值   |
|:----------|:------------------|:----------------------------------------------------------|:---------|:--------|
| 算術運算式 | 四則運算的符號      | `+` `-` `*` `/` `%` `++` `--`                             | Number   | Number  |
| 位元運算式 | 提供快速且低階的運算 | `&` `|` `~` `^` `<<` `>>` `>>>`                           | Number   | Number  |
| 比較運算式 | 測試真假值          | `>` `<` `>=` `<=` `==` `!=` `===` `!==`                   | Boolean  | Boolean |
| 邏輯運算式 | 測試真假值          | `&&` `||` `!`                                             | Boolean  | Boolean |
| 字串運算式 | 將字元合併          | `+`                                                       | String   | String  |
| 賦值運算式 | 為變數賦值          | `=` `+=` `-=` `*=` `/=` `%=` `<<=` `|=` `>>=` `>>>=` `^=` | *        | *       |
| 函數運算式 | 執行函數            | ()                                                        | Function | *       |
| 物件運算符 | 物件建立、存取及檢查 | `.` `{}` `[]` `new`                                       | Object   | *       |
| 其他運算符 | 其他               | `typeof` `void` `delete` `in` `instanceof` `?:` `,`       | 運算式    | *       |

### 簡單運算式

簡單運算式只由值組成：

```javascript
1.2
"Hello ! "
false
{x: 5, y: 6}
[1, 2, 3]
```

### 算術運算符

`+`、`-`、`*`、`/`、`%`、`++`、`--`


進行算術運算的時候，有可能運算符兩端值不是數字，JavaScript則會嘗試把值轉換成數字再進行運算，如果無法運算則會傳回NaN。如下面例子：

```javascript
var num = "1234";
console.log(++num);
console.log(num - 1);
console.log(1 - num);
```

下面會傳回NaN，因為值無法轉數字：

```javascript
var num = "a1234";
console.log(++num);
console.log(1 - num);
```

### 位元運算符

JavaScript位元運算符共有七個，提供數字做更快速且低階的運算，在做位元運算之前都必須先把運算符左邊或右邊的值都轉換為32位元無正負符號的二進位整數，如果用22當作運算符左邊的值，2當作右邊運算符的值，運算完的結果可參考下表：

| 運算元                | 描述                                                                                                                   | 結果                |
|:---------------------|:----------------------------------------------------------------------------------------------------------------------|:-------------------|
| `&` (AND)            | 對兩邊二進位整數的每一個位元執行AND運算，也就是相同位置上兩邊的值都是1的時候才傳回1，反之為0                                      | `22 & 2` // 輸出2   |
| `|` (OR)             | 對兩邊二進位整數的每一個位元執行OR運算，也就是相同位置上有一邊的值是1就傳回1，除非兩邊的值都是0才傳回0                              | `22 | 2` // 輸出22  |
| `~` (NOT)            | 把二進位整數的每一個位元執行NOT運算，也就是對值做補數，原本1的值則運算為0，原本0的運算為1                                         | `~22` // 輸出-23    |
| `^` (XOR)            | 對兩邊二進位整數的每一個位元執行XOR運算，也就是相同位置上其中一邊的值為1，另外一邊的值為0的時候則傳回1，如果兩邊的值均為1或均為0則傳回0 | `22 ^ 2` // 輸出20  |
| `<<` (位元左移)       | 運算元右邊的值代表要左移多少位元，運算元左邊二進位整數則向左位移指定位元數                                                       | `22 << 2` // 輸出88 |
| `>>` (位元右移)       | 運算元右邊的值代表要右移多少位元，運算元左邊二進位整數則向右位移指定位元數                                                       | `22 >> 2` // 輸出5  |
| `>>>` (位元無符號右移) | 運算元右邊的值代表要右移多少位元，運算元左邊二進位整數則向右位移指定位元數。移出右邊界數字就丟了，左邊界填0                          | `22 >>> 2` // 輸出5 |

### 比較運算符與邏輯運算符

這兩種運算符通常用來測試真假值，最常見是迴圈和條件的處理

比較運算符：

`>`、`<`、`>=`、`<=`、`==`、`===`、`!=`、`!==`

邏輯運算符

`&&`、`||`、`!`

需要注意的是全等運算符(===)，運算的物件包含數字、字串、布林值、物件、陣列及函數，至於這些運算的物件如何確定是否完全相等則需注意以下規則：

- 數字和布林值在資料類型相同情況下，只需要比較值就可以，如果值相同則回傳true

  ```javascript
  var string = '1234';
  var num = 1234;
  console.log(string === num); // false
  var string_true = '1';
  var boolean_true = true;
  console.log(string_true === boolean_true); // false
  ```

- 字串運算式除了資料類型相同外，字元數也要相同，而且每個位置的字元也要相同才回傳true

  ```javascript
  var stringA = 'abc' + 'def';
  var stringB = 'abcd' + 'ef';
  console.log(stringA === stringB); // true
  ```

- 物件、陣列及函數則會比較參考的位置是否一致，如果兩個物件參考的位置一致才回傳true。即使兩個物件擁有相同數量的元素，只要參考的位置不同，就不會被視為完全相等。

  ```javascript
  var string = 'a1234';
  var stringObjectRefA = new String('a1234');
  var stringObjectRefB = new String('a1234');
  console.log(string === 'a1234'); // true
  console.log(string === stringObjectRefA); // false
  console.log(stringObjectRefA === stringObjectRefB); // false
  ```

  以下列出比較容易出錯的比較運算：

  ```javascript
  console.log('0' == '');         // false
  console.log(0 == '');           // true
  console.log(0 == '0');          // true
  console.log(false == 'false');   // false
  console.log(false == '0');       // true
  console.log(false == undefined); // false
  console.log(false == null);      // false
  console.log(null == undefined);  // true
  console.log(' \t\r\n' == 0);    // true
  ```

  以上換成`===`全等運算符，則所有輸出為false。

### 字串運算符

使用加法運算符(+)把字元串起來形成新的字串。需要注意的是如果加法運算符有兩個以上而且運算元不只是只有數字的時候，則須注意以下兩點：

- 當加法運算符左右兩邊的運算元都是數字則執行加法運算
- 當加法運算符左右兩邊其中一邊獲兩邊都不是數字的時候，則會把非數字先轉換成字串，然後執行字串運算

```javascript
console.log('10' + 20);                 // '1020'
console.log(10 + new Array(20, '30')); // '1020,30'
```

執行加法運算符(+)的時候首先會從左至右運算，再根據運算符兩邊的資料型態採用算術運算或是字串運算。

```javascript
console.log('10' + 20 + 30); // '102030'
console.log(10 + 20 + 30);   // '3030'
```

### 賦值運算符

`=`、`+=`、`-=`、`*=`、`/=`、`%=`

只有等式運算符可以用在連續的運算式，其餘的賦值運算符則沒有此功能。

```javascript
var string = 'a1234';
var StringRefA, StringRefB, StringRefC;
StringRefA = StringRefB = StringRefC = string;
console.log(StringRefC);
```

### 函數運算符

JavaScript中只有一種方法來執行函數，就是在函數最後加上函數運算符`()`，這裡指的函數代表兩種類型，一種是`typeof`值為function的類型，另外一種是`typeof`值為物件(object)，從Function類別建立的函數，也就是物件實例(instance)：

```javascript
var funcA = function() {
  console.log(10 + 20);
}
var funcB = new Function('console.log(10 + 20)');
funcA(); // 30
funcB(); // 30
```

### 其他運算符

- `typeof`
- `?:`
- `instanceof`
- `,`：依序計算一系列的運算式並傳回最後一個運算式結果。Ex：`var result = (done++, fail++, done+fail);`
- `delete`
- `void`：計算完結果後放棄其值並回傳`undefined`。Ex：`var result = void done++;`

## 流程控制

JavaScript主要由各種語句構成，各種語句代表程式執行過程中的流程、限制和規則，語句可分成單行語句或由大括弧括起來的複合語句，主要分成條件式或迴圈陳述式。

程式執行的過程中通常都是按照順序從第一行陳述式一直執行到最後一行陳述式，在這過程中可能會有條件陳述式或迴圈陳述式。

- 賦值語句
- 變數宣告語句

下面將補充更多有關的其他語句：

| 描述             | 語法結構                          |
|:-----------------|:----------------------------------|
| 變數陳述式       | `var variable1;`                  |
| 標籤陳述式       | `labelname: statements;`          |
| 區塊陳述式       | `{ statement1; statement2; ... }` |
| 變數賦值運算式   | `varialbe = value;`               |
| 函數執行運算式   | foo();                            |
| 屬性賦值運算式   | object.property = value;          |
| 方法執行運算式   | object.method();                  |
| if條件陳述式     |                                   |
| switch條件陳述式 |                                   |
| `for`            |                                   |
| `for...in`       |                                   |
| `while`          |                                   |
| `do while`       |                                   |
| continue         | `continue [label];`               |
| break            | `break [label];`                  |
| return           | `return [expression];`            |
| throw            | `throw exception;`                |
| 空陳述式         | `;`                               |
| with陳述式       | `with (object) statements;`       |

### 陳述式

一條陳述式可由一個或多個運算式組成，兩條以上的陳述式寫在同一行可由分號隔開。區塊陳述式則由大括弧括起來，區塊陳述式裡面可以有一個以上的陳述式，至於整個區塊陳述式當作是一條陳述式處理，也就是程式執行到區塊陳述式，會把整個區塊陳述式執行完畢才換下一條陳述式。需要注意的是，區塊陳述式的結尾不需要用分號結束。

#### if...else 條件陳述式

- 單一 `if` 條件式
- `if...else` 條件式
- `if ... else if ... else` 條件式

#### switch 陳述式

`switch` 條件陳述式其實是 `if..else` `if...else` 的另外一個結構，但是 switch 條件陳述式可以使程式碼更加簡練易讀。

重點是 `break` 關鍵字，代表是符合條件之後的結尾，如果都沒遇到 `break` 關鍵字的話就一直執行到整個條件陳述式的最後一行。

#### for 迴圈陳述式

- 參數initialization代表初始值
- 參數expression則是透過邏輯運算式判斷是否需要繼續執行迴圈的陳述式
- 參數increment則是把初始值做累加或累減的運算

#### for...in 迴圈陳述式

for...in迴圈陳述式主要是把物件的屬性或是陣列中的元素依序拿來運算：

```javascript
var list = [
  {id: 1, score: '30'},
  {id: 2, score: '50'},
  {id: 3, score: '70'},
  {id: 4, score: '65'},
];

for (var i in list) {
  var obj = list[i];
  console.log(obj.id + ':' + obj.score);
}
```

#### while 迴圈陳述式

參數condition代表判斷的條件，如果條件為true則執行迴圈內的陳述式，只要條件不為false，while迴圈就會一直執行

#### do...while 迴圈陳述式

do...while 的方式則是先執行一次迴圈內的陳述式再判斷是否要繼續執行，也就是說用這種迴圈陳述式會至少執行一次

#### break 陳述式

break主要是在迴圈陳述式或是switch條件陳述式內使用，用法是直接跳過整個迴圈陳述式並開始執行後面的陳述式

#### continue 陳述式

continue 主要是在迴圈陳述式使用，用法是再次回到迴圈陳述式的第一行

#### with 陳述式

with 陳述式無法在strict mode使用。with 陳述式最主要是為了省略物件的名稱：

```javascript
var list = [
  {id: 1, score: '30'},
  {id: 2, score: '50'},
  {id: 3, score: '70'},
  {id: 4, score: '65'},
];

for (var i in list) {
  var obj = list[i];
  with (obj) {
    if (score >= 60) {
      continue;
    }
    console.log('不及格的學號 [' + id + ']:' + score);
  }
}
```

## 函數

函數主要是將重複運算的陳述式封裝在一起，有利於程式碼的重複使用，也是高階程式語言不可或缺的功能。JavaScript內建有預設好的全域函數，用於處理一些常見的處理。

| 函數名稱      | 說明                                           |
|:-------------|:----------------------------------------------|
| eval()       | 將運算式轉換成變數名稱或物件名稱，藉此讀取此名稱的值 |
| escape()     | 將字串轉換成用URL編碼的字串                      |
| unescape()   | 將URL編碼的字串轉回ASCII字元的字串                |
| encodeURI()  | 將字串編碼為一個有效的統一資源識別字(URI)字串       |
| decodeURI()  | 把編碼過的統一資源識別字(URI)轉換回字串            |
| parseFloat() | 將物件或字串轉換成浮點數                         |
| parseInt()   | 將物件或字串轉換成整數                           |
| Number()     | 將物件或字串轉換成Number物件                     |
| String()     | 將物件轉換成字串                                |
| Boolean()    | 將物件轉換成布林值                               |
| isFinite()   | 檢查陳述式或是物件是否為有限數並回傳布林值          |
| isNaN()      | 檢查陳述式或是物件是否為非Number物件並回傳布林值    |

### 函數定義及呼叫

JavaScript除了預設的全域函數可以使用外，也能透過自行定義的方式宣告自己的函數，至於定義的方法分成六種，直接看範例：

```javascript
// 範例1：宣告一個函數名稱然後再呼叫
function fnprint(val) {
  console.log('The value is: ' + val);
}
fnprint('ok');

// 範例2：宣告變數來使用Function類別，然後透過這變數來呼叫
var fnprint = new Function('val', 'console.log(\'The value is: \' + val);');
fnprint('ok');

// 範例3：宣告變數來定義一個匿名函數，再透過這變數呼叫匿名函數
var fnprint = function(val) {
  console.log('The value is: ' + val);
}
fnprint('ok');

// 範例4：直接定義一個匿名函數，然後直接執行它
(function(val) {
  console.log('The value is: ' + val);
})('ok');

// 範例5：根據JavaScript的小括弧運算符優先權，下面範例會從最裡面的小括弧直接強致執行匿名函數
(function(val) {
  console.log('The value is: ' + val);
}('ok'));

// 範例6：透過void關鍵字直接執行緊跟著的匿名函數
void function(val) {
  console.log('The value is: ' + val);
}('ok');
```

範例1 是比較常見做法，可稱為命名函數或是函數陳述式，其他範例都叫做函數運算式，意思是函數透過運算後存在一個變數，或直接執行。

範例2 是透過function類別來建立函數然後存到一個變數中。其他範例則是匿名函數的應用。

函數運算式和函數陳述式有兩點不同：

- 只要函數陳述式有被定義到，無論程式碼是在此函數陳述式之前或之後都可以被呼叫到。至於函數運算式只有在建立後才能被呼叫
- 函數陳述式只要被定義過後就無法從記憶體中刪除並回收，如果是函數運算式則是定義完後就被回收了。剛的範例4、5和6都是被呼叫完之後就被回收了，之後也不能再被呼叫，就只有在當下執行過那麼一次

  範例3 則是把函數運算式存在變數中，所以只要變數的參考計數器沒有歸零或是被刪除，那麼就可以透過此變數呼叫函數運算式。但是如果參考計數器歸零或是被刪除了，那麼就會被垃圾回收機制(Garbage Collection)回收：

  ```javascript
  var fnprint = function(val) {
    console.log('The value is: ' + val);
  }
  fnprint('ok');   // 可以呼叫
  fnprint = null;
  fnprint('fail'); // 不能再次被呼叫
  ```

### 閉包 (Closure)

在JavaScript中，函數擁有著自己的獨立定義域(Domain)，可以宣告自己的變數在函數裡面使用，甚至是忽略外部有相同名稱的變數，這樣的情況，就被稱為閉包。

一個簡單的閉包範例如下：

```javascript
var x = 50;

function closureFunc() {
  var x = 100;
  
  return x;
}

console.log(x);
console.log(closureFunc());
```

函數 `closureFunc()` 有自己的定義域，不受外部變數影響。

閉包與函數有著緊密的關係，以至於許多人將閉包與普通函數視為相同的東西。事實上，你可以視閉包為一種函數的使用場景，用來隔開外界的變數，和準備一個能獨立存在變數的環境。

```javascript
function BMI(name) {
  var BMIResult = 0;
  function count_BMI(weight, height) {
    var mass = parseInt(weight);
    var counter = parseInt(height) / 100;
    BMIResult = mass / (counter * counter);
    
    console.log(name + ', your BMI is' + BMIResult + '.');
    
    return BMIResult;
  }
  
  return count_BMI;
}

// 建立閉包函數
var Wesley_BMI = BMI('Wesley');
var Fred_BMI = BMI('Fred');

// 使用閉包函數
Wesley_BMI(75, 175);
Fred_BMI(66, 180);
```

會顯示不同的名稱是誰，是因為人名在建立閉包函數時就已經設定好，存放在閉包獨立環境的變數之中。

閉包函數有兩個特點：

- 閉包函數在執行的過程中，閉包函數內的區域變數都可以被存取
- 閉包函數執行結束後，維持最後區域變數的值

因此閉包函數的使用重點在閉包函數內的變數如何存取，也就是Scope的作用範圍；以及閉包函數內的變數何時刪除，也就是變數的記憶體使用。

## 事件驅動機制 (Event-driven)

JavaScript最大的特色就是事件驅動(Event-driven)的機制。因為這樣的設計，讓JavaScript程式跑起來像是多工平行處理一般，但有時卻又不是這麼一回事，讓許多初學者或不熟悉機制的人分不清楚狀況。所以，開發JavaScript應用程式，最重要的是要熟悉和了解事件驅動機制(Event-driven)，不然寫出來的城市將會是一個墨大災難。

### 事件機制

簡單來說，JavaScript引擎是以**事件為單位在執行程式**，當一個事件的工作完成後，會找到下個事件去執行，一旦沒有任何事件需要被執行，整個程式就會結束。一個常見的例子 `setTimeout()` 函數，就可以說明事件引擎的行為。

```javascript
console.log('Start');

setTimeout(function() {
  console.log('Trigger');
}, 1000);

console.log('End');
```

```shell
Start
End
Trigger
```

以上就算 `setTimeout()` 延遲的秒數設置為 0 秒，印出字串的順序不變。

`setTimeout()` 並非只是依照延遲秒數，然後觸發執行這麼簡單。真正的情況是， `setTimeout()` 會向JavaScript事件引擎註冊一個新的事件，讓這新的事件準備被觸發執行，然後 `setTimeout()` 返回並繼續執行下一行程式。當JavaScript引擎跑完了每一行的程式，就代表完成目前的事件工作，然後JavaScript引擎就會緊接著去尋找下一個可以處理的事件。

因為 `setTimeout()` 有註冊一個事件，所以該事件會被JavaScript視為下一個可以處理的事件之一，然後又因為被設定為沒有延遲秒數，也滿足觸發條件，所以才觸發執行。

### 非同步 (Asynchronous)

事件驅動時常會與非同步綁上關係，因為以非同步概念設計的程式，與事件驅動機制相當合的來。非同步的概念，就是將需要花時間等待、無法及時完成的工作，丟到背景等待，而不是讓程式只為了一個工作，停下來等待完成，導致整個程式停擺。

所以，非同步的開發模式在JavaScript上的設計方式，像前一小節提到的，你可先註冊個事件，等到工作完成滿足條件後再觸發，再接著處理接下來的工作。

## 原型 (Prototype)

當程式越來越複雜，我們就會開始想辦法整理並管理它，甚至是運用一些手段來簡化程式邏輯和重複利用(reuse)自己寫的程式碼。很多熟悉物件導向開發的人，常會在JavaScript語言中尋找類別(Class)的存在，試圖用類別來包裝自己的程式碼。

事實上，JavaScript並沒有類別，所以，如果你想要達成如同類別的功能，必須利用JavaScript動態物件的特性來自己實作，但那又是另外一種JavaScript開發的技巧了。先撇開特殊技巧不談，JavaScript其實提供了原型(Prototype)的功能來包裝物件，類似物件導向開發中的類別功能。

原型的概念在JavaScript中隨處可見其蹤跡，簡單來說，JavaScript的物件可以參考原型做許多變化，進而變成獨一無二的物件。像JavaScript的陣列物件、字串物件等，都是由基本的JavaScript物件演化而來，只是參考的原型不同，進而功能不同罷了。

在JavaScript，我們可利用原型，設計一個屬於自己的物件，如下：

```javascript
var MyObject = function() {
  this.count = 0;
}
MyObject.prototype.touch = function() {
  this.count++;
}
```

接著可直接使用這個原型物件，來建立一個新的物件，讓這個新的物件所有定義都可參考這個原型物件：

```javascript
var myObj = new MyObject();

myObj.touch();
myObj.touch();
myObj.touch();

console.log(myObj.count); // 3
```

## 記憶體回收機制 (Garbage Collection)