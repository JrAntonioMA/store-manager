import { Offcanvas, Spinner, Alert, ListGroup, Badge, Row, Col } from "react-bootstrap";
import { useCarritosUsuario } from "../hook/useCarritosUsuario";

function DrawerCarritos({ abierto, alCerrar, usuario }) {
    const { data, isLoading, isError } = useCarritosUsuario(usuario?.id, abierto);
    const carritos = data?.carts || [];

    return (
        <Offcanvas show={abierto} onHide={alCerrar} placement="end" style={{ width: "90%", maxWidth: "500px" }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Carritos de {usuario?.firstName} {usuario?.lastName}
                    <div className="small text-secondary">{usuario?.email}</div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {isLoading && <div className="text-center py-4"><Spinner animation="border" variant="danger" /></div>}
                {isError && <Alert variant="danger">Error al cargar carritos</Alert>}
                {!isLoading && !isError && carritos.length === 0 && <Alert variant="info">No se encontraron carritos para este usuario.</Alert>}
                {carritos.map((carrito) => {
                    const totalOriginal = carrito.total;
                    const totalConDescuento = carrito.discountedTotal ?? totalOriginal;
                    const ahorro = totalOriginal - totalConDescuento;
                    return (
                        <div key={carrito.id} className="mb-4 border rounded p-3 shadow-sm" style={{ borderRadius: "12px", borderColor: "#e0e4e8" }}>
                            <h6 className="mb-3 fw-semibold" style={{ color: "#0f1f38" }}>Carrito #{carrito.id}</h6>
                            <ListGroup variant="flush">
                                {carrito.products.map((prod) => {
                                    const originalTotal = prod.price * prod.quantity;
                                    const finalTotal = prod.discountedTotal ?? originalTotal;
                                    const tieneDescuento = prod.discountPercentage > 0;
                                    return (
                                        <ListGroup.Item key={prod.id} className="d-flex gap-3 px-0">
                                            <img src={prod.thumbnail} alt={prod.title} width="50" height="50" className="rounded" />
                                            <div className="flex-grow-1">
                                                <div className="fw-semibold">{prod.title}</div>
                                                <div>Cantidad: {prod.quantity}</div>
                                                {tieneDescuento && <Badge bg="warning" text="dark">-{prod.discountPercentage}%</Badge>}
                                            </div>
                                            <div className="text-end">
                                                <div>${finalTotal.toFixed(2)}</div>
                                                {tieneDescuento && <div className="small text-decoration-line-through">${originalTotal.toFixed(2)}</div>}
                                            </div>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                            <hr />
                            <Row>
                                <Col>Subtotal:</Col>
                                <Col className="text-end">
                                    ${totalOriginal.toFixed(2)}
                                </Col>
                            </Row>
                            {ahorro > 0 &&
                                <Row>
                                    <Col>Descuento:</Col>
                                    <Col className="text-end text-success">
                                        -${ahorro.toFixed(2)}
                                    </Col>
                                </Row>
                            }
                            <Row className="mt-2">
                                <Col className="fw-bold">Total:
                                </Col>
                                <Col className="text-end fw-bold">
                                    ${totalConDescuento.toFixed(2)}
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default DrawerCarritos;