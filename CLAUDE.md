# 倫理計算實驗室網頁

## 專案規格
- 純 HTML/CSS/JS，無框架
- 語言：繁體中文
- 風格：簡潔學術風，響應式設計
- 色系：以深藍/白為主（`--color-navy` / `--color-bg`，定義於 `style.css:1-14`）

## 檔案結構
- `index.html` — 首頁：Hero
- `research.html` — 研究方向獨立頁（條列式呈現 7 個研究領域，`.research-list`）
- `members.html` — 成員介紹獨立頁（指導教授/博士生/碩士生/專題生卡片）
- `faculty.html` — 教師個人頁（吳士駿教授完整經歷）
- `publications.html` — 發表著作獨立頁（年份篩選 + 論文列表）
- `style.css` — 所有樣式統一放這裡，**不使用 inline style**
- `script.js` — mobile nav toggle、發表著作年份篩選（僅 `publications.html`）
- `images/members/` — 成員大頭照存放處，檔名對應各成員卡片 `<img>` 的 `src`
  （見任務紀錄「成員頭像加入照片版位」）；目前資料夾是空的，圖片載入失敗時
  會自動顯示姓氏色塊（`.avatar-fallback`）當備援。
- 聯絡資訊（地址/Email/電話）統一放在每個頁面的 `<footer class="site-footer">`
  （`.footer-contact` class），**沒有獨立的聯絡頁面或聯絡表單**。

## 偏好
- 每次改動後簡短說明改了什麼
- CSS 一律寫進 `style.css`，不要用 inline style

## 開發慣例
- `script.js` 中對頁面專屬元素（`#pubFilter`）的事件綁定都要做 null 檢查，
  因為並非每個頁面都有這些元素（只有 `publications.html` 有出版年份篩選）。
- 新增教師/成員頁面時可參考 `faculty.html` 的 class 命名重用：
  `.faculty-*`、`.timeline-*`（學經歷）、`.tag-*`（研究領域標籤）、
  `.info-*`（開授課程/指導學生列表）、`.pub-group`（著作分類）。
- 所有獨立頁面（`faculty.html`/`members.html`/`publications.html`）的導覽列都要
  互相同步：目前所在頁面的連結加上 `class="active"`（對應 `.site-nav a.active`
  CSS，底線標示）。

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
