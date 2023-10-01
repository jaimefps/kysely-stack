export const SuccessAlert: React.FC<{
  msg: string
}> = ({ msg }) => (
  <div
    style={{
      background: "lightgreen",
      color: "green",
      padding: 10,
    }}
  >
    <p>{msg}</p>
  </div>
)

export const ErrorAlert: React.FC<{
  msg: string
}> = ({ msg }) => (
  <div
    style={{
      background: "pink",
      color: "red",
      padding: 10,
    }}
  >
    <p>{msg}</p>
  </div>
)
