import axios from "axios";

export const api = axios.create({
    baseURL: "https://dummyjson.com",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let estaRefrescando = false;
let colaPeticiones = [];

const procesarCola = (error, token = null) => {
    colaPeticiones.forEach((promesa) => {
        if (error) {
            promesa.reject(error);
        } else {
            promesa.resolve(token);
        }
    });

    colaPeticiones = [];
};

api.interceptors.response.use(
    (respuesta) => respuesta,
    async (error) => {
        const peticionOriginal = error.config;

        if (error.response?.status === 401 && !peticionOriginal._reintento) {
            peticionOriginal._reintento = true;

            if (estaRefrescando) {
                return new Promise((resolve, reject) => {
                    colaPeticiones.push({
                        resolve: (token) => {
                            peticionOriginal.headers.Authorization = `Bearer ${token}`;
                            resolve(api(peticionOriginal));
                        },
                        reject,
                    });
                });
            }

            estaRefrescando = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                const respuesta = await axios.post(
                    "https://dummyjson.com/auth/refresh",
                    { refreshToken }
                );

                const nuevoToken = respuesta.data.accessToken;

                localStorage.setItem("token", nuevoToken);

                procesarCola(null, nuevoToken);

                peticionOriginal.headers.Authorization = `Bearer ${nuevoToken}`;
                return api(peticionOriginal);

            } catch (err) {
                procesarCola(err, null);

                localStorage.clear();
                window.location.href = "/login";

                return Promise.reject(err);
            } finally {
                estaRefrescando = false;
            }
        }

        return Promise.reject(error);
    }
);