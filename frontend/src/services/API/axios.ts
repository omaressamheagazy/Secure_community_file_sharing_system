import axios from "axios";
import { useAuthStore } from "@/stores/AuthStore.ts";

export const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});
console.log(import.meta.env.VITE_API_BASE_URL);
axiosClient.defaults.headers.common["Accept"] = "application/json";
axiosClient.defaults.withCredentials = true;
axiosClient.defaults.withXSRFToken = true;

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const authStore = useAuthStore();
        console.log(error);
        if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            authStore.getAuthUser &&
            !authStore.guest
        ) {
            // user not authorized
            authStore.logout();
            // return;
        }
        return Promise.reject(error);
    }
);