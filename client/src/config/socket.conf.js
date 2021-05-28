import io from "socket.io-client";
import { BASE_URL, ENVIROMENTS } from "config/default.conf";


const BASE_API_URI = process.env.REACT_APP_API_URI || BASE_URL;
const API_URI = process.env.NODE_ENV === ENVIROMENTS.PROD ? "/" : BASE_API_URI;
const ws = io(API_URI);

export { ws };