export const SuccessAlert: React.FC<{
  msg: string
}> = ({ msg }) => (
  <div
    style={{
      background: "lightgreen",
      borderRadius: 3,
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
      borderRadius: 3,
      color: "red",
      padding: 10,
    }}
  >
    <p>{msg}</p>
  </div>
)
