import { InertiaLinkProps, Link } from "@inertiajs/react"


const NavLinkMobile = ({ children, className = "", ...props }: InertiaLinkProps) => {
    return (
        <li>
            <Link
                {...props}
                className={`w-full mb-3 px-4 py-4 flex justify-center items-center rounded-xl border border-[#dafbf7]  text-[#dafbf7]  text-lg tracking-wider` + className}>
                {children}
            </Link>
        </li>
    )
}

export default NavLinkMobile