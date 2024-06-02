import { defineStore } from "pinia";
import { login, logout } from "./service";

export const useAuth = defineStore("auth", () => {
    const loginUser = async (data) => {
        try {
            const apiData = await login(data);
            return apiData;
        } catch (err) {
            console.log(err);
        }
    };

    const logoutUser = async () => {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    };

    return {
        loginUser,
        logoutUser,
    };
});
