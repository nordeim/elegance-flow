#!/usr/bin/env bash
# The npm-world recovery path: install every live dependency by NAME
# from the registry — for a wiped environment with NO bun and NO
# node_modules (npm never consumes bun.lock; this script is the
# name-based fallback the lineage skill documents).
#
# THE ROUND-9 CATCH this header records: until round-9 this script
# still carried the RETIRED CRM-era package list (the pre-domain-
# transformation set) — installing eleven packages the session-199
# transformation retired while MISSING the live zod/axe-core — so the
# recovery path typecheck-failed on the current domain. The list is
# now pinned to package.json's exact dependency union by
# tests/dead-code-census.test.ts (the manifest ↔ script lockstep:
# a new dependency forces this list forward; a retired one never
# lingers). Keep this line in lockstep with package.json.
npm install @playwright/test @prisma/client @tailwindcss/postcss @types/node @types/react axe-core clsx eslint eslint-config-next lucide-react next prisma react react-dom tailwind-merge tailwindcss typescript vitest zod
