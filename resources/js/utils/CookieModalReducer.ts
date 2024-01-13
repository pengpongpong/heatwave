import { CookieModalState } from "./CookieModalContext";

export type CookieModalAction = { type: "SET_OPEN"; payload: boolean }

export const CookieModalReducer = (state: CookieModalState, action: CookieModalAction): CookieModalState => {
    switch (action.type) {
        case "SET_OPEN":
            return { ...state, open: action.payload };

        default:
            return state;
    }
}