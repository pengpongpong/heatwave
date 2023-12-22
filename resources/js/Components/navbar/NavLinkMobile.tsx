import { InertiaLinkProps, Link } from "@inertiajs/react"


const NavLinkMobile = ({ children, className = "", active, ...props }: InertiaLinkProps & { active: boolean }) => {
    return (
        <li>
            <Link
                {...props}
                preserveState
                className={`inline-block w-full mb-3 px-4 py-4 rounded-xl border ${active ? "border-[#000000]" : "border-[#dafbf7]"} text-[#dafbf7] text-lg tracking-wider` + className}>
                {children}
            </Link>
        </li>
    )
}

export default NavLinkMobile