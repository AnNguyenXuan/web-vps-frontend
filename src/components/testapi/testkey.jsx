import { useRef, useState } from "react";
import s3Api from "../../api/s3Api";

export default function ImportKeysTest() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const pick = () => fileRef.current?.click();

  const onChange = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    setRes(null); setErr("");
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".json")) { setErr("Chỉ nhận .json"); return; }
    setFile(f);
  };

  const onImport = async () => {
    if (!file) return;
    setLoading(true); setErr(""); setRes(null);
    const r = await s3Api.importKeys(file);
    if (r?.success) setRes(r);
    else setErr(r?.detail || r?.message || "Import thất bại");
    setLoading(false);
  };

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <button onClick={pick} className="rounded border px-3 py-1 text-sm">Chọn file .json</button>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={onChange} className="hidden" />
        <button onClick={onImport} disabled={!file || loading} className="rounded bg-emerald-600 px-3 py-1 text-sm text-white disabled:opacity-60">
          {loading ? "Đang import..." : "Gửi /s3/import-keys"}
        </button>
        {file && <span className="text-xs text-gray-600">File: <b>{file.name}</b></span>}
      </div>

      {err && <div className="rounded border border-rose-300 bg-rose-50 p-2 text-sm text-rose-700">{err}</div>}

      {res && (
        <pre className="max-h-72 overflow-auto rounded bg-gray-900 p-2 text-xs text-gray-100">
            {JSON.stringify(res, null, 2)}
        </pre>
      )}
    </div>
  );
}
