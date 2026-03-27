import { Form, Button, Card, Alert, Spinner, Row, Col } from "react-bootstrap";
import { useLogin } from "../hook/useLogin";

function Login() {
    const {
        usuario,
        contrasena,
        cargando,
        esValido,
        setUsuario,
        setContrasena,
        manejarLogin,
        manejarOlvideContrasena,
        manejarCrearCuenta,
    } = useLogin();

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light position-relative overflow-hidden" style={{ backgroundColor: "#f5f7fc" }}>
            <div className="position-absolute top-0 start-0" style={{ width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, #1b4b5a20, transparent)", transform: "translate(-100px, -100px)" }} />
            <div className="position-absolute bottom-0 end-0" style={{ width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, #f5544920, transparent)", transform: "translate(50px, 50px)" }} />

            <Card className="shadow-lg border-0 overflow-hidden" style={{ maxWidth: "90%", width: "auto", zIndex: 1 }}>
                <Row className="g-0">
                    <Col md={6} className="d-none d-md-block" style={{ background: "linear-gradient(135deg, #0f1f38 0%, #1b4b5a 100%)", color: "white" }}>
                        <div className="p-4 h-100 d-flex flex-column justify-content-center text-center position-relative">
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "radial-gradient(circle, #f5544920, transparent)", opacity: 0.3 }} />
                            <div className="position-relative">
                                <h2 className="mb-2 fw-bold">Bienvenido de nuevo</h2>
                                <p className="opacity-75">Accede a tu cuenta y gestiona tu negocio de forma eficiente.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Card.Body className="p-4 p-md-5">
                            <h1 className="h4 fw-bold text-center mb-1" style={{ color: "#0f1f38" }}>Iniciar sesión</h1>
                            <p className="text-muted text-center mb-4">Ingresa tus credenciales para continuar</p>
                            <Form onSubmit={manejarLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        disabled={cargando}
                                        style={{ borderRadius: "12px" }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        disabled={cargando}
                                        style={{ borderRadius: "12px" }}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <span className="text-muted small">¿Olvidaste tu contraseña?</span>
                                    <Button variant="link" className="p-0 ms-1 small" onClick={manejarOlvideContrasena} style={{ color: "#f55449" }}>Restablecer</Button>
                                </div>

                                <Button
                                    type="submit"
                                    variant="danger"
                                    className="w-100 py-2"
                                    disabled={cargando || !esValido}
                                    style={{ backgroundColor: "#f55449", borderColor: "#f55449", borderRadius: "12px" }}
                                >
                                    {cargando ? <Spinner as="span" animation="border" size="sm" /> : "Entrar"}
                                </Button>

                                <div className="text-center mt-3">
                                    <span className="text-muted small">¿No tienes cuenta?</span>
                                    <Button variant="link" className="p-0 ms-1 small" onClick={manejarCrearCuenta} style={{ color: "#f55449" }}>Crear cuenta</Button>
                                </div>
                            </Form>
                            <div className="text-center mt-4">
                                <small className="text-muted">© {new Date().getFullYear()} GroVer. Todos los derechos reservados.</small>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Login;