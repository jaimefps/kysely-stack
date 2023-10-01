import { useState } from "react"
import { memberAuth } from "../auth"
import { useNavigate } from "react-router-dom"
import { AuthFormWrapper } from "../shared/auth-form-wrapper"
import { ErrorAlert } from "../shared/alerts"

export const Login: React.FC = () => {
  const navigate = useNavigate()

  const [Email, SetEmail] = useState("")
  const [Password, SetPassword] = useState("")
  const [ErrorMsg, SetErrorMsg] = useState("")
  const [Loading, SetLoading] = useState(false)

  async function login() {
    SetErrorMsg("")
    SetLoading(true)

    try {
      await memberAuth.login(Email, Password)
    } catch (e) {
      const error = e as { message?: string } | undefined
      SetErrorMsg(error?.message ?? "Something went wrong. Try again")
      SetLoading(false)
    }
  }

  async function devLogin() {
    SetErrorMsg("")
    SetLoading(true)

    try {
      await memberAuth.dev()
    } catch (e) {
      const error = e as { message?: string } | undefined
      SetErrorMsg(error?.message ?? "Something went wrong. Try again")
      SetLoading(false)
    }
  }

  return (
    <AuthFormWrapper loading={Loading} header="Login">
      <input
        value={Email}
        onChange={(e) => SetEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={Password}
        onChange={(e) => SetPassword(e.target.value)}
        placeholder="password"
      />

      {!!ErrorMsg && <ErrorAlert msg={ErrorMsg} />}

      <button type="submit" onClick={login} disabled={Loading}>
        login
      </button>

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button
          type="button"
          style={{
            width: "100%",
            color: "black",
          }}
          onClick={() => navigate("/signup")}
          disabled={Loading}
        >
          signup
        </button>
        <button
          type="button"
          style={{
            width: "100%",
            color: "black",
          }}
          onClick={() => navigate("/reset")}
          disabled={Loading}
        >
          reset password
        </button>
      </div>

      {process.env.NODE_ENV === "development" && (
        <button
          style={{
            width: "100%",
            borderRadius: 2,
            backgroundColor: "orange",
            color: "black",
            padding: "3px 8px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={devLogin}
        >
          bypass login
        </button>
      )}
    </AuthFormWrapper>
  )
}
