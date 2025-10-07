import Navbar from "../components/shared/navbar";
import Control from "../components/shared/control";
import Footer from "../components/shared/footer";
import { Outlet, useInRouterContext } from "react-router-dom";

export default function RootLayout() {
  // Bảo vệ: nếu (vì lý do nào đó) layout chạy ngoài Router, hiện thông báo.
  const inRouter = useInRouterContext();
  if (!inRouter) {
    return <div className="p-4 text-red-600">RootLayout đang chạy ngoài Router.</div>;
  }

  return (
    <div className="w-full h-screen bg-gray-200 p-0 m-0">
      <Navbar />
      <div className="mx-auto w-full flex h-full pt-4">
        {/* Sidebar trái */}
        <Control />

        {/* Cột phải: nội dung + footer (xếp dọc) */}
        <div className="flex-1 flex flex-col px-4">
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
