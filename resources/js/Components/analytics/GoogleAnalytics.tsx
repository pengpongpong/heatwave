import { Head } from "@inertiajs/react"

type Props = {}

const GoogleAnalytics = (props: Props) => {
    return (
        <Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-G91WTRZVH0"></script>
            <script>
                {
                ` window.dataLayer = window.dataLayer || [];

                    function gtag() {
                        dataLayer.push(arguments);
                    }

                    gtag("js", new Date());
                    gtag("config", "G-G91WTRZVH0");`
                }
            </script>
        </Head>
    )
}

export default GoogleAnalytics