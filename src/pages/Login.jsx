import {
    TextField,
    Button,
    Box,
    Paper,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useLogin } from "../hooks/useLogin";

function Login() {
    const {
        usuario,
        contrasena,
        error,
        cargando,
        setUsuario,
        setContrasena,
        manejarLogin,
        manejarOlvideContrasena,
        manejarCrearCuenta,
    } = useLogin();

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f7fc",
                position: "relative",
                overflow: "hidden",
                margin: 0,
                padding: 0,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: -100,
                    left: -100,
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, #1b4b5a20, transparent)`,
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: -50,
                    right: -50,
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, #f5544920, transparent)`,
                    zIndex: 0,
                }}
            />

            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                    width: "auto",
                    maxWidth: "90%",
                    height: "auto",
                    maxHeight: "90vh",
                    m: 0,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        background: `linear-gradient(135deg, #0f1f38 0%, #1b4b5a 100%)`,
                        p: 4,
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "10%",
                            left: "-10%",
                            width: "120%",
                            height: "120%",
                            background: `radial-gradient(circle, #f5544920, transparent)`,
                            borderRadius: "50%",
                            zIndex: 0,
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "-20%",
                            right: "-10%",
                            width: "80%",
                            height: "80%",
                            background: `radial-gradient(circle, #8e797030, transparent)`,
                            borderRadius: "50%",
                            zIndex: 0,
                        }}
                    />

                    <Typography variant="h4" component="h2" fontWeight={700} sx={{ mb: 2, zIndex: 1 }}>
                        Bienvenido de nuevo
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 280, zIndex: 1, lineHeight: 1.6 }}>
                        Accede a tu cuenta y gestiona tu negocio de forma eficiente.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        bgcolor: "white",
                        p: { xs: 3, sm: 5 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        overflow: "auto",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight={600}
                        sx={{ mb: 1, color: "#0f1f38", textAlign: "center" }}
                    >
                        Iniciar sesión
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3, textAlign: "center" }}
                    >
                        Ingresa tus credenciales para continuar
                    </Typography>

                    <Box component="form" onSubmit={manejarLogin} noValidate>
                        <TextField
                            label="Usuario"
                            fullWidth
                            margin="normal"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            disabled={cargando}
                            variant="outlined"
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                            }}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            disabled={cargando}
                            variant="outlined"
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                            }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 1 }}>
                            <Typography
                                component="span"
                                sx={{
                                    color: "text.secondary",
                                    fontSize: "0.875rem",
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Typography>
                            <Typography
                                component="span"
                                onClick={manejarOlvideContrasena}
                                sx={{
                                    color: "#f55449",
                                    fontSize: "0.875rem",
                                    cursor: "pointer",
                                    ml: 1
                                }}
                            >
                                Restablecer
                            </Typography>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={cargando}
                            sx={{
                                py: 1.2,
                                bgcolor: "#f55449",
                                "&:hover": {
                                    bgcolor: "#e04439",
                                },
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: "1rem",
                                borderRadius: 2,
                            }}
                        >
                            {cargando ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
                        </Button>

                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Typography
                                component="span"
                                sx={{
                                    color: "text.secondary",
                                    fontSize: "0.875rem",

                                }}
                            >
                                ¿No tienes cuenta?
                            </Typography>
                            <Typography
                                component="span"
                                onClick={manejarCrearCuenta}
                                sx={{
                                    color: "#f55449",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    ml: 1
                                }}
                            >
                                Crear cuenta
                            </Typography>
                        </Box>
                    </Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", textAlign: "center", mt: 4 }}
                    >
                        © {new Date().getFullYear()} GroVer. Todos los derechos reservados.
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;