import React, { useState, useEffect, createContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
export const NetworkContext = createContext();
export const NetworkController = ({ children }) => {
    const [isConnected, setIsConnectede] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnectede(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <NetworkContext.Provider value={{ isConnected }}>
            {children}
        </NetworkContext.Provider>
    );
}