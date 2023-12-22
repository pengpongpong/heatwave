import { Link } from "@inertiajs/react"


type NavLinkProps = {
    href: string;
    title: string;
    active: boolean;
}


const NavLink = ({ href, title, active }: NavLinkProps) => {

    return (
        <li>
            <Link
                href={href}
                preserveState
                className={`px-4 py-2 flex items-center rounded-xl border ${active ? "border-[#000000]" : "border-[#dafbf7]"} text-[#dafbf7] hover:border-black transition-all duration-300 cursor-pointer`}>
                {title}
            </Link>
        </li >
    )
}

export default NavLink