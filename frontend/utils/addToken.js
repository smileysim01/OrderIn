import { decodeToken } from "react-jwt";

export function addTokenToHeader({ headers }) {
    const token = localStorage.getItem("token");
    if (token) {
        headers.Authorization = `${token}`;
    }
    return headers;
}
export function isAuthorized(id) {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    const decoded = decodeToken(token);
    return decoded.id == id;
}
