import { BASE_URL, ENVIROMENTS } from "config/default.conf";
import axios from "axios";

const BASE_API_URI = process.env.REACT_APP_API_URI || BASE_URL;
const API_URI = process.env.NODE_ENV === ENVIROMENTS.PROD ? "/" : BASE_API_URI;

axios.defaults.baseURL = API_URI;
