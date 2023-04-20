import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContexts"
import { useNavigate } from "react-router-dom"
import apiTransactions from "../services/apiTransactions"
import TransactionLine from "../components/TransactionLine"

export default function HomePage() {
  const { user } = useContext(UserContext)
  const [cashFlow, setCashFlow] = useState([])
  const [soma, setSoma] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
    apiTransactions.transacoes(config)
      .then(res => {
        const apiCashFlow = res.data
        setCashFlow(apiCashFlow)
      })
      .catch(err => {
        alert(err.response.data)
      })
  }, [])

  function moneyIn() {
    navigate("/nova-transacao/entrada")
  }

  function moneyOut() {
    navigate("/nova-transacao/saida")
  }

  useEffect(() => {
    let total = 0;
    cashFlow.forEach((item) => {
      if (item.type === "entrada") {
        total += parseFloat(item.value);
      }
      if (item.type === "saida") {
        total -= parseFloat(item.value);
      }
    });
    setSoma(total);
  }, [cashFlow]);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {cashFlow.length > 0 ? (
            cashFlow.map(item => {
              return (
                <TransactionLine
                  key={item._id}
                  name={item.transactionName}
                  value={item.value}
                  type={item.type}
                  date={item.date}
                />
              )
            })
          ) : (
            <EmptyList>
              Não há registros de entrada ou saída
            </EmptyList>
          )}

        </ul>


        {cashFlow.length > 0 ? (
          <article>
            <strong>Saldo</strong>
            <Value color={"positivo"}>{soma ? soma : ""}</Value>
          </article>
        ) : ""
        }

      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => moneyIn()}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => moneyOut()}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const EmptyList = styled.div`
  color: #868686;
  width: 180px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%; 
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateY(-50%);
  text-align: center;
`

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "#03AC00" : "#C70000")};
`
