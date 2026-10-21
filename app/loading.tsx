export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6 text-slate-900">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" aria-hidden="true" />
        <p className="text-sm font-semibold text-slate-600">Loading ANATECH…</p>
      </div>
    </main>
  );
}
