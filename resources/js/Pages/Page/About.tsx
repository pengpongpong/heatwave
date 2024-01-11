import { Link } from "@inertiajs/react"
import MainLayout from "@/Layouts/MainLayout"
import PageHeadline from "@/Components/common/PageHeadline"

type AboutProps = {
    url: string;
}

const About = ({ url }: AboutProps) => {
    const seo = {
        title: "Über Uns",
        description: "",
        keywords: "",
        url: url,
        image: {
            url: "https://res.cloudinary.com/dzvrnl80x/image/upload/v1704816852/heatwave/heatwave_icon.webp",
            width: "2250",
            height: "1623",
            alt: "Heatwave"
        }
    }

    return (
        <MainLayout seo={seo} hideNav={false}>
            <main className="m-4 max-w-2xl flex-grow text-center">
                <PageHeadline title="Um was geht's?" />
                <p className="mt-8 lg:mt-20 text-center leading-8 text-lg lg:text-xl lg:leading-10">
                    <img className="inline-block" src="https://res.cloudinary.com/dzvrnl80x/image/upload/v1704816852/heatwave/heatwave_icon.webp" width={90} alt="Heatwave" />
                    ist eine in Graz ansässige Event-Community, die Inklusivität und Verbindung fördert. Sie ist in Österreich verwurzelt und veranstaltet verschiedenste Events, von kulturellen Feiern bis hin zu künstlerischen Präsentationen, und schafft so einen dynamischen Raum für lokale Talente und fördert das Zusammengehörigkeitsgefühl der Teilnehmer. Heatwave trägt zur kulturellen Lebendigkeit von Graz bei und bietet unvergessliche Erlebnisse, die unterhalten, die Kreativität anregen und dauerhafte Verbindungen innerhalb der Gemeinschaft schaffen.
                </p>
                <ul className="mt-8 mx-auto w-fit lg:mt-20 lg:text-2xl text-left">
                    <li className="mb-2">
                        <a
                            href={"https://www.instagram.com/heatwave.association/"}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img className="inline mr-2" src="/icons/bxl-instagram.svg" width={25} alt="Instagram" />
                            Instagram
                        </a>
                    </li>
                    <li className="mb-2">
                        <Link
                            href={route("events")}
                        >
                            <img className="inline mr-2" src="/icons/bx-calendar-event.svg" width={25} alt="Events" />
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("contact")}
                        >
                            <img className="inline mr-2" src="/icons/bx-envelope.svg" width={25} alt="Contact" />
                            Kontakt
                        </Link>
                    </li>
                </ul>
                <h2 className="mt-8 lg:mt-16 mb-4 text-3xl tracking-wider">HEATWAVE EST. 2023</h2>
            </main>
        </MainLayout>
    )
}

export default About