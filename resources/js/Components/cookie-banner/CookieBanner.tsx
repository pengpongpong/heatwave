import { ButtonHTMLAttributes, InputHTMLAttributes, forwardRef, useContext, useEffect, useRef, useState, MouseEvent } from 'react'
import { easeInOut, inView, motion } from "framer-motion"
import { deleteCookie, setConsentLocalStorage, getConsentLocalStorage, setCookie, getCookie } from "@/utils/utils"
import CookieModalContext from "@/utils/CookieModalContext"
import "./cookie-banner.scss"

const Button = ({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className={`py-2 px-4 border border-lightBlue rounded-xl text-lightBlue hover:border-black duration-200 transition-colors ${className}`}>{children}</button>
    )
}

const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { htmlFor?: string }>(({ children, htmlFor = "", ...props }, ref) => {
    return (
        <label className="checkboxContainer" htmlFor={htmlFor}>
            <span className="pb-2 text-lg">{children}</span>

            <input type="checkbox" id={htmlFor} {...props} ref={ref} />
            <svg viewBox="0 0 64 64" height="1em" width="1em">
                <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
            </svg>
        </label>
    );
});


const CookieBanner = ({ hideCookieBanner = false }: { hideCookieBanner?: boolean }) => {
    const analyticsRef = useRef<HTMLInputElement>(null)
    const advertiseRef = useRef<HTMLInputElement>(null)
    const [consent, setConsent] = useState(true)
    const [active, setActive] = useState(hideCookieBanner ? false : true)

    const { state, dispatch } = useContext(CookieModalContext)

    // set consent in modal to user settings if reload
    useEffect(() => {
        if (!analyticsRef.current || !advertiseRef.current) return

        const consentLocal = getConsentLocalStorage("consent")

        // show cookie banner if no consent
        if (!consentLocal) {
            setConsent(false)
        } else if (consentLocal === "granted" || consentLocal === "denied" || consentLocal === "partial") {
            setConsent(true)
        }

        const analyticsConsent = analyticsRef.current
        const advertisementConsent = advertiseRef.current

        const analyticsCookie = getCookie("consent-analytics")
        const advertisementCookie = getCookie("consent-advertise")

        analyticsConsent.checked = !!analyticsCookie
        advertisementConsent.checked = !!advertisementCookie

        inView("#main", () => {
            setActive(true)

            return () => setActive(false)
        })

    }, [])

    const setOpen = (open: boolean) => {
        dispatch({ type: "SET_OPEN", payload: open })
    }

    // open cookie settings
    const openModal = () => {
        const body = document.querySelector("body") as HTMLBodyElement;
        if (!body) return;

        body.style.overflowY = "hidden"

        setOpen(true);
    }

    // close cookie settings
    const closeModal = () => {
        const body = document.querySelector("body") as HTMLBodyElement;
        if (!body) return;

        body.style.overflowY = "auto"

        setOpen(false);
    }

    // accept all
    const acceptConsent = (e: MouseEvent) => {
        e.preventDefault();

        setConsentLocalStorage("consent", "granted")
        setCookie("consent-analytics", "true")
        setCookie("consent-advertise", "true")

        setOpen(false);
        setConsent(true)
    }

    // save user settings
    const saveSettingConsent = (e: MouseEvent) => {
        e.preventDefault();

        setConsentLocalStorage("consent", "partial")

        if (!analyticsRef.current || !advertiseRef.current) return;

        if (analyticsRef.current.checked) {
            setCookie("consent-analytics", "true")
        } else {
            deleteCookie("consent-analytics")
        }

        if (advertiseRef.current.checked) {
            setCookie("consent-advertise", "true")
        } else {
            deleteCookie("consent-advertise")
        }

        setOpen(false);
        setConsent(true)
    }

    // deny all
    const denyConsent = (e: MouseEvent) => {
        e.preventDefault();

        setConsentLocalStorage("consent", "denied")
        deleteCookie("consent-analytics")
        deleteCookie("consent-advertise")

        setOpen(false);
        setConsent(true)
    }

    const bannerText =
    {
        privacyAnchor: "Datenschutz",
        buttons: {
            settings: "Einstellung",
            accept: "Akzeptiere",
            deny: "Ablehnen",
            saveSettings: "Speichere Einstellung",
        },
        modal: {
            headline: "Cookie Einstellung",
            consent: {
                requiredHead: "Erforderliche Cookies",
                requiredText: "Erforderliche Cookies helfen dabei, eine Website nutzbar zu machen, indem sie grundlegende Funktionen wie die Seitennavigation und den Zugang zu sicheren Bereichen der Website ermöglichen. Ohne diese Cookies kann die Website nicht richtig funktionieren.",
                analyticsHead: "Analyse Cookies",
                analyticsText: "Analytics-Cookies uns zu verstehen, wie Besucher mit Websites interagieren, indem sie Informationen anonym sammeln und melden.",
                advertiseHead: "Werbe Cookies",
                advertiseText: "Diese Website verwendet ausschließlich ein Werbe-Cookie für Google Analytics. Dieses Cookie hilft uns, die Interaktionen der Benutzer mit Anzeigen zu analysieren und die Wirksamkeit unserer Werbekampagnen zu messen. Keine personenbezogenen Daten werden erfasst oder weitergegeben.",
            }
        }
    }

    return (
        <>
            {!consent
                ? <motion.div
                    initial={{
                        y: "200%"
                    }}
                    animate={active ? "active" : "hidden"}
                    variants={{
                        "active": { y: 0 },
                        "hidden": { y: "200%" }
                    }}
                    transition={{
                        duration: .5,
                        ease: easeInOut
                    }}
                    className="w-full h-fit max-w-[90%] my-4 mx-auto px-6 py-4 flex flex-col lg:flex-row justify-between items-center rounded-xl fixed bottom-0 z-50 text-lightBlue cookieBanner" data-consent={`${consent}`}>
                    <a className="underline" href="/datenschutz">{bannerText.privacyAnchor}</a>
                    <span className="m-4 lg:my-0 text-center">Diese Seite verwendet Cookies für ein besseres Erlebnis. Durch die Nutzung dieser Website stimmen Sie der Cookie-Richtlinie der Website zu.</span>
                    <div className="flex gap-4">
                        <Button onClick={openModal} aria-controls="cookie-modal">{bannerText.buttons.settings}</Button>
                        <Button onClick={acceptConsent}>{bannerText.buttons.accept}</Button>
                    </div>
                </motion.div>
                : null}

            <div data-open={`${state.open}`} id="backdrop"></div>

            <div className={`w-full h-full fixed top-0 left-0 ${state.open ? "flex" : "hidden"} items-center z-50`}>
                <dialog id="cookie-modal" className="max-w-sm lg:max-w-xl mx-auto py-2 px-4 relative rounded-xl text-lightBlue" open={state.open}>
                    <button className="absolute top-4 right-4" onClick={closeModal} aria-label="Schließe Cookie Einstellungen">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-lightBlue hover:fill-black duration-200 transition-colors"><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>
                    </button>
                    <h1 className="mt-4 text-center text-2xl">{bannerText.modal.headline}</h1>

                    <form className="lg:p-4">
                        <fieldset className="mb-4 p-4 border border-lightBlue rounded-xl">
                            <Checkbox htmlFor="requiredCookies" disabled defaultChecked>{bannerText.modal.consent.requiredHead}</Checkbox>

                            <p>{bannerText.modal.consent.requiredText}</p>
                        </fieldset>

                        <fieldset className="mb-4 p-4 border border-lightBlue rounded-xl">
                            <Checkbox htmlFor="analyticsConsent" ref={analyticsRef}>{bannerText.modal.consent.analyticsHead}</Checkbox>

                            <p>{bannerText.modal.consent.analyticsText}</p>
                        </fieldset>

                        <fieldset className="mb-4 p-4 border border-lightBlue rounded-xl">
                            <Checkbox htmlFor="advertiseConsent" ref={advertiseRef}>{bannerText.modal.consent.advertiseHead}</Checkbox>

                            <p>{bannerText.modal.consent.advertiseText}</p>
                        </fieldset>

                        <div className="flex gap-4 justify-end">
                            <Button onClick={denyConsent}>{bannerText.buttons.deny}</Button>
                            <Button onClick={saveSettingConsent}>{bannerText.buttons.saveSettings}</Button>
                            <Button onClick={acceptConsent}>{bannerText.buttons.accept}</Button>
                        </div>
                    </form>
                </dialog>
            </div>
        </>
    )
}

export default CookieBanner