import { FormEvent, useState } from 'react';
import { useForm } from '@inertiajs/react';

import Dropdown from '@/Components/common/Dropdown';
import InputError from '@/Components/common/InputError';
import PrimaryButton from '@/Components/common/PrimaryButton';
import InputLabel from "@/Components/common/InputLabel";
import TextInput from "@/Components/common/TextInput";
import TextArea from "@/Components/common/TextArea";
import { EventProps, PageProps } from "@/types";

const eventDate = (date: Date) => {
    return new Date(date).toLocaleDateString("de-AT", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function EventItem({ auth, event }: PageProps<{ event: EventProps }>) {
    const [editing, setEditing] = useState(false);

    const { data, setData, post, clearErrors, reset, processing, errors } = useForm({
        name: event.name,
        date: `${event.date}`,
        time: event.time,
        location: event.location,
        artist: event.artist,
        cover_url: null as File | null,
        description: event.description,
        type: "update"
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route('event-upload.update', event.id), { onSuccess: () => setEditing(false) });
    };

    return (
        <li key={event.id} className="flex-col justify-between gap-x-6 p-4">
            {event.user.id === auth.user.id &&
                <Dropdown>
                    <Dropdown.Trigger headline={event.name}>
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
                        <Dropdown.Link as="button" href={route('event-upload.destroy', event.id)} method="delete">
                            Delete
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            }

            <div className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{event.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{event.location}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">{eventDate(event.date)}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        Time: <time dateTime={event.time}>{event.time}</time>
                    </p>
                </div>
            </div>

            <p className="text-gray-800">Artist: {event.artist}</p>
            <img src={event.cover_url} width={150} />
            <div>
                <span className="text-gray-800">{event.user.name}</span>
                <small className="ml-2 text-sm text-gray-600">{new Date(event.updated_at).toLocaleString("de-AT")}</small>
                {event.created_at !== event.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
            </div>


            {editing
                ? <form onSubmit={submit}>

                    <div className="my-4">
                        <InputLabel htmlFor="eventName" value="Event Name" />

                        <TextInput
                            id="eventName"
                            name="eventName"
                            value={data.name}
                            className="mt-1 p-2 block w-full"
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

                    <div className="space-x-2">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                    </div>
                </form>
                : <p className="mt-4 text-gray-900">Description: {event.description}</p>
            }
        </li>
    )
}
