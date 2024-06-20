import {axiosClient} from "@/services/API/axios.ts";

export default {
    async fetchCsrfToken() {
        await axiosClient.get("/sanctum/csrf-cookie", {
            baseURL: "http://localhost:9000",
        });
    },
    async login(payload) {
      await this.fetchCsrfToken();
      return axiosClient.post("/login", payload);
    },
    logout() {
      return axiosClient.post("/logout");
    },
    getAuthUser() {
      return axiosClient.get("/user");
    },
    async resetPassword(payload) {
      await axiosClient.get("/sanctum/csrf-cookie");
      return axiosClient.post("/reset-password", payload);
    },
    updatePassword(payload) {
      return axiosClient.put("/user/password", payload);
    },
    async registerUser(payload) {
      await this.fetchCsrfToken();
      return axiosClient.post("/register", payload);
    },
    sendVerification(payload) {
      return axiosClient.post("/email/verification-notification", payload);
    },
    updateUser(payload) {
      return axiosClient.put("/user/profile-information", payload);
    },
  };
  