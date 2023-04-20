import axios from "axios";

const BASE_URL = "https://mywallet-api-6o2l.onrender.com"

function transacoes(config) {
    const promise = axios.get(`${BASE_URL}/home`, config)
    return promise
}

function novaTransacao(body, type, config) {
    const promise = axios.post(`${BASE_URL}/nova-transacao/${type}`, body, config)
    return promise
}

const apiTransactions = { transacoes, novaTransacao }
export default apiTransactions