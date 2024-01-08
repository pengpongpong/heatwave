import { ImgHTMLAttributes, SVGAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="https://res.cloudinary.com/dzvrnl80x/image/upload/v1704718878/heatwave/heatwave_icon.png" {...props} />
    );
}
