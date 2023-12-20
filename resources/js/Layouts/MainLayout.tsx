import { ReactNode } from 'react'
import { Head } from "@inertiajs/react";

import Navbar from "@/Components/navbar/Navbar";
import Footer from "@/Components/footer/Footer";

type MainLayoutProps = {
    children: ReactNode;
    title: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
    return (
        <>
            <Head title={title} />
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout