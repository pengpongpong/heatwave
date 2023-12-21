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