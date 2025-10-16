import { Link } from "react-router-dom";
import useS3 from "@/hook/useS3";
import S3Actions from "@/components/objectstorage/s3actions/S3Actions";
import S3BucketOrderPanel from "@/components/objectstorage/s3bucketorder/S3OrderPanel";

export default function ObjectStorageRegister() {
  const {
    isAuthenticated, toast, setToast,
    creating, importing, lastCreateResp,
    onCreateAccount, onImportFile, hasAccount,
  } = useS3();

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <h1 className="mb-2 text-2xl font-semibold">Object Storage (S3) – Đăng ký</h1>
        <p className="mb-6 text-sm">Vui lòng đăng nhập để tạo/nhập key S3.</p>
        <Link className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm text-white" to="/login">Đăng nhập</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {toast && (
        <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
          toast.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-700"
            : toast.type === "error" ? "border-red-500/30 bg-red-500/10 text-red-700"
            : "border-blue-500/30 bg-blue-500/10 text-blue-700"
        }`}>{toast.message}</div>
      )}
      {

      }
      <h1 className="mb-4 text-2xl font-semibold">
        {hasAccount ? "Đăng ký Bucket" : "Đăng ký / Import key S3"}
      </h1>
      {hasAccount ? (<S3BucketOrderPanel />) : 
      (<S3Actions
        creating={creating}
        importing={importing}
        onCreateAccount={onCreateAccount}
        onImportFile={onImportFile}
        showSecurityNote={!!lastCreateResp}
      />
      )}
    </div>
  );
}
