import styled from "styled-components"


export default function TransactionLine({ name, value, type, date }) {
  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <strong>{name}</strong>
      </div>
      <Value color={type}>{value}</Value>
    </ListItemContainer>
  )
}

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "#03AC00" : "#C70000")};
`