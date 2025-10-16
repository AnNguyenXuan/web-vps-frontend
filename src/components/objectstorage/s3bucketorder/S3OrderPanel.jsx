import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PRICE = {
  hdd: 500,  
  ssd: 1200,
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const fmt = (n) => n.toLocaleString("vi-VN");

export default function S3BucketOrderPanel() {
  const navigate = useNavigate();
  const [storageClass, setStorageClass] = useState("hdd"); 
  const [quotaGB, setQuotaGB] = useState(50);             
  const [bucketName, setBucketName] = useState("");

  const minGB = 1;
  const maxGB = 10240; // 10TB — tuỳ bạn

  const unitPrice = PRICE[storageClass];
  const amount = useMemo(() => quotaGB * unitPrice, [quotaGB, unitPrice]);

  const onChangeGB = (v) => {
    const gb = clamp(Number(v || 0), minGB, maxGB);
    setQuotaGB(gb);
  };

  const disabled =
    !bucketName ||
    !/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucketName) ||
    quotaGB < minGB ||
    quotaGB > maxGB;

  // TẠM THỜI: chuyển sang trang thanh toán (stub) kèm query đảm bảo đồng bộ số tiền
  const goCheckout = () => {
    const search = new URLSearchParams({
      bucket: bucketName,
      class: storageClass,
      quota_gb: String(quotaGB),
      amount: String(amount), // đồng bộ số tiền ngay tại thời điểm click
      currency: "VND",
    }).toString();
    navigate(`/payments/checkout?${search}`);
  };

  return (
    <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold">Tạo bucket & cấu hình quota</h2>

      {/* Tên bucket */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Tên bucket</label>
        <input
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value.trim())}
          placeholder="vd: my-app-assets"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
        <p className="text-xs text-gray-500">
          Tên chỉ gồm chữ thường, số, dấu chấm, dấu gạch ngang; 3–63 ký tự.
        </p>
      </div>

      {/* Loại lưu trữ */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Loại lưu trữ</label>
        <div className="flex items-center gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="storageClass"
              value="hdd"
              checked={storageClass === "hdd"}
              onChange={() => setStorageClass("hdd")}
            />
            <span>HDD (rẻ, dung lượng lớn)</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="storageClass"
              value="ssd"
              checked={storageClass === "ssd"}
              onChange={() => setStorageClass("ssd")}
            />
            <span>SSD (nhanh, giá cao hơn)</span>
          </label>
        </div>
        <p className="text-xs text-gray-500">
          Đơn giá hiện tại: {fmt(unitPrice)} đ/GB/tháng.
        </p>
      </div>

      {/* Dung lượng (quota) */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Dung lượng (GB)</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={minGB}
            max={maxGB}
            value={quotaGB}
            onChange={(e) => onChangeGB(e.target.value)}
            className="grow"
          />
          <input
            type="number"
            min={minGB}
            max={maxGB}
            value={quotaGB}
            onChange={(e) => onChangeGB(e.target.value)}
            className="w-28 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-right dark:border-gray-700 dark:bg-gray-800"
          />
          <span className="text-sm text-gray-600">GB</span>
        </div>
        <p className="text-xs text-gray-500">
          Tối thiểu {minGB}GB – tối đa {maxGB.toLocaleString()}GB.
        </p>
      </div>

      {/* Tổng tiền */}
      <div className="rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span>Tạm tính / tháng</span>
          <strong className="text-base">{fmt(amount)} đ</strong>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          Công thức: {fmt(unitPrice)} × {quotaGB}GB
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={disabled}
          onClick={goCheckout}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Thanh toán & tạo bucket
        </button>
        <p className="text-xs text-gray-500">
          (Nút này hiện chỉ chuyển đến trang thanh toán “stub” để giữ đồng bộ số tiền.)
        </p>
      </div>
    </div>
  );
}
