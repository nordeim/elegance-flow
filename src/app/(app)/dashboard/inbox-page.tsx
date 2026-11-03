"use client";

// Session-199: the INQUIRIES INBOX — the authenticated superset's client
// surface. List/search across the four status lenses, per-row status
// transitions (mark read / archive / unarchive) and the explicit
// two-step delete. Every action answers its toast; every fetch owns
// its loading + error faces (the empty/loading/error states are
// explicit, never blank).

import * as React from "react";
import {
  Archive,
  ArchiveRestore,
  Check,
  Inbox,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import type { Inquiry } from "@/types";

const TABS = [
  { key: "active", label: "Active" },
  { key: "new", label: "New" },
  { key: "archived", label: "Archived" },
  { key: "all", label: "All" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/** A compact relative-time stamp — "just now" → "2d ago" → a short date. */
function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(then).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_CHIP: Record<string, string> = {
  new: "bg-amber-500 text-black",
  read: "bg-zinc-200 text-zinc-700",
  // AA honest: zinc-600 on zinc-100 ≈ 7.1:1 (the reference's zinc-400/
  // zinc-500 chip faces compute 2.2–4.47:1 — ours passes on a surface
  // the reference never drew).
  archived: "bg-zinc-100 text-zinc-600",
};

export function InboxPage() {
  const [tab, setTab] = React.useState<TabKey>("active");
  const [query, setQuery] = React.useState("");
  // null = the first load is in flight; rows arrive only on the {ok}
  // envelope.
  const [rows, setRows] = React.useState<Inquiry[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  // One action in flight per row (the buttons disable to stay honest).
  const [busyId, setBusyId] = React.useState<string | null>(null);
  // The explicit two-step delete (a destructive action never rides a
  // single click).
  const [confirmId, setConfirmId] = React.useState<string | null>(null);

  // The loader: every state set rides AFTER its awaits (the compliant
  // fetch-on-mount form — no synchronous setState inside the effect).
  const load = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/inquiry?status=${tab}`);
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setError(body?.error?.message ?? "The inbox could not be loaded.");
        setRows(null);
        return;
      }
      setRows(Array.isArray(body.data) ? (body.data as Inquiry[]) : []);
      setError(null);
    } catch {
      setError("Network error — check your connection and try again.");
      setRows(null);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  // The deferred fetch: a zero-tick timer keeps every setState OUT of the
  // effect's synchronous pass (the react-hooks/set-state-in-effect
  // contract) — the loader runs on the next tick, all state riding
  // after its awaits.
  React.useEffect(() => {
    const t = setTimeout(() => void load(), 0);
    return () => clearTimeout(t);
  }, [load]);

  async function transition(row: Inquiry, status: "read" | "archived", successMsg: string) {
    if (busyId) return;
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/inquiry/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        toast.error("Action failed", body?.error?.message ?? "Please try again.");
        return;
      }
      toast.success(successMsg);
      await load();
    } catch {
      toast.error("Action failed", "Network error — check your connection and try again.");
    } finally {
      setBusyId(null);
      setConfirmId(null);
    }
  }

  async function remove(row: Inquiry) {
    if (busyId) return;
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/inquiry/${row.id}`, { method: "DELETE" });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        toast.error("Delete failed", body?.error?.message ?? "Please try again.");
        return;
      }
      toast.success("Inquiry deleted");
      await load();
    } catch {
      toast.error("Delete failed", "Network error — check your connection and try again.");
    } finally {
      setBusyId(null);
      setConfirmId(null);
    }
  }

  const visible = React.useMemo(() => {
    if (!rows) return [];
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.email, r.service, r.message].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [rows, query]);

  const newCount = rows?.filter((r) => r.status === "new").length ?? 0;

  return (
    <div className="flex flex-col gap-6">
      {/* ---- header ------------------------------------------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-700">
            Studio inbox
          </p>
          <h1 className="text-3xl font-black tracking-tight text-zinc-950 md:text-4xl">
            Inquiries
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {newCount > 0
              ? `${newCount} new message${newCount === 1 ? "" : "s"} waiting`
              : "No new messages waiting"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void load();
          }}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 border border-zinc-300 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          data-testid="refresh-inquiries"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ---- tab strip + search --------------------------------------------- */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Inquiry status filters">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                tab === t.key
                  ? "bg-zinc-950 text-white"
                  : "bg-zinc-200/70 text-zinc-600 hover:text-zinc-950"
              }`}
              onClick={() => setTab(t.key)}
              data-testid={`tab-${t.key}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, message…"
            aria-label="Search inquiries"
            className="w-full border border-zinc-200 bg-white px-4 py-2.5 pl-10 text-sm text-zinc-950 outline-none transition-colors focus:border-zinc-950"
            data-testid="inquiry-search"
          />
        </div>
      </div>

      {/* ---- the list -------------------------------------------------------- */}
      {error ? (
        <div role="alert" className="border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      ) : loading && rows === null ? (
        <div className="flex items-center justify-center border border-zinc-200 bg-white py-20 text-sm text-zinc-400">
          <RefreshCw size={16} className="mr-2 animate-spin" />
          Loading inquiries…
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-zinc-200 bg-white px-6 py-16 text-center">
          <Inbox size={28} className="mb-4 text-zinc-400" aria-hidden="true" />
          {query ? (
            <p className="text-sm text-zinc-500">
              No inquiries match &ldquo;{query.trim()}&rdquo; in this view.
            </p>
          ) : (
            <p className="text-sm text-zinc-500">
              Nothing here yet. New inquiries from the landing&rsquo;s contact form land in
              this inbox.
            </p>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-4" data-testid="inquiry-list">
          {visible.map((row) => (
            <li
              key={row.id}
              className={`border bg-white p-5 transition-colors md:p-6 ${
                row.status === "new" ? "border-amber-400" : "border-zinc-200"
              }`}
              data-inquiry-id={row.id}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-black text-zinc-950">{row.name}</span>
                    <a
                      href={`mailto:${row.email}`}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-950"
                    >
                      {row.email}
                    </a>
                    <span
                      className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        STATUS_CHIP[row.status] ?? STATUS_CHIP.read
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-amber-700">
                    {row.service}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{row.message}</p>
                  <p className="mt-2 text-xs text-zinc-500" title={row.createdAt}>
                    {timeAgo(row.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {row.status === "new" && (
                    <button
                      type="button"
                      disabled={busyId === row.id}
                      onClick={() => void transition(row, "read", "Marked as read")}
                      className="inline-flex items-center gap-1.5 border border-zinc-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 transition-colors hover:border-zinc-950 hover:text-zinc-950 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      data-testid="mark-read"
                    >
                      <Check size={14} />
                      Mark read
                    </button>
                  )}
                  {row.status === "archived" ? (
                    <button
                      type="button"
                      disabled={busyId === row.id}
                      onClick={() => void transition(row, "read", "Restored to the active list")}
                      className="inline-flex items-center gap-1.5 border border-zinc-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 transition-colors hover:border-zinc-950 hover:text-zinc-950 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      data-testid="unarchive"
                    >
                      <ArchiveRestore size={14} />
                      Unarchive
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={busyId === row.id}
                      onClick={() => void transition(row, "archived", "Inquiry archived")}
                      className="inline-flex items-center gap-1.5 border border-zinc-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 transition-colors hover:border-zinc-950 hover:text-zinc-950 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      data-testid="archive"
                    >
                      <Archive size={14} />
                      Archive
                    </button>
                  )}
                  {confirmId === row.id ? (
                    <span className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        disabled={busyId === row.id}
                        onClick={() => void remove(row)}
                        className="inline-flex items-center gap-1.5 bg-red-600 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        data-testid="confirm-delete"
                      >
                        <Trash2 size={14} />
                        Confirm delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmId(null)}
                        className="px-2 text-xs font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={busyId === row.id}
                      onClick={() => setConfirmId(row.id)}
                      aria-label={`Delete inquiry from ${row.name}`}
                      className="inline-flex items-center border border-zinc-200 p-2 text-zinc-500 transition-colors hover:border-red-600 hover:text-red-600 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      data-testid="delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
