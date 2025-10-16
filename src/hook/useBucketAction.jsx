import { useRef, useState, useCallback } from "react";
import Generate from "@/components/shared/Generate";
import s3Api from "@/api/s3Api";
import { downloadJson, validateKeyfileShape } from "@/utils/S3Key";

export default function useBucketAction() {
  const fileRef = useRef(null);
  const [creating, setCreating] = useState(false);
  const [importing, setImporting] = useState(false);
  const [showChoice, setShowChoice] = useState(false);
  const [placement, setPlacement] = useState("hdd");
  const [keyfile, setKeyfile] = useState(null);
  const [error, setError] = useState("");

  const onCreateClick = () => {
    setShowChoice(true);
    setError("");
  };

  const onConfirmCreate = useCallback(async () => {
    try {
      setCreating(true);
      const payload = Generate(placement);
      const data = await s3Api.generateKeyRequest(payload);
      setKeyfile(data);
      setShowChoice(false);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setCreating(false);
    }
  });

  const onDownload = () => {
    if (keyfile) downloadJson(keyfile, "s3-credentials.json");
  };

  const onImportClick = () => fileRef.current?.click();

  const onImportFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      setImporting(true);
      const text = await file.text();
      const data = JSON.parse(text);
      const msg = validateKeyfileShape(data);
      if (msg) throw new Error(msg);
      setKeyfile(data);
    } catch (e2) {
      setError(e2.message || String(e2));
    } finally {
      setImporting(false);
    }
  }, []);

  return {
    fileRef,
    creating,
    importing,
    showChoice,
    setShowChoice,
    placement,
    setPlacement,
    keyfile,
    error,
    onCreateClick,
    onConfirmCreate,
    onDownload,
    onImportClick,
    onImportFileChange,
  };
}
