import StudentApi from "#services/Api/student/StudentApi.js"
import { createContext, useContext, useState } from "react"

export const UserStateContext = createContext({
    user: {},
    authenticated: false,
    setUser: () => {},
    logout: () => {},
    login: (email, password) => {},
    setAuthenticated: () => {},
})

export default function UserContext({children}) {

    const [user, setUser] = useState({})
    const [authenticated, _setAuthenticated] = useState(window.localStorage.getItem('AUTHENTICATED'))

    const login = async(email, password) => {
        await StudentApi.getCsrfToken()
        return StudentApi.login(email, password)
    }
    const logout = () => {
        setUser({})
        _setAuthenticated(false)
    }

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
    }

  return (
    <>
        <UserStateContext.Provider value={{
            user,
            setUser,
            login,
            logout,
            authenticated,
            setAuthenticated,
        }}>
            {children}
        </UserStateContext.Provider>
    </>
  )
}

export const useUserContext = () => useContext(UserStateContext)
