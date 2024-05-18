import {createContext, useContext, useEffect, useState} from 'react'
import {getUser} from "../app/lib/pulse-services";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await getUser()
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true)
                        setUser(res)
                    } else {
                        setIsLoggedIn(false)
                        setUser(null)
                    }
                })
                .catch((err) => {
                    if (err) console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

        fetchData()

    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn
                , setIsLoggedIn
                , user
                , setUser
                , isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider