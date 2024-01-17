import axios, { AxiosInstance } from "axios";
import { envConfig } from "../playwright.config";

abstract class APIService {
  protected fetchClient: AxiosInstance;

  constructor() {
    this.fetchClient = axios.create({
      baseURL: envConfig.API_URL,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${envConfig.TEST_USER.access_token}`,
      },
    });
  }
}

export default APIService;
