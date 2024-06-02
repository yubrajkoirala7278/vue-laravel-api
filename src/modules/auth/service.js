import axios from "axios";
import router from "@/router";
import { displayErrorMessage,displaySuccessMessage } from "@/utils";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
});

api.interceptors.request.use(
    config => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth && auth.access_token) {
            config.headers['Authorization'] = `Bearer ${auth.access_token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("auth");
            router.push("/login");
        }
        return Promise.reject(error);
    }
);

export const login = async (data) => {
    try {
        const response = await api.post("login", data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        router.push("/admin/home");
        displaySuccessMessage(response.data.message);
        return response.data;
    } catch (error) {
        return false;
    }
};

export const logout = async () => {
    try {
        await api.post("logout");
        localStorage.removeItem("auth");
        router.push('/login');
    } catch (error) {
    }
};
