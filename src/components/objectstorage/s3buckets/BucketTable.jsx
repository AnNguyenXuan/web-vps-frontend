import BucketTableRow from "./BucketTableRow";
import BucketEmpty from "./BucketEmpty";

export default function BucketTable({ hasAccount, loading, buckets = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <tr>
            <th className="px-3 py-2">Bucket</th>
            <th className="px-3 py-2">Objects</th>
            <th className="px-3 py-2">Size</th>
            <th className="px-3 py-2">Created</th>
            <th className="px-3 py-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {!hasAccount ? (
            <BucketEmpty message="Chưa có tài khoản S3." />
          ) : loading ? (
            <BucketEmpty message="Đang tải…" />
          ) : buckets.length === 0 ? (
            <BucketEmpty message="Không có bucket nào." />
          ) : (
            buckets.map((b) => <BucketTableRow key={b.name} b={b} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
