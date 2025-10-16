import  BucketHeader from "./BucketHeader";
import  BucketTable  from "./BucketTable";
import  { useBucketStatus }  from "@/hook/useBucketStatus";

export default function S3Bucket({ hasAccount, loading, buckets = [] }) {
  const { totalObjects, totalSizeHuman } = useBucketStatus(buckets);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-300">
      <BucketHeader
        hasAccount={hasAccount}
        loading={loading}
        bucketsCount={buckets.length}
        totalObjects={totalObjects}
        totalSizeHuman={totalSizeHuman}
      />
      <BucketTable hasAccount={hasAccount} loading={loading} buckets={buckets} />
    </div>
  );
}
