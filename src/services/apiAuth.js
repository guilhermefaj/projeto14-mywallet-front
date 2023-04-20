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

function transacoes(config) {
    const promise = axios.get(`${BASE_URL}/home`, config)
    return promise
}

function novaTransacao(body, type, config) {
    const promise = axios.post(`${BASE_URL}/nova-transacao/${type}`, body, config)
    return promise
}

const apiAuth = { login, cadastro, transacoes, novaTransacao }
export default apiAuth