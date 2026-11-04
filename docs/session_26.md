Workspace exists. Let me refresh it with `git pull` first.
Pulled latest (`d159845..eb00ab8`, new `docs/session_24.md`). Now let me set up a TODO plan and review the documents.
Session 24 is the owner's log of round-14 delivery. Now let me read the other status docs.
Now the worklog tail and core docs. Let me check the worklog's round-14 section.
Worklog confirms round-14 shipped. Now let me refresh the core docs — reading key sections of each.
我已消化了核心文档。现在让我检查技能文件并验证环境状态。
Environment intact (`.env` contract ✓, `db/` at root ✓, node_modules ✓). Now running the status validation gate at HEAD `eb00ab8`.
Unit **436/436 (34 files)** ✓. Now the build + smoke + e2e chain.
Full gate green at HEAD. Let me verify the route count precisely, then run the live probes (parity + drift + mobile census).
Route table = 22 routes ✓. Now the live probes — I'll start the dev server and run parity + drift + mobile census in one invocation (background processes get recycled between calls).
All probes green. Let me check for the mobile-menu link-ride census script.
Status validation is fully GREEN at HEAD. Updating progress, then starting the round-15 audit with a fresh angle.
首先，让我检查一下 e2e 目前在轮播/筛选功能上涵盖了哪些内容，并遍历类字符串（class strings）以查找已重命名的规模 载体（carriers）。
Filters/carousel are e2e-covered. Let me read the carousel test — checking if AUTO-advance (time-driven) is covered.
Carousel test pins CLICK-rotation only — AUTO-advance (time-driven) is unprobed. Let me examine the carousel implementation and parity probe structure, then write a discovery probe.
Our carousel has NO auto-advance (only scroll listener). Now the key question: does the REFERENCE auto-advance? Let me write the round-15 discovery probe covering the unprobed time-dimension + interaction faces.
Significant findings! Let me verify each candidate precisely — the scroll-behavior divergence (REF=smooth, OURS=auto), the active-selector border-l class delta, and the quote glyph difference (curly vs straight quotes).
Drift census reads h1/h2/nav/chips/imgs — but NOT the testimonial quote text. Three candidate findings. Let me write a precise verification probe.
All three findings verified. The computed faces confirm: **F-15a** REF has a raw CSS rule `html { scroll-behavior: smooth }` (ours: none — every anchor ride jumps); **F-15c** quote glyphs diverge at byte 0 (ours curly `“`, REF straight `"`); **F-15b** same computed paint, different class mechanism. Let me run a full-text census to catch any remaining text drift, plus probe REF's amber-border mechanism.
Full-text census: **96 vs 96 nodes, the ONLY text divergence on the whole landing is the quote glyph pair**. Let me pin down REF's amber-border mechanism with one targeted probe.
The REF's sheet is cross-origin (cssRules blocked) — but the computed face (rgb(245,158,11), 4px) is identical on both sides, which is the contract. Let me check for scrollIntoView usage in src/, existing pins on the quote glyphs, and the e2e anchor assertions that could interact with smooth scrolling.
No scroll APIs in src/, no glyph pins (that's how it drifted), e2e uses resilient helpers. Let me look at globals.css to find the cure insertion points.
No existing html rule — the cure follows the session-10/session-16 raw-rule house pattern in the base layer. Let me check what the landing source-contract test pins about the testimonial glyphs.
The class-string is already pinned (landing-page.test.ts:103-105) and the computed face matches — F-15b documents as-is, no cure. Let me check the html element in layout.tsx, then the round-9 dead-code census constraints for new tests.
The plan is clear. Let me check the count-ladder battery structure (it forces doc re-anchoring when the suite grows) before writing the plan doc.
Structure clear. Now writing the round-15 remediation plan document.
Plan written. Now executing R-1 — first, let me study the preflight-faces battery pattern.
Now writing the R-1 battery — `tests/motion-glyph.test.ts`, born RED on the live tree.
**Born RED 4/7** — the four real-divergence pins fail; keep-greens pass. Now R-3: extend drift-199.ts with the MOTION/GLYPH census leg. Let me study its structure.
Drift probe extended. Now the born-RED live proof on the PRE-FIX tree:
Born-RED live proof: 2-field DRIFT detected. But the last-code-point reads `121` ('y') on both — let me check the quote block's DOM structure to make sure the glyph face reads the right thing.
The `.md:col-span-3` div contains more text after the quote — the first code point is the glyph but the last is 'y' from "Company". Let me refine the leg to read the quote paragraph itself.
Born-RED live proof precise: 2-field DRIFT (smooth/auto + 34…34/8220…8221). Now R-2 — applying the cures.
The rule is indented inside `@layer base` — my `^html` regex misses the indentation. Fixing the pins:
**Battery 7/7 GREEN.** Now the live re-verification — the dev server hot-reloads, re-running the drift probe on the cured tree:
All four legs NO DRIFT. Let me verify the trajectory live (the glide should now work on ours):
The glide works on both apps now. R-4 — the e2e leg. Let me view the end of landing.spec.ts:
E2E leg added. Now R-5 — first add the new family to the count-ladder battery, then run the suite to see the ladder force the re-anchor:
Count-ladder RED by design — new counts 443/35. Let me see the exact failures to re-anchor all sites:
Re-anchoring all count sites. Let me find every live-tense claim:
All sites identified. Applying the systematic re-anchor (436→443, 34→35, 75→76, 21/240→22/247):
Now the PAD (§3.2, §7.1 table, §7.3 checklist, §10 gate line):
Now the SKILL.md and worklog verification line:
Now the worklog verification line and the SKILL landing e2e spec note:
Ladder 7/7 ✓. Fixing the scratch probe's type error (a dead line):
**Unit 443/443 (35 files) GREEN.** Now R-6 — the mutation proof with the /tmp-backup harness:
路径陷阱（与 session-24 相同）——已移动至 repo scripts：
3/3 mutation classes bite. The baseline line didn't match my rg pattern (vitest prints "7 passed (7)" when zero fail) — quick confirmation:
Now M4 — the live drift leg (re-apply the pre-fix world, drift must re-detect):
M4 proven. Now M5 — the e2e leg: rebuild the artifact with the glyph mutation, the new pin must go RED:
E2E leg bites (glyph pin RED on the mutated artifact). Restoring and running the full suite:
**E2E 76/76** — mutation proof complete. Now R-7 — refreshing the captures:
All 6 captures refreshed. Now R-8 — writing `docs/session_25.md` (the session_23 house pattern):
Now filling the plan's Phase-5 execution record:
Now the worklog round-15 entry and the PAD §10 close:
Now the PAD §10: append the round-15 CLOSED row and the close sentence:
The first edit accidentally REPLACED the round-13 CLOSED row instead of adding a new one. Restoring it:
PAD §10 now correct (rounds 12/13/15 rows + the close sentence). Running the full unit suite to verify the doc lockstep:
443/443 GREEN. Cleaning up the scratch probes and running the final gate re-proof:
Changeset is exactly the round-15 set. Running the full gate re-proof (R-9):
Full gate green. Final live probes:
All probes green. Now R-10 — the ship. Reading the SSH wrapper runbook:
Wrapper flags confirmed, shim at `/home/z/my-project/bin/ssh`. Stopping the dev server and committing:
Commit `8d809ea` on main, tree clean. Now saving the operator key and pushing via the wrapper:
Dry-run passed (fast-forward `eb00ab8..8d809ea`). Real push:
## Round-15 已交付 — `8d809ea` 已推送到 main 分支，远程已验证 ✅

**在所有者提交 `eb00ab8` 处进行状态验证：** 门禁通过（lint 0/0 · tsc 0 · 436/436 (34) · 22 条路由 · smoke 14/14 · e2e 75/75），一致性完全相同（两个视口），所有分支均无漂移（drift NO DRIFT），移动端菜单字节等效，现行配置要求已重新验证（`.env` 契约 · vitest/playwright 技能排除 · sitemap/SEO 冒烟测试梯级 12 · `.env.example` 逐变量 · 咨询台账保持为 10 个）。

**审计（全新视角 — MOTION/GLYPH 普查）：** 之前没有探针读取过的维度 — 滚动轨迹、引用字形、轮播图的空闲行为、`:active` 面以及 `html` 元素自身的字体系列：
- **F-15a（高，可见）：** 参考站点的应用 CSS 附带了原生规则 `html { scroll-behavior: smooth }` — 每次锚点跳转都会平滑过渡；而我们之前是立即跳转。已通过轨迹探测（0→27→199→…→800）
- **F-15c（高，可见）：** 客户评价引用呈现的是直引号（U+0022），而我们呈现的是弯引号 — 经全文本普查证实（96 vs 96 个节点），这是着陆页上**唯一**的文本差异
- **F-15b（已记录）：** 活动选择器的计算面在两侧完全相同（rgb(245,158,11)+4px）；我们显式的 `border-l-amber-500` 是正确的 v4 解码 — 保留
- **正向普查通过：** 无自动前进（两个应用均无），`:active` 面完全相同，重命名刻度载体为零（第九个 v4 陷阱搜寻结果为空 — 八个已锁定的陷阱仍是完整普查）

**TDD 修复：** `tests/motion-glyph.test.ts` 首次运行结果为 RED 4/7 → 原生平滑规则 + 直引号字面量 → 7/7 通过。漂移探针增加了 motion/glyph 分支（修复前为 RED：2 字段 DRIFT；修复后：无漂移，轨迹已重新探测为平滑滚动）。变异证明 3/3 单元类 + 实时漂移 + e2e 部分全部触发。

**已交付：** 数量阶梯重新锁定为 **443/35 · e2e 76/8**，截图已刷新，文档已对齐（session_25 + 计划执行记录 + 5 个根文档 + PAD §10）。通过 SSH 包装器推送（密钥已销毁，无新分支，工作树干净）。
