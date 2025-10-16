const S3Status = ({ loading, hasAccount }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-300">
      <div className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        Trạng thái tài khoản
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            loading ? "bg-gray-300" : hasAccount ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
        <div className="text-base">
          {loading ? "Đang kiểm tra…" : hasAccount ? "Đã kết nối S3" : "Chưa có tài khoản S3"}
        </div>
      </div>
      {!hasAccount && !loading && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Bạn cần tạo tài khoản S3 mới hoặc import keyfile đã có để bắt đầu quản lý buckets.
        </p>
      )}
    </div>
  );
};

export default S3Status;
