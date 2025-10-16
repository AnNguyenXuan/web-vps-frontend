export default function ErrorBox({ error }) {
  if (!error) return null;
  return (
    <div className="mt-3 rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-200">
      {error}
    </div>
  );
}
