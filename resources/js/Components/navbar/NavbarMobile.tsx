import { useEffect, useRef, useState } from 'react'
import { Link } from "@inertiajs/react"
import { easeInOut, motion, useAnimate } from "framer-motion"

import Hamburger from "./Hamburger"
import NavLinkMobile from "./NavLinkMobile"

const handleAnimation = (isOpen: boolean) => {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        animate(isOpen
            ? [
                [
                    "ul",
                    { width: "300px" },
                ],
                [
                    "ul",
                    { height: "372px" },
                ]
            ]
            : [
                [
                    "ul",
                    { height: "0px" },
                ],
                [
                    "ul",
                    { width: "0px", },
                ]
            ])
    }, [isOpen])

    return scope
}
const NavbarMobile = ({ active }: { active: boolean }) => {
    const [show, setShow] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    const scope = handleAnimation(inputRef.current?.checked ? true : false)
    const handleShow = () => {
        setShow(!show)
    }

    return (
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
            className="lg:hidden p-2 rounded-xl fixed bottom-8 bg-blue z-50"
            ref={scope}
        >
            <ul className={`flex flex-col overflow-hidden`}>
                <NavLinkMobile href={route("gallery")} active={route().current("gallery")}>Galerie</NavLinkMobile>
                <NavLinkMobile href={route("event")} active={route().current("event")}>Events</NavLinkMobile>
                <NavLinkMobile href={route("about")} active={route().current("about")}>Über uns</NavLinkMobile>
                <NavLinkMobile href={route("theCrew")} active={route().current("theCrew")}>Die Crew</NavLinkMobile>
                <NavLinkMobile href={route("contact")} active={route().current("contact")} className="mb-8">Kontakt</NavLinkMobile>
            </ul>

            <div className="flex justify-between gap-8">
                <Link href={route("home")} className={`flex items-center rounded-full border ${route().current("home") ? "border-[#000000]" : "border-[#dafbf7]"} overflow-hidden`}>
                    <img src="./heatwave_logo.png" width={50} />
                </Link>
                <Hamburger inputRef={inputRef} onClick={handleShow} />
            </div>
        </motion.nav>
    )
}

export default NavbarMobile