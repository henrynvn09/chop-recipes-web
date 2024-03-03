import React from 'react'
import {createContext, useState, useContext} from 'react'

const UserContent = createContext();

export const useUser = () => useContext(UserContent)

const UserProvider = ({children}) => {
    const [userID, setUserID] = useState(null)

    return (
        <UserContent.Provider value={{userID, setUserID}}>
            {children}
        </UserContent.Provider>
    );
};

export default UserProvider