import { useState } from "react";
import { Navbar, Container, Button, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Header({ onMenuClick, usuario }) {
    const location = useLocation();
    const userImage = usuario?.image;
    const fallbackLetter = usuario?.firstName?.charAt(0)?.toUpperCase() || "U";
    const [imagenError, setImagenError] = useState(false);

    const obtenerTituloPagina = () => {
        switch (location.pathname) {
            case "/": return "Productos";
            case "/usuarios": return "Usuarios";
            default: return "Gestor de Tienda";
        }
    };

    const tituloPagina = obtenerTituloPagina();

    return (
        <Navbar
            bg="white"
            className="shadow-sm px-3 sticky-top"
            style={{ borderBottom: "1px solid #e0e4e8", height: "64px" }}
        >
            <Container fluid className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <Button
                        variant="outline-secondary"
                        className="d-md-none p-2"
                        onClick={onMenuClick}
                        style={{
                            color: "#0f1f38",
                            border: "none",
                            fontSize: "1.5rem",
                            lineHeight: 1,
                            padding: "0.5rem",
                        }}
                    >
                        ☰
                    </Button>
                    <Navbar.Brand className="fw-semibold" style={{ color: "#0f1f38", fontSize: "1.25rem" }}>
                        {tituloPagina}
                    </Navbar.Brand>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <span className="text-secondary">Hola, {usuario?.firstName || "Usuario"}</span>

                    {userImage && !imagenError ? (
                        <img
                            src={userImage}
                            alt={usuario?.firstName}
                            width="36"
                            height="36"
                            className="rounded-circle"
                            style={{
                                objectFit: "cover",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                border: "none"
                            }}
                            onError={() => setImagenError(true)}
                        />
                    ) : (
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                backgroundColor: "#f55449",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: 500,
                                fontSize: "0.9rem",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                        >
                            {fallbackLetter}
                        </div>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;