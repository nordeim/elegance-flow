我将开始处理这个全面的 elegance-flow 任务。我先制定一个待办事项计划，并从工作区刷新开始。
工作区已更新至最新的 commit (c62976e)。现在让我来审查核心文档。
现在我已理解了第 10 轮的上下文。HEAD 指向 `c62976e`（所有者添加了 `session_16.md` —— 第 10 轮的对话记录）。这是常设队列的第 **11 轮**。让我阅读工作日志尾部并查看 repo 技能。
技能已内化。现在让我来验证环境，并根据代码库确认对当前状态的理解。
Census MISMATCH — 来自上一个会话的探测残留。正在重新植入以满足 seed 合约：
Census MATCH。现在正在 HEAD `c62976e` 处运行 full gate 以验证文档中的声明：
Unit 380/380 (30 files) — 与文档匹配。现在进行构建和冒烟测试：
Build green with 22 routes. Now the smoke ladder:
Smoke 14/14. Now the e2e suite (61 checks / 7 specs expected):
**HEAD 处的 FULL GATE 已通过 (GREEN)**：lint 0/0 · tsc 0 · 380/380 (30) · 22 条路由 · smoke 14/14 · e2e 61/61 (7 个 specs) —— 均与文档一致。现在开始进行实时探测 (parity、drift、mobile census)：
The dev server died with the shell. Let me start it detached with `setsid` so it survives:
沙箱环境会在每次调用后终止后台进程。我需要在同一个命令中同时运行服务器和探针：
**一致性：在 1280 + 390 处计算完全相同。** 现在进行漂移探测 + 移动端普查：
All live probes green — parity IDENTICAL, NO DRIFT, mobile census byte-equivalent, no Tailwind v4 bug. Status validation complete. Now the **round-11 fresh-angle audit**. Let me survey what's pinned and look for unpinned classes:
审计思路已浮现：inbox 的 empty/loading/error 状态虽然已实现，但**未被任何 e2e spec 锁定**，并且**没有针对 console/page 错误的锁定**。让我从多个角度进行探查，以找出实际发现：
探针脚本之前是在 `/tmp` 下运行的，并且无法解析 `node_modules`。现在从仓库根目录重新运行：
Console 普查：仅有 2 个符合预期的条目（已记录的仅限开发环境的 `AUTH_SECRET` 警告 + 浏览器对预期 404 状态的报告）。**无实际客户端错误——但此类情况尚未纳入管控。** 现在我来实时探测收件箱的 `empty`/`loading`/`error` 状态，以验证它们是否确实有效：
空搜索和恢复功能正常，但加载和错误状态需要更好的检测工具 —— 让我来调试一下：
所有状态都正常运行——但我发现了两个 `[role=alert]` 元素。让我确认一下这是否是一个真正的重复 `bug`：
谜题已解开 —— `alert[1]` 是 Next.js 内置的屏幕阅读器路由播报器（符合预期，并非 bug）。让我再检查几个审计角度 —— PAD 已知问题登记表和 `app-shell`：
PAD 寄存器已更新。现在进行例行咨询重新分类：
审计发现已汇总。在编写计划之前，让我先验证一下 e2e harness 环境（`AUTH_SECRET` 的姿态——控制台统计规范所必需的）：
E2E 在 e2e 环境中以真实的 `AUTH_SECRET` 运行生产环境产物 —— 那里不会出现开发警告（dev-warning）。让我研究一下最新的 e2e 规范（round-10 的键盘）中的固定模式：
日常模式已掌握。现在让我来制定第 11 轮补救计划：
现在开始编写第 11 轮整治计划：
现在正在创建 R-1：inbox-states 源合约单元测试套件：
**Lockstep battery 如预期般变红** —— 这是为了强制同步文档的重新锚定。我的新电池：18 项检查，首次运行全部通过（born-green，即如实的记录）。单元测试：380+18=398 / 31 个文件。让我研究一下 count-ladder battery 的类别列表以正确锚定：
现在让我检查一下 e2e spec 设计的几个方面 —— 404 界面以及登录界面是否重定向已认证的会话：
现在正在创建 R-2：包含 client-error census 的 e2e inbox-states spec：
11 项中有 10 项通过 —— 404 census 需要调试。让我检查一下实际收集到的内容：
404 页面已渲染，但在独立 artifact 上未收集到控制台错误。让我直接针对独立服务器进行探测，以了解其差异：
**发现真实 Bug！** 独立产物（standalone artifact）上的 404 页面抛出了 `Minified React error #418` —— 这是一个**水合（hydration）文本不匹配**（客户端 `usePathname()` 与预渲染的 `/_not-found` HTML 对比），此外还有 404 资源报告。然而，测试运行器（test-runner）的上下文什么也没收集到。让我来对该测试进行埋点监测（instrument），以了解这种差异：
这次测试**在真正的 bug 上出现了天生的 RED**：`pageErrors` 包含了 React #418 —— 404 页面上的一个 **hydration text mismatch**。client-error 统计数据立即捕获了一个实时缺陷。让我检查一下 404 body：
**根本原因已确认**：`/_not-found` 在构建时被预渲染（`○ /_not-found`），此时 `usePathname()` 返回构建时的占位符 —— 预渲染的 HTML 插入了 `""`，而客户端水合（hydration）时插入了真实的路径名 → 导致 React #418 文本不匹配。开发服务器按请求进行渲染，这就是为什么它只显示在独立构建产物（standalone artifact）上的原因。让我检查一下该修复的内部 `lint` 规范：
首页在 effects 中使用了直接的 `setState`（即 scroll idiom）——这就是内务处理模式。但首先，我必须验证预渲染的 HTML 实际包含的内容（客户端的第一个渲染必须与之匹配）：
预渲染的 HTML 固化了 `_not-found` 作为插值路径。让我检查一下目前是哪个单元测试对 404 body 进行了限定，然后设计修复方案：
404的e2e pin位于 `landing.spec.ts` 中，因此 `source contract` 也属于 `landing-page.test.ts`。正在应用针对该hydration bug的**解决方案**（即两阶段解码 —— `house landing scroll-state idiom`）：
现在移除我的 e2e spec 中的 debug 行，并将 404 hydration 源码契约添加到 landing unit battery 中：
现在，将 404 hydration 源契约追加到 landing battery：
**检测到 Harness 缺陷** —— 简易的 `//` 注释剥离器误解析了 `replace(/^\//, ...)` 内部的正则表达式字面量（与 round-10 的 `[^>]*` 提取器属于同一类）。我将为 404 合约提供一个具备代码感知能力的本地剥离器（精准修复，不对 house 电池造成风险）：
两个电池状态均为绿色。现在重新构建并验证独立构建产物（standalone artifact）上的 #418 修复：
**在独立构件上已修复 #418 —— 11/11 全部通过。** 现在是完整的 e2e 测试套件：
71 个通过 —— 让我验证一下 `count-ladder` 电池是如何统计 `e2e` 检查的（`setup project` 的测试是否包含在内）：
e2e 普查：61 → **71 项检查 / 8 个 specs**（+10 个 spec 检查；安装检查已计入）。单元测试：380 → **400 / 31 个文件**（+18 个 inbox 状态，+2 个 landing 404 contract）。现在进入 lockstep 锚定 —— 首先将 family 添加到 census battery 中：
Census 显示 402 个单元检查，但我计算的是 400 个。让我精确验证一下：
**这正是工作日志中记录的 `.test(` 统计冲突问题** —— 我的 `.test()` 正则表达式调用被计为了测试代码块。正在通过 `.match` 形式进行修复（即已记录的经验教训）：
普查已确认：**unit 400/31 · e2e 71/8**。正在各站点重新锚定——首先处理 AGENTS.md：
Now README.md:
现在处理 PAD —— 让我查找所有的统计站点：
现在处理 PAD §10 ledger —— 更新 gate line 并追加 round-11 close：
Now the SKILL.md §7 (unit + e2e family lists and counts):
现在来更新工作日志验证行。让我来找一下：
现在将第 11 轮条目添加到工作日志的 Work Log 部分（单任务日志）：
工作日志遵循内部规范。现在进行 **R-4: mutation proof** —— 即 `/tmp-backup` 测试工具（在未提交的代码树中进行 git checkout 的教训）：
5/8 触发。有三个需要调查 —— M2（突变过于局部；消息出现 3 次），M4（引脚底限过低 —— 存在 5 个禁用，而不是 4 个），M8（测试框架在 spec 上运行了 vitest）。让我来核实一下计数并修复引脚：
同时，将网络消息 pin 加强至 first-drop-bites：
Green on the healthy tree. Now re-run the three fixed mutations (M2 replace-all, M4 with strengthened pin, M8 with playwright):
M2 和 M4 bite。现在进行 M8 —— 带有 playwright 的 census-register 损坏：
M8 捕获。现在是 e2e 最关键的分支 —— M7：撤销解码、重新构建、census 必须重新捕获 #418：
**M7 e2e 阶段完美契合** —— 普查在回滚版本上重新捕获到了完全一致的 `#418`；恢复后 11/11 全部通过（绿）。**变异测试：8/8 全部契合**（并且验证过程捕获了两个较弱的测试下限——网络消息数量、禁用下限 4→5）。现在 R-5：捕获刷新：
捕获的内容已更新且像素验证通过。接下来是 R-6：正式的第 11 轮会话日志：
Now fill the plan's Phase 5 execution record:
现在执行 R-7：完整的门禁重新验证。首先执行单元测试套件（`count-ladder` 必须为 GREEN）：
**Unit 400/400 (31 files) — ladder holds.** Now the complete gate chain:
`react-hooks/set-state-in-effect` 规则禁止在 effect 中直接使用 `setState` —— 正是 inbox 所遵循的规范。正在应用延迟计时器的内部惯用法：
Lint/tsc/batteries 均已通过。使用延迟计时器（deferred-timer）形式重新构建并重新验证 census：
**E2E 71/71。** 现在在最终构建版本上运行冒烟测试阶梯：
**FULL GATE GREEN**: lint 0/0 · tsc 0 · 400/400 (31) · 22 routes · smoke 14/14 · e2e 71/71 (8 specs). Now the final live probes (parity, drift, mobile census):
所有探针在修复后的代码树上均已通过。现在进入交付阶段 —— 验证 census、change set 和 wrapper runbook：
Change set 与预期的增量完全一致。现在在交付前先审查 SSH 包装器操作手册：
Runbook 已内化。正在检查 ssh 二进制文件/paramiko 并写入操作员密钥：
paramiko shim 已经部署在工作区 `bin/` 中。现在提交变更集，并附带符合内部规范的信息：
Committed as `faccd20`. Now the push — writing the operator key, verifying, and dry-running:
远程仓库已有更新 —— 正在根据操作手册进行 fetch 和 rebase：
Fetch 操作显示没有增量，但推送被拒绝了。正在直接查询实际的远程引用：
Remote 位于 `c62976e`，本地 `faccd20` 是直接子提交 —— 快进（fast-forward）应该可以。让我看看完整的 dry-run 输出：
**找到了** —— 包装器的默认远程是旧的 `task-management` 仓库；我必须显式传入 `--remote` 参数以指向 elegance-flow：
Dry-run clean — `c62976e..faccd20` fast-forward. Executing the real push:
**推送已验证**：远程 `refs/heads/main @ faccd20 == 本地 HEAD`。现在销毁操作员密钥并运行最终状态检查：
推送已通过验证（封装器的已认证后置检查：远程 `main @ faccd20 == 本地 HEAD`；随后密钥已被销毁，因此后续直接进行 `ls-remote` 且无密钥的操作属预期失败）。正在完成待办事项：
## Round-11 已交付 — `faccd20` 已推送至 main 分支，远端已验证 == HEAD ✅

**在所有者提交的 `c62976e` 进行状态验证：** full gate 绿色通过 (lint 0/0 · tsc 0 · 380/380 · 22 routes · smoke 14/14 · e2e 61/61)，parity **COMPUTE IDENTICAL** 在 1280+390 分辨率下，drift **NO DRIFT**，mobile-menu census 在两个应用上字节等效（link-ride 导航并关闭；唯一的差异在于我们添加的 `aria-expanded`），**无 Tailwind v4 bug**。所有常规配置要求已验证 (`.env` db 合约 · vitest/playwright 配置 · sitemap/SEO 已完成实时抓取 · `.env.example` · 截图 · 建议数量保持不变：10，均为 dev-toolchain)。

**审计发现（新视角 — inbox-state + client-error census）：**
- **F-1**：收件箱的五个状态界面（加载中 · 网络错误 · 如实信封错误 · 空搜索 · 恢复）虽然实现了并能正常运行，但**完全没有门禁覆盖率（zero gate coverage）** — 这是该技能 §20 发布前检查清单中规定但从未运行过的常规职责。
- **F-2**：e2e 套件中没有任何 console/page-error 指标 — 导致 hydration 不匹配这类问题对每个门禁都不可见。
- **实时捕获**：设计的 404 页面在独立构件（standalone artifact）的**每个真实 404 响应中都输出了 `Minified React error #418`**（水合文本不匹配 — 预渲染的 `/_not-found` 固化了构建时路径名，而客户端渲染的是真实路径名；对每个现有门禁都不可见，因为开发服务器在每次请求时都会进行渲染）。

**TDD 修复**：`tests/inbox-states.test.ts` (+18，因正常运行而变绿，其自身的 mutation proof 加强了两个 pins) · `tests/e2e/inbox-states.spec.ts` (+10，第 8 个规范，**因真实 bug 而变红**) 驾驭了通过路由拦截实现的五个面，以及 client-error census（干净的界面为零错误；404 的 sanctioned register）· **修复方案**：`not-found-body.tsx` 中的两阶段解码（可见界面保持不变）。**8/8 个 mutation 类已被触发**，包括还原构建重新抛出确切的 #418，且 census 捕获到了该错误。计数阶梯在所有地方重新锚定 **400/31 unit · 71/8 e2e**；门禁重新验证为绿色；捕获数据已刷新；提交了 `session_17.md` + 计划 + 工作日志；通过 SSH 封装器推送（修正了 `--remote` — 其默认设置是旧的 task-management 仓库），密钥已销毁，未创建任何新分支。
