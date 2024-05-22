// MessageContext.js
import React, { createContext, useState } from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [newMessages, setNewMessages] = useState([]);

    const addNewMessage = (message) => {
        setNewMessages((prevMessages) => [...prevMessages, message]);
    };

    const clearMessages = () => {
        setNewMessages([]);
    };

    return (
        <MessageContext.Provider value={{ newMessages, addNewMessage, clearMessages }}>
            {children}
        </MessageContext.Provider>
    );
};
