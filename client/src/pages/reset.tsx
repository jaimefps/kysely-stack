import { useState } from "react"
import { memberAuth } from "../auth"
import { useNavigate } from "react-router-dom"
import { AuthFormWrapper } from "../shared/auth-form-wrapper"
import { SuccessAlert, ErrorAlert } from "../shared/alerts"

export const Reset: React.FC = () => {
  const navigate = useNavigate()

  const [Email, SetEmail] = useState("")
  const [ErrorMsg, SetErrorMsg] = useState("")
  const [Loading, SetLoading] = useState(false)
  const [Complete, SetComplete] = useState(false)

  async function reset() {
    SetErrorMsg("")
    SetLoading(true)
    SetComplete(false)

    try {
      await memberAuth.password.reset(Email).then(() => {
        SetErrorMsg("")
        SetLoading(false)
        SetComplete(true)
      })
    } catch (e) {
      const error = e as { message?: string } | undefined
      SetErrorMsg(error?.message ?? "Something went wrong. Try again")
      SetLoading(false)
      SetComplete(false)
    }
  }

  return (
    <AuthFormWrapper loading={Loading} header="Reset">
      <input
        value={Email}
        onChange={(e) => SetEmail(e.target.value)}
        placeholder="email"
      />

      {!!ErrorMsg && <ErrorAlert msg={ErrorMsg} />}
      {Complete && <SuccessAlert msg={"Email sent"} />}

      <button type="submit" onClick={reset} disabled={Loading}>
        send reset email
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
          onClick={() => navigate("/")}
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
          onClick={() => navigate("/signup")}
          disabled={Loading}
        >
          signup
        </button>
      </div>
    </AuthFormWrapper>
  )
}
