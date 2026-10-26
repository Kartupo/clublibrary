import { getHealth } from "@/lib/api";

// Server Component: calls the backend health check on every request.
// Wrap it in <Suspense> so the rest of the page can render while it waits.
export async function ApiStatus() {
  let online = false;
  try {
    const health = await getHealth();
    online = health.status === "ok";
  } catch {
    online = false;
  }

  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <span
        aria-hidden
        className={`size-2 rounded-full ${online ? "bg-green-600" : "bg-red-600"}`}
      />
      {online ? "API: online" : "API: offline"}
    </p>
  );
}
