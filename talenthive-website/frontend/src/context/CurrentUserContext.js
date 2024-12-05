import { createContext, useEffect, useState } from "react";
import { useFetchDataWithToken } from "../hooks/useFetch";
import { BASE_URL } from "../utils/Constants";

export const CurrentUserContext = createContext(null);


export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({role: 'guest'});
    const {payload} = useFetchDataWithToken(`${BASE_URL}/auth/me`);
    useEffect(() => {
        if (payload && payload.profile) {
          setCurrentUser({
            profile: payload.profile,
            role: payload.role
          })
        }
      }, [payload]);
    return <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </CurrentUserContext.Provider>
}