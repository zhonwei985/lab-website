// 版面主題：預設經典版（style.css），選了終端機版就換成 style-terminal.css。
// 放在 <head> 同步執行，在畫面第一次繪製前就換好，避免換頁時先閃一下經典版。
// 切換按鈕的邏輯在 script.js
(function () {
  var theme = 'classic';
  try {
    if (localStorage.getItem('theme') === 'terminal') theme = 'terminal';
  } catch (e) {
    // 無痕模式或封鎖儲存空間時讀不到，維持預設經典版
  }
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'terminal') {
    document.getElementById('themeStylesheet').href = 'style-terminal.css';
    document.querySelector('link[rel="icon"]').href = 'favicon-terminal.svg';
  }
})();
