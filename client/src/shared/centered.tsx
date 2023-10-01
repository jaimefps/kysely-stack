export const Centered: React.FC<{
  children: Children
}> = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    {children}
  </div>
)
