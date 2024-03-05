import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserContent = ({children}) => {
    // Initialize userID from local storage or null if not present
    const [userID, setUserID] = useState(() => {
        const savedUserID = localStorage.getItem('userID');
        return savedUserID ? JSON.parse(savedUserID) : null;
    });

    // Effect to run when userID changes
    useEffect(() => {
        // Save userID to local storage
        localStorage.setItem('userID', JSON.stringify(userID));
    }, [userID]);

    return (
        <UserContext.Provider value={{userID, setUserID}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContent;