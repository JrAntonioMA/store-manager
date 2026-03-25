let referenciaEncolarSnackbar = null;

export const establecerReferenciaSnackbar = (ref) => {
    referenciaEncolarSnackbar = ref;
};

export const mostrarNotificacion = (mensaje, variante = "info") => {
    if (referenciaEncolarSnackbar) {
        referenciaEncolarSnackbar(mensaje, { variant: variante });
    } else {
        console.warn("Notificación no inicializada");
    }
};