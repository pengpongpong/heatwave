import { InertiaLinkProps, Link } from "@inertiajs/react"


const NavLink = ({ children, active, className = "", ...props }: InertiaLinkProps & { active: boolean }) => {

    return (
        <li>
            <Link
                {...props}
                preserveState
                className={`px-4 py-2 flex items-center rounded-xl border ${active ? "border-[#000000]" : "border-[#dafbf7]"} text-[#dafbf7] hover:border-black transition-all duration-300 cursor-pointer` + className}>
                {children}
            </Link>
        </li >
    )
}

export default NavLink