import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { easeInOut, inView, motion } from "framer-motion"

import NavLink from "./NavLink";
import NavbarMobile from "./NavbarMobile";


const Navbar = ({ hideNav = false }: { hideNav: boolean }) => {
    const [active, setActive] = useState(hideNav ? false : true)

    // hide navbar if main is not visible for 3D model
    useEffect(() => {
        inView("#main", () => {
            setActive(true)

            return () => setActive(false)
        })
    }, [])

    return (
        <>
            {/* MOBILE */}
            <NavbarMobile active={active} />

            {/* DESKTOP */}
            <motion.nav
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
                className="nav hidden lg:block p-2 rounded-xl fixed bottom-8 bg-blue z-50"
            >
                <div className="flex items-center gap-6">
                    <Link href={route("home")} className={`relative flex items-center rounded-full border ${route().current("home") ? "border-[#000000]" : "border-[#dafbf7]"} hover:border-black hover:scale-110 bg-[#01b9c3] transition-all duration-300 cursor-pointer overflow-hidden`}>
                        <img src="https://res.cloudinary.com/dzvrnl80x/image/upload/v1704816798/heatwave/heatwave_logo.webp" width={50} />
                    </Link>
                    <ul className={`flex gap-4 overflow-hidden`}>
                        <NavLink href={route("gallery")} active={route().current("gallery")} >Galerie</NavLink>
                        <NavLink href={route("events")} active={route().current("events")} >Events</NavLink>
                        <NavLink href={route("about")} active={route().current("about")} >Über uns</NavLink>
                        <NavLink href={route("theCrew")} active={route().current("theCrew")} >Die Crew</NavLink>
                    <NavLink href={route("contact")} active={route().current("contact")} >Kontakt</NavLink>
                </ul>
            </div>
        </motion.nav >
        </>
    )
}

export default Navbar;