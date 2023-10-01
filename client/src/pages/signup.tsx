import { useState } from "react"
import { memberAuth } from "../auth"
import { useNavigate } from "react-router-dom"
import { AuthFormWrapper } from "../shared/auth-form-wrapper"
import { ErrorAlert } from "../shared/alerts"

export const Signup: React.FC = () => {
  const navigate = useNavigate()

  const [Email, SetEmail] = useState("")
  const [Password, SetPassword] = useState("")
  const [PasswordConfirmation, SetPasswordConfirmation] = useState("")
  const [ErrorMsg, SetErrorMsg] = useState("")
  const [Loading, SetLoading] = useState(false)

  async function signup() {
    SetErrorMsg("")
    SetLoading(true)

    try {
      await memberAuth.create(Email, Password).then(() => {
        memberAuth.login(Email, Password)
      })
    } catch (e) {
      const error = e as { message?: string } | undefined
      SetErrorMsg(error?.message ?? "Something went wrong. Try again")
      SetLoading(false)
    }
  }

  return (
    <AuthFormWrapper loading={Loading} header="Signup">
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
      <input
        type="password"
        value={PasswordConfirmation}
        onChange={(e) => SetPasswordConfirmation(e.target.value)}
        placeholder="confirm password"
      />

      {!!ErrorMsg && <ErrorAlert msg={ErrorMsg} />}

      <button type="submit" onClick={signup} disabled={Loading}>
        sign up
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
          onClick={() => navigate("/login")}
          disabled={Loading}
        >
          login
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
    </AuthFormWrapper>
  )
}
