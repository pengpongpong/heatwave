import { ReactNode } from 'react'
import { Head } from "@inertiajs/react";

import Navbar from "@/Components/navbar/Navbar";
import Footer from "@/Components/footer/Footer";

type MainLayoutProps = {
    children: ReactNode;
    title: string;
    hideNav: boolean;
}

const MainLayout = ({ children, title, hideNav }: MainLayoutProps) => {
    return (
        <>
            <Head title={title} />
            <div className="flex justify-center">
                <Navbar hideNav={hideNav}/>
            </div>
            {children}
            <Footer />
        </>
    )
}

export default MainLayout