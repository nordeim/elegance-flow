// Seed: EleganceFlow demo workspace.
// Idempotent: clears the domain table, then inserts the canonical demo
// data (users upserted by email — ids stay stable across re-seeds, the
// session-162 contract).
// Run: bun prisma/seed.ts  (or: bun run db:seed)
//
// Demo login (mirrors the reference app): sepnetflix2023@outlook.com / $Abcd1234

import { PrismaClient } from "@prisma/client";
import { runtimeDatabaseUrl } from "../src/lib/db-path";
// Session-163 (the digma S70-D port): the PURE crypto seam — the seed
// script must never DUPLICATE the scrypt parameter set; it imports the
// ONE implementation from the node:crypto-only seam.
import { hashPassword } from "../src/lib/password";

// Explicit datasource URL: never let the Prisma engine (or bun's .env
// absolutization) pick the database location — the shared resolver pins
// every consumer to <repo>/db/<name> (see src/lib/db-path.ts).
const db = new PrismaClient({
  datasources: { db: { url: runtimeDatabaseUrl() } },
});

async function main() {
  // Idempotency: wipe domain data, keep schema.
  await db.inquiry.deleteMany();

  // ---- users (the studio team) ---------------------------------------------
  // Session-162 (the 162-c decode) carried through the transformation:
  // the users land through UPSERT-BY-EMAIL, never deleteMany — a re-seed
  // preserves the users' IDS (the session cookie's provenance). The
  // update path resets every seeded field, so "reseed in place" stays
  // literal: the same rows, the demo state restored onto them.
  await Promise.all([
    db.user.upsert({
      where: { email: "sepnetflix2023@outlook.com" },
      update: {
        name: "sepnetflix2023",
        passwordHash: hashPassword("$Abcd1234"),
        avatarColor: "#e5e7eb", // light grey + dark "S" — the reference avatar
        role: "user",
        photoUrl: null,
        verificationCodeHash: null,
        verificationAttempts: 0,
        verificationExpiresAt: null,
        // Session-164 carried: the reset funnel clears with the seed (a
        // stale pending token never survives a re-seed; tokenVersion
        // deliberately NOT reset — no demo-session eviction).
        resetToken: null,
        resetTokenExpiresAt: null,
      },
      create: {
        email: "sepnetflix2023@outlook.com",
        name: "sepnetflix2023",
        passwordHash: hashPassword("$Abcd1234"),
        avatarColor: "#e5e7eb",
        role: "user",
      },
    }),
    db.user.upsert({
      where: { email: "sara.chen@eleganceflow.app" },
      update: {
        name: "Sara Chen",
        passwordHash: hashPassword("Demo1234!"),
        avatarColor: "#0891b2",
        photoUrl: null,
        verificationCodeHash: null,
        verificationAttempts: 0,
        verificationExpiresAt: null,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
      create: {
        email: "sara.chen@eleganceflow.app",
        name: "Sara Chen",
        passwordHash: hashPassword("Demo1234!"),
        avatarColor: "#0891b2",
      },
    }),
    db.user.upsert({
      where: { email: "omar.haddad@eleganceflow.app" },
      update: {
        name: "Omar Haddad",
        passwordHash: hashPassword("Demo1234!"),
        avatarColor: "#7c3aed",
        photoUrl: null,
        verificationCodeHash: null,
        verificationAttempts: 0,
        verificationExpiresAt: null,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
      create: {
        email: "omar.haddad@eleganceflow.app",
        name: "Omar Haddad",
        passwordHash: hashPassword("Demo1234!"),
        avatarColor: "#7c3aed",
      },
    }),
    db.user.upsert({
      where: { email: "lena.fischer@eleganceflow.app" },
      update: {
        name: "Lena Fischer",
        passwordHash: hashPassword("Demo1234!"),
        avatarColor: "#059669",
        photoUrl: null,
        verificationCodeHash: null,
        verificationAttempts: 0,
        verificationExpiresAt: null,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
      create: {
        email: "lena.fischer@eleganceflow.app",
        name: "Lena Fischer",
        passwordHash: hashPassword("Demo1234!"),
        avatarColor: "#059669",
      },
    }),
  ]);

  // ---- inquiries (the landing's contact-form demo data) ---------------------
  // The studio inbox ships with three sample rows — one per status — so
  // the /dashboard inbox renders a meaningful list at the fresh-clone
  // state. The service values carry the form select's exact vocabulary.
  const inquirySeed = [
    {
      name: "Maya Rodriguez",
      email: "maya@brightlabs.io",
      service: "Design & Web",
      message:
        "We're rebranding our SaaS product and need a full marketing site — five pages, fast, and easy for us to update. Timeline is Q1.",
      status: "new",
    },
    {
      name: "David Kim",
      email: "david@northline.co",
      service: "Brand Strategy",
      message:
        "Our positioning is muddy after the pivot. Looking for a strategy engagement before we touch any design work.",
      status: "read",
    },
    {
      name: "Priya Nair",
      email: "priya@atlas-events.com",
      service: "Photography",
      message:
        "We need a full day of product photography for our launch campaign — around 40 SKUs, studio and lifestyle sets.",
      status: "archived",
    },
  ];

  for (const q of inquirySeed) {
    await db.inquiry.create({ data: q });
  }

  const counts = {
    users: await db.user.count(),
    inquiries: await db.inquiry.count(),
  };
  console.log("Seeded EleganceFlow demo workspace:", counts);
  console.log("Demo login: sepnetflix2023@outlook.com / $Abcd1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
