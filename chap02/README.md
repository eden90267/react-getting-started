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
| 算術運算元 | 四則運算的符號      | `+` `-` `*` `/` `%` `++` `--`                             | Number   | Number  |
| 位元運算元 | 提供快速且低階的運算 | `&` `|` `~` `^` `<<` `>>` `>>>`                           | Number   | Number  |
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

  ```