import io from "socket.io-client";

import { env } from "@/config/env.config";

const API_URI = env.environment === "production" ? "/" : env.api.url;
const ws = io(API_URI);

export { ws };
