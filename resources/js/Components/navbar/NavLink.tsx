import { Link } from "@inertiajs/react"


type NavLinkProps = {
    href: string;
    title: string;
}


const NavLink = ({ href, title }: NavLinkProps) => {
    return (
        <li>
            <Link
                href={href}
                className="px-4 py-2 flex items-center rounded-xl border border-[#dafbf7] text-[#dafbf7] hover:border-black transition-all duration-300 cursor-pointer">
                {title}
            </Link>
        </li >
    )
}

export default NavLink