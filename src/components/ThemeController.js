import React, { createContext, useState } from 'react';
export const ThemeContext = createContext();
import { eventEmitter,useDarkMode } from 'react-native-dark-mode';
export const ThemeController = ({ children }) => {
    const isDarkMode = useDarkMode()
    const [theme, setTheme] = useState(isDarkMode);
    eventEmitter.on('currentModeChanged', newMode => {
        if (newMode == 'dark') {
            setTheme(true);
        } else {
            setTheme(false);
        }
    });
    const toggleTheme = value => {
        if (value === true) {
            setTheme(true);
        } else {
            setTheme(false);
        }
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
