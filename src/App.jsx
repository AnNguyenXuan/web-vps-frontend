import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/rootlayout";
import Home from "./pages/home";

// Có thể thêm các trang khác sau này:
// import Vps from "./pages/vps";
// import Storage from "./pages/storage"; ...

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        // { path: "vps", element: <Vps /> },
        // { path: "storage", element: <Storage /> },
      ],
    },
  ],
  // Giúp app chạy đúng nếu sau này deploy dưới sub-path (VD: /panel/)
  { basename: import.meta.env.BASE_URL }
);

export default function App() {
  return <RouterProvider router={router} />;
}
