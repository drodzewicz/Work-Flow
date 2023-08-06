import axios from "axios";

import { BASE_URL, ENVIROMENTS } from "./default.conf";

const BASE_API_URI = import.meta.env.REACT_APP_API_URI || BASE_URL;
const API_URI = import.meta.env.NODE_ENV === ENVIROMENTS.PROD ? "/" : BASE_API_URI;

export default axios.create({ baseURL: API_URI });

const authAxios = axios.create({ baseURL: API_URI, withCredentials: true });

export { authAxios }