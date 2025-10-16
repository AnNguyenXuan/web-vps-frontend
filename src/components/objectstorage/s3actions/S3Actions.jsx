import useBucketAction from "@/hook/useBucketAction";
import Button from "./Button";
import Placement from "./Placement";
import ErrorBox from "./ErrorBox";

export default function S3Actions() {
  const {
    fileRef,
    creating,
    importing,
    showChoice,
    setShowChoice,
    placement,
    setPlacement,
    keyfile,
    error,
    onCreateClick,
    onConfirmCreate,
    onDownload,
    onImportClick,
    onImportFileChange,
  } = useBucketAction();

  return (
    <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">S3 Actions</h2>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
            keyfile
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:ring-emerald-800"
              : "bg-gray-50 text-gray-600 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700"
          }`}
        >
          {keyfile ? "ready to download" : "no keyfile"}
        </span>
      </header>

      <Button
        creating={creating}
        importing={importing}
        keyfile={keyfile}
        onCreateClick={onCreateClick}
        onDownload={onDownload}
        onImportClick={onImportClick}
      />

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        onChange={onImportFileChange}
        className="hidden"
      />

      <ErrorBox error={error} />

      {showChoice && (
        <Placement
          creating={creating}
          placement={placement}
          setPlacement={setPlacement}
          onConfirmCreate={onConfirmCreate}
          onCancel={() => setShowChoice(false)}
        />
      )}
    </div>
  );
}
