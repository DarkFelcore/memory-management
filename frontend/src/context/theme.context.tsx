import {ReactNode, createContext, useState} from "react";

interface IThemeContext {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

interface ThemeContextProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({
    darkMode: false,
    toggleDarkMode: () => {}
});

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setDarkMode((prevState) => !prevState);
    };

    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );
}