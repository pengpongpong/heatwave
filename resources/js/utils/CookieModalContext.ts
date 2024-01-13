import { createContext, Dispatch } from "react";
import { CookieModalAction } from "./CookieModalReducer";

export interface CookieModalState {
    open: boolean
}

interface CookieModalContextProps {
    state: CookieModalState,
    dispatch: Dispatch<CookieModalAction>;
}

const defaultContext: CookieModalContextProps = {
    state: { open: false}, 
    dispatch: () => {}, 
  };

const CookieModalContext = createContext<CookieModalContextProps>(defaultContext);

export default CookieModalContext;