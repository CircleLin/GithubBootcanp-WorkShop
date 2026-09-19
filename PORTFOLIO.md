# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊完成的待辦清單 Web App，使用瀏覽器即可操作，提供待辦事項管理、主題切換與清單篩選功能。

## 線上展示

[開啟線上展示](https://circlelin.github.io/GithubBootcanp-WorkShop/)

## 功能

- 新增待辦事項。
- 將待辦事項標記為已完成或恢復為未完成。
- 刪除待辦事項。
- 顯示整體清單的未完成項目數量。
- 使用 `localStorage` 保存待辦事項，重新整理後仍可保留。
- 在淺色模式與深色模式之間切換。
- 記住使用者選擇的主題；未手動設定時，跟隨作業系統的深淺色偏好。
- 依「全部」、「未完成」或「已完成」篩選待辦事項。
- 記住使用者選擇的篩選條件，重新整理後維持原本的篩選狀態。
- 無效的篩選條件會安全回退為「全部」。
- 篩選結果為空時，顯示提示文字，說明項目可能只是被篩選條件排除。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何框架或外部套件。
- 使用 CSS 變數管理淺色與深色主題配色。
- 使用瀏覽器 `localStorage` 保存待辦資料、主題偏好與篩選條件。
- 可直接在瀏覽器開啟 `index.html` 使用。

## 開發方式

這個專案在 GitHub Copilot 實戰工作坊中，使用 GitHub Copilot Agent Mode 協助探索程式碼、規劃修改範圍、實作功能與驗證結果。

開發過程使用 MCP 取得 Microsoft Learn 文件與 GitHub repository issue 資訊，作為文件查詢與 issue 修復的依據。專案也透過 `.github/prompts` 中的 prompt 定義 issue 修復流程，依序完成 issue 摘要、計畫確認、建立分支、修改、瀏覽器驗證、提交推送與建立 Pull Request，形成可重複的 agentic workflow。

## 我學到什麼

- 如何使用 GitHub Copilot Agent Mode 將需求拆解成可執行的開發步驟。
- 如何使用 CSS 變數與 `prefers-color-scheme` 建立可切換且能跟隨系統設定的深色模式。
- 如何使用 `localStorage` 保存待辦資料與使用者偏好，改善重新整理後的使用體驗。
- 如何透過 GitHub MCP 讀取 issue、建立分支並建立 Pull Request。
- 如何使用 `.github/prompts` 將 issue 修復流程明確化。
