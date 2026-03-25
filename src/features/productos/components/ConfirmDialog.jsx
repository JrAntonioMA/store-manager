import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

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
        <Dialog open={abierto} onClose={alCancelar}>
            <DialogTitle>{titulo || "Confirmar acción"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{mensaje || "¿Estás seguro de que deseas continuar?"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={alCancelar} color="inherit">
                    {textoCancelar}
                </Button>
                <Button onClick={alConfirmar} color="error" variant="contained" autoFocus>
                    {textoConfirmar}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;