// ErrorPopupContext.js
import React, { createContext, useState, useContext } from 'react';

const ErrorPopupContext = createContext();

export const useErrorPopup = () => useContext(ErrorPopupContext);

export const ErrorPopupProvider = ({ children }) => {
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const toggleErrorPopup = () => {
        setShowErrorPopup(prevState => !prevState);
    };

    return (
        <ErrorPopupContext.Provider value={{ showErrorPopup, toggleErrorPopup }}>
            {children}
        </ErrorPopupContext.Provider>
    );
};
