import { Nav, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Sidebar({ onItemClick }) {
    const navigate = useNavigate();
    const location = useLocation();
    const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

    const manejarLogout = () => {
        cerrarSesion();
        window.location.href = "/login";
    };

    const handleNavClick = (path) => {
        navigate(path);
        if (onItemClick) onItemClick();
    };

    const menuItems = [
        { text: "Productos", path: "/" },
        { text: "Usuarios", path: "/usuarios" },
    ];

    return (
        <div
            className="d-flex flex-column h-100"
            style={{
                background: "linear-gradient(135deg, #0f1f38 0%, #1b4b5a 100%)",
                color: "white",
            }}
        >
            <div className="p-3 text-center border-bottom" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <h6 className="mb-0 fw-bold">Gestor de Tienda</h6>
                <small className="opacity-75">Panel de administración</small>
            </div>

            <Nav className="flex-column flex-grow-1 pt-2">
                {menuItems.map((item) => {
                    const seleccionado = location.pathname === item.path;
                    return (
                        <Nav.Link
                            key={item.text}
                            onClick={() => handleNavClick(item.path)}
                            className={`py-2 px-3 ${seleccionado ? "active" : ""}`}
                            style={{
                                color: "white",
                                backgroundColor: seleccionado ? "#f5544920" : "transparent",
                                borderRight: seleccionado ? "3px solid #f55449" : "none",
                                fontSize: "0.95rem",
                                fontWeight: seleccionado ? 600 : 400,
                            }}
                        >
                            {item.text}
                        </Nav.Link>
                    );
                })}
            </Nav>

            <div className="p-2">
                <Button
                    variant="outline-light"
                    className="w-100"
                    onClick={manejarLogout}
                    style={{
                        borderColor: "rgba(255,255,255,0.3)",
                        color: "white",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.borderColor = "#f55449";
                        e.target.style.backgroundColor = "#f5544910";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.3)";
                        e.target.style.backgroundColor = "transparent";
                    }}
                >
                    Cerrar sesión
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;