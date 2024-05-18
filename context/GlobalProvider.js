import {createContext, useContext, useEffect, useState} from 'react'
import {getUser} from "../app/lib/pulse-services";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");
    const [id, setId] = useState("")

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
            // get user data and set user data to setUser so it can be used
            // through program
            getUser(id, token)
                .then(response => {
                    setUser(response);
                })
                .catch(err => {
                    if (err) throw err
                });

            console.log(user)
        } else {
            console.log('token has been discarded...')
            setIsLoading(false)
            setUser(null)
            setIsLoggedIn(false)
        }
    }, [token, id]);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn
                , setIsLoggedIn
                , user
                , setUser
                , isLoading
                , setToken
                , setId
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider