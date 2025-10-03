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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1">
        <div className="mx-auto max-w-7xl flex">
          {/* Sidebar trái */}
          <Control />
          {/* Khung nội dung trang */}
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
