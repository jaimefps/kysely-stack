import { Centered } from "./centered"
import { LoadingOverlay } from "./loading-overlay"

export const AuthFormWrapper: React.FC<{
  loading: boolean
  header: string
  children: React.ReactNode
}> = ({ loading, children, header }) => {
  return (
    <Centered>
      <LoadingOverlay loading={loading}>
        <h2
          style={{
            marginBottom: 10,
          }}
        >
          {header}
        </h2>

        <form
          style={{
            display: "inline-flex",
            flexDirection: "column",
            width: 300,
            gap: 10,
          }}
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {children}
        </form>
      </LoadingOverlay>
    </Centered>
  )
}
