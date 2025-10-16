export const selectS3Status = (s) => s.s3.status;
export const selectS3Buckets = (s) => s.s3.buckets;
export const selectHasAccount = (s) => s.s3.status.exists;
export const selectS3Toast = (s) => s.s3.toast;
export const selectS3Creating = (s) => s.s3.creating;
export const selectS3Importing = (s) => s.s3.importing;
export const selectLastCreateResp = (s) => s.s3.lastCreateResp;

export const selectBucketsStale = (s) => {
  const { fetchedAt } = s.s3.buckets;
  const ttl = 60_000;
  return !fetchedAt || Date.now() - fetchedAt > ttl;
};
