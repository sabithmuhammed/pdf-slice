import axios from "axios";
import { AxiosError } from "axios";
import { message } from "antd";

const Api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    withCredentials: true,
});

Api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ data?: string }>) => {
        if (
            error.response &&
            error.response.data &&
            typeof error.response.data == "string"
        ) {
            message.error(error.response.data || "An unknown error occurred");
        } else {
            message.error(
                "No response from the server. Please try again later."
            );
        }
    }
);

export default Api;
