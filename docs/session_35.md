Workspace exists. Let me pull the latest and set up my task plan.
Working tree is clean at the round-18 commit. Let me pull the latest from origin to see if the owner pushed new session docs.
The pull brought in the owner's `docs/session_32.md` (the round-18 session log). This is now **round-19**. Let me set up my task plan.
Session_32 is the owner's transcript of my round-18 push. This is round-19. Now reading the core docs (Task 2) — starting with the key ones in parallel.
Worklog is current through round-18. Now reading the five core docs to re-internalize.
PAD is large — let me read the key verification sections (§10 with round records) and the SKILL doc.
All core docs re-internalized. Now Task 3/4: validate understanding against the codebase. First check environment state.
Environment intact. Running the status validation at `48db448` — census first, then the full gate.
While the gate runs, let me start the audit phase (Task 5) — reviewing the repo skills.
While the gate runs, let me plan the round-19 fresh angle. First, checking what the existing probes already cover on the interactive behaviors (portfolio filters / carousel).
Let me verify no existing probe has ever clicked the reference's portfolio filters or carousel — the candidate round-19 angle.
Confirmed — the drift probe reads filter chips at-rest but never clicks them. The reference's live interactive behaviors (portfolio filters, carousel rides, scroll flip) have never been census-read: every e2e pins OUR behavior against OUR artifact. That's the round-19 fresh angle: **the INTERACTION-BEHAVIOR census**. Let me study our implementations to plan the probes.
Clear picture now. Let me check the gate progress, then write the round-19 discovery probe.
Gate still running. Let me study the house probe pattern and write the round-19 discovery probe.
Now writing the round-19 discovery probe — the interaction-behavior census.
Dev server is live on :3000. Writing the round-19 discovery probe:
The census surfaces real divergence immediately: the reference's active filter chip carries **no active-state classes at all** (ours: `bg-amber-500 text-black`), and its carousel selector omits `border-l-amber-500` (the known F-15b genus). The header rides identically on both apps (no flip, same paint — no divergence). Let me probe deeper: what mechanism paints the reference's active chip, and does the highlight MOVE on click?
The mechanism is resolved: the reference's chips paint via **inline styles** (base44's React writes `style="background-color: rgb(245,158,11)..."`), ours via classes — computed faces **identical in every state** (at rest + after every click, highlight moves identically). This is the F-15b class-string-vs-face genus on a new family → a record. Let me check the round-14 hover census coverage to see if the chips' hover faces were already read.
Round-14 already read the chips'/selectors' hover faces — identical. The interaction census so far is all-identical. The last unread interactive surface: **the reference's contact-form submit ride** (its live toast). Let me check our toast text's provenance first.
The toast-anatomy battery is CRM-era — its header predates the domain swap; only the toast TEXT was byte-verified on the current reference. Two interactive surfaces remain genuinely unread: **the project-card click** (ours: `cursor-pointer` but NO handler — if the reference opens a modal/lightbox, we're missing a feature) and **the live toast anatomy**. Probing the card clicks first:
Two findings surface: (1) the project-card click is a **no-op on both apps** (positive census — the reference's cards are decorative, ours mirrors); (2) the affordance census exposes the **inline-style genus on a new family** (the project category label `<p>` carries no `text-amber-500` on the reference) and — the big one — **the reference renders TWO fixed toast containers at rest, ours ONE**, and the current reference's live toast anatomy was never read (our toast battery is CRM-era). The decisive probe: ride the reference's contact form live and read the toast.
`getByLabel` fails on the reference — its labels aren't programmatically associated (our label bindings are the documented a11y superset). Also confirmed: the category label computes the same amber `rgb(245,158,11)` on both (inline-style genus → record). Fixing the probe to fill by structural selectors:
**THE ROUND-19 CATCH IS MAJOR**: the reference's submit does NOT show a floating toast — it **replaces the form with an in-place centered success panel** (48px amber `circle-check-big` icon, `h3` "Message sent!" text-2xl, `p` "We'll be in touch…" — `py-16` centered), while OURS shows a CRM-era floating toast card and clears the form in place. This is a real visible + functional divergence on the parity-gated surface. Let me map the reference's success state precisely (persistence, form revert, floating-toast coexistence):
**The reference's success state is fully mapped**: at ~+400ms after click, the form (`flex flex-col gap-5`) is **removed** and **replaced in-place** by a persistent centered panel (`h-full flex flex-col items-center justify-center text-center py-16` + 48px amber `circle-check-big` + `h3` "Message sent!" + `p` "We'll be in touch…") — **no floating toast, no revert** (persists 16s+). Our floating toast + form-clear is a different visible construction. Now let me study our contact form implementation and the pins' blast radius:
Now let me verify our lucide's `CircleCheckBig` glyph matches the reference's path data (the round-16 glyph-census genus):
Our lucide 0.525 `CircleCheckBig` carries the reference's exact path data — no shim needed. Checking our form's parent structure, then the gate:
The gate is still in lint. Let me verify the reference's form wrapper structure precisely (our form is a direct grid child; the reference's sits in a bare div):
**F-19b confirmed**: the reference's right column is a bare `<div>` wrapping the form; ours mounts the form directly as the grid item. Let me check the HEADER_SCROLL constants (our probe showed no class change on scroll — both apps identical), and the gate:
My header "at-top" read was polluted — the filter-click rides auto-scrolled the page first (Playwright scrolls before clicking). Let me do one clean header-flip check, and investigate the gate (eslint has run suspiciously long):
Header flip is identical on both apps — positive census closed. But the gate seems stalled — let me investigate:
The background gate died with its parent shell (only the banner flushed). Re-running detached with nohup so it survives across tool calls:
While the gate runs, let me check the remaining blast radius (a11y spec's toast references, capture script structure) and capture the reference's POST response shape for the drift-leg design:
**Decisive discovery**: the reference's contact form fires **NO domain POST at all** — only base44 telemetry. Its submit is a pure client-side swap (the form data goes nowhere; the "persisted inquiries" superset is even stronger than documented). This also means the drift leg can ride the reference with zero side effects. The catch map is complete — writing the round-19 remediation plan:
计划已制定。在开始 R-1 之前正在检查门禁：
Background processes are being killed between tool calls — I'll run the gate phases in the foreground. Phase 1: lint + typecheck:
Lint passes; typecheck flags my discovery probe's window-cast. Let me check the house convention on discovery probes (round-18's):
House convention confirmed: discovery probes are retired at ship (only the drift leg + battery commit). Fixing the probe's type error so the gate runs:
Baseline unit gate green: 484/484 (38 files) — matches docs. Now build + smoke:
**Baseline gate FULLY GREEN at `48db448`** — lint 0/0 · tsc 0 · 484/484 · 22 routes · smoke 14/14 · e2e 83/83 — all doc claims verified. Now the baseline live probes (parity + mobile census):
Baseline parity + mobile census GREEN. Completing the baseline with the 7-leg drift probe:
**Status validation FULLY GREEN at `48db448`** (gate + parity + 7-leg drift + mobile census). Now **R-1: the born-RED battery**. Studying the round-18 battery's idiom first:
Writing the born-RED battery. First a quick check of the form's `required` family (the round-16 keep):
Both apps identical on the required family. Now writing the born-RED battery — `tests/interaction-faces.test.ts` (the 39th unit file):
7/7 RED — but ⑦ (the keeps) should be GREEN pre-cure. Checking why it failed:
⑦'s region is too narrow (the third `required` sits beyond 2600 chars). Widening:
**Born-RED 6/1 — the exact honest split.** Now **R-2: the cures**. First the site-content rename:
Now the landing-page cures — the import, the state, the success path, and the render:
Now the render — the bare wrapper + the conditional swap:
Now closing the structure at the form's end — and simplifying (drop the redundant fragment):
Structure closed correctly. Now updating the two existing pin sites that reference the retired face:
**The cure lands: interaction-faces 7/7 GREEN** (491 total). The 4 failures are the count-ladder census — its exact job: the docs still claim 484/38. Let me see every stale site it demands:
The battery's green; the census demands the doc re-anchor (R-5, after all legs land). Now **R-4: the e2e panel leg**. First the existing submit test's stale title:
e2e leg in. Now **R-3: the drift `[interact]` leg**. Reading the drift script's tail for the insertion point:
Writing the `[interact]` leg into the drift script:
Now the leg's function + execution block, inserted before the report:
The leg is wired. Verify parse, then the born-RED live proof (backup cures → restore pre-cure → drift → re-apply):
**Born-RED live proof landed** — the leg detects exactly the predicted F-19a/F-19b fields (10 diffs). One semantic fix needed: a bare div's `getAttribute("class")` returns null, which my fallback mislabels "(no form)". Fixing:
Re-running the born-RED with the final harness (house standard):
Born-RED proven with the final harness. Restoring the cures and running the full 8-leg drift:
**R-3 CLOSED: all eight legs NO DRIFT on the cured tree.** Now R-4 — rebuild the artifact (the stale-artifact lesson) and run the landing e2e:
The panel leg fails on a locator — inspecting:
The `\\.` escape was wrong — `py-16` needs no escaping (I escaped a dash that isn't special). Fixing:
R-4 landing spec 19/19. Running the full e2e for the count:
**E2E: 84/84.** Now **R-6: the mutation proof**. M1 — drop the panel render:
M1 didn't bite — my mutation kept the source strings (dead code, not deletion). A real regression removes the block. Restoring and re-applying as a true deletion:
M1 bites (4 RED). Now the e2e side of M1 — rebuild the mutated artifact and run the panel leg:
M1 fully proven (unit 4 RED · e2e 2 RED — both the panel leg and the submit test's text pins bite). M2 — restore the floating success toast:
**R-6 COMPLETE — 5/5 mutation classes bite** (M1: 4 unit + 2 e2e · M2-M5: 1 each). Now **R-5: the count ladder re-anchor**. Getting the census test's authoritative stale-site list:
The census gives the authoritative list. Updating every count site across the docs:
Applying all count re-anchors across the five root docs:
Now SKILL.md's counts + the prose family list:
Now the provenance corrections in the root docs (the "only toasts" record):
Now the worklog round-19 entry + verification line (the census reads the LAST verification line):
Normalizing the leading-space mismatch on the two edited lines:
Worklog normalized. Now **R-7: the captures refresh** — adding the success-panel capture (route-fulfilled, zero db pollution):
All 7 captures PIL-verified. Spot-checking the new panel capture visually (compressed for budget):
The e2e leg's live assertions cover the visual proof. Now **R-8: the plan's Phase-5 record + PAD §10 round-19 clause**:
Now the PAD §10 round-19 clause:
PAD clause in. Retiring the discovery probes (house convention — findings live in the drift leg + battery), then **R-9: the full gate**:
Clean commit set forming (18 files). Running the full gate — phase 1: lint + typecheck + unit:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 491/491 · 22 routes · smoke 14/14 · e2e 84/84. Final live probes:
**All live probes GREEN** (parity IDENTICAL · mobile byte-equivalent · drift 8 legs NO DRIFT). Writing the session log and verifying the census:
The census flags probe residue in the dev db. Investigating:
The residue is from the first live toast ride (before the route-fulfillment design). Reseeding in place:
Census MATCH. **R-10: the ship.** Checking the push infrastructure:
Infrastructure intact. Reading the wrapper's usage, then committing:
Commit `2764f36` created, shim on PATH. Dry-run first:
Auth failed on dry-run. Debugging the shim path:
The shim looks right — let me get the actual paramiko connect error:
Auth works directly (GitHub responded). The failure is in the shim's invocation path — capturing the full traceback:
The shim path works now (earlier failure was transient). Retrying the wrapper dry-run:
The wrapper's own pre-flight fails while the same command works in my shell. Reading the wrapper's invocation:
The wrapper captures the shim's stderr. Reproducing its exact command shape to see the real error:
Reproduced — but the same key worked directly. Testing the copy directly with paramiko:
Both keys auth fine directly — the failure is intermittent (server-side rejection clustering). Likely GitHub SSH rate-limiting after my rapid attempt sequence. Waiting, then retrying the wrapper:
Still failing through the wrapper. Building a debug copy of the shim to see exactly what git passes it:
The `-G` probe explains nothing yet — the real invocation loads the right key but still fails. Testing the shim binary directly with the exact argv:
The shim fails standalone with the same key that works in my script. Isolating the exact difference:
The pattern: first connection after a pause succeeds, immediate second fails — GitHub SSH connection-rate throttling. Verifying with a strict cooldown test:
All connections now fail even after cooldown — either an escalated throttle or the key/IP state changed. Reading the server's actual response messages:
Raw transport auth **succeeds right now** — the key is fine; the failure is intermittent server-side throttling of the SSHClient flow. Testing back-to-back to map the pattern:
The pattern is clear: **random ~50% auth rejection** (GitHub-side flakiness on this egress). The robust fix: add a bounded retry to the local shim's connect (it's an environment tool, not a repo file):
**Dry-run passes** (`48db448..2764f36`). Now the real push:
The push likely landed — the failure was in post-push verification. Checking the remote ref directly:
The bare ls-remote lacks the key (git's default ssh call). Checking the remote properly with the key:
**THE PUSH LANDED** — remote `refs/heads/main == 2764f36 == local HEAD`. The earlier "verification failed" was just the flaky auth on the verify step. Now the key-shredding cleanup (house procedure):
Everything is verified and shipped. Let me do a final wrap-up check of the todo list:
**Round-19 全链闭环，`2764f36` 已在远端 main。**

本轮成果：

**🆕 新角度审计（交互行为普查 — 参考站的活体点击骑行）抓到两个实锤并 TDD 修复：**
- **F-19a（HIGH，可见+功能）**：参考站联系表单提交后**根本不 POST**（网络层实证，只有 base44 遥测），而是**删除表单、原位换成持久居中成功面板**（48px 琥珀 circle-check-big + h3 "Message sent!" + p 副文案）——我方此前是浮动 toast + 清空表单，两套可见构造完全不同；顺带订正 session-199 的“只弹 toast”误读（字节对一直属于面板的 h3/p）
- **F-19b**：参考站右列是裸 `<div>` 包裹（grid > div > form），我方直挂表单——静息不可见但承载面板的 h-full

**✅ 正向普查（首次骑行全部一致）**：四个筛选片、三个轮播选择器、项目卡片（双方均无操作——参考站自己的死交互）、header 滚动翻转；记录：筛选片/分类标签的内联样式属（F-15b 基因，计算面全等）

**🔧 交付证据**：born-RED 6/1 → 12 项修复 7/7 · drift 第 8 腿（10 字段 RED → 八腿全 NO DRIFT）· e2e 84/84 · 变异证明 5/5+2 · 门禁全绿（491/39 · 22 路由 · smoke 14/14）· 截图 6+1 张 · 文档锁步 + 溯源订正

**📤 推送**：SSH wrapper 推送成功（期间诊断出 GitHub 侧 ~50% 随机认证抖动，为本地 shim 加了有界重试后一次通过）→ 远端校验 `2764f36 == HEAD` → 密钥双重粉碎。

我将从上次会话中断的地方继续。上一轮（round-19）在会话日志中以已推送的 commit `2764f36` 结束。让我先验证一下本地工作区和远端的当前实际状态，以确认哪些工作已完成，以及还有哪些剩余工作需要处理。
工作区完好，处于第 19 轮提交 `2764f36` 的状态，工作树干净。注意：`git status` 显示 “领先 origin/main 2 个提交” —— 本地追踪引用已过期，并且树中存在 `docs/session_33.md`（第 19 轮自身的会话日志）。让我验证一下哪个提交包含它，检查远程配置，并检查 SSH 推送基础设施。
状态已确认：HEAD 指向 `2764f36`（第 19 轮的交付物，包含 session_33.md + 所有修复），“领先 2 个提交”的提示来自于在 第 18/19 轮中使用的 URL 拉取（它不会更新 origin/main 追踪引用）。`/home/z/my-project/bin/ssh` 处的 SSH shim 在 第 19 轮中得以保留（带有重试修复），但密钥文件已被销毁。这是 **第 20 轮重新验证**。让我配置好我的待办事项列表，重建 SSH 密钥，并检查实际的远程状态。
Shim 完整。让我检查一下 key path 规范的包装文档，然后重建 key 并验证远程状态。
Key convention: 0600 temp file in `/tmp`, never inside the repo. Let me materialize the key, then refresh the workspace over HTTPS (origin is HTTPS; the key is only needed for the final push).
远程 main 分支位于 `2764f36`，与本地 HEAD 一致 —— 第 19 轮的推送已生效，且目前尚无新的所有者提交。让我运行正式的 `git pull`（任务链第 1 步）来确认并同步追踪引用 (tracking ref)。
工作区已刷新并确认同步 —— 远端和本地均在 `2764f36`。任务 1 已完成。这是 **第 20 轮重新验证**：所有者尚未推送 `session_34` 日志，因此最新状态由我们自己的第 19 轮产物（`session_33.md` + 第 19 轮计划 + `worklog`）承载。现在执行任务 2 —— 读取状态文档。
session_33 (our round-19 log) internalized. Now the worklog + round-19 plan.
已完全理清第 19 轮计划 —— 所有 R-1…R-10 ✓ 均已执行。工作日志很大（超长行）；让我阅读它的第 19 轮结尾（普查测试锁定的验证行）以及五个核心文档的当前声明。
Worklog 第 19 轮的末尾已确认：在 491/39 · e2e 84/84 · 八个阶段全部验证通过。现在让我重新梳理五个核心文档中的最新声明（第 19 轮的数量与记录）。
所有五个根文档都包含第 19 轮重新锚定的声明（491/39 · e2e 84/8 · `interaction-faces` 系列 · `PAD §10` 中的第 19 轮条款 · `SKILL v1.199.0`）。任务 2 的文档已内化。现在执行 **任务 3：针对代码库进行验证** —— 首先是环境状态检查，然后是完整的 gate + live probes。
Environment intact (bun 1.3.14, deps, `DATABASE_URL="file:../db/custom.db"` with `db/` at repo root). Running the gate in foreground phases — Phase 1: lint + typecheck + unit.
第一阶段绿灯 —— lint 检查无误，tsc 无报错，**491/491 (39 个文件)**，符合文档记录的阶梯。第二阶段：构建 + 冒烟测试。
构建了 22 条路由，smoke 测试 14/14 通过。第三阶段：针对独立构建产物的 e2e 测试。
**Full gate GREEN at `2764f36`**: lint 0/0 · tsc 0 · **491/491 (39)** · 22 routes · smoke 14/14 · **e2e 84/84** — every doc claim verified. Now the live probes. Let me check how the parity/drift probes expect the dev server.
All probes expect the dev server on :3000. Starting it detached, then running the three live probes.
8个测试项均无漂移（无漂移）（开头的 `[m`/`[h` 字符是已记录的终端显示伪影）。现在进行移动端普查：
**任务 3 完成 — 在 `2764f36` 的状态验证完全通过 (GREEN)**：门禁 491/491 · e2e 84/84 · parity 在两个视口中计算结果一致 (IDENTICAL) · drift 全部八项无漂移 (NO DRIFT) · 移动端 (mobile) 字节等价 (byte-equivalent)。文档与代码库对齐已确认。

现在进行 **任务 4：审计 + 第 20 轮的新视角**。每一轮都会选取一个从未被探测到的表面。让我来研究一下哪些内容已被覆盖 —— 正在检查 parity probe 的表面列表，以及是否有任何探测对参考环境进行了身份验证失败（auth-failure）测试。
Body `font-family` 已包含在 `parity` 列表中。现在让我确认一下，之前是否没有探测（probe）针对**参考站点错误凭证登录失败的情况**——即检查 `drift` 脚本的 `auth-validation` 部分（leg）以及 `e2e` `auth` 规范。
Confirmed — the reference's wrong-credential FAILURE face was never read: round-17 rode empty submits only (native validation blocked), and our e2e pins OUR banner on OUR artifact. That's a strong round-20 candidate. Let me also check the response-headers situation (CRM-era pins vs the new reference) and re-read the audit skill.
CRM 时代的 headers 块（session-20 针对 NEO CRM 的基准）位于 `next.config.ts` 中，由 `tests/http-headers.test.ts` 锁定，但**从未针对新的 EleganceFlow 引用进行过重新读取**。目前有两个候选对象。根据任务链，让我重新阅读审计技能，然后运行探索。
Audit skill re-internalized (pure seams, recorded supersets, count-the-things, gate = done). Now the round-20 discovery probes — two candidate surfaces. Let me check the reference's login form selectors from the original extraction probe first, then write the discovery probe.
The reference's labels are unassociated — structural selectors needed there (round-17/19 finding). Writing the round-20 discovery probe: **Leg 1 — the response-headers face** (CRM-era pins vs the current reference's edge), **Leg 2 — the auth-failure face** (wrong-credential ride on both apps, the never-read live failure behavior). One browser, isolated contexts, house pattern.
**两个发现：** (1) headers 情况正常 —— CRM 时代的 pins 与当前引用完全匹配（`strict-origin-when-cross-origin` / `nosniff` / `max-age=31536000` / bare `application/xml`）；我们额外携带了仅限框架的 `vary`/`cache-control`（不可见的超集）。(2) **`auth-failure` 部分是一个重大发现**：引用的失败表面（failure face）是一个带有 **"Invalid email or password"** 的 shadcn `role="alert"` 提示 —— 并且它 **保留了密码值**。我们这边的输出被截断了 —— 让我看看我们那部分的情况。
**令人瞩目的结果**：两个应用上的 `auth-failure` 交互表现 **完全相同** —— 相同的 `role="alert"`，相同的 "Invalid email or password" 文本，相同的 `shadcn Alert` 类前缀，表单均保持不变，密码均得到保留。唯一的差异：`status` **400 (ref) vs 401 (ours)** —— 这是一个网络层的记录，符合规范，肉眼不可见。

但警报的类字符串在 160 字符处被截断了，并且还有两个未读取的交互行为：完整的警报结构 + **重置密码提交交互**（一个格式有效但不存在的电子邮件 —— 无副作用，绝不会触发电子邮件）。让我检查一下我们 `forgot-password` 处理程序中的预期结果，然后进行深度探测。
Our reset flow carries CRM-era session-11/21 comments ("the reference's Callout banner", "auto-dismisses ~3s") — claims about the OLD reference never re-ridden on the current one. Our card swaps in-place to the sent-card with "If an account exists…". Deep probe #2: the full alert anatomy + the reset-submit ride (nonexistent email — zero side effects) on both apps.
**第 20 轮的捕获是确实存在的：**

- **登录失败时的结构：字节完全一致** 在两个应用上（完整的类字符串、内部形状、持久化、单次告警重试）—— 一个清晰的正向普查。
- **F-20a (高危，可见)**：重置提交的往返测试 —— 参考站点会跳转到同一个“检查您的邮箱”发送卡片（h2/para/button 字节完全一致，均为 200），**但会携带一个参考站点没有的、持续存在的绿色成功横幅**（`role=alert`, `bg-green-50/70 border-green-200`, 文本为 "Please check your email for the password reset link. It may take a few minutes to arrive."）。我们的渲染**完全没有横幅**。

让我阅读一下我们发送卡片的渲染代码，看看我们具体输出了什么，并获取该参考横幅未被截断的结构。
**发现冲突排除（Cure-collision found）**：我们的发送卡片确实渲染了标注文本（session-79 注释：“纯文本节点”）——但我的探测发现参考站点今天的标注是一个**绿色的 `role="alert"` 横幅**（`bg-green-50/70 border-green-200`），而我们的没有 `role` 元素。让我读取一下布局常量，看看我们具体的结构。
**The classes are ALREADY byte-identical** — our `sentCallout` constant carries the exact same class string. The divergence is narrower: **the role attribute** — the reference's callout is `role="alert"`, ours is role-less (my probe's `[role]` selector found theirs, not ours). One more anatomy read to nail F-20a precisely: the reference banner's inner shape, mount position, and full untruncated class.
**F-20a 已精准定位 —— 唯一的差异在于 `role` 属性**（ref：`role="alert"`，我们的：null；其他所有内容在字节上完全一致：class 字符串、内部 DIV、挂载父级、h2）。我们的 sent callout 对屏幕阅读器来说是静默的，而参考站点则会以强提醒（assertively）方式播报它。

让我检查一下我们的 ErrorCallout/InfoCallout 惯用写法（错误提示已经带有 role="alert" —— 参考 e2e 测试），看看我们可以为修复采用什么模式。
已确定修复方向：我们 card 的现有惯用法已经将 `role="alert"` 用于 **所有** callout（ErrorCallout 和 InfoCallout 都带有它，与平台完全一致）—— sent callout 是唯一未携带该角色的遗留项。此修复：添加 `role="alert"`，即完成与系列保持一致的镜像匹配。

在制定计划之前，让我先检查现有的 pin（以避免重复）以及我们 forgot-password 路由的 ghost-email 数据库行为（即 drift-leg 的数据库清理问题）。
The inbox-page pin doesn't cover the login card — the battery is free to pin the callout family. The ghost-email path is db-clean (no row for unknown emails). Let me check the e2e reset spec's sent-card section for the insertion point, then write the plan.
`e2e` 插入点已明确。让我检查一下 `auth-reset.test.ts` 中关于 `no-enumeration` 的 pin（以避免重复）以及 `login-reset.test.ts` 的测试工具（harness）惯用写法。
No-enumeration 已经固定；测试套件将专注于 F-20a + anatomy 的保留项。让我检查一下 InfoCallout 的自动关闭计时器（CRM 时代的记录 — 13 行的注释）以正确固定 ③，然后编写计划文档。
Timer 目标仅设定为 `info` —— 错误横幅（error banner）会持续显示（今日在线测试结果：两者均为 6秒以上）。我现在已经掌握了完整的映射情况。正在撰写第 20 轮补救计划。
计划已编写。根据任务链，在执行前针对代码库验证该计划——检查 drift 脚本的 leg 注册表（R-3 的插入点）以及 capture 脚本的结构（R-7）。
结构已映射。让我检查一下脚本顶部（浏览器设置、diff 辅助函数、REF/OURS）以及捕获脚本的结构。
已根据代码库验证了方案 —— 所有的插入点和固化站点都已确认。最后进行一次源码检查（登录失败消息文本的来源），然后我将编写 `born-RED` 测试套件。
终端显示再次出现了异常（在部分行中 `"Invalid email or password"` 被显示为 `"n"`）。根据经验教训：使用 Read 命令验证文件字节，不要信任管道（pipe）。
File bytes confirmed (line 42 carries the full text — the S21-P1 comment even documents it came from wrong-password probes on both apps). Now **R-1: the born-RED battery**.
当前状态：3 RED / 2 GREEN — 但 ④（本应保持 GREEN）失败了：我固定了 **落地页** 面板的 h3 class string（round-19 的 Muscle），而不是登录卡片实际的 h2。正在修复 ④，以固定真正的 keeps。
**Born-RED 2/3 —— 最真实的拆分**（①② RED：F-20a + 家族普查；③④⑤ GREEN：保留项）。现在 **R-2：修复**。
① GREEN but ②'s census count is off. Let me debug the counts.
The comment itself contains the literal `role="alert"` string — the census counts 4. Fixing the census to count render shapes only (`<div role="alert"`).
**R-2 已关闭：5/5 GREEN。** 现在进行 **R-3：drift `[authfail]` 检查（第 9 个）** —— 将 face 函数 + 执行块 + 报告行添加到 drift 脚本中。
Now the execution block after the [interact] block + the report lines:
The display artifact tricked my edit — the file bytes carry `[motion]`/`[head]` (the terminal ate the leading chars). Fixing the edit with correct bytes:
该 leg 已接入。在执行 born-RED 验证之前，先对已编辑的脚本进行快速类型检查（脚本包含在 gate 中）：
**Born-RED 已经发现了一个真探针（probe）因截断而遗漏的差异：** 当前参考站点仅在 `/` 和 `/login` 上支持 `nosniff` —— `sitemap/robots/manifest` 则不支持（旧版 CRM 参考站点处处都支持；`session-20` 的 pin 是针对它进行测量的）。我们在所有地方都支持 `nosniff` —— 这是** ours-only 安全超集**（即 `R-20f` 记录，而非 cure）。让我看看完整的 DRIFT 列表，然后修改该 leg，使其仅在参考站点支持的表面上读取 `nosniff`。
Born-RED live proof: **4-field DRIFT** — 3 × the nosniff superset + the F-20a role. Now fixing the leg to read nosniff only on the reference's own surfaces (`/`, `/login`), with the superset documented:
**Born-RED 带有最终框架：1 字段的 DRIFT —— 确切地说是 F-20a 的捕获。** 正在从 /tmp 备份恢复修复方案并进行验证，然后运行完整的九阶段 drift：
**R-3 已关闭：在修复后的树上，所有九个阶段均无漂移 (NO DRIFT)。** 现在进行 **R-4：e2e 阶段** —— 在重置规范上乘坐 ghost-email。
E2E 阶段已接入。正在重新构建构建产物（参考 stale-artifact 的经验教训），然后先运行重置规范：
**R-4 已关闭：e2e 85/85。** 现在进行 **R-5：计数阶梯重新锚定** —— 运行 census battery 以获取权威的陈旧站点列表。
完整的权威列表。让我找到并更新每个站点 —— 首先是 census 测试自身的类别列表（锁定步骤），然后是五个根文档。
已识别所有站点。正在更新 census 测试的类别列表，然后是所有根文档计数：
现在是所有文档的统计站点 —— 正在精确查找并更新每一个：
现在进行 family-list 的添加，以及工作日志中关于 nine-legs 的修复：
剩下三个滞后项：CLAUDE 第 50 行（我之前的 sed 反引号模式拼写错误），PAD 第 212 行（树结构行 `39 *.test.ts`），以及 PAD §10 的 gate 行。正在精确修复：
**R-5 已关闭：普查匹配** (7/7)。现在 **R-6：突变证明** — 三个类，每个均已恢复且字节比对一致 (cmp-identical)。
**R-6 已关闭：3/3 个变异类生效** (M1 ①② · M2 ①② · M3 ②③)，全部已恢复。现在 **R-7：捕获** —— 检查捕获脚本的结构，然后添加发送卡面。
**R-7 已关闭：所有 8 个捕获均已通过 PIL 验证。** 让我直观地抽检一下新的 sent-card 捕获（进行压缩），以确认 green callout 确实渲染出来了：
视觉能力此处不可用 —— 证明依据为 PIL 非空白检查 + 漂移测试段（drift leg）在同一开发服务器（dev server）上的实时 DOM 读取（`sentH2`/`calloutRole`/`calloutClass` 均已在相同的运行流程中读取）+ 工件上的 e2e 断言。对于该运行流程而言，该证据栈已足够。

现在 **R-8：文档同步 (doc lockstep)** —— 检查 `worklog` 条目结构，然后编写所有四个文档。
工作日志结构已明确。让我读取完整的 LIVE FINDS 行，以便正确追加第 20 轮的发现：
已追加工作日志，census 测试通过。现在是 PAD §10 的 round-20 条款：
现在开始会话日志 (session_34.md) 以及该计划的第五阶段：
文档已锁定。现在按照内部约定下线发现探测（discovery probes），检查 AGENTS 的 battery 枚举，并运行完整的单元测试套件以确认 496：
**Unit 496/496 (40 files) — the re-anchored ladder holds.** Now **R-9: the full gate** — rebuild + smoke + e2e, then the final live probes:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 496/496 · smoke 14/14 · e2e 85/85. 现在进行最后的实时探测：
**R-9 已关闭：全部门禁 + 所有实时探针全部通过 (GREEN)**（一致性一致 · 九个阶段无漂移 · 移动端字节等效）。现在进行交付 —— 正在检查完整的变更集：
共 16 个文件：cure + battery + drift leg + e2e leg + capture leg + census lockstep + 完整的 doc set。正在以内部风格提交：
提交已创建 `722d025`（16 个文件，+573/−26）。现在 **R-10：发布** —— 首先进行 SSH wrapper 模拟运行：
试运行通过（shim 的受限重试已解决 GitHub 认证不稳定的问题）。正在执行实际推送：
The known GitHub-side auth flakiness. Retrying with a cooldown:
**推送成功 — 远端已验证 `refs/heads/main @ 722d025 == local HEAD`**（并同步了追踪引用）。现在进行密钥销毁清理工作（标准流程）：
**Round-20 全链闭环，`722d025` 已在远端 main（独立 HTTPS ls-remote 校验 == 本地 HEAD）。**

本轮（第 20 轮重验证，开轮于 round-19 的 `2764f36`，owner 无新推送）：

**🆕 新角度审计（AUTH-FAILURE/RESPONSE 普查 — 参考站的活体失败骑行 + 现参考站的响应头族，均为从未读过面）：**
- **F-20a（a11y/语义）**：我方重置发送卡绿色 callout **缺 role 属性**——成功通告对读屏器完全静默；实测参考站平台所有 callout 均 `role="alert"`（红失败横幅 + 绿发送横幅），且我方自己的 Error/Info 惯用法早已如此——发送 callout 是家族里的掉队者。其余成员（class 串、内层 bare-text div、挂载父、h2/段落/按钮）逐字节全等
- **R-20f（born-RED 副发现）**：**现参考站只在 / 和 /login 发 nosniff**——sitemap/robots/manifest 均无（session-20 的 pin 是对旧 CRM 参考站的测量）；我方五个面全发（安全超集，保留），drift 腿仅在参考站自己有的两面做 diff
- **✅ 首次骑行全部一致**：错误凭据登录失败面（红横幅全 class + 内层 + 文案、表单内挂载、6 秒+ 持续、重试单横幅、密码保留——仅网络状态 400 vs 我方规范 401）；幽灵邮箱重置提交（200 交换、同 h2/段落/按钮、未知路径零 db 写入）；响应头族五面重读

**🔧 TDD 证据**：born-RED 2/3 → 修复 5/5 · drift 第 9 腿（终版 harness born-RED 1 字段精确命中 → 九腿全 NO DRIFT）· e2e 85/85 · 变异 3/3 咬合 · 门禁全绿（**496/40** 单测 · 22 路由 · smoke 14/14 · parity 双视口 IDENTICAL · 移动菜单 byte-equivalent）· 截图 7+1 张 PIL 验证 · 文档锁步（session_34、计划 Phase-5、worklog、PAD §10、五根文档 + SKILL/CLAUDE 家族表）

**📤 推送**：SSH wrapper 一次 dry-run + 重试后真实推送成功（GitHub 侧认证抖动由 shim 有界重试吸收）→ 远端校验 `722d025 == HEAD` → 密钥随机覆写粉碎、备份清理，无残留。
