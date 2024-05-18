import {createContext, useContext, useEffect, useState} from 'react'

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
            // get user data and set user data to setUser so it can be used
            // through program
        }
        else setIsLoading(false)


    }, [isLoading, token]);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn
                , setIsLoggedIn
                , user
                , setUser
                , isLoading
                , setToken
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider