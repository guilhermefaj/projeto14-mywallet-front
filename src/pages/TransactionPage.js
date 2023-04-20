import { useContext, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContexts"
import apiTransactions from "../services/apiTransactions"

export default function TransactionsPage() {
  const { user } = useContext(UserContext)
  const [form, setForm] = useState({ transactionName: "", value: "" })
  const [loading, setLoading] = useState(false)
  const tempType = useParams()
  const type = tempType.tipo

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleTransaction(e) {
    e.preventDefault()
    setLoading(true)

    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }

    apiTransactions.novaTransacao(form, type, config)
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
