import axios from "axios";

function transacoes(config) {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/home`, config)
    return promise
}

function novaTransacao(body, type, config) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/${type}`, body, config)
    return promise
}

const apiTransactions = { transacoes, novaTransacao }
export default apiTransactions