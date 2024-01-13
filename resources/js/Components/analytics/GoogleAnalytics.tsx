import { Head } from "@inertiajs/react"

export type ConsentProps = {
    consent: {
        analytics: boolean;
        advertise: boolean;
    }
}

const GoogleAnalytics = ({ consent, gtag = "" }: ConsentProps & { gtag: string }) => {
    return (
        <Head>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`}></script>
            <script>
                {
                    `window.dataLayer = window.dataLayer || [];

                    function gtag() {
                        dataLayer.push(arguments);
                    }

                    gtag("js", new Date());
                    gtag("config", "${gtag}");`
                }
            </script>

            {/* advertisement consent */}
            {consent.analytics
                ? <script>
                    {
                        `window.dataLayer = window.dataLayer || [];

                        function gtag() {
                            dataLayer.push(arguments);
                        }

                        gtag("consent", "default", {
                            "ad_storage": "granted",
                        });`}
                </script>
                : <script>
                    {
                        `window.dataLayer = window.dataLayer || [];

                        function gtag() {
                            dataLayer.push(arguments);
                        }

                        gtag("consent", "default", {
                            "ad_storage": "denied",
                        });`
                    }
                </script>}

            {/* analytics consent */}
            {consent.advertise
                ? <script>
                    {
                        `window.dataLayer = window.dataLayer || [];

                        function gtag() {
                            dataLayer.push(arguments);
                        }
    
                        gtag("consent", "default", {
                            "analytics_storage": "granted",
                        });`
                    }
                </script>
                : <script>
                    {
                        `window.dataLayer = window.dataLayer || [];

                        function gtag() {
                            dataLayer.push(arguments);
                         }
    
                        gtag("consent", "default", {
                            "analytics_storage": "denied",
                        });`
                    }
                </script>}
        </Head>
    )
}

export default GoogleAnalytics