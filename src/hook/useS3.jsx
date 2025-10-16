// src/hooks/useS3.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s3Api from "../api/s3Api";

export default function useS3() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [toast, setToast] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  const [buckets, setBuckets] = useState([]);
  const [loadingBuckets, setLoadingBuckets] = useState(false);

  const [creating, setCreating] = useState(false);
  const [importing, setImporting] = useState(false);
  const [lastCreateResp, setLastCreateResp] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    setHasAccount(false);
    setBuckets([]);
    setLastCreateResp(null);
    setLoadingStatus(false);
    setLoadingBuckets(false);
    setCreating(false);
    setImporting(false);

    if (isAuthenticated) {
      (async () => {
        setLoadingStatus(true);
        try {
          const res = await s3Api.checkStatus();
          setHasAccount(!!res?.exists);
        } catch (e) {
          setToast({ type: "error", message: `Không kiểm tra được trạng thái: ${e?.message || "Lỗi không xác định"}` });
        } finally {
          setLoadingStatus(false);
        }
      })();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !hasAccount) return;
    (async () => {
      setLoadingBuckets(true);
      try {
        const data = await s3Api.listBuckets();
        setBuckets(Array.isArray(data) ? data : []);
      } catch (e) {
        setToast({ type: "error", message: `Không tải được danh sách buckets: ${e?.message || "Lỗi không xác định"}` });
      } finally {
        setLoadingBuckets(false);
      }
    })();
  }, [isAuthenticated, hasAccount]);

  const refreshBuckets = async () => {
    if (!isAuthenticated) return;
    setLoadingBuckets(true);
    try {
      const data = await s3Api.listBuckets();
      setBuckets(Array.isArray(data) ? data : []);
    } catch (e) {
      setToast({ type: "error", message: `Không tải được danh sách buckets: ${e?.message || "Lỗi không xác định"}` });
    } finally {
      setLoadingBuckets(false);
    }
  };

  const onCreateAccount = async () => {
    if (!isAuthenticated) return;
    setCreating(true);
    try {
      const resp = await s3Api.createAccount();
      setLastCreateResp(resp);
      s3Api.saveKeyfileToDisk(resp);
      setToast({ type: "success", message: "Tạo tài khoản S3 thành công. Keyfile đã được tải xuống." });
      setHasAccount(true);
    } catch (e) {
      setToast({ type: "error", message: `Tạo tài khoản thất bại: ${e?.message || "Lỗi không xác định"}` });
    } finally {
      setCreating(false);
    }
  };

  const onImportFile = async (file) => {
    if (!isAuthenticated) return;
    setImporting(true);
    try {
      const resp = await s3Api.importKeys(file);
      setToast({ type: "success", message: resp?.message || "Import key thành công." });
      setHasAccount(true);
    } catch (e) {
      setToast({ type: "error", message: `Import key thất bại: ${e?.message || "Lỗi không xác định"}` });
    } finally {
      setImporting(false);
    }
  };

  return {
    isAuthenticated,
    toast, setToast,
    loadingStatus, hasAccount,
    buckets, loadingBuckets, refreshBuckets,
    creating, importing, lastCreateResp, onCreateAccount, onImportFile,
  };
}
