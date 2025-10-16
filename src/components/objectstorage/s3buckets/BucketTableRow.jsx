import { formatDate, formatBytes } from "@/utils/format";

export default function BucketTableRow({ b }) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      <td className="px-3 py-2 font-medium">{b.name}</td>
      <td className="px-3 py-2">{b.object_count ?? 0}</td>
      <td className="px-3 py-2">{formatBytes(b.size_bytes ?? 0)}</td>
      <td className="px-3 py-2">{formatDate(b.created_at)}</td>
      <td className="px-3 py-2">{b.owner || "—"}</td>
    </tr>
  );
}
