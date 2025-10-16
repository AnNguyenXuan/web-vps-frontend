import { useMemo } from "react";
import { formatBytes } from "@/utils/format";

export function useBucketStatus(buckets) {
  const totalObjects = useMemo(() => {
    if (!Array.isArray(buckets)) return 0;
    return buckets.reduce((acc, b) => acc + (b.object_count ?? 0), 0);
  }, [buckets]);

  const totalSizeHuman = useMemo(() => {
    if (!Array.isArray(buckets)) return formatBytes(0);
    const bytes = buckets.reduce((acc, b) => acc + (b.size_bytes ?? 0), 0);
    return formatBytes(bytes);
  }, [buckets]);

  return { totalObjects, totalSizeHuman };
}
