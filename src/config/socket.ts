import { w3cwebsocket } from "websocket";

const socket = new w3cwebsocket(import.meta.env.VITE_WS_URL as string);

export default socket;