import React, { useState, useEffect, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, memberAuth } from "./member"

export type AuthProviderValue = {
  member: ReturnType<typeof memberAuth.current>
  loading: boolean
}

export const AuthContext = React.createContext<AuthProviderValue | null>(null)

export const AuthProvider: React.FC<{
  children: Children
}> = ({ children }) => {
  const [value, setValue] = useState<AuthProviderValue>({
    member: null,
    loading: true,
  })

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (member) => {
      setValue({
        member,
        loading: false,
      })
    })
    return () => {
      listener()
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useMemberAuth = () => {
  const val = useContext(AuthContext)
  if (val === null) {
    throw new Error("Cannot call useMemberAuth() outside of <AuthProvider/>")
  }
  return val
}
