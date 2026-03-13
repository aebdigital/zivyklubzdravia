export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-3xl font-semibold">Stránka sa nenašla</h1>
        <p className="mt-3 text-sm text-gray-600">
          Táto route ešte nie je súčasťou importovaného zrkadla webu.
        </p>
      </div>
    </main>
  );
}
