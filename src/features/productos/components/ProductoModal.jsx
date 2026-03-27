import { useState } from "react";
import { Modal } from "react-bootstrap";
import ProductoForm from "./ProductoForm";
import ConfirmDialog from "../../../components/ConfirmDialog";

function ProductoModal({ abierto, alCerrar, producto }) {
    const [confirmarSalida, setConfirmarSalida] = useState(false);
    const [hayCambios, setHayCambios] = useState(false);

    const manejarCierre = () => {
        if (hayCambios) setConfirmarSalida(true);
        else alCerrar();
    };

    const manejarConfirmarSalida = () => {
        setConfirmarSalida(false);
        alCerrar();
    };

    const manejarCancelarSalida = () => setConfirmarSalida(false);

    return (
        <>
            <Modal
                show={abierto}
                onHide={manejarCierre}
                size="lg"
                fullscreen="sm-down"
                centered
                backdrop="static"
                className="producto-modal"
                contentClassName="border-0 rounded-4 overflow-hidden shadow-lg"
            >
                <Modal.Body className="p-0">
                    <ProductoForm
                        producto={producto}
                        alExito={alCerrar}
                        alCancelar={manejarCierre}
                        alCambioSinGuardar={setHayCambios}
                        fullWidth={true}
                    />
                </Modal.Body>
            </Modal>

            <ConfirmDialog
                abierto={confirmarSalida}
                titulo="Salir sin guardar"
                mensaje="Tienes cambios sin guardar. ¿Seguro que quieres salir?"
                alConfirmar={manejarConfirmarSalida}
                alCancelar={manejarCancelarSalida}
                textoConfirmar="Salir"
                textoCancelar="Cancelar"
            />
        </>
    );
}

export default ProductoModal;