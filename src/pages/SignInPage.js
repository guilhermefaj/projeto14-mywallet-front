import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import apiAuth from "../services/apiAuth"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContexts"
import { ThreeDots } from "react-loader-spinner"

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    const body = { email: "", password: "" }
    apiAuth.login(form)
      .then(res => {
        setLoading(false)
        const { userId, token } = res.data
        setUser({ userId, token })
        navigate("/home")
      })
      .catch(err => {
        setLoading(false)
        alert(err.response.data)
      })
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input
          name="email"
          placeholder="email"
          type="email"
          value={form.email}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          autocomplete="new-password"
          value={form.password}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <ThreeDots
              height="24"
              width="70"
              color="#ffffff"
            />
          ) : "Entrar"}
        </button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
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