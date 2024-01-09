import { ImgHTMLAttributes, SVGAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="https://res.cloudinary.com/dzvrnl80x/image/upload/v1704816852/heatwave/heatwave_icon.webp" {...props} />
    );
}
