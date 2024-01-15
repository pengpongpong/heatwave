import { useEffect, useState } from "react";
import SwiperEl, { SwiperGalleryProps } from "./SwiperEl.js";


// swiper gallery
const SwiperGallery = ({ data }: SwiperGalleryProps) => {
    const [open, setOpen] = useState(false);

    const openDiv = () => {
        const body = document.querySelector('body');
        if (!body) return;

        body.style.overflowY = "hidden";
        window.scrollTo(0, 0);

        setOpen(true)
    }

    const closeDiv = () => {
        const body = document.querySelector('body');
        if (!body) return;

        body.style.overflowY = "auto";
        setOpen(false)
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeDiv()
            }
        }

        window.addEventListener("keydown", handleEsc)

        return () => window.removeEventListener("keydown", handleEsc)
    })

    return (
        <>
            {!data[0]?.url
                ? <h2 className="text-center mt-4">Coming soon...</h2>
                : <>
                    <SwiperEl data={data} onClick={openDiv} className={{ swiper: "h-[45vh] lg:h-[30vh] max-w-[100vw] lg:max-w-[60vw]", container: "w-full p-4 relative z-0" }} lazy={false} />

                    {/* Image Modal */}
                    <div className={`w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center ${open ? "visible" : "invisible"}`}>
                        <div className={`w-screen h-full absolute top-0 left-0 backdrop-blur z-10 ${open ? "visible opacity-100" : "invisible opacity-0"} transition-opacity duration-100 ease-in-out`}></div>
                        <button onClick={closeDiv} className="absolute right-6 top-6 z-30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" style={{ fill: "#000000" }}><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>
                        </button>
                        <SwiperEl data={data} onClick={() => null} lazy className={{ swiper: "h-[55vh] lg:h-[60vh]", container: `w-[90vw] p-4 z-20 relative flex flex-col items-center ${open ? "visible opacity-100" : "invisible opacity-0"} transition-opacity duration-100 ease-in-out` }} />
                    </div>
                </>}
        </>
    )
}

export default SwiperGallery