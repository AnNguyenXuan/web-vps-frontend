export default function BucketHeader({
  hasAccount,
  loading,
  bucketsCount,
  totalObjects,
  totalSizeHuman,
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Buckets</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {hasAccount
          ? loading
            ? "Đang tải danh sách buckets…"
            : `${bucketsCount} bucket • ${totalObjects} objects • ${totalSizeHuman}`
          : "Hãy tạo tài khoản hoặc import key để xem buckets."}
      </p>
    </div>
  );
}
