// MessageContext.js
import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('');

    return (
        <MessageContext.Provider value={{ message, setMessage, result, setResult }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => useContext(MessageContext);
