import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Slide,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductoForm from "./ProductoForm";
import ConfirmDialog from "./ConfirmDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ProductoModal({ abierto, alCerrar, producto }) {
    const theme = useTheme();
    const pantallaCompleta = useMediaQuery(theme.breakpoints.down("sm"));

    const [confirmarSalida, setConfirmarSalida] = useState(false);
    const [hayCambios, setHayCambios] = useState(false);

    const manejarCierre = () => {
        if (hayCambios) {
            setConfirmarSalida(true);
        } else {
            alCerrar();
        }
    };

    const manejarConfirmarSalida = () => {
        setConfirmarSalida(false);
        alCerrar();
    };

    const manejarCancelarSalida = () => {
        setConfirmarSalida(false);
    };

    return (
        <>
            <Dialog
                open={abierto}
                onClose={manejarCierre}
                maxWidth={false}
                fullWidth
                fullScreen={pantallaCompleta}
                TransitionComponent={Transition}
                PaperProps={{
                    sx: {
                        borderRadius: pantallaCompleta ? 0 : { xs: 3, sm: 4, md: 5 },
                        overflow: "hidden",
                        boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                        ...(!pantallaCompleta && {
                            width: { xs: "95%", sm: "90%", md: "85%", lg: "75%", xl: "65%" },
                            maxWidth: "none",
                            mx: "auto",
                        }),
                    },
                }}
                BackdropProps={{
                    sx: {
                        backdropFilter: "blur(4px)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "#fafbfc",
                        color: "#0f1f38",
                        fontWeight: 600,
                    }}
                >
                    {producto ? "Editar producto" : "Nuevo producto"}

                    <IconButton onClick={manejarCierre}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 0 }}>
                    <ProductoForm
                        producto={producto}
                        alExito={alCerrar}
                        alCancelar={manejarCierre}
                        alCambioSinGuardar={setHayCambios}
                    />
                </DialogContent>
            </Dialog>

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