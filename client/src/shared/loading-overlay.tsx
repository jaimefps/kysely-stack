export const LoadingOverlay: React.FC<{
  children: Children
  loading: boolean
}> = ({ children, loading }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      {loading && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            background: "black",
            opacity: 0.8,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <p>Loading</p>
        </div>
      )}
      {children}
    </div>
  )
}
