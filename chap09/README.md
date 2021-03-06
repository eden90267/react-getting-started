# Chap 09. 建構自己的 Landing Page

> 設計頁面與內容規劃  
> 如何規劃自己的 React 元件  
> 建置 Landing Page  
> 開始撰寫 Landing Page

## 設計頁面與內容規劃

### 網頁設計與平面設計的差異

網頁設計從基礎上來看，可以視為書本設計的另一種應用。不同的是閱讀的流動方向與可用元素動靜態的差別；另一個比較大的差異是網頁的元素可以使用動畫和影片，或在編排上根據瀏覽器寬度變化而有即時的調整 (RWD)。

### 選擇模板的方式

在美術設計上，不外乎就是三個大問題：結構、造型跟色彩。

以網頁框架 Semantic UI 為例，與結構相關的方案整理在 Collections 裡面，包括 Grid System、Form 等等，與造型相關的大部分整理在 Elements 或 Views 裡面，最後是動畫方面，都是整理在 Modules。

Bootstrap 大致上也是如此，結構相關的 Bootstrap 整理在 CSS，造型相關放在 Components，而動畫相關的都放在 JavaScript 裏頭。

所以當選擇模板，先了解模板的 Grid System 如何解決配置問題；再來考慮元件造型是否符合這次設計案的需求，如果不符再來看造型是否容易修改。

這裡值得注意的地方是，修改過後的造型通常會影響到使用者體驗，例如什麼造型的元件是可以互動的？標題各層級的字型與字級是什麼？內文以及提示等等的造型與字級又是什麼？這都是在設計的一開始就需要設定規劃好的，以免造成每個不同頁面使用的時候，都需要重新認識元件的功能，或是文字在閱讀的時候差異太大而造成許多使用上的不便；最後是參考動畫的部分，這部分放在最後是因為相關的套件很多，甚至自己動手撰寫大部分也都能達成。

### 內容的編排

規劃內容前，先決定這個網頁的呈現是以圖像為主還是文字為主，也就是作品的類型。以網站為例，以圖片為主的網站通常是企業形象網站、攝影集、餐廳形象介紹或是一些風景介紹等等。以文字為主大部分是新聞或是敘事性質的部落格等等。這會影響到各個元件的編排以及比例分配的問題。

在決定好類型後，就可套入隔線系統開始進行草圖的階段。可以在繪製草圖的時候決定呈現的風格，意即決定各個元件的造型。

最後是配色的部分，配色通常是設計工作裡頭最有趣的部分，也是最困難的部分；因為不協調的配色不僅會讓使用者感到視覺疲勞，也會透露出設計者的品味。配色的原則在於明度與彩度的協調，不論使用什麼色相，只要明度與彩度取得協調，就不難讓配色達到平衡。

另外建議草圖階段盡量能多思考一些操作的細節，例如動畫或是各個互動的效果等等，並試著將它描繪出來，這樣不但有利溝通，也可節省很多開發的時間成本。

## 如何規劃自己的 React 元件

草圖規劃完後，就進入完稿以及開發的階段。

React 提出元件的可重複利用性，解決了我們對相同程式找出來進行修改的不便利。

## 建置 Landing Page 開發環境

請參考 landingpage project：[landingpage git repository](https://github.com/eden90267/landingpage)