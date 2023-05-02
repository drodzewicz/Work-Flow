import { BASE_URL, ENVIROMENTS } from "./default.conf";
import axios from "axios";

const BASE_API_URI = import.meta.env.REACT_APP_API_URI || BASE_URL;
const API_URI = import.meta.env.NODE_ENV === ENVIROMENTS.PROD ? "/" : BASE_API_URI;

axios.defaults.baseURL = API_URI;
