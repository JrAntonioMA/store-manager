import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
import { useAuthStore } from "../../../store/authStore";

function Dashboard() {
    const usuario = useAuthStore((state) => state.usuario);

    return (
        <Box>
            <Typography
                variant="h4"
                fontWeight={600}
                sx={{ color: "#0f1f38", mb: 2 }}
            >
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Bienvenido
                            </Typography>
                            <Typography variant="h5" fontWeight={600}>
                                {usuario?.firstName || "Usuario"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {usuario?.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
}

export default Dashboard;