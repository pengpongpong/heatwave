import Dropdown from "@/Components/dashboard/Dropdown";
import InputError from "@/Components/dashboard/InputError";
import PrimaryButton from "@/Components/dashboard/PrimaryButton";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEvent, useEffect, useState } from "react";

type EventImageProps = {
    error: string;
    events: string[];
    imageList: {
        [key: string]: string[]
    };
    test: any
}
const EventImage = ({ error, events, imageList, test }: PageProps<EventImageProps>) => {
    const { data, setData, post, processing, progress, reset, errors } = useForm({
        title: "",
        event: "",
        image: null as any
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('upload'), { onSuccess: () => reset() });
    }


    // !fix
    const [editing, setEditing] = useState(false);
    const { auth }: any = usePage().props;


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Image Upload</h2>}
        >
            <Head title="Event Image Upload" />
            <main className="max-w-2xl mx-auto ">
                <form className="mt-8" onSubmit={onSubmit}>
                    <legend>Upload Event Image</legend>
                    <div>
                        <label htmlFor="title " className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            placeholder="Title"
                            value={data.title}
                            onChange={e => setData("title", e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div>
                        <label htmlFor="event" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            Event
                        </label>
                        <input
                            type="text"
                            name="event"
                            id="event"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            placeholder="Event"
                            value={data.event}
                            onChange={e => setData("event", e.target.value)}
                        />
                        <InputError message={errors.event} className="mt-2" />
                    </div>

                    <div>
                        <label htmlFor="image" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            File
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            defaultValue={data.image}
                            onChange={e => {
                                if (!e.target.files) return
                                setData('image', e.target.files[0])
                            }}
                        />

                        {progress && (
                            <progress className="w-full" value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                        <InputError message={errors.image} className="mt-2" />
                    </div>
                    {error ? <span className="w-full mt-4 inline-block text-center text-red-600">{error}</span> : null}
                    <PrimaryButton className="mt-4" disabled={processing}>Save</PrimaryButton>
                </form>

                <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                    <ul className="mt-4">
                        {
                            Object.keys(imageList).map((key) => (
                                <li>
                                    {auth.user.id === auth.user.id &&
                                        <Dropdown>
                                            <Dropdown.Trigger headline={auth.name}>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                                    Edit
                                                </button>
                                                <Dropdown.Link as="button" href={route('upload.destroy', auth.id)} method="delete">
                                                    Delete
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    }
                                    <div className="py-5">
                                        <details className="group">
                                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                                <span>{key}</span>
                                                <span className="transition group-open:rotate-180">
                                                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </summary>
                                            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                                <ul>
                                                    {imageList[key].map((image) => (<li>{image}</li>))}
                                                </ul>
                                            </p>
                                        </details>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </main>
        </AuthenticatedLayout>
    )
}

export default EventImage