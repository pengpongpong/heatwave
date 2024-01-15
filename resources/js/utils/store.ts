import { create } from "zustand";

type ConsentStore = {
    consent: boolean;
    cookieModal: boolean;
    setConsent: (userConsent: boolean) => void;
    setCookieModal: (openModal: boolean) => void;
}

export const useConsentStore = create<ConsentStore>((set) => ({
    consent: false,
    cookieModal: false,
    setConsent: (userConsent: boolean) => set(() => ({ consent: userConsent })),
    setCookieModal: (openModal: boolean) => set(() => ({ cookieModal: openModal }))
}))


export const setConsentStore = (consent: boolean) => {
    useConsentStore.getState().setConsent(consent)
}

export const setCookieModalStore = (open: boolean) => {
    useConsentStore.getState().setCookieModal(open)
}