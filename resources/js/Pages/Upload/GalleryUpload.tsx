import { FormEvent, useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";

import InputError from "@/Components/common/InputError";
import PrimaryButton from "@/Components/common/PrimaryButton";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/common/InputLabel";
import TextInput from "@/Components/common/TextInput";
import GalleryItem from "./GalleryItem";
import { PageProps } from "@/types";

type GalleryUploadProps = {
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

const GalleryUpload = ({ imageList, eventList, error }: PageProps<GalleryUploadProps>) => {
    const { auth }: any = usePage().props;

    const { data, setData, post, processing, progress, reset, errors } = useForm({
        event: "",
        eventId: 0,
        images: null as any,
        'images.0': null as any
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
                    <legend className="text-center text-xl">Create new Event</legend>
                    <div className="my-4">
                        <InputLabel htmlFor="event" value="Event" />

                        <TextInput
                            id="event"
                            name="event"
                            value={data.event}
                            list="eventList"
                            placeholder="Event"
                            className="mt-1 p-2 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('event', e.target.value)}
                        />
                        <datalist id="eventList">
                            {
                                eventList.map((event) => (<option key={event.name} value={event.name} />))
                            }
                        </datalist>

                        <InputError message={errors.event} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="images" value="File" />

                        <TextInput
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            defaultValue={data.images}
                            className="mt-1 p-2 block w-full"
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
                        <InputError message={errors['images'] || errors['images.0']} className="mt-2" />
                    </div>

                    {error ? <span className="w-full mt-4 inline-block text-center text-red-600">{error}</span> : null}
                    <PrimaryButton className="mt-4" disabled={processing}>Save</PrimaryButton>
                </form>

                <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                    <ul className="mt-4">
                        {
                            eventList.map((event) => (
                                <li key={event.name}>
                                    <GalleryItem
                                        name={event.name}
                                        imageList={imageList}
                                        auth={auth}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div >

            </main >
        </AuthenticatedLayout >
    )
}

export default GalleryUpload