import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Layout() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const usuario = useAuthStore((state) => state.usuario);
    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        <div className="d-flex min-vh-100 bg-light" style={{ backgroundColor: "#f5f7fc" }}>
            <div
                className="d-none d-md-block"
                style={{
                    width: "260px",
                    position: "sticky",
                    top: 0,
                    alignSelf: "start",
                    height: "100vh",
                    overflowY: "auto",
                }}
            >
                <Sidebar />
            </div>

            <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <Header onMenuClick={handleShow} usuario={usuario} />

                <Offcanvas
                    show={showOffcanvas}
                    onHide={handleClose}
                    placement="start"
                    style={{ width: "260px" }}
                >
                    <Offcanvas.Body className="p-0">
                        <Sidebar onItemClick={handleClose} />
                    </Offcanvas.Body>
                </Offcanvas>

                <main className="p-3 p-md-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;