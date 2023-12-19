import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { easeInOut, inView, motion } from "framer-motion"

import NavLink from "./NavLink";
import NavbarMobile from "./NavbarMobile";


const Navbar = () => {
    const [active, setActive] = useState(false)

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
                    "active": { y: 0, x: "-50%" },
                    "hidden": { y: "200%", x: "-50%" }
                }}
                transition={{
                    duration: .5,
                    ease: easeInOut
                }}
                className="hidden lg:block p-2 rounded-xl fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue"
            >
                <div className="flex items-center gap-6">
                    <Link href={route("home")} className="relative flex items-center rounded-full border border-[#dafbf7] hover:border-black hover:scale-110 bg-[#01b9c3] transition-all duration-300 cursor-pointer overflow-hidden">
                        <img src="./heatwave_logo.png" width={50} />
                    </Link>
                    <ul className={`flex gap-4 overflow-hidden`}>
                        <NavLink href={route("home")} title="Gallery" />
                        <NavLink href={route("home")} title="About" />
                        <NavLink href={route("home")} title="The Crew" />
                        <NavLink href={route("home")} title="Contact" />
                    </ul>
                </div>
            </motion.nav>
        </>
    )
}

export default Navbar;