import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Productos from "../features/productos/pages/Productos";
import Usuario from "../features/usuarios/pages/Usuarios";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    { index: true, element: <Productos /> },
                    { path: "productos", element: <Productos /> },
                    { path: "usuarios", element: <Usuario /> },
                ],
            },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}