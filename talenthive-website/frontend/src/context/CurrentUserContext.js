import { createContext, useState } from "react";

export const CurrentUserContext = createContext(null);


export const CurrentUserProvider = ({children}) => {
    const initUser = {
        user : {
            role: 'guest',
        },
    };
    const [currentUser, setCurrentUser] = useState(initUser);

    return <CurrentUserContext.Provider value={{initUser, currentUser, setCurrentUser}}>
        {children}
    </CurrentUserContext.Provider>
}