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

| Code | Outputs | Code   | Outputs |
|:-----|:--------|:-------|:--------|
| \n   | 換行鍵  | \'     | 單引號        |
| \r   | Enter鍵 | \"     | 雙引號        |
| \t   | Tab鍵   | \x00-\xFF     | 反斜線        |
| \b   | 刪除鍵  | \u0000 - \uFFFF | 16bits的字元     |
| \f   | 換頁鍵  |       |         |



