import axios, { AxiosInstance } from "axios";

import AppConfig from "@/utils/AppConfig";

abstract class APIService {
    protected fetchClient: AxiosInstance;

    constructor() {
        this.fetchClient = axios.create({
            baseURL: AppConfig.getInstance().apiURL,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${
                    AppConfig.getInstance().testUser.access_token
                }`,
            },
        });
    }
}

export default APIService;
