import { useNavigate } from "react-router-dom"
import { Centered } from "../shared/centered"

export const Splash: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Centered>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: 10 }}>YAWS: Yet Another Web Site</h2>
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <button
            style={{
              width: "100%",
            }}
            onClick={() => navigate("/signup")}
          >
            signup
          </button>
          <button
            style={{
              width: "100%",
            }}
            onClick={() => navigate("/login")}
          >
            login
          </button>
        </div>
      </div>
    </Centered>
  )
}
