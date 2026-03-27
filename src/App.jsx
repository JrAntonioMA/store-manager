import { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import AppRouter from "./routes/AppRouter";
import { establecerReferenciaSnackbar } from "./utils/toast";

function AplicacionInterna() {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => { establecerReferenciaSnackbar(enqueueSnackbar); }, [enqueueSnackbar]);
    return <AppRouter />;
}

function App() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <AplicacionInterna />
        </SnackbarProvider>
    );
}

export default App;