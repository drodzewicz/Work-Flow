import axios from "axios";

import { env } from "@/config/env.config";

const API_URL_BASENAME = [
  `${env.environment === "production" ? "" : env.api.url}`,
  env.api.prefix,
].join("/");

if (!API_URL_BASENAME) {
  throw new Error("API_URL is not set, please configure the enviremtn variable");
}

export default axios.create({ baseURL: API_URL_BASENAME });

const authAxios = axios.create({ baseURL: API_URL_BASENAME, withCredentials: true });

export { authAxios };
