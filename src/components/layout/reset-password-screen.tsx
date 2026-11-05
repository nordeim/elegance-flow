"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlert, Lock } from "lucide-react";

import { RESET_LAYOUT } from "@/lib/page-layout";

/**
 * ResetPasswordScreen — session-163 (the digma S46/RA-65/RA-66 port): the
 * /reset-password landing card. Two states keyed on the ?token= query
 * param: only a NON-EMPTY token opens the "Set new password" form; a
 * missing, empty, or differently-named param renders the "Invalid Reset
 * Link" card. The submit's invalid/expired/consumed token answers 400
 * "Invalid or expired reset token" rendered as the inline alert; the
 * mismatch guard ("Passwords do not match") blocks the submit
 * client-side (the signup view's own family). Success renders the
 * confirmation card and returns to /login — NO session opens (the user
 * signs in with the new password).
 *
 * Round-26 (the platform-auth census): the class vocabulary is the
 * reference's OWN platform reset family (RESET_LAYOUT) — NOT the login
 * card's. Live-probed settled 2026-11-05 at 1280 AND 390: the
 * reference's /reset-password renders the base44 platform template's
 * reset family (44px/6px/gray controls on a flat gray-50 page in a
 * white rounded-lg shadow-lg card, the 24px h2 gray-900 headings, the
 * 2px gray-900 strip on the token form alone, the red-100 80×40 icon on
 * the invalid-link card, the Title-Case text quartet) — a different
 * design system from its own login card. The session-163 premise (the
 * reset surface reading "as one design system with the login/signup
 * cards") never held against the live reference; the DOM-case text and
 * every computed face now mirror it (tests/reset-faces.test.ts).
 *
 * The superset keeps (ours alone, the reference ships none):
 * autoComplete="new-password" on both inputs (WCAG 1.3.5), the
 * explicit name/id attrs, the pending guard. The success card is ours
 * alone too — the reference's delivery is EMAIL-ONLY (live-probed: no
 * in-app link even for a real account), so its post-submit face is
 * unreachable there; ours renders the same platform family.
 */
export function ResetPasswordScreen() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  async function onResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset_token: token, new_password: password }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setError(body?.error?.message ?? "Invalid or expired reset token");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  // The invalid-link state: a missing, empty, or differently-named
  // param. The platform family: NO strip on this state, the 80×40
  // red-100 icon, the Title-Case heading and button (live-probed).
  if (!token) {
    return (
      <div className="w-full max-w-md">
        <div className={RESET_LAYOUT.card}>
          <div className={RESET_LAYOUT.inner}>
            <div className="flex flex-col items-center gap-5 text-center">
              <div className={RESET_LAYOUT.iconWrap}>
                <CircleAlert className={RESET_LAYOUT.icon} aria-hidden="true" />
              </div>
              <h2 className={RESET_LAYOUT.heading}>Invalid Reset Link</h2>
              <p className={RESET_LAYOUT.subtitle}>
                This password reset link is invalid or has expired.
              </p>
              <button
                type="button"
                className={RESET_LAYOUT.primary}
                onClick={() => router.push("/login")}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className={RESET_LAYOUT.card}>
        <div className={RESET_LAYOUT.strip} aria-hidden="true" />
        <div className={RESET_LAYOUT.inner}>
          {done ? (
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <Lock className="h-10 w-10 text-emerald-600" aria-hidden="true" />
              </div>
              <h2 className={RESET_LAYOUT.heading}>Password reset</h2>
              <p className={RESET_LAYOUT.subtitle}>
                Your password has been reset successfully. Sign in with your new password.
              </p>
              <button
                type="button"
                className={RESET_LAYOUT.primary}
                onClick={() => router.push("/login")}
              >
                Back to login
              </button>
            </div>
          ) : (
            <form onSubmit={onResetSubmit} className="w-full space-y-5" noValidate>
              <div className="space-y-2 text-center">
                <h2 className={RESET_LAYOUT.heading}>Set new password</h2>
                <p className={RESET_LAYOUT.subtitle}>Enter your new password for EleganceFlow</p>
              </div>

              <div className="space-y-5">
                <div className="[&>*+*]:mt-1.5">
                  <label htmlFor="password" className={RESET_LAYOUT.label}>
                    New Password
                  </label>
                  <div className={RESET_LAYOUT.inputWrap}>
                    <Lock className={RESET_LAYOUT.inputIcon} aria-hidden="true" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={RESET_LAYOUT.input}
                    />
                  </div>
                  <p className={RESET_LAYOUT.hint}>Must be at least 8 characters</p>
                </div>
                <div className="[&>*+*]:mt-1.5">
                  <label htmlFor="confirmPassword" className={RESET_LAYOUT.label}>
                    Confirm New Password
                  </label>
                  <div className={RESET_LAYOUT.inputWrap}>
                    <Lock className={RESET_LAYOUT.inputIcon} aria-hidden="true" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={RESET_LAYOUT.input}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div role="alert" className={RESET_LAYOUT.error}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={pending} className={RESET_LAYOUT.primary}>
                {pending ? "Please wait…" : "Reset password"}
              </button>

              <button
                type="button"
                className={RESET_LAYOUT.back}
                onClick={() => router.push("/login")}
              >
                Back to login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
