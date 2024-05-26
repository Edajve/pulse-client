import {createContext, useContext, useEffect, useState} from 'react'
import {getUser} from "../app/lib/pulse-services";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false) // isLoggedIn is set from the sign in page
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(""); // token is set from the sign in page
    const [id, setId] = useState("") // id is set from the sign in page
    const [scannieId, setScannieId] = useState({
        "scannieId": ""
    })

    useEffect(() => {
        if (id) {
            getUser(id, token)
                .then(response => {
                    setUser(response);
                })
                .catch(err => {
                    if (err) throw err
                });
        }
    }, [id])
    
    useEffect(() => {
        // If the token is has been previously set from the user signing-in
        if (token) {
            setIsLoggedIn(true)
        } else { // Means user logged out
            console.info('users credential cleared...')
            setUser(null)
            setId(null)
            setIsLoggedIn(false)
            setScannieId({
                "scannieId": ""
            })
        }
    }, [token]);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn
                , setIsLoggedIn
                , user
                , setUser
                , isLoading
                , setToken
                , token
                , setId
                , id
                , setScannieId
                , scannieId
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider