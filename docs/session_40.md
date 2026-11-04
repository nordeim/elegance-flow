仓库已克隆至 `main` 分支——它已处于深度开发状态（session-199，round 21，共 500 个单元测试 / 86 个端到端测试）。现在正在阅读核心文档。
PAD 已读取。现在正在读取技能文件、会话日志和计划。
session_38.md 是前一个会话的执行日志——round-21 已经交付并推送（HEAD `dcacf09`）。现在进入 round-22。正在读取 round-21 的计划和 worklog。
Round-21 已完全发布；本次会话是 **Round-22 / Session-39** 的重新验证轮换。现在让我检查代码库的技能并设置环境。
技能已内化。现在正根据仓库的引导契约（bootstrap contract）构建环境。
DB 已启动，seed 契约匹配。正在分阶段运行全量门控。
Phase 1 GREEN (lint 0/0 · tsc 0 · 500/500 unit). Phase 2: build + smoke.
Playwright browser binaries are missing (workspace reset). Installing Chromium.
e2e 86/86 通过 — 在 `dcacf09` 处 **FULL GATE GREEN**。正在验证路由计数，随后运行实时探测。
All live probes GREEN: parity IDENTICAL both viewports · drift NO DRIFT (10 legs) · mobile census byte-equivalent. Status validation complete. Now cloning neo-crm for the tech-stack patterns review.
neo-crm 的技术栈模式已确认 —— 属于同系列契约（gate chain、CI=1 e2e、drift doctrine）。现在正在审计最近一轮（round-21）的变化。
Round-21's cure sites are clean. Now the **fresh-angle audit for round-22** — per session_38's suggested next: the intermediate-viewport family (640/768 — the sm:/md: breakpoint boundaries no probe ever read) plus the never-censused footer social hrefs and img loading attributes. Let me examine the breakpoint-relevant source families first.
The breakpoint families are rich — the toast viewport flips at sm (640), login inputs grow at sm, the header flips at md (768) — none ever probed between 390 and 1280. Let me check the `sm:hidden` hint and reference-exact faces.
The auth card carries a whole `sm:`/`md:` family (`p-8 sm:p-10 md:pt-12`, `h-11 sm:h-12` inputs, `sm:h-24` logo, `sm:hidden` spacer, toast `sm:bottom-0`/`md:max-w-[420px]`) — none ever probed against the live reference between 390 and 1280. That's the round-22 fresh angle. Quick verification of the remaining user items first.
所有基础设施均已验证（vitest/playwright 配置、sitemap、SEO 家族、.env.example 匹配）。现在是 round-22 探测部分——首先研究 drift-199.ts 中的典型模式。
正在构建 round-22 探测。首先检查 landing 和 grids 中确切的 breakpoint families。
现在正在编写 round-22 探测器 —— 两个应用上 640/768 边界处的计算断点面，外加从未经过人口普查的 footer-social/img-attribute 人口普查。
All six boundary faces are **IDENTICAL** — the sm/md boundaries compute identically on both apps (html font-size 16px, so v4's rem-based breakpoints match v3's px-based). Extending the discovery to the remaining unprobed boundary faces: the about-grid flip, the h2/leading-⑥ family at the boundary, the open mobile panel at 640, and the toast viewport at 640/768.
全面清理完毕——发现所有边界特征，包括在 640 处以字节完全相同的外层类（byte-identical wrap class）呈现的移动面板，以及正确解码提取的类字符串的 toast 视口（自 sm 起 bottom-right，自 md 起 max-w 420）。正在检查边界捕获的捕获脚本。
已经内化了内部模式。现在正在检查第 2 轮（round-2）的 e2e 插入点（landing spec）并编写第 22 轮（round-22）计划。
正在撰写 round-22 修复计划。
Now validating the plan's insertion points against the codebase before executing.
已全部验证：`html` 规则仅包含 scroll-behavior（无 font-size —— UA 默认 16px 是 breakpoint 的载体），不存在现有的 viewport 边界 pins。该计划与代码库一致。正在执行 R-1 —— 生成 pin battery。
4/4 GREEN (pin battery on correct behavior — coverage gap closed). Now the mutation proof: every check must bite.
M4 没有生效 —— html 规则的形态肯定与我的正则表达式假设不同。正在检查实际的代码块。
M4 的变异落在了注释内部（我的 sed 格式化与 4 空格缩进不匹配），而不是实际的规则中 —— 注释剥离器已将其移除。正在恢复并正确重新执行 M4。
**Mutation proof 4/4 classes bite** (M1 h1 ladder ① · M2 sm:h-12 ② · M3 sm:top-auto ③ · M4 root font-size ④). Verifying byte-identical restoration, then R-2 — the e2e boundary legs.
现在进行 R-3 —— 将 [viewport] census leg（第 11 个）添加到 drift script。
Now adding the execution block and the report line.
Drift runs clean (all 11 legs NO DRIFT), but tsc flags the missing `out` argument in my diff() calls. Fixing.
NO DRIFT on all eleven legs. Now R-4 — the count ladder re-anchor.
Census 计数统计中第 5 次匹配的是一个 `.test(` 正则表达式方法调用（`/font-size/i.test(b)`）——这是一种计数遗留产物。正在重写以符合统计规则。
统计数量现已正确（504 = 500+4）。正在从普查数据中获取完整的 stale-site 列表。
现在正在五个根文档中重新锚定 count ladder (504/42 · 88/8 · 29 source contracts/308)。
Now updating all count sites across the five root docs.
Line 515 didn't match (case: "The gate"). Fixing, plus the SKILL doc counts.
Two census items left: naming `viewport-faces` in CLAUDE.md + SKILL.md enumerations, and the worklog line (comes with the round-22 entry). Adding the prose enumerations now.
Now updating the worklog — the round-22 entry and the verification line.
Census 7/7 GREEN — ladder re-locked at 504/42 · 88/8. Now R-6 — the captures. Extending the capture script with the boundary faces.
所有 11 张捕获的图片均已通过 PIL 验证，确认非空白，包括两张新的边界截图。对新的截图进行视觉验证。
Visual capability unavailable this session (the round-20/21 precedent) — the PIL check + drift leg's live DOM reads + e2e assertions are the evidence stack. Now R-7 — doc lockstep: session_39 log, plan Phase-5, PAD clause, SKILL bump.
现在填写计划的第 5 阶段执行记录。
Now the PAD §10 round-22 clause and the SKILL version bump.
Docs in lockstep. Retiring the scratch discovery probes (house convention) and running the full gate.
完整测试门禁已通过 (GREEN)：504/504 单元测试 · 22 条路由 · 冒烟测试 14/14 · 端到端测试 88/88。正在确认边界测试项已运行，随后进行最终的线上探测。
所有最终探测均已通过（测试通过 · 一致性一致 · 无漂移 ×11 · 移动端等价 · 数据库匹配）。现在开始设置 SSH 推送。
没有 ssh 二进制文件，也没有 paramiko —— 正在按照技能部署 Appendix-A paramiko shim。正在读取 Appendix A。
Shim deployed. Now materializing the key (0600, outside the repo) and verifying it parses.
密钥已验证 (ed25519)。进行最后的预提交检查与提交。
已创建提交 `2fdd110`。现在开始进行 SSH 推送 —— 先进行预演（dry-run）。
试运行通过 — 准备好从 `dcacf09` 快进（fast-forward）到 `2fdd110`。正在执行正式推送。
**PUSH VERIFIED** — 远程 `main @ 2fdd110` == 本地 HEAD（已通过 HTTPS 独立确认），密钥已销毁，无新分支。正在进行最后的清理和验证工作。
第 22 轮已交付。以下是总结：

## 第 22 轮重新验证 — 已交付（commit `2fdd110` → `main`）

**在 `dcacf09` 打开状态验证**：环境已根据约定重建（`.env` → `DATABASE_URL="file:../db/custom.db"`，`db/` 位于仓库根目录，census 匹配 3+4）。完整门禁通过（full gate GREEN） — lint 0/0 · tsc 0 · 500/500 单元测试 · 22 个路由 · 冒烟测试 14/14 · e2e 86/86 · 一致性（parity）在两个视口中计算结果完全一致 · 漂移检测（drift）无漂移（×10） · 移动端 census 字节级一致。Vitest/Playwright 配置、sitemap/SEO 系列以及 `.env.example` 均已验证与代码库匹配。

**全新的角度（你反复强调的重点）**：中间视口（intermediate-viewport）census — sm (640) 和 md (768) 断点边界，这些是以前从未探测过的宽度（所有探测均在 1280/390 进行）：
- **移动端菜单的停用边界**（768）在两个应用程序上的表现完全一致 — 汉堡菜单隐藏，桌面端导航 + CTA 出现，在 640 处面板以字节一致的包装类（wrap class）打开。**没有 Tailwind v4 媒体查询错误**；`html` 的 `font-size: 16px` 两个应用程序一致（`v4` 基于 `rem` 的断点载体 — 记录并锁定了 `root-font-size` 的纯净度以防止偏移）。
- **R-22a（正面 census）**：所有边界表现均一致 — `h1` 48→72px，网格翻转，整个认证卡片的 `sm:/md:` 系列在两个应用程序上均匹配。

**TDD 修复 (F-22a — 覆盖盲区)**：`tests/viewport-faces.test.ts`（第 42 个文件，4/4 通过，变异证明 4/4 生效）+ 两个 e2e 边界测试（88/88）+ 漂移检测（drift）`[viewport]` 第 11 次检测（无漂移 ×11）。等级重新锁定至 **504/42 单元 · 88/8 e2e**；所有文档已同步（session_39，计划，工作日志（worklog），PAD，SKILL v1.210.0）。

**交付**：已刷新截图 + 新增 `ours-landing-768.png`/`ours-login-640.png`（已通过 PIL 验证）；通过 SSH 包装器（wrapper）进行的推送已通过 HTTPS 独立验证，密钥已销毁，未创建新分支。

**下一步**：第 23 轮可以考虑对参考应用的注册视图提交流程（signup-view submit rides）进行 census（需要一个副作用决策），或者提供用于 R-21a 的真实 OAuth 凭据。
