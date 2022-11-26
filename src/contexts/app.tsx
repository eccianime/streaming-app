import { createContext, useContext, useState } from 'react';
import { AppContextProps, ProviderProps } from '../types/context';

const AppContext = createContext({} as AppContextProps);

const AppProvider = ({ children }: ProviderProps) => {
    const [isLoading, setLoading] = useState(false);
    return (
        <AppContext.Provider value={{
            isLoading, setLoading
        }}>
            {children}
        </AppContext.Provider>
    )
}

function useAppContext(): AppContextProps {
    return useContext(AppContext);
}

export { AppProvider, useAppContext };

