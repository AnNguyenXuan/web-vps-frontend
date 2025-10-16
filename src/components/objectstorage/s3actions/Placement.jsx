import Spinner from "./Spinner";

export default function Placement({ creating, placement, setPlacement, onConfirmCreate, onCancel }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-100">
          Chọn placement cho tài khoản S3
        </h3>

        <div className="mb-4 space-y-2">
          {["hdd", "ssd"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              <input
                type="radio"
                name="placement"
                value={opt}
                checked={placement === opt}
                onChange={(e) => setPlacement(e.target.value)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-800 dark:text-gray-100">
                {opt.toUpperCase()} ({opt === "hdd" ? "capacity" : "performance"})
              </span>
            </label>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmCreate}
            disabled={creating}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating ? <Spinner label="Creating..." /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
