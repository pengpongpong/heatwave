import { FormEvent } from 'react';
import { useForm, Head } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/common/InputError';
import PrimaryButton from '@/Components/common/PrimaryButton';
import { EventProps, PageProps } from "@/types";

import EventItem from "@/Pages/Upload/EventItem";
import TextInput from "@/Components/common/TextInput";
import InputLabel from "@/Components/common/InputLabel";
import TextArea from "@/Components/common/TextArea";

export default function EventUpload({ auth, events }: PageProps<{ events: EventProps[] }>) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        date: "",
        time: "",
        location: "",
        artist: "",
        cover_url: null as File | null,
        description: "",
        type: "store"
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('event-upload.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Events" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <legend className="text-center text-xl">Create new Event</legend>
                    <div className="my-4">
                        <InputLabel htmlFor="eventName" value="Event Name" />

                        <TextInput
                            id="eventName"
                            name="eventName"
                            value={data.name}
                            className="mt-1 p-2 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="date" value="Date" />

                        <TextInput
                            type="date"
                            id="date"
                            name="date"
                            value={data.date}
                            className="mt-1 p-2 block w-full"
                            onChange={(e) => setData('date', e.target.value)}
                        />
                        <InputError message={errors.date} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="time" value="Time" />

                        <TextInput
                            type="time"
                            id="time"
                            name="time"
                            value={data.time}
                            className="mt-1 p-2 block w-full"
                            onChange={(e) => setData('time', e.target.value)}
                        />
                        <InputError message={errors.time} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="location" value="Location" />

                        <TextInput
                            id="location"
                            name="location"
                            value={data.location}
                            className="mt-1 p-2 block w-full"
                            onChange={(e) => setData('location', e.target.value)}
                        />
                        <InputError message={errors.location} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="artist" value="Artist" />

                        <TextInput
                            id="artist"
                            name="artist"
                            value={data.artist}
                            className="mt-1 p-2 block w-full"
                            onChange={(e) => setData('artist', e.target.value)}
                        />
                        <InputError message={errors.artist} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="cover_url" value="Cover Image" />

                        <TextInput
                            type="file"
                            id="cover_url"
                            name="cover_url"
                            defaultValue={typeof data.cover_url === 'string' ? data.cover_url : ""}
                            className="mt-1 p-2 block w-full"
                            onChange={e => {
                                if (!e.target.files) return
                                setData('cover_url', e.target.files[0])
                            }}
                        />
                        <InputError message={errors.cover_url} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="description" value="Description" />

                        <TextArea
                            value={data.description}
                            name="description"
                            placeholder="Description"
                            onChange={e => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </form>

                <ul role="list" className="mt-6 divide-y divide-dashed  divide-black border border-black">
                    {events.map((event: EventProps) => (
                        <EventItem event={event} key={event.id} auth={auth} />
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}