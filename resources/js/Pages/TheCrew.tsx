import MainLayout from "@/Layouts/MainLayout"

const CrewSlide = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="mb-8 flex flex-col xl:flex-row gap-4 justify-center items-center">
            <div className="max-w-3xl mx-4 px-4 py-2 flex flex-col xl:flex-row gap-6 rounded-xl">
                <img className="w-fit xl:w-40 rounded-xl" width={200} src={imageUrl} alt="" />
                <p className="lg:text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <ul className="flex xl:block gap-2 lg:text-2xl">
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
                    <a
                        href={route("event")}
                        className="flex gap-2"
                    >
                        <img src="/bxs-hand-right.svg" width={25} alt="Events" />
                        Website
                    </a>
                </li>
                <li>
                    <a
                        href={route("home")}
                        className="flex gap-2"
                    >
                        <img src="/bx-envelope.svg" width={25} alt="Mail icon" />
                        Kontakt
                    </a>
                </li>
            </ul>
        </div>
    )
}

const CrewSlideReverse = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="mb-8 flex flex-col xl:flex-row-reverse gap-4 justify-center items-center">
            <div className="max-w-3xl mx-4 px-4 py-2 flex flex-col xl:flex-row-reverse gap-4 rounded-xl">
                <img className="w-fit xl:w-40 rounded-xl" width={200} src={imageUrl} alt="" />
                <p className="lg:text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <ul className="lg:text-2xl">
                <li className="mb-2 flex justify-end">
                    <a
                        href={"https://www.instagram.com/heatwave.association/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2"
                    >
                        Instagram
                        <img src="/bxl-instagram.svg" width={25} alt="Instagram" />
                    </a>
                </li>
                <li className="mb-2 flex justify-end">
                    <a
                        href={route("event")}
                        className="flex gap-2"
                    >
                        Website
                        <img className="-scale-x-100" src="/bxs-hand-right.svg" width={25} alt="Events" />
                    </a>
                </li>
                <li className="flex justify-end">
                    <a
                        href={route("home")}
                        className="flex gap-2"
                    >
                        Kontakt
                        <img src="/bx-envelope.svg" width={25} alt="Mail" />
                    </a>
                </li>
            </ul>
        </div>
    )
}

const TheCrew = () => {
    return (
        <MainLayout
            title="The Crew"
            hideNav={false}>
            <main className="pb-8 flex flex-col flex-grow gap-4">
                <h1 className="my-8 text-2xl lg:text-6xl text-center">Die Crew</h1>

                <div className="flex lg:hidden flex-col gap-4">
                    <CrewSlide imageUrl="/crew.png" />
                    <CrewSlide imageUrl="/crew2.png" />
                    <CrewSlide imageUrl="/crew.png" />
                </div>

                <div className="hidden lg:flex flex-col gap-4">
                    <CrewSlide imageUrl="/crew.png" />
                    <CrewSlideReverse imageUrl="/crew2.png" />
                    <CrewSlide imageUrl="/crew.png" />
                </div>

            </main>
        </MainLayout>
    )
}

export default TheCrew