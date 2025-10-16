import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/rootlayout";
import Home from "./pages/home";
import ObjectStorage from "./pages/objectstorage";
import ObjectStorageLayout from "./layout/ObjectStorageLayout";
import ObjectStorageRegister from "./pages/objectstorage/ObjectStorageRegister";
import ObjectStorageStatus from "./pages/objectstorage/ObjectStorageStatus";
import Test from "./pages/test";
import Login from "./pages/login";
import Register from "./pages/Register";
import GuestRoute from "./components/route/GuestrRoute";
import './App.css'

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { 
          path: "/object-storage", 
          children:[
            { index: true, element: <ObjectStorageLayout /> },
            { path: "status", element: <ObjectStorageStatus /> },
            { path: "register", element: <ObjectStorageRegister /> }
          ]
        },
        { path: "/test", element: <Test />},
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
