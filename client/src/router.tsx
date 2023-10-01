import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom"
import { useLayoutEffect, useState } from "react"
import { Centered } from "./shared/centered"
import { useMemberAuth } from "./auth"
import { Splash } from "./pages/splash"
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

  useLayoutEffect(() => {
    if (type === "login" && !member) {
      navigate("/login", {
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

const NoMatchRedirect = () => {
  const navigate = useNavigate()
  const [Count, SetCount] = useState(0)

  const limit = 5
  const diff = limit - Count

  useLayoutEffect(() => {
    const t = setInterval(() => {
      SetCount((C) => C + 1)
    }, 1000)
    return () => {
      clearInterval(t)
    }
  }, [])

  useLayoutEffect(() => {
    if (diff === 0) {
      navigate("/main")
    }
  }, [Count])

  return (
    <Centered>
      <p>No match found for that url, will redirect in {diff} secs</p>
    </Centered>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
    errorElement: <NoMatchRedirect />,
  },
  {
    path: "/login",
    element: (
      <Enforce type="entry">
        <Login />
      </Enforce>
    ),
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
