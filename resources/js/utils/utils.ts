import imageUrlBuilder from '@sanity/image-url'

export type ImageBuilderProps = {
    sanityConfig: {
        projectId: string;
        dataset: "production" | "development"
    },
    image: {
        _type: "image";
        asset: {
            _type: "reference";
            _ref: string;
        }
    }
}

export function urlFor(source: ImageBuilderProps["image"], sanityConfig: ImageBuilderProps["sanityConfig"]) {
    return imageUrlBuilder(sanityConfig).image(source).auto('format')
}