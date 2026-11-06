# 倫理計算實驗室網頁

## 專案規格
- 純 HTML/CSS/JS，無框架
- 語言：繁體中文
- **雙版面**（2026-11-05 起）：預設是**經典版**（深藍＋金褐的簡潔學術風，`style.css`，
  即 GitHub 上 `d54deaf` 的設計），頁首 `#themeToggle` 按鈕可切換成**終端機版**
  （`style-terminal.css`）。經典版的入口是彩蛋：頁尾右下角半透明的 `>_`（`#terminalEgg`）
  或鍵盤按 `` ` ``；終端機版則在頁首顯示 `[經典版]` 切回。兩份樣式表共用同一份 HTML，**改 HTML 結構時兩個版面都要檢查**；
  只屬於某一版的元素用 CSS 隱藏（經典版藏 `.window-bar`/`.prompt-line`/`.hero-ascii`，
  終端機版藏 `.eyebrow-classic`）。經典版的 token 是 `--color-navy`/`--color-accent`/
  `--font-serif` 等（見 `style.css` 開頭），下面幾行的 token／字型規則是終端機版的。
- 終端機版風格：**Terminal CLI**——黑底磷光綠、
  全站等寬字、直角、1px 邊框、無陰影、極淡 CRT 掃描線（照片除外），終端機符號（prompt、`[ ]`
  按鈕、`//` 分組、`#` 註解、tmux 編號導覽）。響應式設計。
- 色系：只有深色模式。token 定義在 `style.css` 開頭 `:root`：`--color-bg`（#0a0a0a）、
  `--color-fg`（#33ff00 主色）、`--color-fg-dim`（次要文字）、`--color-secondary`
  （#ffb000 琥珀）、`--color-muted`/`--color-border`（#1f521f，**只能用在邊框，對比
  不足不可當文字色**）、`--glow`。字級只用 `--text-xs` ~ `--text-3xl` 固定級距。
  元件一律引用變數，不要寫死色碼。
- 字型：JetBrains Mono（英數）＋ Noto Sans TC（中文 fallback，沒有等寬中文字型可用），
  由各頁 `<head>` 的 Google Fonts `<link>` 載入。**新增頁面時務必一併複製這段
  `<link>`**，否則該頁會掉回系統預設字型，跟其他頁面長得不一樣。
  **Google Fonts 的 JetBrains Mono 不含方塊／框線字元（`█ ╗ ─` 等）**，ASCII art
  請只用純 ASCII（`_ | / \ + -`），否則會掉到別的字型、字寬對不齊。

## 檔案結構
- `index.html` — 首頁：Hero + 研究方向摘要（tag pills，內容取自 `research.html`）
- `research.html` — 研究方向獨立頁（條列式呈現 7 個研究領域，`.research-list`；下方「研究計劃」
  區塊跟 `faculty.html` 著作裡的研究計劃是**同一份資料、兩邊各一份**，新增／修改計畫時兩頁都要改）
- `members.html` — 實驗室成員獨立頁（博士生/碩士生/專題生卡片，不含指導教授
  與已畢業成員，兩者分別在 `faculty.html`／`graduates.html`）
- `faculty.html` — 教師個人頁（吳士駿教授完整經歷）
- `publications.html` — 發表著作獨立頁（年份篩選 + 論文列表）
- `graduates.html` — 畢業生獨立頁（已畢業成員卡片）
- `favicon.svg` — 分頁圖示，黑底 + 綠色 E（Ethics）+ 琥珀色游標方塊，純 SVG 不依賴字型
- `images/network-motif.svg` — 首頁 Hero 背景的節點連線圖，呼應社群網路研究主題；
  由固定亂數種子的 Python 腳本產生（見 2026-09-10 任務紀錄），不是手繪；
  2026-10-05 改為綠線＋方形節點（琥珀色重點節點）
- `style.css` — 經典版（預設）樣式；`style-terminal.css` — 終端機版樣式。**不使用 inline style**
- `theme.js` — 在 `<head>` 同步執行，依 `localStorage.theme` 在第一次繪製前換成終端機版
  樣式表與 favicon（避免換頁閃一下經典版）；切換按鈕邏輯在 `script.js`。
  **新增頁面時要複製 `<link id="themeStylesheet">` + `<script src="theme.js">` 這兩行**
- `favicon-terminal.svg`、`images/network-motif-terminal.svg` — 終端機版用的圖示與 Hero 背景；
  沒有 `-terminal` 的是經典版
- `script.js` — mobile nav toggle、中英切換（全站共用）、首頁 Hero 標題打字效果（僅 `index.html`）、
  發表著作年份篩選（僅 `publications.html`）、畢業生年級篩選（僅 `graduates.html`）、
  捲動進場動畫（全站共用）
- `images/members/` — 成員大頭照存放處，檔名對應各成員卡片 `<img>` 的 `src`
  （見任務紀錄「成員頭像加入照片版位」）。圖片載入失敗時會自動顯示姓氏色塊
  （`.avatar-fallback`）當備援，所以缺照片不會壞版。
  **照片規格：寬高比 4:3**（例如 800×600 或 1200×900）。卡片照片框是
  `aspect-ratio: 4/3` + `object-fit: cover`，比例不符會被裁切；`object-position:
  top` 會優先保留畫面上方，因此人臉盡量靠上不會被裁掉。
  目前已有：`armin.jpg`、`chen-maoqun.jpg`、`chen-tong.jpg`、`felix-wu.jpg`、`hong-zongwei.jpg`、`huang-ziyu.jpg`、`lan-jingyi.jpg`、`lin-caiwen.jpg`、`lin-yongzhi.jpg`、`zeng-qiaoying.jpg`、`zhang-jiaquan.jpg`、`zhou-zihao.jpg`（2026-11-06），其餘成員照片使用者表示之後會補。
- 聯絡資訊（地址/Email/電話）統一放在每個頁面的 `<footer class="site-footer">`
  （`.footer-contact` class），**沒有獨立的聯絡頁面或聯絡表單**。

## 偏好
- 每次改動後簡短說明改了什麼
- CSS 一律寫進 `style.css`，不要用 inline style

## 開發慣例
- `script.js` 中對頁面專屬元素（`#heroTitle`、`#pubFilter`、`#gradFilter`）的事件綁定都要做
  null 檢查，因為並非每個頁面都有這些元素（年份篩選只有 `publications.html`、
  年級篩選只有 `graduates.html`）。
- 捲動進場動畫的隱藏狀態（`.reveal`）一律由 `script.js` 動態加上，**不要寫進
  HTML**。這樣沒有 JS、或瀏覽器不支援 `IntersectionObserver` 時，內容會維持
  正常顯示，不會整頁卡在透明狀態看不見。
- 新增教師/成員頁面時可參考 `faculty.html` 的 class 命名重用：
  `.faculty-*`、`.timeline-*`（學經歷）、`.tag-*`（研究領域標籤）、
  `.info-*`（開授課程/指導學生列表）、`.pub-group`（著作分類）。
- **中英切換**：中文寫在元素內文，英文寫在同一元素的 `data-en="..."`；
  `aria-label` 的英文寫在 `data-en-aria-label`。`script.js` 會整段替換 `textContent`，
  所以 **`data-en` 只能加在沒有子元素的元素上**（有子元素就把要翻的文字包進
  `<span data-en>`，例如 logo、頁尾版權、`faculty.html` 聯絡資訊）。
  **新增或修改任何中文內容時，要一併補上／更新 `data-en`**，否則英文模式會停在中文。
  人名（學生姓名、姓氏色塊）刻意不加 `data-en`，英文模式維持中文，等使用者提供
  本人慣用的英文拼法再補。新增頁面時，頁首要複製 `#langToggle` 按鈕（放在
  `</nav>` 與 `.nav-toggle` 之間，預設 `hidden`）。
- 所有獨立頁面（`research.html`/`members.html`/`faculty.html`/
  `publications.html`/`graduates.html`）的導覽列都要互相同步：目前所在頁面的
  連結加上 `class="active"`（對應 `.site-nav a.active` CSS，底線標示）。

## 任務紀錄

### 2026-07-06：新增吳士駿教授真實資料
- **背景**：使用者提供成功大學電機系吳士駿教授（S. Felix Wu，現任電機資訊學院院長）的完整
  學經歷/研究領域/著作/專利/研究計劃/開授課程/指導學生資料，用來取代 `index.html` 成員卡片中
  原本佔位用的「陳志明 教授」。
- **決策**：因為完整資料量遠超首頁成員卡片能容納的範圍，選擇「新增獨立教師頁面」方案，
  而非把首頁「研究方向」「發表著作」區塊整個改寫。
- **改動**：
  - `index.html`：指導教授卡片改為吳士駿教授的姓名/職稱/簡述，並加上「查看完整經歷 →」
    連結到 `faculty.html`。
  - 新增 `faculty.html`：教師個人頁，涵蓋學經歷（timeline）、研究領域（tag pills）、
    著作（期刊論文/會議論文/專利/研究計劃，分組呈現）、開授課程、指導學生、特殊榮譽。
  - `style.css`：新增 `.member-link`、`.faculty-*`、`.timeline-*`、`.tag-*`、`.info-*`、
    `.pub-group` 等 class，並補上對應的響應式規則（`@media` 區塊內）。
  - `script.js`：`pubFilter`/`contactForm` 的事件綁定加上 null 檢查，避免在沒有這些元素的
    頁面（如 `faculty.html`）拋出例外中斷整個 script。
- **待補資料**（原始資料本身缺漏，非本次改動遺漏）：
  - 吳教授的 Email（原始資料只有欄位標籤，沒有實際地址）
  - 「倫理計算實驗室」的實際網址（原始資料只有標籤文字，沒有連結）
- **驗證方式**：因 sandbox 內 headless Chromium 缺系統函式庫且需要 root 安裝（無互動式 sudo
  權限，未強行安裝），改用 `python3 -m http.server` 起本地伺服器 + jsdom 實際執行
  `script.js`，確認 `index.html`、`faculty.html` 皆無 JS 執行期錯誤、mobile nav toggle
  正常、成員卡片連結正確指向 `faculty.html`。

### 2026-07-06：`index.html` 成員/著作資料改為真實內容
- **背景**：使用者提供吳教授實驗室完整指導學生名單與著作資料後，發現 `faculty.html`
  內容已與提供資料一致，但 `index.html` 的「成員介紹」「發表著作」仍是先前佔位用的
  虛構學生（林雅婷、王建宏、李思穎、張育誠、吳佳蓉）與虛構教授「陳志明」的論文。
- **決策**（經詢問使用者確認）：
  - 成員介紹：換成真實學生姓名，因無每位學生的研究方向資料，移除 `member-desc`
    敘述句，只保留姓名與身分（博士生/碩士生/專題生）。
  - 發表著作：改用吳教授 `faculty.html` 上的真實期刊/會議論文（6 篇），移除虛構論文。
- **改動**：
  - `index.html` 成員介紹：博士生改為吳彥廷 1 人；碩士生改為 11 位真實姓名；
    新增「專題生」分組（錢信亦）。
  - `index.html` 發表著作：`pubList` 換成吳教授真實著作，年份涵蓋 2019/2021/2022/2023/2024；
    `pubFilter` 按鈕年份由 2026/2025/2024 改為 2024/2023/2022（對應實際著作年份，
    2019、2021 的著作仍可透過「全部」看到，只是沒有專屬篩選按鈕）。
  - `faculty.html`、`style.css`、`script.js` 未變動。
- **驗證方式**：用 Python `html.parser` 檢查 `index.html` 標籤全部正確配對；
  未改動 `script.js`，其既有的 null 檢查與篩選邏輯不受影響。

### 2026-07-06：實驗室名稱、校系資訊、研究方向改為真實內容
- **背景**：網站原本用「智慧系統實驗室 / Intelligent Systems Lab」、台大資工系當佔位資料
  （建立於吳教授資料補齊之前），使用者確認實際名稱是「倫理計算實驗室」，且要求把首頁
  「研究方向」也換成吳教授 `faculty.html` 上的 7 個真實研究領域。
- **改動**：
  - 實驗室名稱：`index.html`、`faculty.html` 的 `<title>`、logo、Hero 標題、footer
    統一改為「倫理計算實驗室 / Ethics-aware Computing Lab」；`CLAUDE.md` 標題同步更新。
  - 校系資訊（經使用者確認一併修正）：`index.html` Hero eyebrow 改為
    「National Cheng Kung University · Dept. of Electrical Engineering」；聯絡資訊地址
    改為「國立成功大學 奇美樓4樓95407室」、電話改為「06-2757575 ext.62375」；移除台大資工的
    假 Email（`islab@csie.example.edu.tw`，原始資料沒有吳教授的真實 Email）。
  - 研究方向：`index.html` 的 6 張虛構 research-card（機器學習理論、自然語言處理等，含
    虛構描述文字）換成吳教授真實的 7 個研究領域（Ethics-aware Computing、Disinformation、
    Social Network and Computing、Cyber Security、Future Internet Architecture and
    Protocols、Distributed Computing、Operating Systems），因無對應描述文字，卡片只保留
    標題（沿用「移除無資料的敘述句」慣例，同成員卡片的處理方式）。
  - `faculty.html`、`style.css`、`script.js` 未變動。
- **驗證方式**：用 Python `html.parser` 檢查 `index.html` 標籤全部正確配對。

### 2026-07-06：成員頭像加入照片版位
- **背景**：使用者希望每個成員卡片上方（含 `index.html` 的指導教授/博士生/碩士生/專題生、
  `faculty.html` 的教師 hero 區）都有實際照片的版位，而不是只有姓氏色塊。目前沒有任何
  真實照片檔案。
- **決策**（經詢問使用者確認）：把純文字的 `.member-avatar` / `.faculty-avatar` 圓形色塊，
  改成「`<img>` 版位 + 姓氏色塊備援」的結構：圖片存在就顯示照片，圖片檔案不存在（目前
  就是這個狀態）則透過 `onerror` 隱藏 `<img>`，讓底下的 `.avatar-fallback` 姓氏色塊顯示出來。
- **改動**：
  - `style.css`：`.member-avatar`、`.faculty-avatar` 改為 `position: relative` +
    `overflow: hidden` 的容器；新增 `.member-avatar img` / `.faculty-avatar img`
    （絕對定位、`object-fit: cover`）與 `.member-avatar .avatar-fallback` /
    `.faculty-avatar .avatar-fallback`（絕對定位置中，顯示姓氏）。
  - `index.html`、`faculty.html`：每個成員的 `.member-avatar` / `.faculty-avatar`
    內都加入 `<img src="images/members/<slug>.jpg" alt="<姓名>" onerror="...">`
    ＋ `<span class="avatar-fallback">姓氏</span>`。
  - 新增空資料夾 `images/members/`，檔名採英文/拼音 slug（例如吳士駿 → `felix-wu.jpg`，
    其餘學生為姓名拼音，如 `chen-weicheng.jpg`），供日後直接放入對應真實照片檔案即可
    自動生效，不需再改 HTML。
- **待補資料**：`images/members/` 目前是空的，尚無任何真實照片。
- **驗證方式**：用 Python `html.parser` 檢查 `index.html`、`faculty.html` 標籤皆正確配對；
  sandbox 內無 headless 瀏覽器可實際截圖驗證（同前次驗證限制），改以檢查 CSS
  絕對定位 + `onerror` 邏輯是否完整覆蓋所有頭像。

### 2026-07-07：新增教授介紹／成員介紹導覽項目，並將成員介紹獨立成頁面
- **背景**：使用者透過 Discord 陸續要求：(1) 主導覽列加上可直接連到 `faculty.html` 的
  「教授介紹」項目，不必再從成員卡片點進去；(2) 把首頁「成員介紹」區塊也獨立成一個頁面，
  比照 `faculty.html` 的做法。過程中使用者也傳了吳教授的學經歷截圖，內容與 `faculty.html`
  既有資料重複，但補上了先前缺漏的 Email（`sfelixwu@gs.ncku.edu.tw`）與 Google Scholar
  連結；另傳的大頭照截圖因為是整張「資訊卡」（照片+文字混在一起，非單獨頭像），套用
  現有圓形頭像 `object-fit: cover` 置中裁切會裁到文字區塊而非臉部，故未採用，仍等待
  乾淨的大頭照檔案。
- **改動**：
  - `index.html`：移除「成員介紹」`<section id="members">` 整塊內容；主導覽列新增
    「教授介紹」（連到 `faculty.html`）與「成員介紹」（連到 `members.html`，原本的
    `#members` 錨點改為頁面連結）；聯絡資訊補上教授 Email。
  - 新增 `members.html`：把原本 `index.html` 的成員介紹內容（指導教授/博士生/碩士生/
    專題生卡片）整段搬過來，頁首/頁尾/導覽列比照 `faculty.html` 的獨立頁面樣式，
    導覽列「成員介紹」項目加 `active` 樣式。
  - `faculty.html`：導覽列「成員介紹」改連到 `members.html`；`faculty-contact` 新增
    Email 與 Google Scholar 連結兩個欄位。
  - `style.css`：新增 `.site-nav a.active`（目前頁面底線標示）與 `.faculty-contact a`
    （連結顏色改用 `--color-accent`，避免預設藍色跟深色 hero 背景不搭）。
  - `script.js` 未變動（`members.html` 沒有 `#pubFilter`/`#contactForm`，既有 null
    檢查已涵蓋）。
- **待補資料**：`images/members/felix-wu.jpg` 目前仍是空的，教授大頭照截圖不適合直接用
  （會裁到文字），已請使用者補傳乾淨的頭像照片。
- **驗證方式**：用 Python `html.parser` 檢查 `index.html`、`faculty.html`、`members.html`
  三份檔案標籤皆正確配對；grep 確認沒有殘留的 `#members` 錨點連結。

### 2026-07-07：發表著作獨立成頁面，聯絡資訊改放頁尾
- **背景**：使用者透過 Discord 要求 (1) 把「發表著作」也比照成員介紹/教授介紹獨立成頁面；
  (2) 聯絡資訊改成每頁頁尾都顯示，不需要再有專屬的聯絡頁面/區塊。
- **決策**：聯絡資訊原本包含一個純前端、無後端串接的聯絡表單（`#contactForm`）。既然
  使用者明確表示「不需要介面了」，判斷表單也一併移除（頁尾只適合放靜態聯絡資訊，
  不適合放表單），只保留地址/Email/電話三項純文字資訊放進頁尾。
- **改動**：
  - 新增 `publications.html`：把原本 `index.html` 的「發表著作」整段（含 `#pubFilter`
    年份篩選、`#pubList` 論文列表）搬過去，結構比照 `faculty.html`/`members.html`。
  - `index.html`：移除「發表著作」`<section>` 與「聯絡資訊」`<section>`（含表單）；
    Hero 的「聯絡我們」按鈕改成 `mailto:sfelixwu@gs.ncku.edu.tw`（原本連到的
    `#contact` 錨點已不存在）。
  - 四個頁面（`index.html`/`faculty.html`/`members.html`/`publications.html`）的
    導覽列同步移除「聯絡資訊」項目、「發表著作」項目改連到 `publications.html`；
    `publications.html` 自己的導覽列「發表著作」項目加 `active` 樣式。
  - 四個頁面的 `<footer>` 都加上 `.footer-contact`（地址/Email/電話），並補上
    `.footer-inner`/`.footer-contact` CSS。
  - 移除死掉的樣式與邏輯：`style.css` 的 `.contact-grid`/`.contact-info`/
    `.contact-form`/`.form-row`/`.form-status`（含響應式覆寫）；`script.js` 的
    `contactForm`/`formStatus` 事件綁定整段。
- **驗證方式**：用 Python `html.parser` 檢查四份 HTML 檔案標籤皆正確配對；grep 確認
  `#publications`、`#contact`、`contactForm`、`formStatus` 在所有 `.html`/`.js`
  檔案中都沒有殘留引用；`node --check script.js` 通過語法檢查。

### 2026-07-09：研究方向獨立成頁面，改用條列式呈現
- **背景**：使用者覺得首頁「研究方向」卡片式排版（`.research-card`，7 張只有標題、
  沒有敘述文字的空卡片）看起來「有點醜」，要求 (1) 獨立成一個頁面（比照
  `members.html`/`faculty.html`/`publications.html` 的做法）(2) 換一種呈現方式，
  後續指定要用條列式（bulleted list）。
- **改動**：
  - 新增 `research.html`：把原本 `index.html` 的「研究方向」整段搬過去，7 個研究
    領域改用 `<ul class="research-list">` 條列呈現（每項左側有 accent 色圓點＋
    底線分隔，非原本的三欄卡片格線）。
  - `index.html`：移除「研究方向」`<section id="research">`；Hero 按鈕「了解研究
    方向」與導覽列「研究方向」改連到 `research.html`（原本的 `#research` 錨點
    已不存在）。
  - `faculty.html`/`members.html`/`publications.html`：導覽列「研究方向」項目從
    `index.html#research` 改連到 `research.html`；`research.html` 自己的導覽列
    「研究方向」項目加 `active` 樣式。
  - `style.css`：移除死掉的 `.research-card` 樣式（`.card-grid` 保留，
    `members.html` 的 `.card-grid.member-grid` 仍在用），新增 `.research-list`
    條列式樣式。
- **驗證方式**：用 Python `html.parser` 檢查五份 HTML 檔案標籤皆正確配對；grep 確認
  `#research`、`research-card` 在所有 `.html`/`.css` 檔案中都沒有殘留引用；起本地
  `http.server` 逐頁回傳 200 確認可正常載入。

### 2026-07-09：獨立頁面標題區加上背景色區隔
- **背景**：使用者要求「成員介紹」「教授介紹」「發表著作」每頁標題那個範圍要有背景顏色
  的區別（當時三頁的 `section-title` 都跟下方內文擠在同一個白底 `.section` 裡，沒有視覺
  分隔）。詢問使用者風格（淺米白底 vs 深藍漸層）與套用範圍後，確認：淺米白底、四頁
  （成員介紹/教授介紹/發表著作/研究方向）都套用 —— 包含原本已有深藍漸層大頭照區的
  `faculty.html`，使用者選擇統一改成淺色。
- **改動**：
  - `style.css`：新增 `.page-header`（`--color-bg-alt` 淺米白底 + 底部分隔線，包住標題
    + 副標題），並補上 640px 斷點的響應式 padding。
  - `members.html`/`publications.html`/`research.html`：把 `h2.section-title` +
    `p.section-subtitle` 拆到獨立的 `<section class="page-header">`，跟下方原本的
    `.section`（白底內文）分開。
  - `faculty.html`：`.faculty-hero` 背景從深藍漸層（`--color-navy` → `--color-navy-light`）
    改成淺米白底 `--color-bg-alt`；連動把 `.faculty-hero-body h1`、`.faculty-contact`、
    `.faculty-contact strong` 的文字顏色從白/淺灰改回深藍/一般文字色（配合淺色底）；
    `.faculty-avatar` 原本是「半透明白圈」設計（給深色底用），改成跟 `.member-avatar`
    一樣的實心深藍圓底 + 白字，避免在淺色底上變成看不見的圈。
- **驗證方式**：用 Python `html.parser` 檢查五份 HTML 檔案標籤皆正確配對；起本地
  `http.server` 逐頁回傳 200 確認可正常載入。

### 2026-07-09：頂部導覽列（logo「倫理計算實驗室」）加上背景色
- **背景**：使用者接著要求頂部 sticky 導覽列（含 logo 文字、`.site-header`）也要加顏色
  ——原本是接近全白的半透明底（`rgba(255,255,255,0.94)` + 毛玻璃模糊）。詢問風格後確認：
  深藍底 + 底部金褐色（`--color-accent`）邊線，跟 footer/首頁 Hero 的深藍色系呼應。
- **改動**：
  - `style.css`：`.site-header` 背景改為 `var(--color-navy)` 實心底，移除毛玻璃效果，
    `border-bottom` 從灰色細線改成 2px `--color-accent` 金褐色。
  - 連動調整深底上的文字對比：`.logo`、`.site-nav a` 預設文字改成白/淺色
    （`#fff` / `#dfe4ec`），hover/active 狀態改成 `#fff`（原本是深藍，在深藍底上會看不見）；
    `.nav-toggle span`（手機版漢堡選單線條）從深藍改成白色。
  - 手機版（640px 以下）下拉選單本身背景仍是白色面板，額外覆寫該情境下 `.site-nav a`
    文字顏色改回深色（`--color-text`/`--color-navy`），避免繼承桌面版的淺色文字在白底
    面板上看不見。
- **驗證方式**：用 Python `html.parser` 檢查五份 HTML 檔案標籤皆正確配對；起本地
  `http.server` 逐頁回傳 200 確認可正常載入。

### 2026-07-09：Logo 加上英文全名與學校簡稱
- **背景**：使用者要求頂部導覽列的 logo「倫理計算實驗室」加上英文名字和學校簡稱
  （確認學校簡稱是 NCKU）。
- **改動**：
  - 五個頁面的 `.logo` 內都加上 `<span class="logo-en">NCKU · Ethics-aware Computing
    Lab</span>`，中文名（第一行）+ 英文名/學校簡稱（第二行，較小字級、金褐色
    `--color-accent`）上下堆疊呈現。
  - `style.css`：`.logo` 改成 `flex-direction: column`；新增 `.logo-en` 樣式；
    `.header-inner` 從固定 `height: 68px` 改成 `min-height: 68px` + 上下 `padding`，
    讓兩行 logo 撐開時導覽列高度能自動跟著長高，不會擠壓變形。
  - 手機版下拉選單原本用 `top: 68px`（假設導覽列固定高度）定位，改成 `top: 100%`，
    避免 logo 變兩行導致導覽列變高後，下拉選單位置沒跟著往下移、蓋住 logo 第二行。
- **驗證方式**：用 Python `html.parser` 檢查五份 HTML 檔案標籤皆正確配對；起本地
  `http.server` 逐頁回傳 200 確認可正常載入。

### 2026-07-09：導覽列加上「首頁」項目
- **背景**：使用者要求導覽列明確分成「首頁、研究方向、成員介紹、教授介紹、發表著作」
  五項；並描述首頁應該是「介紹實驗室的資訊，標題是實驗室的名稱，底下內容待定」——
  這點 `index.html` 現有的 Hero 區塊（h1「倫理計算實驗室」+ h2 英文名 + 說明文字 +
  行動按鈕）已經符合這個描述，所以這次沒有更動首頁內容，只處理導覽列缺少「首頁」
  這個入口的問題。
- **改動**：五個頁面的導覽列最前面都加上「首頁」項目：
  - `index.html`：連到 `#hero`（沿用 logo 同樣的錨點寫法），加 `active` 樣式。
  - `research.html`/`members.html`/`faculty.html`/`publications.html`：連到
    `index.html`。
- **驗證方式**：用 Python `html.parser` 檢查五份 HTML 檔案標籤皆正確配對；起本地
  `http.server` 逐頁回傳 200 確認可正常載入；grep 確認五個頁面導覽列都有「首頁」項目。

### 2026-07-09：移除首頁 Hero 的「聯絡我們」按鈕
- **背景**：使用者要求不需要「聯絡我們」。這個按鈕原本在 `index.html` Hero 的
  `.hero-actions` 裡（`mailto:` 連結），聯絡資訊本身已經在每頁頁尾常駐顯示
  （見 2026-07-07 任務紀錄），所以移除按鈕不影響使用者找得到聯絡方式。
- **改動**：
  - `index.html`：移除 `.hero-actions` 內的「聯絡我們」`<a>`，只保留「了解研究方向」
    按鈕。
  - `style.css`：移除死掉的 `.btn-outline`/`.btn-outline:hover` 樣式（原本專門給白色
    outline 按鈕用，移除後沒有其他地方引用）。
- **驗證方式**：用 Python `html.parser` 檢查五份 HTML 檔案標籤皆正確配對；grep 確認
  `聯絡我們`、`btn-outline` 在所有 `.html`/`.css` 檔案中都沒有殘留引用；起本地
  `http.server` 逐頁回傳 200 確認可正常載入。

### 2026-09-01：成員介紹新增「已畢業成員」分組
- **背景**：使用者要求在 `members.html` 幫已經畢業的學生（陳威成、周子豪）留一個空間，
  這兩人原本都列在「碩士生」分組裡。
- **改動**：`members.html` 把陳威成、周子豪的卡片從「碩士生」分組移到新增的
  「已畢業成員」分組（放在「專題生」分組之後），身分欄位文字從「碩士生」改成
  「碩士（已畢業）」以標示畢業狀態；頭像圖片路徑、fallback 姓氏色塊皆沿用原本設定，
  不受影響。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；grep 確認
  五個分組標題（指導教授/博士生/碩士生/專題生/已畢業成員）都存在；本地 `http.server`
  回傳 200 確認可正常載入。

### 2026-09-01：成員卡片改版為「照片／資訊」上下分半
- **背景**：使用者覺得原本 64px 圓形頭像太小，要求把每張成員卡片改成上下分兩半：
  上半放照片、下半放姓名＋資訊（目前只有身分，之後想到什麼再補充，先把版面留著）。
- **改動**：
  - `style.css`：`.member-avatar`（64px 圓形、疊在卡片內文上方）整組換成
    `.member-photo`（`aspect-ratio: 1/1` 正方形，佔滿卡片寬度，`object-fit: cover`
    鋪滿，無照片時姓氏色塊字級加大到 2.6rem）+ `.member-info`（原本卡片的
    padding 移到這裡，姓名/身分/未來要加的資訊都放在這個區塊，用一般 flow
    排版，內容多寡不影響上半照片，不用額外「預留空白」的假元素，之後要加
    欄位直接在 `.member-info` 裡加 `<p>` 就會自動延伸）。
  - `members.html`：所有 `member-card`（指導教授/博士生/碩士生/專題生/已畢業成員，
    共 14 張卡）的 `.member-avatar` 都換成 `.member-photo`，姓名/身分/描述/連結
    都包進新增的 `.member-info` 容器。指導教授卡片原本的 `member-desc`／
    `member-link`（連到 faculty.html）維持不變，一併搬進 `.member-info`。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；grep 確認
  `member-avatar` 沒有殘留引用；本地 `http.server` 回傳 200 確認可正常載入。

### 2026-09-01：成員卡片改為左右分半（非上下）
- **背景**：使用者傳了一張參考截圖（個人網站常見的「左照片、右文字」介紹排版），
  說明先前做的上下分半（照片在上、資訊在下）理解錯了方向，「一半」指的是左右各半。
- **改動**：`style.css` 把 `.member-card` 改成 `display: flex`（水平排列），
  `.member-photo` 改成 `flex: 0 0 42%`（拿掉先前的 `aspect-ratio: 1/1`，改用
  `align-items: stretch` 讓照片高度自動跟右側文字區塊的實際內容高度看齊，
  不會因為文字內容多寡而跟照片高度對不齊）；`.member-card` 加上
  `min-height: 132px` 避免文字很短（例如只有「博士生」兩個字）時照片被壓成
  一條窄縫。`.member-info` 改成 `flex: 1` + `flex-direction: column` +
  `justify-content: center` 讓文字垂直置中；`text-align` 從 `center` 改成
  `left`（左右分半的排版文字通常靠左對齊比較好讀，比照參考圖）。指導教授卡片
  `max-width` 從 340px 放寬到 420px，因為左右分半後右側文字欄變窄，原本的描述
  文字＋連結需要多一點寬度才不會擠。
- **未變動**：`members.html` 的 HTML 結構（`.member-photo` + `.member-info`）
  上次改版時就已經是分成兩個容器，這次只需要調整 CSS 排列方向，不用動 HTML。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。sandbox 內無 headless 瀏覽器可截圖驗證
  實際排版（同前次頭像功能的驗證限制），僅能靜態確認 CSS 邏輯正確。

### 2026-09-01：指導教授卡片加寬
- **背景**：使用者傳了實際截圖，指導教授（吳士駿）卡片因為跟其他成員卡片共用同一個
  3 欄 `card-grid`，只佔其中 1 欄寬度（約 340px），描述文字在右側窄欄裡擠成好幾行、
  讀起來不舒服。要求把這格加寬。
- **改動**：`style.css` 的 `.member-card.faculty` 從「限制 `max-width: 420px` 置中」
  改成 `grid-column: span 2`，讓它在 3 欄網格裡跨 2 欄（約 700px 寬，是原本的 2 倍），
  右側文字欄有足夠寬度不會擠成短行；`min-height` 也從共用的 132px 調高到 200px。
  響應式斷點（860px 以下 2 欄、640px 以下 1 欄）不用額外處理，`grid-column: span 2`
  在欄數不足時瀏覽器會自動裁到最大可用欄數。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。

### 2026-09-01：成員格線改成一行兩個，卡片變大
- **背景**：使用者傳了實際截圖（碩士生 3 欄），要求所有成員分組的方格也一起變大，
  圖片那排改成「兩個成員一行」而不是三個。
- **改動**：`style.css` 的 `.member-grid` 從 `grid-template-columns: repeat(3, 1fr)`
  改成 `repeat(2, 1fr)`，套用到所有分組（指導教授/博士生/碩士生/專題生/已畢業成員），
  每張卡片寬度變成原本的 1.5 倍。連動影響：指導教授卡片原本設定的
  `grid-column: span 2`（上次改動用來讓它跨 3 欄中的 2 欄變寬）在 2 欄網格下
  等於跨滿整行、變成全寬卡片，比原本更寬，仍在合理範圍內，先不特別調整，
  使用者可再回饋是否要縮小。
  響應式斷點（860px 以下、640px 以下）已有針對 `.member-grid` 的覆寫（分別是
  2 欄、1 欄），跟新的桌面版基礎值不衝突，不需修改。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。

### 2026-09-01：指導教授卡片改回單欄寬度（太寬了）
- **背景**：使用者反饋上次改動後指導教授卡片太寬——因為 `.member-grid` 從 3 欄改
  2 欄後，先前設的 `grid-column: span 2` 從「佔 3 欄中的 2 欄」變成「整行全寬」，
  比預期寬很多。
- **改動**：`style.css` 的 `.member-card.faculty` 移除 `grid-column: span 2`，
  改回跟其他成員卡片一樣佔 1 欄寬度（在新的 2 欄網格下，1 欄本身已經比改動前
  （3 欄時代）寬了約 1.5 倍，不需要再額外跨欄）；`min-height: 200px` 保留，
  維持比一般卡片略高的最小高度給描述文字空間。
- **驗證方式**：本地 `http.server` 回傳 200 確認可正常載入。

### 2026-09-01：一般成員卡片加高（指導教授不變）
- **背景**：使用者要求除了指導教授以外，其他成員的方格都變長一點。
- **改動**：`style.css` 的 `.member-card` 基礎 `min-height` 從 132px 提高到 200px
  （套用到博士生/碩士生/專題生/已畢業成員，指導教授以外的所有卡片）。指導教授
  卡片原本就是 `min-height: 200px`（獨立的 `.member-card.faculty` 覆寫規則），
  跟新的基礎值剛好相同，維持原樣沒有變化，所以順手把變成重複的
  `.member-card.faculty { min-height: 200px; }` 規則刪掉，改由基礎 `.member-card`
  規則統一提供。
- **驗證方式**：本地 `http.server` 回傳 200 確認可正常載入。

### 2026-09-01：中文內文的半形逗號改成全形
- **背景**：使用者要求把「所有版面的逗號」改成全形。
- **決策**：grep 過五份 HTML 後，實際的半形逗號只出現在三種情境：(1) 中文內文
  句子裡的逗號 (2) `<meta name="viewport" ...>` 標籤屬性值裡的逗號（HTML 語法，
  不是內文）(3) `faculty.html`/`publications.html` 著作列表裡的英文作者/期刊/
  年份引用（例如 `Xiaoyun Wang, Minhao Cheng, ...`）。只有 (1) 屬於「版面逗號」，
  照中文排版慣例改成全形；(2) 是程式碼語法不能動；(3) 是英文學術引用格式，
  慣例上維持半形逗號（改成全形反而不符合引用格式慣例），所以沒有更動，
  已跟使用者說明如果其實也想改這兩種再說。
- **改動**：把中文內文逗號改成全形（，）：
  - `index.html`：Hero 說明文字裡兩個逗號（「為核心,」「等領域,」）。
  - `members.html`：指導教授卡片描述文字裡一個逗號（「分散式系統,」）。
- **驗證方式**：grep 確認三份以外的檔案（`research.html`/`faculty.html`/
  `publications.html`）內文本身沒有半形逗號；用 Python `html.parser` 檢查五份
  HTML 檔案標籤皆正確配對；本地 `http.server` 逐頁回傳 200 確認可正常載入。

### 2026-09-08：成員照片框加高、裁切偏向頂部（避免臉被裁掉）
- **背景**：使用者上傳了洪宗緯的合照（直式、非單人大頭照，兩人入鏡），套用後反映
  「照片沒有完全顯現出來」——因為 `.member-photo` 用 `object-fit: cover` 鋪滿裁切，
  卡片原本 `min-height: 200px` 對應出的照片框接近正方形，直式合照裁完只剩中段
  （胸口附近），人臉整個被裁掉了。
- **改動**：`style.css`
  - `.member-card` 的 `min-height` 從 200px 提高到 320px，讓照片框變高、寬高比更
    接近直式照片的比例，`cover` 裁切時需要犧牲的畫面範圍變少。
  - `.member-photo img` 新增 `object-position: top`，裁切時優先保留畫面上方
    （通常是臉部所在位置），而不是預設從正中央等量裁切上下。
  - 這兩個調整是通用規則，套用到所有成員卡片，不是只針對洪宗緯這張特例處理。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：成員卡片改成固定寬度 480px（搭配 320px 高度）
- **背景**：使用者延續上一次「卡片加高到 320px」的調整，指定寬度也要固定成
  480px，讓卡片有明確的長寬比例，而不是像之前那樣寬度隨 2 欄網格的欄寬浮動。
- **改動**：`style.css` 的 `.member-card` 新增 `width: 480px;`。因為卡片是網格
  項目（`.member-grid` 是 2 欄 CSS Grid），桌面寬螢幕下欄寬本來就有約 520px 左右，
  設定固定寬度後卡片不會再被拉伸塞滿整個欄位；同時加上 `max-width: 100%`，
  避免手機窄螢幕（欄寬小於 480px 時）卡片被寫死的寬度撐出容器、造成橫向捲動。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：卡片寬度改 569px、放大全站容器寬度避免橫向溢出
- **背景**：使用者接續把卡片寬度從 480px 改成 569px。算過欄寬後發現：2 欄網格
  下，兩張 569px 卡片＋中間 28px 間距，需要約 1166px 內容寬度，比原本容器可用
  寬度（`--max-width: 1120px` 扣掉左右各 24px padding＝1072px）多出約 94px，
  桌面寬螢幕下會讓整排卡片超出容器、頁面出現輕微橫向捲動。提出兩個方案
  （改一行一個 / 放大容器寬度），使用者選擇放大容器寬度。
- **改動**：`style.css` 的 `--max-width`（`:root` 全域 CSS 變數，所有頁面
  `.container` 共用）從 1120px 提高到 1240px，讓 2 欄各 569px 加間距後仍有餘裕
  （最低需求約 1214px）。**這是全站性的改動**：因為 `--max-width` 是共用變數，
  所有頁面（首頁 Hero、頁首/頁尾、其他 section）的內容區最大寬度都會跟著變寬
  120px，不是只有 `members.html` 的成員格線變寬。
- **驗證方式**：本地 `http.server` 逐頁回傳 200 確認五個頁面皆可正常載入。

### 2026-09-08：容器寬度改回 1120px，成員格線改成一欄一個
- **背景**：使用者選擇改用另一個方案解決卡片寬度 569px 造成的橫向溢出問題——
  把全站 `--max-width` 改回 1120px，並把成員格線從 2 欄改成 1 欄（一行一位
  成員），這樣每張固定 569px 的卡片都不會再跟另一張卡片搶同一行的空間。
- **改動**：
  - `style.css` 的 `--max-width` 從 1240px 改回 1120px。
  - `.member-grid` 的 `grid-template-columns` 從 `repeat(2, 1fr)` 改成 `1fr`
    （單欄）。
  - 響應式斷點：860px 以下原本會把 `.card-grid`、`.member-grid` 一起覆寫成
    2 欄，這會跟「一欄一個」的需求衝突（860px 以下的中等螢幕反而變回 2 欄），
    所以把 `.member-grid` 從那條規則移除，只留 `.card-grid`（目前沒有其他地方
    在用，保留給未來可能重新使用 3/2 欄卡片格線的情境）；640px 以下原本就是
    `.card-grid`、`.member-grid` 都變 1 欄，維持不動。
- **未變動**：`.member-card` 的固定寬度 569px（`max-width: 100%` 防止手機端
  溢出）與 320px 高度都保留；因為現在是單欄，卡片會靠左顯示、右側留白，
  是「固定卡片寬度＋單欄版面」的預期外觀。
- **驗證方式**：用 Python `html.parser` 檢查五份 HTML 檔案標籤皆正確配對；本地
  `http.server` 逐頁回傳 200 確認可正常載入。

### 2026-09-08：成員卡片改回「照片在上、資訊在下」的格狀排版
- **背景**：使用者傳了一張參考截圖（別的網站的碩士生列表：多欄格狀排版、白底
  圓角卡片、照片在上鋪滿、姓名與年級置中在下），表示最後還是想做成那樣；同時
  反映上一版（固定 569px 寬＋單欄）改完後「有些成員消失了」。檢查 `members.html`
  後確認 14 位成員的 HTML 都還在（用 grep 數過 `<h4>` 標籤數量沒少），沒有真的
  遺失資料——「消失」應該是固定寬度＋單欄疊很長一直往下排，加上卡片靠左留白
  的排版，視覺上容易誤以為東西不見了，不是實際遺失內容。
- **改動**：`style.css` 把成員卡片相關樣式整組改回「上下分半」設計（跟
  2026-09-01 最初那版類似，但保留後續加的 `object-position: top` 改善裁切）：
  - `.member-grid` 改回 `grid-template-columns: repeat(3, 1fr)`（多欄格狀），
    移除 `.member-card` 的固定 `width: 569px`／`min-height: 320px`／
    左右分半的 `display: flex`。
  - `.member-photo` 改回 `aspect-ratio: 1/1` 正方形、鋪滿卡片頂部寬度，
    `object-fit: cover` + 保留 `object-position: top`（裁切時仍優先保留臉部）。
  - `.member-info` 改回一般 padding 區塊（姓名/身分置中，不再是左右分半的
    垂直置中欄）。
  - `.member-card.faculty` 改回 `max-width: 420px; margin: 0 auto;`（指導教授
    卡片獨立置中，不再靠 `min-height` 特別處理）。
  - 響應式斷點（860px 以下 2 欄、640px 以下 1 欄）把 `.member-grid` 重新加回
    這兩條規則，恢復成跟其他格狀排版（`.card-grid`）一致的收合邏輯。
- **驗證方式**：grep 確認 `members.html` 裡 14 個 `<h4>`（成員姓名）都還在；
  用 Python `html.parser` 檢查五份 HTML 檔案標籤皆正確配對；本地 `http.server`
  逐頁回傳 200 確認可正常載入。

### 2026-09-08：成員卡片整體等比例縮小
- **背景**：使用者覺得格狀卡片可以再小一點，且希望是「等比例」縮小（不是只調
  單一欄位或間距）。
- **改動**：`style.css`
  - `.member-card` 新增 `max-width: 82%; margin: 0 auto;`，讓卡片在自己的網格欄
    位裡縮小、置中，因為 `.member-photo` 是 `aspect-ratio: 1/1` 且寬度跟著卡片
    的 100%，卡片變窄時照片會跟著等比例變小。
  - 卡片內文也一併調小，維持跟照片一致的縮小比例，而不是只有照片變小、文字
    比例失調：`.member-info` padding 從 `20px 22px` 降到 `16px 18px`；姓名字級
    從 1.05rem 降到 0.95rem；身分文字從 0.85rem 降到 0.8rem；無照片時的姓氏
    色塊字級從 2.4rem 降到 2rem。
  - `.member-card.faculty` 原本的 `max-width: 420px`（比 CSS 選擇器優先權更高）
    不受影響，指導教授卡片維持原本的獨立寬度，不會被這次的 82% 縮小規則覆蓋。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。
- **後續**：使用者反應縮太小，隔一次對話就整組復原（`.member-card` 拿掉
  `max-width: 82%`／`margin: 0 auto`；`.member-info` padding 改回
  `20px 22px`；姓名字級改回 1.05rem；身分文字改回 0.85rem；姓氏色塊字級
  改回 2.4rem），回到上一版（3 欄格狀、卡片鋪滿欄位寬度）的大小。

### 2026-09-08：全站頁面加上淡入效果
- **背景**：使用者要求每個介面（頁面）載入時都要有淡入效果。
- **改動**：`style.css` 的 `body` 加上 `animation: page-fade-in 0.5s ease;`，
  搭配新增的 `@keyframes page-fade-in`（`opacity: 0 → 1`）。因為五個頁面
  （`index.html`/`research.html`/`members.html`/`faculty.html`/
  `publications.html`）共用同一份 `style.css`，這個改動不用逐頁加 class 或
  JS，每個頁面載入時 `<body>` 都會自動從透明淡入到不透明。額外加了
  `@media (prefers-reduced-motion: reduce)` 把動畫關掉，尊重使用者系統上
  「減少動態效果」的無障礙設定。
- **驗證方式**：本地 `http.server` 逐頁回傳 200 確認可正常載入；純 CSS
  `animation`/`@keyframes`，不影響現有 `script.js` 邏輯。

### 2026-09-08：淡入效果改成「內容由上往下依序淡入」
- **背景**：使用者澄清上一版的整頁淡入（`body` 一次性淡入）不是他要的效果，
  他要的是頁面裡的內容區塊由上往下依序、慢慢淡入（有先後順序的層疊效果）。
- **改動**：`style.css`
  - 拿掉 `body` 上整體的 `page-fade-in` 動畫，改成針對頁面內的結構區塊
    （`.site-header`、`main` 底下每個直接子層 `<section>`、`.site-footer`）
    分別套用 `fade-in-down` 動畫（從上方 16px 處、透明，滑入到原本位置、
    不透明），並用 `animation-delay` 依「頁首 → main 內第 1/2/3/4 個區塊 →
    頁尾」的順序遞增（0s、0.1s、0.2s、0.3s、0.4s、0.5s），做出由上往下依序
    淡入的層疊效果。用 `main > *` 選擇器而非針對個別頁面寫死區塊數量，
    因為每頁 `<main>` 底下的 section 數量不同（`index.html` 只有 1 個、
    `faculty.html` 有 3 個），這樣可以共用同一組規則。
  - `prefers-reduced-motion: reduce` 的無障礙覆寫規則比照同步更新（改成
    關閉這組新的 `animation`，直接顯示 `opacity: 1`）。
- **驗證方式**：本地 `http.server` 逐頁回傳 200 確認可正常載入；grep 確認
  `page-fade-in` 沒有殘留引用。

### 2026-09-08：移除頁面載入淡入效果
- **背景**：使用者決定頁面載入時不要用淡入效果，把前兩次加的動畫整組拿掉。
- **改動**：`style.css` 移除 `@keyframes fade-in-down`、`.site-header`／
  `main > *`／`.site-footer` 的 `animation`/`opacity:0` 規則，以及對應的
  `prefers-reduced-motion` 覆寫（因為沒有動畫了，不需要再關閉它）。頁面載入
  恢復成一般直接顯示，沒有任何淡入/位移動畫。
- **附註**：檢查時發現 `faculty.html` 在對話之外被直接修改過——教師簡介區塊
  從原本的 `<section class="faculty-hero">`（深藍/淺色底特殊樣式）改成一般
  `<section class="section">` 包 `.faculty-hero-inner`，`page-header` 也换成
  `page-eyebrow`「Advisor」+ 「指導教授」標題。看起來是刻意的排版調整、
  HTML 結構仍正確，所以沒有還原；但連動讓 `style.css` 裡的 `.faculty-hero`
  背景規則變成沒有元素在用的死樣式，之後如果要清理可以留意。
- **驗證方式**：grep 確認 `fade-in-down`/`page-fade-in` 都沒有殘留引用；本地
  `http.server` 逐頁回傳 200 確認可正常載入。

### 2026-09-08：成員卡片依精確比例縮到 80%
- **背景**：使用者拿我先前算出的桌面版卡片基準尺寸（寬/照片高 338.7px、文字區
  約 95px、總高約 434px），自己算了一份 100%/90%/80%/75%/60%/50% 的等比例縮放
  對照表，這次明確要求縮到 80%（換算後寬/照片高約 271px、文字區約 76px、總高
  約 347px）。跟前一次「82% + 沒有完全按比例縮小字級」被反映太小不同，這次
  嚴格按 0.8 這個縮放係數 (k) 套用到每一個相關數值，確保寬度、照片、文字都是
  同一個比例縮小，不會有些縮多some縮少導致比例不協調。
- **改動**：`style.css` 全部乘以 0.8：
  - `.member-card` 加回 `max-width: 80%; margin: 0 auto;`（80% 是相對於欄寬，
    在桌面版最大寬度時換算出來就是約 271px，符合使用者的表格）。
  - `.member-info` padding：`20px 22px` → `16px 17.6px`。
  - 姓名字級：`1.05rem` → `0.84rem`。
  - 身分文字字級：`0.85rem` → `0.68rem`；`margin-bottom` 從 10px → 8px。
  - 無照片時姓氏色塊字級：`2.4rem` → `1.92rem`。
  - 指導教授卡片（`.member-card.faculty`）維持獨立的 `max-width: 420px`
    （選擇器優先權更高，不受這次縮放影響）。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：成員卡片改回原樣（取消 80% 縮放）
- **背景**：使用者決定卡片維持原本 100% 大小，把上一次的 80% 等比例縮放取消。
- **改動**：`style.css` 全部改回縮放前的數值：`.member-card` 拿掉
  `max-width: 80%`／`margin: 0 auto`；`.member-info` padding 改回
  `20px 22px`；姓名字級改回 1.05rem；身分文字字級改回 0.85rem、
  `margin-bottom` 改回 10px；姓氏色塊字級改回 2.4rem。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：成員卡片縮小到 90%
- **背景**：使用者這次沒有指定精確比例，只說「縮小一點」。考量到 80% 上次被
  取消（不確定是嫌小還是單純想比較原樣)，這次先用比較保守的 90%，沿用
  2026-09-08 稍早驗證過的「等比例縮放」做法（寬度、padding、字級都乘上同一個
  係數 k，避免只縮寬度導致文字比例失調）。
- **改動**：`style.css` 全部乘以 0.9：
  - `.member-card` 加回 `max-width: 90%; margin: 0 auto;`。
  - `.member-info` padding：`20px 22px` → `18px 19.8px`。
  - 姓名字級：`1.05rem` → `0.945rem`。
  - 身分文字字級：`0.85rem` → `0.765rem`；`margin-bottom` 從 10px → 9px。
  - 無照片時姓氏色塊字級：`2.4rem` → `2.16rem`。
  - 指導教授卡片維持獨立的 `max-width: 420px`，不受影響。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：成員格線改用 Flexbox，解決縮小後間距不均勻的問題
- **背景**：使用者傳截圖說縮小後（90%，`max-width:90%; margin:0 auto;` 置中
  在各自的 Grid 欄位裡）卡片間距看起來鬆散不整齊。原因是「每張卡片各自在自己
  的 1fr 欄位裡置中」的做法，會讓卡片之間的視覺間距＝（各自的置中留白 × 2 +
  Grid 本身的 28px gap），跟容器邊緣到第一張卡片的間距（只有一份置中留白）
  天生不相等，不管怎麼調縮小比例都沒辦法讓兩者一致。跟使用者確認後，選擇
  「維持縮小、把間距調均勻」而非改欄數或恢復原尺寸。
- **改動**：`style.css` 把 `.member-grid` 從 `display: grid`（沿用 `.card-grid`
  的 3 欄設定）改成獨立的 `display: flex; flex-wrap: wrap; justify-content:
  center; gap: 28px;`；`.member-card` 拿掉 `max-width: 90%; margin: 0 auto;`，
  改成固定 `flex: 0 1 300px`（基準寬度接近先前 90% 換算出的 304.8px，形狀不變、
  只是換一種不會造成間距不均的方式達成）。這樣一來相鄰卡片之間、卡片與容器
  邊緣之間都只吃同一份 `gap: 28px`（`justify-content: center` 讓整排卡片在
  容器裡置中，兩側留白對稱），視覺節奏一致；而且 Flexbox 的 `flex-wrap` 本來
  就會隨容器寬度自動換行，不需要再靠 860px/640px 的中斷點手動指定欄數——已把
  `.member-grid` 從那兩條 media query 規則移除（只留 `.card-grid`，保留給未來
  可能重新使用格狀排版的地方）。指導教授卡片改成 `flex-basis: 420px`（原本
  `grid-column` 的邏輯已經不適用，直接給獨立的 flex-basis 達到一樣的固定寬度
  效果），`max-width`/`margin:0 auto` 保留但在 flex 情境下是無害的冗餘設定。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；本地
  `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：成員介紹移除指導教授、卡片改左靠齊
- **背景**：使用者要求 (1) 把「成員介紹」頁裡的指導教授（吳士駿）整塊移除
  (2) 底下其他成員的卡片改成靠左對齊（原本先講「向右」，隨即訊息中途更正為
  「向左」，以更正後的為準）。
- **改動**：
  - `members.html`：移除「指導教授」`<h3 class="group-heading">` 與其
    `card-grid member-grid` 整塊（含吳士駿的照片/描述/連結），第一個分組
    變成「博士生」；page-header 副標題從「指導教授與研究團隊」改成
    「研究團隊」（移除已經不存在的指導教授字樣，避免文字跟內容對不上）。
    教授本人仍有獨立的 `faculty.html` 頁面，導覽列「教授介紹」項目不受影響。
  - `style.css`：`.member-grid` 的 `justify-content` 從 `center` 改成
    `flex-start`（靠左）。順手清掉只有「指導教授卡片」在用、現在已經沒有
    HTML 引用的死樣式：`.member-card.faculty`、`.member-desc`、
    `.member-link`、`.member-link:hover`。
- **驗證方式**：grep 確認 `member-card faculty`/`member-desc`/`member-link`
  在所有 `.html`/`.css` 檔案中都沒有殘留引用；用 Python `html.parser` 檢查
  五份 HTML 檔案標籤皆正確配對；本地 `http.server` 逐頁回傳 200 確認可正常
  載入。

### 2026-09-08：成員卡片改回置中（靠左會造成左右留白不對稱）
- **背景**：使用者反映「靠左」改完後，整體畫面左右留白對不齊。原因是卡片是
  固定寬度（`flex: 0 1 300px`），一整排通常湊不滿容器全寬（例如 3 張
  300px 卡片 + 2 條 28px 間距＝956px，容器內距寬度有 1072px，還剩約 116px）；
  用 `flex-start` 靠左時，這 116px 空隙全部堆在該行的右側，導致每一行卡片
  左邊只有容器本身的 24px padding、右邊卻多出一大塊留白，看起來左右不對稱。
  跟使用者確認後（靠左 vs 對稱兩者衝突，使用者選對稱優先），改回置中。
- **改動**：`style.css` 的 `.member-grid` `justify-content` 從 `flex-start`
  改回 `center`，讓每一行卡片不管有幾張，多出來的空間平均分配在該行左右兩側，
  左右留白對稱一致。
- **驗證方式**：本地 `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：成員照片高度縮短
- **背景**：使用者覺得照片的「長度」（高度）可以再減少一點。
- **改動**：`style.css` 的 `.member-photo` 從正方形 `aspect-ratio: 1 / 1`
  改成 `aspect-ratio: 4 / 3`（寬度不變，高度變成寬度的 75%，比原本矮）。
- **驗證方式**：本地 `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：「成員介紹」改名「實驗室成員」，新增「畢業生」獨立頁
- **背景**：使用者要求 (1) 把「成員介紹」這個名稱改成「實驗室成員」
  (2) 新增一個「畢業生」頁面，把 `members.html` 裡的已畢業成員（陳威成、
  周子豪）搬過去。
- **改動**：
  - 新增 `graduates.html`：結構比照 `members.html`（page-header + 
    `card-grid member-grid` 卡片），標題「畢業生」，內容是陳威成、周子豪兩張
    `member-card`（沿用原本的照片路徑、`member-role`「碩士（已畢業）」文字）。
  - `members.html`：移除「已畢業成員」`<h3 class="group-heading">` 與其卡片
    整塊；`<title>`／page-header 標題從「成員介紹」改成「實驗室成員」。
  - 六個頁面（`index.html`/`research.html`/`members.html`/`faculty.html`/
    `publications.html`/`graduates.html`）的導覽列同步更新：「成員介紹」項目
    文字改成「實驗室成員」；新增「畢業生」項目（連到 `graduates.html`，放在
    「發表著作」之後）；`graduates.html` 自己的導覽列「畢業生」項目加
    `active` 樣式。現在導覽列共六項：首頁／研究方向／實驗室成員／教授介紹／
    發表著作／畢業生。
  - `style.css` 未變動——`graduates.html` 完全沿用既有的 `.page-header`／
    `.member-grid`／`.member-card`／`.member-photo`／`.member-info` 樣式，
    不需要新增任何 CSS。
- **驗證方式**：用 Python `html.parser` 檢查六份 HTML 檔案標籤皆正確配對；
  grep 確認「成員介紹」「已畢業成員」在所有 `.html` 檔案中都沒有殘留引用；
  逐一比對六個頁面的導覽列連結與 `active` 標示皆一致；本地 `http.server`
  逐頁回傳 200 確認可正常載入。

### 2026-09-08：畢業生頁加上年級篩選按鈕
- **背景**：使用者要求 (1) `graduates.html` 加上可點選的年級篩選按鈕「113 級」
  「114 級」(2) 陳威成、周子豪歸在「113 級」底下 (3) 拿掉他們卡片上的「（已
  畢業）」描述，只留「碩士」（因為畢業生頁本身的頁面主旨已經表明是已畢業，
  不需要在每張卡片上重複標示）。
- **決策**：篩選機制直接沿用 `publications.html` 既有的「年份篩選」模式
  （`.pub-filter`/`.pub-filter-btn` 樣式 + `data-*` 屬性比對 + `.hidden`
  隱藏），只是把 `data-year` 換成 `data-cohort`，避免另外設計一套重複的
  篩選 UI／CSS。多加了「全部」按鈕當預設選項（比照 `publications.html`
  的慣例），雖然使用者只提到兩個按鈕，但沒有「全部」的話載入頁面時無法
  一次看到所有畢業生。
- **改動**：
  - `graduates.html`：新增 `<div class="pub-filter" id="gradFilter">`（全部/
    113 級/114 級三個按鈕，`data-cohort` 屬性），卡片容器加上 `id="gradList"`；
    兩張 `member-card` 都加上 `data-cohort="113"`；`member-role` 文字從
    「碩士（已畢業）」改成「碩士」。
  - `style.css`：新增 `.member-card.hidden { display: none; }`（比照既有的
    `.pub-item.hidden`，篩選時用來隱藏不符合的卡片）。
  - `script.js`：新增「Graduates cohort filter」區塊，邏輯完全比照上面的
    「Publication year filter」（`gradFilter`/`gradItems`，用 `data-cohort`
    比對），一樣做了 `if (gradFilter)` null 檢查，因為只有 `graduates.html`
    有 `#gradFilter` 這個元素。
- **驗證方式**：`node --check script.js` 通過語法檢查；用 Python `html.parser`
  檢查 `graduates.html` 標籤正確配對；本地 `http.server` 回傳 200 確認可正常
  載入。

### 2026-09-08：畢業生篩選按鈕順序對調
- **改動**：`graduates.html` 的篩選按鈕順序從「全部/113 級/114 級」改成
  「全部/114 級/113 級」，`data-cohort` 對應的篩選邏輯不受影響（純粹調換
  按鈕的顯示順序）。
- **驗證方式**：本地 `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：實驗室成員頁的博士生／專題生卡片改左靠齊
- **背景**：使用者要求 `members.html` 裡的「博士生」「專題生」分組（都只有
  1 位成員）改成左靠齊，而不是像目前這樣單張卡片置中飄在整排中間。這兩組
  本來就只有 1 張卡片，不會像之前「碩士生」多張卡片時發生的「靠左造成左右
  留白不對稱」問題（單張卡片靠左跟置中相比，差異只在卡片本身位置，不會有
  多張卡片之間的間距換算問題），所以直接套用靠左沒有副作用。
- **決策**：沒有直接改動共用的 `.member-grid`（那樣會連帶影響碩士生／已畢業
  成員等多張卡片的分組），而是新增一個修飾用的 `.align-left` class，只加在
  博士生、專題生兩個分組的 `card-grid member-grid` 容器上，其餘分組維持原本
  的置中設定。
- **改動**：
  - `style.css`：新增 `.member-grid.align-left { justify-content: flex-start;
    }`，覆蓋基礎 `.member-grid` 的 `justify-content: center`。
  - `members.html`：博士生、專題生的 `<div class="card-grid member-grid">`
    都加上 `align-left` class。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html` 標籤正確配對；
  本地 `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：博士生／專題生改跟碩士生第一張卡片對齊（全組統一改左靠齊）
- **背景**：使用者反映博士生、專題生（上次改的 `align-left`）跟碩士生最左邊
  的卡片沒有對齊。原因是：碩士生的 `.member-grid` 當時還是 `justify-content:
  center`，而碩士生 9 人排 3 欄，每排 3 張卡片＋間距只佔約 956px，容器內距
  寬度有 1072px，即使是「排滿」的一整排也還有約 116px 空隙；用 `center` 時
  這 116px 平均分配在該排左右兩側，導致碩士生第一張卡片的起始位置本來就不是
  貼在容器最左邊（大約往右偏 58px），跟已經改成 `flex-start`（起始位置＝0）
  的博士生／專題生對不齊。
- **改動**：既然碩士生的 9 人剛好排滿整數倍的 3 欄（3 排都是滿的，不會有
  「最後一排人數不足、靠左會露出不對稱留白」的問題），把 `justify-content:
  flex-start` 直接套用到**所有**分組，而不是只套在人數少的分組上：
  - `style.css`：`.member-grid` 的 `justify-content` 直接從 `center` 改成
    `flex-start`；移除變成多餘的 `.member-grid.align-left` 修飾規則。
  - `members.html`：拿掉博士生、專題生 `card-grid member-grid` 上的
    `align-left` class（基礎規則已經是靠左，不再需要額外修飾）。
  - 這個改動也會套用到 `graduates.html`（共用同一個 `.member-grid` class），
    畢業生卡片列也會跟著變成靠左，屬於一致性的附帶效果，不影響功能。
- **驗證方式**：grep 確認 `align-left` 在所有 `.html`/`.css` 檔案中都沒有
  殘留引用；用 Python `html.parser` 檢查 `members.html`/`graduates.html`
  標籤正確配對；本地 `http.server` 回傳 200 確認可正常載入。

### 2026-09-08：改回置中（「跟碩士生對齊」跟「左右對稱」互相衝突）
- **背景**：改成全體靠左（見上一則紀錄）之後，使用者反映左右留白又不對稱了。
  說明給使用者聽：卡片是固定寬度，多出來的空間只能「全部堆右邊（靠左但不
  對稱）」「平均分配左右（對稱但各組人數不同，卡片彼此對不齊）」「卡片自動
  撐大填滿整行（兩者都要，但單人分組的卡片會被撐得很寬）」三選一，三者無法
  同時成立。詢問後使用者選擇「維持固定寬度，改回置中」，也就是犧牲「跨組
  對齊」，優先保留「左右對稱」與卡片固定大小。
- **改動**：`style.css` 的 `.member-grid` `justify-content` 從 `flex-start`
  改回 `center`。
- **驗證方式**：本地 `http.server` 確認 `members.html`/`graduates.html` 皆
  回傳 200，可正常載入。

### 2026-09-08：改用固定欄位的 CSS Grid，同時解決「對齊」與「對稱」
- **背景**：使用者更精確地描述需求——不是要卡片貼齊容器最左邊，而是要「博士生」
  的卡片跟「碩士生」第一張卡片（曾巧瑩）對齊。用 Flexbox 沒辦法同時滿足這個
  需求跟「左右留白對稱」，因為 Flexbox 的置中/靠左是「每一組各自根據自己組內
  的項目數量」去計算留白，不同組人數不同、算出來的位置自然不一樣。
- **決策**：改用「固定 3 欄的 CSS Grid，格線本身用 `width: fit-content` +
  `margin: 0 auto` 置中」來解決。核心概念：不管某一組實際有幾個成員，
  `.member-grid` 這個格線容器本身的「外框大小」永遠是同一組固定的 3 欄寬度
  （由 `grid-template-columns: repeat(3, minmax(0, 300px))` 決定），所以這個
  外框在容器裡置中的位置，每一組都完全一樣；成員只是照順序填進這個固定格線
  的第 1、2、3 格，人數不足的組別（博士生、專題生）只會佔用第 1 格，其餘格子
  空著，但因為外框位置本身沒變，第 1 格（也就是博士生的吳彥廷、碩士生的
  曾巧瑩、專題生的錢信亦）就會自然對齊在同一個 x 座標，同時外框置中也讓
  每一組的左右留白維持對稱。
- **改動**：`style.css`
  - `.member-grid` 從 `display: flex` 改回 `display: grid`：
    `grid-template-columns: repeat(3, minmax(0, 300px))`、`width: fit-content`、
    `max-width: 100%`、`margin: 0 auto`（`gap: 28px` 不變）。
  - `.member-card` 移除 `flex: 0 1 300px`（改用 Grid 後，卡片寬度由格線欄寬
    決定，不再需要 flex-basis）。
  - 響應式斷點：860px 以下欄數從 `repeat(3, ...)` 改成 `repeat(2, minmax(0,
    300px))`；640px 以下改成單欄 `minmax(0, 300px)`，`minmax(0, 300px)` 讓
    欄寬在螢幕更窄時可以再往下縮，避免固定 300px 在小螢幕上溢出。
- **驗證方式**：用 Python `html.parser` 檢查 `members.html`/`graduates.html`
  標籤正確配對；本地 `http.server` 逐頁回傳 200 確認六個頁面皆可正常載入。

### 2026-09-10：加入捲動進場動畫（區塊淡入上移 + 卡片依序浮現）
- **背景**：使用者先前明確表示「頁面載入時不要淡入效果」，後來詢問還能加什麼
  動畫，從我列的選項中挑了「捲動到才觸發」這一類，包含區塊淡入上移與卡片
  依序浮現兩項。關鍵差異：不是一進站就整頁動一遍，而是捲到那一區才進場。
- **決策**：
  - **首屏不動**：`.hero`（首頁）與 `.page-header`（各獨立頁標題區）排除在
    動畫之外，因為它們一定在第一屏，加動畫就等於又變成「載入時淡入」，
    正是使用者先前否決的效果。實測 `index.html` 只有 Hero 一個區塊，
    所以首頁載入時完全靜止。
  - **隱藏狀態由 JS 加、不寫進 HTML**：`.reveal` 這個「透明 + 下移」的初始
    狀態是 `script.js` 動態加上去的。若寫死在 HTML，一旦 JS 失效或瀏覽器不
    支援 `IntersectionObserver`，整頁內容會永遠停在透明狀態、變成空白頁。
    現在的寫法在那些情況下會直接顯示完整內容。
  - **有卡片的區塊不整塊淡入**：改成該區塊的 `.group-heading`、`.pub-filter`
    與每張 `.member-card` 各自進場，否則父層整塊淡入會跟子層卡片的動畫疊在
    一起，看起來混濁。
- **改動**：
  - `style.css`：新增 `.reveal`／`.reveal.is-visible`（透明下移 24px → 歸位）；
    卡片錯開延遲用 `:nth-child(3n + 2)`／`(3n + 3)` 做出每排由左至右的骨牌
    效果，並在 860px（2 欄）、640px（單欄）斷點改寫成對應的錯開規則，
    避免欄數變了但延遲還照 3 欄算；另加 `prefers-reduced-motion` 覆寫當保險。
  - `script.js`：新增 Scroll reveal 區塊，用 `IntersectionObserver` 在元素進入
    畫面時加上 `is-visible` 並 `unobserve`（只播一次，捲回去不會重播）。
    `window.matchMedia` 有做 `typeof` 檢查（見下方驗證，這是實測抓到的問題）。
- **驗證方式**：在 scratchpad 用 jsdom 實際載入六個頁面並執行 `script.js`，
  分三組檢查：(A) 正常路徑—`.reveal` 數量與 `observe()` 次數相符、首屏區塊
  確實被略過（members 14 個目標＝3 個分組標題＋11 張卡片；faculty 6 個＝
  7 個 section 扣掉標題區；graduates 3 個＝篩選列＋2 張卡片；index 0 個）；
  (B) 觸發進場後 14 個目標全部拿到 `is-visible` 且全部被 `unobserve`；
  (C) 降級路徑—移除 `IntersectionObserver` 後，六頁都沒有任何元素卡在隱藏
  狀態。**這輪驗證抓到一個真的 bug**：原本直接呼叫 `window.matchMedia(...)`，
  在沒有實作該 API 的環境會拋錯中斷腳本，已加上 `typeof` 檢查後全部通過。
  另外 `node --check script.js` 通過、本地 `http.server` 六頁皆回傳 200。

### 2026-09-10：美編（字型載入、成員頁配色、視覺層次、收尾細節）
- **背景**：使用者問「接下來如果要美編可以怎麼美編」，我盤點現況後列出方向，
  使用者回「你自己發揮」，因此一次做完盤點出的項目。
- **盤點時發現的關鍵問題：字型從來沒有載入過**。`style.css` 從專案初期就指定
  `"Noto Serif TC"` / `"Noto Sans TC"`，但六個頁面的 `<head>` 只有 `style.css`
  一行，沒有任何 Google Fonts `<link>` 或 `@font-face`。也就是說整站的中文字
  一直是掉回瀏覽器後備字型在顯示，跟設計意圖不同，而且每台電腦看到的還不一樣。
  這是這輪影響最大的一項。
- **改動**：
  - **字型**：六頁 `<head>` 都加上 Google Fonts 的 `preconnect` + `<link>`，
    載入 Noto Sans TC 400/500/600/700 與 Noto Serif TC 600/700（對應 CSS 裡
    實際用到的字重），並用 `display=swap` 避免字型載入時文字空白。
  - **成員照片備援改為淺色**：`.member-photo` 底色從實心 `--color-navy` 改成
    淺米色漸層，姓氏文字從白色改成低透明度深藍。原因是 13 張成員卡只有 1 張
    有真實照片，深藍底會讓整個成員頁變成一片很重的深色方塊牆；改成淺色後
    看起來像刻意的留白，而不是「圖片載入失敗」。
  - **視覺層次**：`.member-card` 加上細微雙層陰影；`.member-grid
    .member-card:hover` 加上上浮 4px + 陰影加深 + 邊框變深，照片同時緩慢放大
    到 1.04 倍。**hover 的選擇器權重刻意寫成 `.member-grid .member-card:hover`
    (0,3,0)**，因為捲動進場的 `.reveal.is-visible` (0,2,0) 也在設 `transform`，
    權重不夠的話 hover 位移會被蓋掉。
  - **accent 色**：`.page-header .section-title` 與各 `.section` 的
    `.section-title` 底下加上金褐色短線 `::after`，讓 accent 色不只出現在
    按鈕和連結。
  - **首頁補內容**：`index.html` 原本只有 Hero，捲下去直接就是頁尾。加上
    「研究方向」摘要區，用既有的 `.tag-grid`/`.tag-pill` class 呈現 7 個研究
    領域 + 「查看完整研究方向」按鈕。**內容完全取自 `research.html` 既有資料，
    沒有杜撰任何新文案**；使用者先前說首頁內容待定，這一區是暫時的預覽，
    要換掉只要刪掉那個 `<section>` 即可。新增 `.section-actions` 置中按鈕。
  - **收尾細節**：新增 `favicon.svg`（深藍圓角底 + 金褐色 E，用 `<rect>` 畫成
    不依賴字型）；六頁各自加上對應內容的 `meta description`。
  - `prefers-reduced-motion` 覆寫一併擴充，把新的卡片 hover 位移與照片縮放
    也關掉。
- **驗證方式**：
  - `curl` 實際打 Google Fonts URL，回傳 HTTP 200、內含 6 條 `@font-face`
    （Sans 4 個字重 + Serif 2 個字重），確認家族名與字重參數沒寫錯。
  - 用 Python `xml.dom.minidom` 解析 `favicon.svg` 確認是合法 XML。
  - 用 Python `html.parser` 檢查六份 HTML 標籤皆正確配對。
  - 重跑 scratchpad 的 jsdom 捲動進場測試：首頁因為多了新區塊，進場目標從 0
    變成 1（Hero 仍正確略過），其餘頁面數量不變，觸發後全部顯示、降級路徑
    也沒有元素卡在隱藏狀態。
  - 本地 `http.server` 六頁與 `favicon.svg` 皆回傳 200。

### 2026-09-10：強化識別度（網路圖 motif、英文小標、編號排版、頁尾）
- **背景**：使用者問「還有什麼可以優化讓網站更有特色」。我盤點後指出網站雖然
  乾淨但像通用學術模板，缺少「這一間實驗室」的識別；使用者回「都做」。
- **改動**：
  - **首頁 Hero 加上節點連線圖**（最主要的識別元素）。實驗室研究社群網路分析
    與假訊息傳播，節點連線圖是這個主題最鮮明的視覺符號。用 Python 腳本產生
    `images/network-motif.svg`：6 個群集共 36 個節點，每個節點連到最近的 2 個
    鄰居再加 7 條跨群連線，看起來像自然的社群網路而不是規則格線。**腳本用固定
    亂數種子 20260910**，所以要重新產生也會得到同一張圖。不透明度直接烤進
    SVG（線 0.10、節點 0.18、金褐節點 0.55），CSS 端只負責疊在漸層之上。
  - **英文小標擴充到每一頁**。`page-eyebrow`（斜體襯線）原本只有 `faculty.html`
    的「Advisor」在用，是全站最有個性卻被埋起來的細節。現在
    `research.html`/`members.html`/`publications.html`/`graduates.html` 分別
    加上 Research／Members／Publications／Alumni。
  - **實驗室成員頁改成交替底色**。原本 3 個分組全擠在同一個白色 `.section` 裡，
    長頁面顯得平。拆成 3 個獨立 section，依序白、米白、白，讓每個學制成為
    視覺上的獨立區塊。
  - **研究方向改成 01–07 編號**。`.research-list` 用 CSS counter
    (`decimal-leading-zero`) 把原本的小圓點換成大號金褐襯線編號，項目高度
    加大並改用 flex 垂直置中。
  - **著作年份放大**。`.pub-year` 從 1.05rem 放大到 1.7rem 襯線大字、欄寬加寬，
    做出學術刊物的編輯感。
  - **頁尾升級**。原本只有聯絡資訊加版權，現在加上大字襯線的實驗室名稱、
    金褐色英文名、六個頁面的簡易導覽、分隔線，並把版權文字獨立成
    `.footer-copy` 縮小淡化；`.site-footer` 上下留白從 26px 加大到 52/30px。
- **未做**：`research.html`/`publications.html`/`graduates.html` 各自只有一個
  內容區塊，沒有可交替的對象，所以沒有套用交替底色。
- **驗證方式**：Python `xml.dom.minidom` 確認兩個 SVG 皆為合法 XML；
  `html.parser` 確認六份 HTML 標籤配對；逐頁列出 eyebrow 與 section class
  確認小標與交替底色都套到正確位置；重跑 jsdom 捲動進場測試，`members.html`
  拆成 3 個 section 後進場目標仍是 14 個（3 個分組標題 + 11 張卡片），
  觸發後全部顯示、降級路徑無元素卡住；本地 `http.server` 六頁與兩個 SVG
  皆回傳 200。

### 2026-10-05：全站改為 Terminal CLI 風格
- **背景**：使用者貼了一份 Terminal CLI 設計系統（黑底綠字、等寬字、直角、終端機
  符號、CRT 掃描線），要求全站改成這個風格。改版前先把當時未 commit 的成員名單
  更新與 CI 腳本 commit 並推上 GitHub（`d54deaf`），方便日後整版退回。
- **決策**（經詢問使用者確認）：全站一次改；打字效果**只用在首頁 Hero 標題**（使用者
  先前否決過載入淡入，其他頁標題只有游標閃爍、不打字）；成員照片平常綠色單色、
  hover 恢復原色（後來使用者改成照片一律維持原色，見本則最後）。
- **做法**：HTML class 名稱幾乎不動，主要重寫 `style.css`；終端機符號（`[ ]`、`//`、
  `# `、`> `、`--role=`、`+--- ---+`、tmux 導覽編號、卡片 `usr_01` 標題列）全部用
  CSS 偽元素加，不寫進 HTML 文字。維持置中版面，因為成員格線先前定案的
  「固定 3 欄 × 300px、外框置中」對齊方式不動（分組標題 `// 博士生` 靠容器左緣，
  卡片格線置中，兩者左緣不同是已知取捨）。
- **改動**：
  - `style.css`：整份改寫。token 換成 `--color-bg`/`--color-fg`/`--color-fg-dim`/
    `--color-secondary`/`--color-muted` 與 `--text-*` 字級；移除 `--color-navy`、
    `--radius`、`--font-serif`/`--font-sans`。`body::after` 掃描線（`pointer-events:
    none`）；`@keyframes blink`（游標）、`glitch`（logo hover）。照片綠色單色＝`<img>`
    灰階壓暗 + `::after` 綠色 `mix-blend-mode: multiply`（`.member-photo` 設
    `isolation: isolate`）。新增共用 class `.window-bar`（反白標題列）、`.prompt-line`
    （自動補 `guest@eclab:~$ ` 提示符）、`.hero-window`/`.hero-ascii`。
    `prefers-reduced-motion` 下游標不閃、logo 不抖、照片不漸變。
  - 六頁 `<head>`：字型改成 JetBrains Mono 400/700 + Noto Sans TC 400/700。
  - 五個獨立頁的小標改成指令（`.page-eyebrow.prompt-line`）：`ls ~/research`、
    `ls ~/members`、`cat ~/publications.bib`、`ls ~/alumni`、`finger sfelixwu`。
  - `index.html` Hero 改成終端機視窗：標題列 + `cat ~/about.txt` + 純 ASCII 的
    「ETHICS」banner（`aria-hidden`）+ `[OK]` 校系 + h1（`#heroTitle`）。
  - `script.js`：新增 Hero 打字效果。文字原本就寫在 HTML，JS 才清空再逐字打出，
    並設 `aria-label` 保留完整標題；減少動態效果時不打字。
  - `favicon.svg`、`images/network-motif.svg` 改配色（motif 節點改成方形）。
- **驗證方式**：這次在 scratchpad 用 `apt-get download` + `dpkg -x` 取得 headless
  Chromium 缺的 `libnspr4`/`libnss3`/`libasound2`，設 `LD_LIBRARY_PATH` 跑 Playwright，
  **不需要 root** 就能截圖（之前的紀錄說無法截圖驗證，現在可以用這個方法）。六頁在
  1280px 與 375px 都截圖檢查：無 JS 錯誤、無橫向溢出、`document.fonts.check` 確認
  JetBrains Mono 有載入。截圖抓到並修正兩個問題：方塊字元版 ASCII art 字寬錯亂
  （改純 ASCII）、照片 multiply 後白底變整片螢光綠（先壓暗再混色）。
  `node --check script.js`、`.github/scripts/validate.py` 皆通過。
- **後續（同日）**：使用者要照片維持原色、不要被顏色覆蓋。`style.css` 移除
  `.member-photo`/`.faculty-avatar` 的灰階 `filter`、`::after` 綠色 multiply 圖層、
  `isolation` 與對應的 hover／reduced-motion 規則，照片恢復原色顯示（外框、
  `usr_01` 標題列等終端機樣式不變）。
- **後續（同日）**：使用者要求 (1) 照片上不要有掃描線 (2) 閃爍游標只留首頁。
  - 掃描線原本是 `body::after` 整頁 fixed 覆蓋層（z-index 1000），一定蓋過照片。
    改成 `.site-header`／`main > section`／`.site-footer` 各自一層 `::after`
    （z-index 2，區塊加 `position: relative`），照片 `<img>` 設 z-index 3 疊在上面。
    **連帶規則**：`.reveal.is-visible` 的 `transform` 改成 `none`（原本
    `translateY(0)`）——有 transform 的卡片會自成 stacking context，照片的 z-index
    就壓不過掃描線。之後若要在卡片或其祖先加 `transform`／`filter`／`opacity < 1`
    等會產生 stacking context 的屬性，照片會重新出現橫紋，要留意。
  - 移除 `.page-header .section-title::after` 的 `_` 閃爍游標，只剩首頁 Hero
    `h1::after` 的 `█`。
  - 驗證：Playwright 2 倍解析度局部截圖確認照片無橫紋、卡片標題列仍有；
    computed style 確認其他頁大標 `::after` 為 `none`、首頁仍是 `█`；無 JS 錯誤。
- **後續（同日）**：使用者要求頁尾的「地址」「Email」先留空白，之後會再補。六頁
  `.footer-contact` 這兩項只保留標籤、值改成空的 `<span></span>`（電話不變）。
  `faculty.html` 教師資訊區（`.faculty-contact`）的地址／Email 使用者沒有提到，維持原樣。

### 2026-10-05：頁首右上角加上中英切換按鈕
- **背景**：使用者要求右上角做一個中英切換按鈕。
- **決策**：不拆成兩套頁面，英文直接寫在同一個元素的 `data-en` 屬性（理由：使用者
  常直接改 HTML，中英放在同一行改的時候看得到）；沒有 JS 時照常顯示中文、按鈕
  隱藏。選擇存在 `localStorage`（讀寫都包 try/catch），換頁沿用。學生姓名不翻（見
  開發慣例）。
- **改動**：
  - 六頁：頁首順序改成 logo → 導覽 → `#langToggle` → `.nav-toggle`（漢堡選單按鈕
    移到最後，才能在窄螢幕上跟語言按鈕一起靠右）；logo、頁尾品牌、版權文字包進
    `<span data-en>`；頁尾品牌英文那行改用 `.footer-brand-en` class（原本是
    `.footer-brand span`，包了 span 之後會誤套到中文名）；所有中文葉節點加上
    `data-en`，`<title>` 也有。`faculty.html` 聯絡資訊的「實驗室」「地址」值包進 span。
  - `script.js`：新增中英切換區塊（切換 `textContent`、`aria-label`、`<html lang>`）。
    Hero 打字效果改成先套用語言再打字（英文 60ms／字），切換語言時會先停掉打字
    計時器，避免繼續打出舊語言的字。
  - `style.css`：新增 `.lang-toggle`（`[EN]`／`[中文]`，hover 反白；`[hidden]` 要另外
    寫 `display: none`，否則會被 class 的 display 蓋掉）。**漢堡選單斷點從 640px 提高到
    1100px**：實測頁首需要寬度中文約 959px、英文約 1072px，原本 641–1000px 之間中文
    導覽會被擠到換行、英文會撐出橫向捲動；導覽連結加上 `white-space: nowrap`。
- **翻譯需確認**（沒有官方英文名稱可查證，先用直譯）：東海大學雲創學院
  （Cloud Innovation School）、三個研究計畫名稱、畢業生篩選「113 級／114 級」譯為
  Class of 2024／2025（以民國年 +1911 換算畢業年）、課程學期 114／113 學年度下學期
  譯為 Spring 2026／Spring 2025。
- **驗證方式**：Playwright 實測打字途中切換會立刻變成完整英文標題、換頁沿用英文、
  切回中文正常、`<title>` 與 `<html lang>` 跟著變、關掉 JS 時按鈕不顯示；
  375／700／1000／1101／1280px 中英文頁首都無橫向溢出；腳本列出所有未加 `data-en`
  的中文，只剩人名與姓氏色塊。`node --check script.js`、`validate.py` 通過。

### 2026-10-05：RWD 與功能測試（手機／平板／電腦）
- **背景**：使用者要求測試手機、平板、電腦上的排版與各功能是否正常。
- **測試範圍**：Playwright（取得函式庫的方式見「全站改為 Terminal CLI 風格」那則）
  跑 6 種尺寸 × 中英文 × 6 頁＝72 組：手機 375×667、390×844，平板 768×1024、
  1024×1366（這四種模擬觸控），電腦 1280×800、1920×1080。每組自動檢查：橫向
  溢出與超出畫面的元素、字級 < 12px、手機觸控目標大小、漢堡選單收合／展開／
  `aria-expanded`、中英切換來回、首頁打字完成且語言正確、著作年份篩選、畢業生
  年級篩選、捲到底後捲動進場元素全部顯示、JS 錯誤、資源 404；並逐張檢視截圖。
- **發現並修正**：
  - 手機觸控目標偏小：語言按鈕 26px 高、頁尾導覽連結 28px 高。`style.css` 在
    1100px 以下把 `.lang-toggle` 設 `min-height: 40px`、`.nav-toggle` 改 40×40；
    `.footer-nav a` 改 `inline-block`，640px 以下 `padding: 8px`。
  - `graduates.html`「114 級」目前 0 人，篩選後畫面全空、像壞掉。新增
    `<p class="filter-empty" id="gradEmpty" hidden>`（「# 此級別目前沒有畢業生」，有
    `data-en`），`script.js` 篩選後若沒有任何可見卡片就顯示它。
- **結果**：修正後重跑 72 組，0 失敗；剩下的警告只有成員照片尚未補上（member 7 張、
  graduates 1 張，`onerror` 姓氏色塊備援正常顯示，屬預期）。
- **後續修正（同日）**：
  - 觸控裝置的 sticky hover：手機點過語言按鈕／研究方向項目／成員卡片後，hover 反白
    會一直黏著，看起來像被選取。`style.css` 把 `.lang-toggle`、`.research-list li`、
    `.member-grid .member-card`、`.pub-filter-btn` 的 `:hover` 包進
    `@media (hover: hover)`，只在有滑鼠的裝置生效（實測觸控模擬下 tap 後背景維持
    透明、滑鼠 hover 仍反白）。**之後新增會整塊反白的 hover 效果也要包進這個
    media query**；純連結（點了就換頁）不需要。
  - 375px 手機 logo 第二行原本只剩「LAB」掉到第三行：`.logo-en` 加
    `text-wrap: balance`，改成「NCKU · ETHICS- / AWARE COMPUTING LAB」兩行等長。
    想過用不斷行連字號（U+2011）讓斷點落在「COMPUTING」前，但實測 Google Fonts 的
    JetBrains Mono 沒有這個字元（量到寬 6px、非等寬 10px，是 fallback 字型），不採用。
  - 修正後重跑 72 組測試，仍是 0 失敗。

### 2026-11-05：依使用者提供的最新資料更新成員／教授頁
- **背景**：使用者貼上吳教授最新的學經歷、著作、研究計劃、開授課程、指導學生名單。
  學經歷、研究領域、期刊／會議論文、專利跟現有內容一致，未變動。
- **改動**：
  - `members.html`：博士生新增蔡元珽；碩一依來源順序改為 16 人（新增廖昱翔、謝忠廷、
    盧可宸、陳彤、楊婉渟、林采玟、黃程睿、Armin、張庭維、鄭秉恒、何維展、余沛承）；
    重新加回「專題生」分組（王晨安、李琦）。新成員年級是**推測**（來源沒寫年級，
    依名單順序排在原有碩一之間，判斷為碩一），待使用者確認。Armin 是英文名，
    姓氏色塊用「A」。
  - `graduates.html`：陳威成、周子豪 `data-cohort` 從 113 改成 114（來源寫「碩士 114」）；
    113 級篩選目前 0 人，會顯示空狀態提示。
  - `faculty.html`：研究計劃新增 4 項（放在最前面，順序照來源）；開授課程新增
    「115 學年度上學期」6 門課（一列、以頓號分隔）；指導學生名單同步，另加專題生與
    已畢業碩士（114 級）兩列，陳威成、周子豪從碩士班移出。
- **翻譯需確認**：4 個新研究計劃名稱與 6 門新課程名稱的英文都是直譯。
- **未變動**：頁尾地址／Email 維持空白（使用者先前指定之後再補，這次貼的是教授個人
  聯絡資訊，`faculty.html` 已有）。
- **驗證方式**：`.github/scripts/validate.py` 通過（只剩成員照片未補的預期警告）；
  `members.html` 共 29 張卡片（博 2、碩 25、專題 2）。

### 2026-11-05：預設改回 GitHub 上的經典版，加上切換終端機版的按鈕
- **背景**：使用者要把版面換回 GitHub 上（`d54deaf`）的設計，但保留終端機版，用按鈕切換。
- **做法**：沿用目前的 HTML（有最新成員資料與中英切換），只換樣式表：
  - `style.css` 還原成 `d54deaf` 的版本，再補上新 HTML 需要的規則：語言／版面按鈕、
    `.filter-empty`、`.footer-brand-en`（原本 `.footer-brand span` 會誤套到中文名）、
    隱藏終端機專屬元素。原本的終端機樣式改名 `style-terminal.css`。
  - `favicon.svg`、`images/network-motif.svg` 還原成經典版，終端機版另存 `-terminal` 檔。
  - 六頁：Google Fonts 改成同時載入兩版需要的字型；頁首在 `#langToggle` 後加
    `#themeToggle`；五個獨立頁在指令小標前面加回經典版的英文小標（`.eyebrow-classic`）。
  - `script.js`：版面切換（先載入新樣式表、載好才移除舊的，避免中間沒有樣式）；按鈕文字
    跟著語言變（由 JS 處理，不用 `data-en`）；Hero 打字效果只在終端機版。
  - 經典版多了兩顆按鈕後，頁首實測約需 1121px，超過 1120px 容器：導覽間距 32→22px，
    漢堡選單斷點從 640px 改成 1100px（跟終端機版一致）。
- **驗證方式**：Playwright（`playwright-core` 裝在 scratchpad，`libnss3` 要從
  archive.ubuntu.com 的 pool 直接抓 .deb，`apt-get download` 會 404）跑 2 版面 × 中英 ×
  375/768/1280 × 6 頁：無橫向溢出、無 JS 錯誤、樣式表與小標正確（404 只有未補的成員照片）；
  實測切換按鈕、換頁沿用、打字中切回經典版標題會補完整、關掉 JS 時按鈕隱藏且用經典版。

- **後續（同日）**：使用者要切換入口更隱密／有趣。經典版頁首不再顯示 `#themeToggle`
  （`style.css` 設 `display: none`），改成頁尾右下角幾乎看不見的 `>_`（`.terminal-egg`，
  滑過變綠並展開成 `>_ ./terminal`；640px 以下頁尾 `padding-bottom` 加大避免跟版權文字重疊），
  加上鍵盤 `` ` `` 快捷鍵（輸入框中不觸發）。切到終端機版時先播約 1 秒開機畫面
  （`.boot-screen`，CRT 開機展開＋逐行 BIOS 訊息；樣式寫在 `style.css`，因為播放時還是
  經典版樣式表），減少動態效果時直接切換。終端機版維持頁首 `[經典版]` 按鈕，方便切回。
  Playwright 實測：彩蛋點擊／開機畫面／`` ` `` 雙向切換／reduced-motion 略過開機畫面皆正常，
  375／768px 無橫向溢出、無 JS 錯誤。
- **後續（同日）**：開機訊息改成跟著目前語言（`script.js` 的 `BOOT_LINES.zh`／`.en`）。
  中文兩行 `[OK]` 前都是 8 個中文字＋相同點點數才對齊，改字時要維持字數一致。
  `.boot-screen` 字型補上 `"Noto Sans TC"` fallback（JetBrains Mono 沒有中文，原本中文變方框）。

### 2026-11-05：研究方向頁加上研究計劃
- **改動**：`research.html` 在研究領域列表下方新增 `section-alt` 區塊「研究計劃」，8 項計畫
  直接複製 `faculty.html` 的 `.pub-list` 標記（含 `data-en`），兩個版面都沿用既有
  `.pub-item`/`.pub-title`/`.pub-meta` 樣式，沒有新增 CSS。`faculty.html` 原本的研究計劃保留。
- **驗證方式**：`validate.py` 通過；Playwright 經典／終端機版 × 1280／375px 截圖確認排版正常、
  無橫向溢出、無 JS 錯誤。

### 2026-11-05：頁尾填入實驗室位置與分機
- **背景**：使用者說明 `R96213 / ext.62400-3135` 是實驗室的位置與分機。
- **改動**：六頁 `.footer-contact` 的地址填入 `R96213`，電話從教授分機 `ext.62375` 改成實驗室
  分機 `06-2757575 ext.62400-3135`（頁尾代表實驗室；教授分機仍在 `faculty.html` 教師資訊區）。
  Email 仍空白待補。`faculty.html` 的「實驗室」欄位原本就是這組資訊，未變動。
- **後續（同日）**：頁尾地址改成「成功大學起端館 2樓 R96213」，英文 `data-en` 暫譯
  「R96213, 2F, Qiduan Building, National Cheng Kung University」（起端館的官方英文名稱待確認）。

### 2026-11-05：換洪宗緯照片（直式照片先裁成 4:3）
- 使用者給的新照片是直式 960×1280，直接放會因 `object-fit: cover` + `object-position: top`
  只剩上方一大片帳篷。先裁成 960×720（y=150 起，保留頭部、比讚手勢與上半身）再覆蓋
  `images/members/hong-zongwei.jpg`；舊的合照在 git `126ac6a` 可還原。
- **裁圖方法**：sandbox 沒有 Pillow／ImageMagick，用 Playwright 開 headless Chromium，
  canvas `drawImage` 裁切後 `toDataURL('image/jpeg', 0.88)` 存檔。之後收到非 4:3 的照片可比照。
- **後續（同日）**：開機畫面擴充成 12 行（主機系所、位置 R96213、各研究領域「模組」載入、
  掛載成員／著作目錄、歡迎訊息），每行間隔 `BOOT_LINE_MS` 240ms、最後停留 `BOOT_HOLD_MS`
  800ms，總長約 3.6 秒；點一下開機畫面可略過。`[OK]` 行用 `bootOk(label, width)` 自動補點點：
  中文 width 16（項目固定 8 個中文字）、英文 width 34（最長項目 31 字元，width 要 ≥ 最長＋3
  才對得齊）。640px 以下 `.boot-screen` 字級 0.68rem，英文最長行不換行。
  Playwright 實測中英文 × 1280／375px 無換行、無 JS 錯誤，點擊略過約 0.6 秒內切換完成。
- **後續（同日）**：開機完（含點擊略過）導向 `index.html` 最上面，由 `theme.js` 直接套用終端機版，
  首頁 Hero 標題會重新打字；開機畫面一直蓋到換頁為止。`localStorage` 存不了時無法把設定帶到
  下一頁，改成原地切換並 `scrollTo` 最上面。切回經典版、減少動態效果（沒有開機畫面）時維持原地
  切換。Playwright 實測：從 members.html 頁底切換 → 落在 index.html、scrollY 0、終端機版、標題打字中；
  略過與封鎖儲存空間兩種路徑皆正常、無 JS 錯誤。

### 2026-11-05：手機／平板 RWD 檢測與資安檢測
- **RWD**：Playwright 觸控模擬 4 種尺寸（375×667、390×844、768×1024、1024×1366）× 2 版面 ×
  中英 × 6 頁（腳本 `rwd.js` 在 scratchpad，一次跑一種尺寸，96 組一次跑完會被中斷）。檢查橫向溢出、
  超出畫面元素、頁首元素重疊、字級、觸控目標、漢堡選單、中英切換、著作／畢業生篩選、捲動進場、
  彩蛋 `>_` → 開機 → 首頁、`[經典版]` 切回、JS 錯誤與 404。結果 0 失敗；修正兩項警告（只在 1100px 以下）：
  `.pub-filter-btn` `min-height: 40px`（原本 32–34px，兩份 CSS 都改）；經典版 `.logo-en`／
  `.footer-brand-en` 放大到 0.75rem（原本約 11px）。修正後 0 失敗 0 警告。
- **資安**：無 `innerHTML`/`eval`、`localStorage` 值都是嚴格比對、外部資源只有 Google Fonts（HTTPS）、
  `target="_blank"` 都有 `noopener`、無混合內容、git 歷史無密碼／金鑰、照片（含歷史版本）無 GPS。
  `ci.yml` 加上 `permissions: contents: read`。**待使用者決定**：`CLAUDE.md` 會被 GitHub Pages
  公開在 `/CLAUDE.md`（repo 本身也是 public）；沒有 CSP（Pages 不能設 header，只能用 `<meta>`，
  但 32 個 inline `onerror` 會擋住嚴格 CSP，要先改成 `script.js` 統一處理）。
