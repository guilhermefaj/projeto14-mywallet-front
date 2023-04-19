import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import apiAuth from "../services/apiAuth"

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [confirmation, setConfirmation] = useState({ passwordConfirmation: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  console.log("form", form)
  console.log("confirmation:", confirmation)

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function passConfirm(e) {
    setConfirmation({ ...confirmation, [e.target.name]: e.target.value })
  }

  function handleSignUp(e) {
    e.preventDefault()
    if (form.password !== confirmation.passwordConfirmation) return alert("A senha deve ser a mesma em ambos os campos")
    setLoading(true)

    apiAuth.cadastro(form)
      .then(res => {
        setLoading(false)
        setForm()
        navigate("/")
      })
      .catch(err => {
        setLoading(false)
        alert(err.response.data)
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input
          name="name"
          placeholder="Nome"
          type="name"
          value={form.name}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={handleForm}
          disabled={loading}
          autocomplete="new-password"
          required
        />
        <input
          name="passwordConfirmation"
          placeholder="Confirme a senha"
          type="passwordConfirmation"
          value={form.passwordConfirmation}
          onChange={passConfirm}
          disabled={loading}
          autocomplete="new-password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <ThreeDots
              height="24"
              width="70"
              color="#ffffff"
            />
          ) : "Cadastrar"}
        </button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button{
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
