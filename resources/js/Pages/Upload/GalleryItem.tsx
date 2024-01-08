import Dropdown from "@/Components/common/Dropdown"
import { PageProps } from "@/types";
import { ImageListProps } from "./GalleryUpload";

type GalleryItemProps = {
    imageList: ImageListProps[];
    name: string;
}

export default function GalleryItem({ name, imageList, auth }: PageProps<GalleryItemProps>) {
    return (
        <div className="py-5">
            <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>{name}</span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                    <ul>
                        {imageList.map((image) => {
                            if (image.event === name) {
                                return <li className="mb-4" key={image.url} >
                                    {image.user.id === auth.user.id &&
                                        <Dropdown>
                                            <Dropdown.Trigger headline={image.id}>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link as="button" href={route('gallery-upload.destroy', image.id)} method="delete">
                                                    Delete
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>

                                    }
                                    < img src={image.url} width={200} />
                                </li>
                            }
                        })}
                    </ul>
                </div>
            </details>
        </div>
    )
}