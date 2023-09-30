import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom"
import { useEffect } from "react"
import { member, useMemberAuth } from "./auth"
import App from "./App"

const Enforce: FCC<{
  type: "login" | "entry"
}> = ({ children, type }) => {
  const navigate = useNavigate()
  const { member } = useMemberAuth()

  useEffect(() => {
    if (type === "login" && !member) {
      navigate("/", {
        replace: true,
      })
    }

    if (type === "entry" && member) {
      navigate("/main", {
        replace: true,
      })
    }
  }, [member])

  return children
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Enforce type="entry">
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* NOTE: Hardcoded development user login */}
          <button onClick={member.dev}>log in</button>
        </div>
      </Enforce>
    ),
    errorElement: <div>No Match</div>,
  },
  {
    path: "/main",
    element: (
      <Enforce type="login">
        <button style={{ margin: 50 }} onClick={member.logout}>
          log out
        </button>
        <App />
      </Enforce>
    ),
  },
])

export const Router = () => <RouterProvider router={router} />
