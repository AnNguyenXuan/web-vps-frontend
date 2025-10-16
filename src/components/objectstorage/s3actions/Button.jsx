import Spinner from "./Spinner";

export default function Button({ creating, importing, keyfile, onCreateClick, onDownload, onImportClick }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={onCreateClick}
        disabled={creating}
        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {creating ? <Spinner label="Creating..." /> : "Create S3 keyfile"}
      </button>

      <button
        onClick={onDownload}
        disabled={!keyfile}
        className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      >
        Download keyfile (.json)
      </button>

      <button
        onClick={onImportClick}
        disabled={importing}
        className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      >
        {importing ? <Spinner label="Importing..." /> : "Import keyfile (.json)"}
      </button>
    </div>
  );
}
