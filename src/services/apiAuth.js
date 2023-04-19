import axios from "axios";

const BASE_URL = "https://mywallet-api-6o2l.onrender.com"

function login(body) {
    const promise = axios.post(`${BASE_URL}/login`, body)
    return promise
}

function cadastro(body) {
    const promise = axios.post(`${BASE_URL}/cadastro`, body)
    return promise
}

const apiAuth = { login, cadastro }
export default apiAuth