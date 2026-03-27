let referenciaToast = null;

export const establecerReferenciaSnackbar = (ref) => {
    referenciaToast = ref;
};

export const mostrarNotificacion = (mensaje, variante = "info") => {
    if (referenciaToast) {
        referenciaToast(mensaje, { variant: variante });
    } else {
        console.warn("Notificación no inicializada");
    }
};