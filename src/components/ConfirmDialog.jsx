import { Modal, Button } from "react-bootstrap";

function ConfirmDialog({
    abierto,
    titulo,
    mensaje,
    alConfirmar,
    alCancelar,
    textoConfirmar = "Eliminar",
    textoCancelar = "Cancelar",
}) {
    return (
        <Modal show={abierto} onHide={alCancelar} centered>
            <Modal.Header closeButton style={{ borderBottom: "none" }}>
                <Modal.Title className="fw-semibold" style={{ color: "#0f1f38" }}>
                    {titulo || "Confirmar acción"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-secondary" style={{ border: "none" }}>
                {mensaje || "¿Estás seguro de que deseas continuar?"}
            </Modal.Body>
            <Modal.Footer style={{ borderTop: "none" }}>
                <Button variant="secondary" onClick={alCancelar} className="px-3">
                    {textoCancelar}
                </Button>
                <Button
                    variant="danger"
                    onClick={alConfirmar}
                    className="px-3"
                    style={{ backgroundColor: "#f55449", borderColor: "#f55449" }}
                >
                    {textoConfirmar}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDialog;