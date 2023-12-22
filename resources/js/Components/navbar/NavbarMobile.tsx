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
                <NavLinkMobile href={route("gallery")}>Gallery</NavLinkMobile>
                <NavLinkMobile href={route("event")}>Events</NavLinkMobile>
                <NavLinkMobile href={route("about")}>About</NavLinkMobile>
                <NavLinkMobile href={route("home")}>The Crew</NavLinkMobile>
                <NavLinkMobile href={route("home")} className="mb-8">Contact</NavLinkMobile>
            </ul>

            <div className="flex justify-between gap-8">
                <Link href={route("home")} className="flex items-center rounded-full border border-white overflow-hidden">
                    <img src="./heatwave_logo.png" width={50} />
                </Link>
                <Hamburger inputRef={inputRef} onClick={handleShow} />
            </div>
        </motion.nav>
    )
}

export default NavbarMobile