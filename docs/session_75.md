我将系统地处理这项复杂的任务。用户已经提供了详细的说明，并对未决事项做出了决策，因此我将直接开始。
Repo cloned at HEAD `35e349d`. This is a highly-mature parity-clone project at round-39. Now reading the core documentation:
Now reading the key session documents:
session_73.md 是第 39 轮的流程日志（已推送到 `78d3398`）。现在正在读取 session_72.md 和第 39 轮计划文档：
现在正在检查工作日志尾部（最新条目）和技能目录：
I now have a full picture of the project state: round-39 shipped at `78d3398`, HEAD is `35e349d` (session-log update), and my round is round-40. Let me review the repo skills catalog and the web-application skill, then rebuild the environment:
Skill rules absorbed. Checking the user-referenced skills and install progress:
Dependencies installed (425 packages). Now setting up the environment per the contract:
Census MATCH. Now installing Playwright chromium and starting the full gate:
648/648 green. Now building the standalone artifact:
Smoke 14/14. Running the e2e suite (133 checks):
**FULL GATE GREEN at open**: lint 0/0 · tsc 0 · 648/648 (58 files) · 22 routes · smoke 14/14 · e2e 133/133 — round-39 ship state reproduced exactly. Now starting the dev server for live probes:
**Mobile-menu census: byte-equivalent — the menu works exactly as expected, NO Tailwind v4 bug.** Now the parity probe:
**Drift: NO DRIFT — all 24 legs, exit 0.** Now executing the operator's standing login instruction (the reference's authed-world re-census). First, checking the PAD §2 record:
Now writing the login-instruction probe in the scratch area (house discipline — scratch probes live outside the repo):
**Login instruction executed — the authed-world record holds**: demo login → `/`, the seven-key localStorage family, zero cookies, derived-title 404 shells on every candidate authed route. 

Now auditing the round-39 delta (recent code changes) and re-triaging advisories:
Advisory posture UNCHANGED (10, all toolchain-transitive; runtime zod 4.6.7 above the patched floor). Verifying neo-crm stack patterns:
Stack patterns verified — identical core pins. Now selecting the round-40 angle. Let me examine the drift script's current leg coverage and probe the recorded candidates:
The network leg pins payload SHAPES only — the recorded candidate 2 (payload VALUE decode) is genuinely unread. Probing the recorded candidates live to decide round-40:
Payload VALUES decoded — fresh constants: `event_name: "__initialization_event__"`, ISO-8601 timestamp, path-only page_url. Now verifying the session_id ↔ localStorage linkage and probing the authed-world beacon:
Rich decode — the session_id ↔ localStorage linkage confirmed, guest/authed semantics decoded. Now probing the interactive beacon family (beyond load-time events) — does the reference fire events on interaction?:
Desktop result is ambiguous (events not cleared pre-click). Re-verifying precisely:
Conclusive: interaction fires zero beacons — the load-time family is the complete family. Now checking what the round-38 e2e legs already pin on our side, to shape the round-40 ship:
The e2e pins the header face only — the artifact's runtime zero-request family is unpinned. Now examining the drift [network] leg's exact shape to plan the extension:
The round-40 angle is decided: **THE BEACON-PAYLOAD VALUE CENSUS + THE RUNTIME ZERO-REQUEST PIN** (the round-39 recorded candidate 2, extended with the session-id linkage and the interactive-axis sweep). Now examining the pin battery and doc sites to plan the ship precisely:
Validating the remaining details — how the storage leg handles the login ride (the drift leg extension will need the same pattern):
The pattern is clear. Now checking the count-ladder census structure to plan the re-lock:
Full picture confirmed. Writing the round-40 remediation plan:
Now R-2 — the born-RED pin battery. Extending `tests/network-faces.test.ts` with the round-40 describe:
Running the battery to confirm born-RED state (5 new pins; new expected total 653):
**Born RED 5/5 observed** — exactly per plan (the seven round-38 standing-fact pins stay green). Now R-3 — the drift [network] leg extension:
Fixing a literal `\n` artifact in the edit, then continuing the extension:
Now reading the current tail of `networkFace` to add the linkage + interactive sweeps and update the return:
Now adding the linkage + interactive sweeps to `networkFace` and updating the return + expectConst blocks:
Now fixing the listener routing so the interactive-phase requests land in `interactiveFamily` (not `requestFamily`):
Checking the CTA text to make the click robust (not swallowed by strict-mode violations):
Now updating the leg's expectConst blocks with the new per-side constants:
Verifying the `expectConst`/`diff` helper semantics to ensure the extension is correct:
`expectConst` does full JSON comparison — my recorded constants carry all keys. Now typechecking the modified script:
TS control-flow narrowing issue — the closure assignment isn't visible. Fixing with a holder object:
Clean. Now R-4 — the e2e round-40 describe (+2 legs). Checking the spec's fixture setup first:
Now running the battery — 4/5 pins should go green (the AGENTS.md doc pin awaits R-6):
11/12 green — only the AGENTS.md doc pin remains RED (expected). Now verifying the new e2e legs against the artifact:
两个 e2e 测试段均已通过（green）。现在运行扩展的 drift 检测——通过 nohup 进行完整运行时测试（每个 24 轮的运行时预算约为 6.5–7.5 分钟，绝不要使用短超时封装）：
在运行 drift 的同时，应用 R-6 文档修复。首先是 AGENTS.md 的 network-posture 段落扩展：
Two issues: the round-38 pin's exact heading broke, and the round-40 phrases wrap across lines (the battery reads AGENTS.md raw). Fixing both — revert the heading, keep pinned phrases unwrapped:
**12/12 green.** Now running the count-ladder census to find all stale doc sites (its job):
Discrepancy to resolve — running the census's exact counting logic standalone:
Found it — my `apiLike.test(r.url())` calls over-count in the census's `test(`-block rule. Fixing to `.match()` (never weakening the census):
Live census: **unit 653 / e2e 135** — exactly as planned. Getting the full stale-claim list to re-lock:
Now applying all count re-locks across the five root docs + worklog:
**Census GREEN (7/7).** Checking drift progress, then continuing the doc cures:
The drift caught my own bug: the `beaconSemantics` decode runs BEFORE the load (beacon.body still null → `[]`). Moving the decode into the try block after the settle:
The pre-fix run finished — its only failure was the decode-timing bug (the linkage itself verified `"linked"` live). Confirming no other legs drifted, then re-running with the fix:
While drift v2 runs, continuing the doc cures. CLAUDE.md's network-faces family description:
Now the SKILL.md family description:
Now the PAD §2 network record extension and §10 F-40a CLOSED row:
Now the PAD §10 F-40a CLOSED row — locating the findings ledger:
F-40a row added. Checking drift v2 progress and running the mutation proof (R-5):
Drift v2 is running (output buffered until completion). Running the mutation proof with the /tmp backup harness:
M1 didn't bite — the pin is too weak (the storage leg also carries the key name). Per doctrine: fix the pin, not the mutation. Restoring and strengthening pin ②:
The storage leg carries the same string — the pin needs a networkFace-unique anchor. Testing the full machinery removal (the real regression shape):
The script wasn't modified (assertion caught it). Applying the proper M1 shape — remove the decode if-block (its face strings are unique to it):
Still green — the face strings live in both the decode AND the recorded constants. The pins need decode-unique construction anchors. Restoring and strengthening pins ① and ③:
Now re-running the full mutation proof — M1 (decode removal):
**M1 bites** (pin ① RED). Now M2 — the linkage machinery removal:
M2 survived — `"linked"` also rides the recorded constant. Re-anchoring pin ② on the decode-unique `"no-storage-key"` vocabulary:
**M2 bites.** Now M3 — the interactive machinery removal:
**M3 bites.** Now M4 — the AGENTS.md note reverted, and M5 — the e2e describe removed:
**MUTATION PROOF 5/5 BITE.** Verifying all restores are cmp-identical:
Checking drift v2 progress, then writing the worklog round-40 entry:
**DRIFT NO DRIFT — ALL TWENTY-FOUR LEGS** (24 NO DRIFT lines, zero DRIFT DETECTED) — the extended [network] leg's new constants (beaconSemantics/sessionLinkage/interactiveFamily) verified live. Now the worklog round-40 entry:
Now running the full unit suite with all changes:
**653/653 (58 files).** Now R-7 — the captures refresh against the dev server:
**Captures: 16/18 byte-identical** (the 2 changed are the known timing family, PIL-verified non-blank). Now writing the session log:
Now the final full gate — build, smoke, and e2e with the round-40 changes:
**FULL GATE GREEN: 653/653 · smoke 14/14 · e2e 135/135.** Running the closing probes (mobile census + parity):
All closing probes green. Now the ship phase — reading the SSH wrapper skill doc first:
Wrapper understood (needs explicit `--remote` for elegance-flow). Stopping the dev server and checking the changeset:
Changeset clean. Creating the atomic commit:
The commit didn't land (timeout — likely the very long inline message). Using a message file instead:
**Commit `bc7e5bf` on main, tree clean.** Now the SSH push — writing the operator key (0600, outside the repo) and checking for an ssh binary:
Key verified (ed25519). Deploying the Appendix-A paramiko shim outside the repo:
Dry-run clean — fast-forward `35e349d..bc7e5bf`. The real push:
The `&&` 链在失败的 `ls-remote` 处断开了（git 在没有包装器的 `GIT_SSH_COMMAND` 的情况下运行了）。wrapper 自身的验证已通过 (`bc7e5bf == local HEAD`)。现在正在进行密钥清理和独立验证：
**第 40 轮已交付** — 提交 `bc7e5bf` 已推送到 `main` 分支并经远程验证（密钥已销毁，未创建新分支）。

**已交付内容：**

- **开启即重新验证** — 从头重建环境（全新克隆、bun 安装、`.env`（含 `DATABASE_URL="file:../db/custom.db"`，`db/` 位于仓库根目录）、db push/seed/census 匹配）。开启即全量门禁通过：lint 0/0 · tsc 0 · **648/648 (58 个文件)** · 22 个路由 · 冒烟测试 14/14 · e2e 133/133。实时探测通过：**双视口一致性完全相同**，偏差 ×24 无漂移，**移动端菜单字节级一致 — 运行完全符合预期，无 Tailwind v4 bug**。您的长期登录指令已执行（授权状态记录保持：演示登录 → `/`、404 shells、无 cookie、七密钥家族）。建议重新筛选未做更改（10 个均为工具链传递依赖；运行时 zod 4.6.7 高于已修复的最低版本）。已重新验证 neo-crm 核心版本锁定。

- **本轮收获（F-40a）** — 信标负载的值（VALUES）从未解码（第 38 轮仅锁定了形状）。实时解码得出：常量 `__initialization_event__`、ISO-8601-utc-ms 时间戳、仅路径 page_url、null→24-hex user_id、referrer 语义，以及 **session_id ↔ localStorage 关联**（两个存储/网络视图对应同一个会话 ID — 此前从未建立关联）。交互式轴向扫描：零信标 — 加载时家族即为**完整**家族。此外还解决了 F-40c 运行时孪生缺口：源码计数仅读取 `src/`；新的 e2e 分支验证了产物在**传输线上**的零请求姿态。

- **TDD 交付** — 新增 RED 5/5 锁定测试组（`network-faces` +5 → 12），偏差 `[network]` 分支已扩展并实时验证（24 个分支无漂移，语义/关联/交互全部匹配），e2e +2 → 135，变异证明 5/5，计数阶梯重新锁定在 **653/58 · e2e 135/8**，PAD/AGENTS/CLAUDE/README/SKILL/worklog 已重新锁定，截图已刷新（16/18 字节一致），会话日志 `docs/session_74.md` + 计划文档。最终门禁：**653/653 · 冒烟测试 14/14 · e2e 135/135**。

已记录下一轮候选：方向-无障碍（orientation-a11y）锁定（仍待交付）、reduce+forced 运行中窗口统计，或公共设置响应体解码。
