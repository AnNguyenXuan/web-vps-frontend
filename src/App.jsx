import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/rootlayout";
import Home from "./pages/home";
import ObjectStorage from "./pages/objectstorage";
import Login from "./pages/login";
import Register from "./pages/register";
import GuestRoute from "./components/route/guestroute";
import './App.css'

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/object-storage", element: <ObjectStorage />},
        {
          path: "/login",
          element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <GuestRoute>
              <Register />
            </GuestRoute>
          ),
        },
      ],
    },
  ],

  { basename: import.meta.env.BASE_URL }
);

export default function App() {
  return <RouterProvider router={router} />;
}
