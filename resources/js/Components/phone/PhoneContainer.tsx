import "./PhoneContainer.scss"

type Props = {}

const PhoneContainer = (props: Props) => {
    return (
        <div className="phone">
            <span id="speaker">Speaker</span>
            <span id="camera">Camera</span>
            <video muted autoPlay loop disablePictureInPicture playsInline>
                <source src="https://res.cloudinary.com/dzvrnl80x/video/upload/v1704394054/heatwave/intro-100k.mp4" />
            </video>
        </div>
    )
}

export default PhoneContainer