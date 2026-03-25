import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Productos from "../features/productos/pages/Productos";
import ProductoForm from "../features/productos/components/ProductoForm";
import Usuario from "../features/usuarios/pages/Usuarios";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/usuarios" element={<Usuario />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;