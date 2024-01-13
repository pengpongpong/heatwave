import { ReactNode } from 'react'
import { Head, usePage } from "@inertiajs/react";

import Navbar from "@/Components/navbar/Navbar";
import Footer from "@/Components/footer/Footer";
import CookieBanner from "@/Components/cookie-banner/CookieBanner";
import CookieModalProvider from "@/utils/CookieModalProvider";
import GoogleAnalytics, { ConsentProps } from "@/Components/analytics/GoogleAnalytics";

type MainLayoutProps = {
    children: ReactNode;
    hideNav: boolean;
    hideCookieBanner?: boolean;
    seo: SeoProps
}

type SeoProps = {
    title: string;
    description: string;
    keywords: string;
    url: string;
    image: {
        url: string;
        width: string;
        height: string;
        alt: string;
    }
}

const MainLayout = ({ children, hideNav, hideCookieBanner, seo }: MainLayoutProps) => {
    const { consent = { analytics: false, advertise: false }, gtag = "" } = usePage<ConsentProps & { gtag: string }>().props;

    return (
        <>
            <Head title={seo.title} >

                <meta name="description" content={seo.description} />
                <meta name="keywords" content={seo.keywords} />
                <meta name="author" content="Heatwave" />

                <meta name="og:title" content={seo.title} />
                <meta name="og:description" content={seo.description} />
                <meta name="og:url" content={seo.url} />
                <meta name="og:site_name" content="Heatwave" />
                <meta name="og:locale" content="de" />
                <meta name="og:type" content="website" />

                <meta property="og:image" content={seo.image.url} />
                <meta property="og:image:width" content={seo.image.width} />
                <meta property="og:image:height" content={seo.image.height} />
                <meta property="og:image:alt" content={seo.image.alt} />

                <meta name="robots" content="index, follow, nocache" />
                <meta
                    name="googlebot"
                    content="index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
                />
            </Head>
            <GoogleAnalytics consent={consent} gtag={gtag} />
            <div className="flex justify-center">
                <Navbar hideNav={hideNav} />
            </div>
            <CookieModalProvider>
                {children}
                <CookieBanner hideCookieBanner={hideCookieBanner}/>
            </CookieModalProvider>
            <Footer />
        </>
    )
}

export default MainLayout