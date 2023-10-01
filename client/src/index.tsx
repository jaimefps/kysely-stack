import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "./auth"
import { ApiProvider } from "./api"
import { Router } from "./router"
import "./styles/index.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <ApiProvider>
        <Router />
      </ApiProvider>
    </AuthProvider>
  </StrictMode>
)
