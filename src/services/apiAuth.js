import axios from "axios";

function login(body) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/login`, body)
    return promise
}

function cadastro(body) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, body)
    return promise
}

const apiAuth = { login, cadastro }
export default apiAuth