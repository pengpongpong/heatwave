import Dropdown from "@/Components/dashboard/Dropdown";
import InputError from "@/Components/dashboard/InputError";
import PrimaryButton from "@/Components/dashboard/PrimaryButton";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEvent, useEffect, useState } from "react";

type EventImageProps = {
    imageList: {
        event: string;
        url: string;
        id: string;
    }[];
    eventList: {
        name: string,
        id: number
    }[],
    error?: string
}
const EventImage = ({ imageList, eventList, error }: PageProps<EventImageProps>) => {
    const { auth }: any = usePage().props;

    const { data, setData, post, processing, progress, reset, errors } = useForm({
        event: "",
        eventId: 0,
        images: null as any
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('gallery-upload.store'), { onSuccess: () => reset() });
    }

    // set event id on event name input
    useEffect(() => {
        const currentId = eventList.filter((event) => (event.name === data.event))

        if (currentId.length) {
            setData('eventId', currentId[0].id)
        }
    }, [data.event])

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
                        <label htmlFor="event" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            Event
                        </label>
                        <input
                            type="text"
                            name="event"
                            id="event"
                            list="eventList"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            placeholder="Event"
                            value={data.event}
                            onChange={e => { setData("event", e.target.value) }}
                        />
                        <datalist id="eventList">
                            {
                                eventList.map((event) => (<option key={event.name} value={event.name} />))
                            }
                        </datalist>
                        <InputError message={errors.event} className="mt-2" />
                    </div>

                    <div>
                        <label htmlFor="images" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            File
                        </label>
                        <input
                            type="file"
                            name="images[]"
                            id="images"
                            multiple
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            defaultValue={data.images}
                            onChange={e => {
                                if (!e.target.files) return
                                setData('images', e.target.files)
                            }}
                        />

                        {progress && (
                            <progress className="w-full" value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                        <InputError message={errors.images} className="mt-2" />
                    </div>
                    {error ? <span className="w-full mt-4 inline-block text-center text-red-600">{error}</span> : null}
                    <PrimaryButton className="mt-4" disabled={processing}>Save</PrimaryButton>
                </form>

                <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                    <ul className="mt-4">
                        {
                            eventList.map((event) => (
                                <li key={event.name}>
                                    <div className="py-5">
                                        <details className="group">
                                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                                <span>{event.name}</span>
                                                <span className="transition group-open:rotate-180">
                                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </summary>
                                            <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                                <ul>
                                                    {imageList.map((image) => {
                                                        if (image.event === event.name) {
                                                            return <li className="mb-4" key={image.url} >
                                                                {
                                                                    <Dropdown>
                                                                        <Dropdown.Trigger headline={auth.name}>
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
                                </li>
                            ))
                        }
                    </ul>
                </div >

            </main >
        </AuthenticatedLayout >
    )
}

export default EventImage