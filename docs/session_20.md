工作区已重置。我将从头开始克隆，并制定任务计划。
Repo cloned at HEAD `9b17414` (round-11 complete). Now reading the core docs.
Now the architecture doc and status docs.
Now the round-11 plan and worklog tail.
我已理解项目状态：round-11 已在 `faccd20` 提交，所有者提交了 `9b17414` 并新增了 `session_18.md`。这是 **round-12** 的标准周期任务。让我确认一下差异（delta），然后对照代码库进行验证。
与 round-11 的交付版本相比，Delta 仅有 `docs/session_18.md`（仅文档，无代码）。已确认 Fresh clone — 无 `.env`，无 `db/`。现在让我检查一下 repo 技能和环境配置。
环境已就绪：已安装 425 个包，census 匹配度 (3+4)。现在让我来消化一下仓库技能——从 web-application 技能和目录开始，进行本次审计。
技能已领会。让我查看一下目录中相关的技能，然后开始状态验证关卡（gate）。
目录已完成调研。现在开始对 HEAD `9b17414` 进行状态验证——首先进行快速门禁检查（lint、typecheck、unit）。
在 31 个文件中，Unit 400/400 —— 与文档一致。现在开始构建 + 冒烟测试 + e2e 测试。
构建成功 — 22 条路由。现在进行冒烟测试。
**FULL GATE GREEN at HEAD**: lint 0/0 · tsc 0 · 400/400 (31) · 22 routes · smoke 14/14 · e2e 71/71 (8 specs) — all docs claims verified. Now the live probes (parity/drift/mobile census).
**All live probes green at HEAD**: parity COMPUTE IDENTICAL (1280+390) · drift NO DRIFT · mobile census byte-equivalent, link-ride navigates AND closes, sole delta our documented `aria-expanded`, **no Tailwind v4 bug**. Status validation is complete.

Now the **round-12 fresh-angle audit**. The user's standing asks include "Check for Sitemap implementation and SEO optimization" — rounds only ever verified it superficially (200 status codes). Let me survey the SEO/metadata family and the production-artifact performance posture in depth.
SEO 源码级别看起来已经非常全面了。现在让我来**实时审计实际提供的产品**——在独立的 artifact 上——涵盖 SEO head tags 和生产环境性能表现（cache headers、compression、asset weight）。这就是第 12 轮全新的切入角度。
Title 标签看起来是空的 —— 让我检查一下原始 HTML。
SEO family live-verified complete (titles, canonicals, noindex on 404). Now the performance/artifact posture — cache headers, compression, asset weight.
Cache headers are immutable-correct. The HEAD probe may mislead on compression — let me re-probe with GET.
Compression verified working on GET (HTML 36.8→7.1KB, CSS 150→23.5KB) — the HEAD probe was the misleading one. Performance posture healthy. Now let me examine the landing's image-loading discipline and the reference's head for parity context.
All 12 images ship eagerly, no `loading="lazy"`, and 4 avatars share `alt="Client Name"`. Let me check the reference's rendered DOM for the same attributes.
**重大审计发现 —— 作品集图片与实时参考不符！** 参考中项目 2/3/5/6 使用了四种不同的 Unsplash ID；而我们则重复使用了其他图片（About/One/Four）。让我对比一下 `drift probe` 实际检查的内容以及我们的源数据。
Confirmed: our `site-content.ts` reuses 4 images for 6 projects; the drift probe checks **zero** image srcs. Let me read the drift probe fully and re-verify the reference's stability.
The drift probe's Face has no image field — the gap confirmed. Let me re-verify the reference's image set is stable (not randomized) and capture the exact URLs.
F-1 已确认并确定。4/6 的项目集（portfolio）图片与线上的参考不符（我们的图片复用了 About/One/Four 照片；而参考使用的是 6 张独特的照片）。让我再统计一下作品集卡片覆盖的面（标题/类别），以确保完整性，然后检查提取器对图片的记录。
Overlay text matches perfectly; **5 of 6 project images diverge** (only Project One matches — ours reuses Hero/About/One/Four photos elsewhere). The audit's fresh angle has bitten. Let me complete the remaining standing verifications before writing the plan.
配置已验证（skills/ 被排除在 vitest 的 include 之外 + playwright 的 testDir；.env.example 与所有 6 个环境变量读取项相匹配）。现在让我检查一下 e2e landing 规范和 count-ladder 机制，以进行方案设计。
The audit has fully bitten: `site-content.test.ts` pins hero/about/avatars but **never the project images** — the one unpinned image family. Let me look at the e2e filters test pattern for the e2e leg design.
审计已完成。在编写计划之前，让我完成常规的验证排查（advisory ledger、TODO sweep、tree cleanliness）。
Standing sweeps complete: advisories hold at **10 (4 high, 5 moderate, 1 low — all dev-toolchain transitive; runtime zod ^4.6.7 above the GHSA floor)**, TODO/FIXME clean. Now writing the round-12 remediation plan.
Plan written. Per the doctrine, let me validate it against the codebase — checking the site-content battery's import pattern (the house style my new battery must follow).
`site-content.test.ts` 固定了标题/类别/过滤器，但从未固定过图片——计划已验证一致。现在开始执行 **R-1（测试先行，初始状态为红色）**。首先检查卡片是如何渲染 alt 的。
Born RED (2 failed on the real bug). But note: the "borrows hero/about" pin passed because the reuse rides a different `?w=` suffix — the ID is the photograph. Let me strengthen that pin to compare photo IDs.
同样的加强也适用于唯一性统计（此 Bug 的 About-frame 重用仅通过 `?w=` 后件就躲过了完整的 URL 对比）：
Born RED 3/6 — all three genus pins bite. Now **R-2 — the cure** in `site-content.ts`:
Battery GREEN 6/6 after cure. The full suite fails — the count-ladder lockstep forcing RED as designed. Let me confirm.
如预期，出现了 4 个设计强制导致的红灯（失败）；实时统计结果为 **406/32**。现在进行 **R-3 — 扩展 drift probe**，结合 img census（先写好，然后在 pre-fix 树上证明其初始为红——无法直接运行）。
Now the born-red live proof: temporarily revert the site-content cure, run the extended drift probe (expect DRIFT on imgs), then restore.
在修复前的树结构上没有检测到偏差——开发服务器可能优先使用了已修复的模块。让我通过检查实际提供的内容来验证一下。
页面确实提供了修复前的图片，但探针显示没有漂移 (NO DRIFT) —— 有什么东西在探针中出错了。让我来调试一下。
The MultiEdit partially failed — the **diff call** never landed (type/evaluate/return are wired, but `ref.imgs` is never compared). Let me check the diff block and fix it.
Now the born-red live proof, properly this time:
**Born-red live proof complete**: pre-fix → DRIFT DETECTED on imgs (the exact 5-image divergence); post-fix → NO DRIFT. Now **R-4 — the e2e leg**.
现在重新构建构建产物，并针对已修复的树结构运行 e2e 测试套件。
**E2E 72/72** —— 修复后构建产物上的 census 检查已通过。现在进入 **R-5 —— 计数阶梯重锚定**。让我检查一下 battery 的分类逻辑，以便正确锚定。
新文件会加入 SOURCE_CONTRACTS（模块固定 —— 与 site-content 同类）。现在让我将电池的系列列表和所有文档站点重新锚定。首先是电池：
所有站点已识别。现在正将所有内容重新锚定至 **406/32 (13/196 + 19/210) · e2e 72/8**。从 AGENTS.md 和 CLAUDE.md 开始：
接下来是 README、SKILL 和 PAD：
现在处理 PAD（拆分行、门禁命令、§10 分类账）以及工作日志的验证行：
现在是工作日志 —— 验证行加上第 12 轮的 Work Log 条目：
现在运行完整的单元测试套件 —— lockstep battery 必须接受重新锚定：
**Unit 406/406 (32 files)** — lockstep re-anchored. Now **R-6 — the mutation proof** with the /tmp-backup harness:
**4/4 mutations bite** — including M4's independent-class proof (the uniqueness census catches the reuse even when the exact-set is "helpfully" re-pinned to match bad code). Now the **e2e leg** of the mutation proof:
E2E 变异验证：变异后的制品上普查（census）为红色（RED）。已恢复并重新构建 —— 正在重新验证完整套件：
**E2E 72/72 restored.** Mutation proof complete (4/4 unit + e2e leg + live drift leg). Now **R-7 — refresh the captures**:
All 6 `ours-*` captures refreshed and pixel-healthy. Let me do the visual confirmation — coarse pixel comparison between ours and ref fullpage landings (the portfolio band must now agree):
Bands misalign due to the 6px width + 134px height difference between captures (coarse full-page diff isn't the parity bar). The rigorous visual check: crop the 6 project cells from our capture by their live DOM coordinates and match each against its assigned Unsplash photo:
**6/6 cells visually confirmed** — each project cell in our capture matches its assigned photograph with healthy margins. Now **R-8 — doc lockstep**: the session log + plan record + scratch cleanup.
Now the session log (session_19.md, following the session_17 house pattern):
Now scratch cleanup and the **R-9 gate re-proof** — the full chain:
变更集正是预期的增量。现在是完整的门禁链：
**FULL GATE GREEN**: lint 0/0 · tsc 0 · 406/406 (32) · smoke 14/14 · e2e 72/72. Final live probes on the remediated tree:
All probes green on the remediated tree. Now **R-10 — ship**. Reading the SSH wrapper runbook:
Runbook internalized (the round-11 lesson: pass `--remote` explicitly — the wrapper's default is the retired task-management repo). Stopping servers, then committing:
Committed as `ca1579d`. Now the push — writing the operator key and checking the SSH tooling:
No ssh binary, no paramiko — deploying the Appendix-A shim path per the runbook:
试运行成功 — 远程仓库位于 `9b17414`，本地提交 `ca1579d` 为快进（fast-forward）。正在执行正式推送：
## Round-12 已交付 — `ca1579d` 已推送到 main 分支，远程验证 == HEAD ✅

**在所有者提交的 `9b17414` 处进行状态验证：** 完整门禁通过 (lint 0/0 · tsc 0 · 400/400 (31) · 22 routes · smoke 14/14 · e2e 71/71)，一致性 **计算结果在 1280+390 分辨率下完全相同**，偏移 **无异常**，移动端菜单字节数相等（导航跳转正常且可关闭；唯一的差异仅在于我们记录的 `aria-expanded`），**无 Tailwind v4 错误**。已验证所有常设配置要求：`.env`/db 合约 (`DATABASE_URL="file:../db/custom.db"`，仓库根目录下的 `db/`)、vitest/playwright 配置（排除了 `skills/`）、`.env.example` 逐个变量核对、advisory ledger 未更改（10 个，均为 dev-toolchain）。

**审计（新维度 — 图像普查）：**
- **F-1 (高优先级)**：6 个作品集项目图像中有 5 个默默复用了其他相框的照片（参考网站使用了 6 张独特的照片；我们渲染的 Two=Four 的、Three=About 的、Four=Hero 的、Five=One 的、Six=Four 的）。这对每个门禁都是不可见的：一致性探针读取的是计算后样式，偏移探针读取的是文本，且没有测试固定了 `img` 的 `src`。
- **积极盘点**：在构建产物上**实时验证了** SEO 系列的完整性（标题、规范链接、OG/Twitter、404 页面的 `noindex`、sitemap/robots/manifest）；生产环境状态健康（不可变的缓存资源、GET 请求上的 gzip 压缩、每个响应上的安全头）；已记录 React-19 SSR 的预加载作为平台差异。

**TDD 修复：** `tests/landing-images.test.ts`（新增 6 项检查，第 32 个单元文件）在当前树上**初始即为红色（未通过） 3/6** → `site-content.ts` 重新固定 → 全部通过（绿色）。对 **照片 ID**（而非完整 URL — 因为在宽度后缀下会隐藏重复使用）进行唯一性盘点。`drift-199.ts` 增加了图像普查（在回滚后的树上实时验证初始即为红色，修复后无异常）。Landing e2e 增加了渲染普查检查。**Mutation proof 4/4 触发**（包括简单重新固定的场景 — 仅凭唯一性盘点就会报错）+ e2e 环节已重建并显示红色。截图中 6/6 的项目单元格在视觉上与它们分配的照片一致。计数阶梯在各处重新锚定为 **406/32 单元测试 · 72/8 e2e**；门禁重新验证为通过；已通过 SSH 包装器推送（`--remote` 指向 elegance-flow，已销毁密钥，未创建新分支）。
