import { Suspense } from "react";

import { ApiStatus } from "@/components/api-status";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Clublibrary</h1>
      <p className="max-w-md text-muted-foreground">
        Student clubs and project teams, their events and posts, in one place.
      </p>
      <Suspense
        fallback={<p className="text-sm text-muted-foreground">Checking API…</p>}
      >
        <ApiStatus />
      </Suspense>
    </main>
  );
}
