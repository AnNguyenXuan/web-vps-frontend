// src/pages/objectstorage/intro-layout.jsx
import { Link } from "react-router-dom";

export default function ObjectStorageLayout() {
  return (
    <div className="p-6">
      {/* Đây là "layout" của riêng trang giới thiệu */}
      <nav className="mb-6 flex gap-4">
        <Link to="/object-storage/status" className="underline">Status</Link>
        <Link to="/object-storage/register" className="underline">Register</Link>
      </nav>

      {/* Nội dung giới thiệu */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Object Storage (S3)</h1>
        <p className="text-sm mb-6">Giới thiệu dịch vụ, hướng dẫn nhanh…</p>
      </div>
    </div>
  );
}
