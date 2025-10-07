export default function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Trang chủ</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">S3 Buckets</div>
          <div className="mt-2 text-3xl font-bold">0</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">Miền (Domains)</div>
          <div className="mt-2 text-3xl font-bold">0</div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-medium mb-2">Quick Start</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
          <li>Khởi tạo S3 Bucket cho khách hàng.</li>
        </ol>
      </div>
    </section>
  );
}
