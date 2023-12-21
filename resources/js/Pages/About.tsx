import { Link } from "@inertiajs/react"
import MainLayout from "@/Layouts/MainLayout"

type Props = {}

const About = (props: Props) => {
    return (
        <MainLayout title="About" hideNav={false}>
            <main className="m-4 max-w-2xl flex-grow text-center">
                <h1 className="my-8 text-2xl lg:text-6xl text-center">What's all about?</h1>
                <p className="text-center leading-8 text-lg lg:text-xl lg:leading-10">
                    <img className="inline-block" src="/heatwave.png" width={90} alt="Heatwave" />
                    is a Graz-based event community that fosters inclusivity and connection. Rooted in Austria, it hosts diverse events, from cultural celebrations to artistic showcases, creating a dynamic space for local talent and fostering a sense of unity among participants. Heatwave contributes to the cultural vibrancy of Graz, offering memorable experiences that entertain, inspire creativity, and build lasting connections within the community.
                </p>
                <ul className="mt-8 lg:mt-24 lg:text-2xl">
                    <li className="mb-2">
                        <a
                            href={"https://www.instagram.com/heatwave.association/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2"
                        >
                            <img src="/bxl-instagram.svg" width={25} alt="Instagram" />
                            Instagram
                        </a>
                    </li>
                    <li className="mb-2">
                        <Link
                            href={route("home")}
                            className="flex gap-2"
                        >
                            <img src="/bx-calendar-event.svg" width={25} alt="Events" />
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("home")}
                            className="flex gap-2"
                        >
                            <img src="/bx-envelope.svg" width={25} alt="Contact" />
                            Contact
                        </Link>
                    </li>
                </ul>
            </main>
        </MainLayout>
    )
}

export default About