import { ReactNode, useReducer } from "react";
import { CookieModalReducer } from "./CookieModalReducer";
import CookieModalContext from "./CookieModalContext";


const CookieModalProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(CookieModalReducer, {
        open: false,
        consent: null
    });

    return (
        <CookieModalContext.Provider value={{ state, dispatch }}>
            {children}
        </CookieModalContext.Provider>
    )
}

export default CookieModalProvider;