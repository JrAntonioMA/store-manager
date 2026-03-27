import { Container, Form, Button, InputGroup, Alert, Row, Col } from "react-bootstrap";
import { ShoppingCart, Search } from "@mui/icons-material";
import TablaBase from "../../../components/TablaBase";
import PaginacionTabla from "../../../components/PaginacionTabla";
import DrawerCarritos from "../components/DrawerCarritos";
import { useGestionUsuarios } from "../hook/useGestionUsuarios";

function Usuarios() {
    const {
        busqueda, setBusqueda,
        pagina, filasPorPagina,
        usuariosConConteos, total,
        isLoading, isError,
        drawerAbierto, usuarioSeleccionado,
        conteosCargando,
        handleAbrirDrawer, handleCerrarDrawer,
        handleChangePagina, handleChangeFilasPorPagina,
    } = useGestionUsuarios();

    const renderFila = (usuario, numero) => {
        const conteo = usuario.conteoCarritos;
        const cargandoConteo = conteosCargando && conteo === null;
        const imagenUsuario = usuario.image;
        const letraFallback = usuario.firstName?.charAt(0).toUpperCase() || "?";

        return (
            <>
                <td>
                    <div className="d-flex align-items-center gap-2">
                        <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            backgroundColor: imagenUsuario ? "transparent" : "#f55449",
                            backgroundImage: imagenUsuario ? `url(${imagenUsuario})` : "none",
                            backgroundSize: "cover", backgroundPosition: "center",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontSize: "0.75rem", fontWeight: 500
                        }}>
                            {!imagenUsuario && letraFallback}
                        </div>
                        <span className="fw-medium">{usuario.firstName} {usuario.lastName}</span>
                    </div>
                </td>
                <td>{usuario.email}</td>
                <td>
                    {cargandoConteo ? (
                        <div style={{ width: 32, height: 32, backgroundColor: "#e0e4e8", borderRadius: "50%" }}></div>
                    ) : (
                        <Button variant="outline-secondary" size="sm" onClick={() => handleAbrirDrawer(usuario)} className="d-flex align-items-center gap-1">
                            <ShoppingCart style={{ fontSize: 16 }} /> {conteo}
                        </Button>
                    )}
                </td>
            </>
        );
    };

    if (isError) return <Alert variant="danger" className="text-center mt-5">Error al cargar usuarios. Intenta de nuevo.</Alert>;

    return (
        <Container fluid>
            <div className="bg-white p-3 rounded-3 border mb-4" style={{ borderRadius: "12px", borderColor: "#e0e4e8" }}>
                <Row>
                    <Col md={12}>
                        <InputGroup>
                            <InputGroup.Text><Search style={{ color: "#8e7970" }} /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Buscar por nombre o correo"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </div>

            <TablaBase
                columnas={["Nombre", "Correo", "Carritos"]}
                datos={usuariosConConteos}
                mostrarNumeracion={true}
                pagina={pagina}
                filasPorPagina={filasPorPagina}
                renderFila={renderFila}
                loading={isLoading}
            />

            <PaginacionTabla
                total={total}
                pagina={pagina}
                filasPorPagina={filasPorPagina}
                onChangePagina={handleChangePagina}
                onChangeFilas={handleChangeFilasPorPagina}
            />

            <DrawerCarritos
                abierto={drawerAbierto}
                alCerrar={handleCerrarDrawer}
                usuario={usuarioSeleccionado}
            />
        </Container>
    );
}

export default Usuarios;