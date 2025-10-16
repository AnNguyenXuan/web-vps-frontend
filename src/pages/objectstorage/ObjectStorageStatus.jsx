import { Link } from "react-router-dom";
import useS3 from "@/hook/useS3";
import S3Status from "@/components/objectstorage/s3status";
import S3Bucket from "@/components/objectstorage/s3buckets/S3Bucket";

export default function ObjectStorageStatus() {
  const {
    isAuthenticated, toast, setToast,
    loadingStatus, hasAccount,
    buckets, loadingBuckets, refreshBuckets
  } = useS3();

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <h1 className="mb-2 text-2xl font-semibold">Object Storage (S3) – Trạng thái</h1>
        <p className="mb-6 text-sm">Vui lòng đăng nhập để xem trạng thái và buckets.</p>
        <Link className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm text-white" to="/login">Đăng nhập</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {toast && (
        <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
          toast.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-700"
            : toast.type === "error" ? "border-red-500/30 bg-red-500/10 text-red-700"
            : "border-blue-500/30 bg-blue-500/10 text-blue-700"
        }`}>{toast.message}</div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Object Storage (S3) – Trạng thái</h1>
        {hasAccount && (
          <button
            onClick={refreshBuckets}
            disabled={loadingBuckets}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
          >
            {loadingBuckets ? "Đang làm mới…" : "Làm mới"}
          </button>
        )}
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <S3Status loading={loadingStatus} hasAccount={hasAccount} />
        {/* gợi ý thêm link sang trang đăng ký nếu chưa có tài khoản */}
        {!hasAccount && (
          <Link className="underline text-sm" to="/object-storage/register">
            Chưa có tài khoản S3? → Tạo/Import tại đây
          </Link>
        )}
      </div>

      <S3Bucket hasAccount={hasAccount} loading={loadingBuckets} buckets={buckets} />
    </div>
  );
}
