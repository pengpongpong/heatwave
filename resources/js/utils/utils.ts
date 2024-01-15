class UrlBuilder {
    private url = "";

    constructor(url: string) {
        this.url = url;
    }

    size(width: number, height: number) {
        this.url = this.url + `?w=${width}&h=${height}`;
        return this;
    }

    getUrl() {
        this.url = this.url + "&auto=format&fit=max";
        return this.url
    }
}

export const urlFor = (url: string) => {
    return new UrlBuilder(url);
}

type ConsentType = "consent" | "consent-required" | "consent-analytics" | "consent-advertise"

export type Locale = "en" | "de"

export type Props = {
    lang: Locale
}

// set cookie
export const setCookie = (item: ConsentType, value: string) => {
    if (!window) return console.error("no window defined")

    return document.cookie = `${item}=${value}; max-age=31536000;Secure;SameSite=Strict`
}

// get cookie
export const getCookie = (item: ConsentType) => {
    if (!window) return console.error("no window defined")

    return document.cookie.split("; ")
        .find((row) => row.startsWith(item + "="))
        ?.split("=")[1]
}

// delete cookie
export const deleteCookie = (item: ConsentType) => {
    if (!window) return console.error("no window defined")

    return document.cookie = item + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
}

export const setHtmlOverflow = (state: string) => {
    const html = document.querySelector("html") as HTMLHtmlElement
    if (!html) return

    html.style.overflow = state
}