import { CookieModalState } from "./CookieModalContext";

export type CookieModalAction = { type: "SET_OPEN" | "SET_CONSENT"; payload: boolean }

export const CookieModalReducer = (state: CookieModalState, action: CookieModalAction): CookieModalState => {
    switch (action.type) {
        case "SET_OPEN":
            return { ...state, open: action.payload };

        case "SET_CONSENT":
            return { ...state, consent: action.payload };

        default:
            return state;
    }
}