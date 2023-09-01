import { createContext, useState } from "react";

export const TokenContext = createContext(null);

const initialValues = 'deslogado';

export const TokenProvider = ({ children }) => {

    const [token, setToken] = useState(initialValues);

    

    return (
      <TokenContext.Provider
        value={{
          token,
          setToken,
        }}
      >
        {children}
      </TokenContext.Provider>
    );
}


