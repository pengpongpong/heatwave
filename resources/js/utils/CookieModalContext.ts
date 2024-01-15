import { createContext, Dispatch } from "react";
import { CookieModalAction } from "./CookieModalReducer";

export interface CookieModalState {
    open: boolean;
    consent: boolean | null
}

interface CookieModalContextProps {
    state: CookieModalState,
    dispatch: Dispatch<CookieModalAction>;
}

const defaultContext: CookieModalContextProps = {
    state: { open: false, consent: null },
    dispatch: () => { },
};

const CookieModalContext = createContext<CookieModalContextProps>(defaultContext);

export default CookieModalContext;