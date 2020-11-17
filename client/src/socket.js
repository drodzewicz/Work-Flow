import io from "socket.io-client";

const BASE_API_URI = process.env.REACT_APP_API_URI || "http://localhost:8080"
const API_URI = process.env.NODE_ENV === "production" ? "/" : BASE_API_URI
console.log(process.env.NODE_ENV)
console.log(BASE_API_URI)
console.log(API_URI)
const ws = io.connect(API_URI)

export { ws }