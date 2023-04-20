import { useState } from "react"
import styled from "styled-components"
import apiAuth from "../services/apiAuth"
import { useParams } from "react-router-dom"

export default function TransactionsPage() {
  const [form, setForm] = useState({ transactionName: "", value: "" })
  const [loading, setLoading] = useState(false)
  const { type } = useParams()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  console.log("Type:", type)

  function handleTransaction(e) {
    e.preventDefault()
    setLoading(true)

    apiAuth.novaTransacao(form, type)
      .then((res) => {
        setLoading(false)
        console.log(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response.data)
      })
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input
          name="value"
          placeholder="Valor"
          type="text"
          value={form.value}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <input
          name="transactionName"
          placeholder="Descrição"
          type="text"
          value={form.transactionName}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <button onClick={handleTransaction}>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
