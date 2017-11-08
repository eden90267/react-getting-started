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