import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom"
import { useEffect } from "react"
import { useMemberAuth } from "./auth"
import { Signup } from "./pages/signup"
import { Login } from "./pages/login"
import { Reset } from "./pages/reset"
import { Demo } from "./pages/demo"

const Enforce: React.FC<{
  type: "login" | "entry"
  children: JSX.Element | JSX.Element[]
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
        <Login />
      </Enforce>
    ),
    errorElement: <div>No Match</div>,
  },
  {
    path: "/signup",
    element: (
      <Enforce type="entry">
        <Signup />
      </Enforce>
    ),
  },
  {
    path: "/reset",
    element: (
      <Enforce type="entry">
        <Reset />
      </Enforce>
    ),
  },
  {
    path: "/main",
    element: (
      <Enforce type="login">
        <Demo />
      </Enforce>
    ),
  },
])

export const Router = () => <RouterProvider router={router} />
