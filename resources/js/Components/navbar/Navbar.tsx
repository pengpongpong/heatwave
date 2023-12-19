import { Link } from "@inertiajs/react";

import { easeInOut, motion, useAnimate } from "framer-motion"
import { RefObject, useEffect, useRef, useState } from "react";

type NavLinkProps = {
    href: string;
    title: string;
}
const NavLink = ({ href, title }: NavLinkProps) => {
    return (
        <li className="px-4 py-2 flex items-center rounded-xl border border-[#000255] hover:border-[#dafbf7] transition-all duration-300 cursor-pointer">
            <Link href={href}>{title}</Link>
        </li >
    )
}
const NavLinkMobile = ({ href, title }: NavLinkProps) => {
    return (
        <li className="w-full mb-4 px-4 py-4 flex justify-center items-center rounded-xl border border-[#000255]">
            <Link href={href}>{title}</Link>
        </li >
    )
}

const Hamburger = ({ inputRef, onClick }: { inputRef: RefObject<HTMLInputElement>, onClick: () => void }) => {
    return (
        <label className="hamburger" onClick={onClick}>
            <input type="checkbox" ref={inputRef} />
            <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
            </svg>
        </label>
    )
}

const handleAnimation = (isOpen: boolean) => {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        animate(isOpen
            ? [
                [
                    "ul",
                    {
                        display: "flex"
                    }
                ],
                [
                    "ul",
                    {
                        width: "300px",
                    },
                    {
                        at: "<",
                    }
                ],
                [
                    "ul",
                    {
                        height: "300px",
                    }
                ]
            ]
            : [
                [
                    "ul",
                    {
                        height: "0px"
                    },
                ],
                [
                    "ul",
                    {
                        width: "0px",
                    },
                ],
                [
                    "ul",
                    {
                        display: "none"
                    },
                    {
                        at: "<",
                    }

                ]
            ])
    }, [isOpen])

    return scope
}

const Navbar = ({ active = false }: { active: boolean }) => {
    const [show, setShow] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    const scope = handleAnimation(inputRef.current?.checked ? true : false)

    const handleShow = () => {
        setShow(!show)
    }


    return (
        <>
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
                className="lg:hidden p-2 rounded-xl fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue"
                ref={scope}
            >
                <ul

                    className={`w-0 h-0 flex flex-col overflow-hidden`}
                >
                    <NavLinkMobile href={route("home")} title="Gallery" />
                    <NavLinkMobile href={route("home")} title="About" />
                    <NavLinkMobile href={route("home")} title="The Crew" />
                    <NavLinkMobile href={route("home")} title="Contact" />
                </ul>

                <div className="flex justify-between gap-2">
                    <div className="flex items-center rounded-full border border-[#000255] overflow-hidden">
                        <img src="./heatwave_logo.png" width={50} />
                    </div>
                    <Hamburger inputRef={inputRef} onClick={handleShow} />
                </div>
            </motion.nav>

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
                    <div className="relative flex items-center rounded-full border border-[#000255] hover:border-[#dafbf7] hover:scale-110 bg-[#01b9c3] transition-all duration-300 cursor-pointer overflow-hidden">
                        <img src="./heatwave_logo.png" width={50} />
                    </div>
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