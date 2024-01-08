
const Footer = () => {
    return (
        <footer className="mt-12 w-full text-center text-xl relative">
            <span>&#169; 2023 - Heatwave</span>
            <a
                href={"https://www.instagram.com/heatwave.association/"}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-0 right-4 lg:right-8"
            >
                <img className="inline" src="/icons/bxl-instagram.svg" width={25} alt="Instagram" />
            </a>
        </footer>
    )
}

export default Footer