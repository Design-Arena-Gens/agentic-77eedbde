"use client";

import { BookCoverDesigner } from "@/components/BookCoverDesigner";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/4 top-10 h-40 w-40 rounded-full bg-aurora-500/30 blur-3xl" />
        <div className="absolute right-1/3 top-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-aurora-700/20 blur-3xl" />
      </div>
      <BookCoverDesigner />
    </main>
  );
}
