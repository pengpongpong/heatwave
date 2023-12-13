import React, { FormEvent } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import { EventProps, PageProps } from "@/types";

import Event from "@/Components/Event";

export default function Index({ auth, events }: PageProps & { events: EventProps[] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('events.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Events" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <legend>Create new Event</legend>
                    <div>
                        <label htmlFor="eventName" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            Event Name
                        </label>
                        <input
                            type="text"
                            name="eventName"
                            id="eventName"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            placeholder="Event Name"
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <label htmlFor="eventName" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            Date
                        </label>
                        <input
                            type="date"
                            name="location"
                            id="location"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            placeholder="Date"
                            value={data.date}
                            onChange={e => setData("date", e.target.value)}
                        />
                        <InputError message={errors.date} className="mt-2" />
                    </div>

                    <div>
                        <label htmlFor="eventName" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            Time
                        </label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            placeholder="Time"
                            value={data.time}
                            onChange={e => setData("time", e.target.value)}
                        />
                        <InputError message={errors.time} className="mt-2" />
                    </div>

                    <div>
                        <label htmlFor="eventName" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            placeholder="Location"
                            value={data.location}
                            onChange={e => setData("location", e.target.value)}
                        />
                        <InputError message={errors.location} className="mt-2" />
                    </div>


                    <label htmlFor="description" className="block mb-2 mt-4 text-sm font-medium leading-6 text-gray-900">
                        Description
                    </label>
                    <textarea
                        value={data.description}
                        name="description"
                        placeholder="Description"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('description', e.target.value)}
                    ></textarea>
                    <InputError message={errors.description} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Save</PrimaryButton>
                </form>

                <ul role="list" className="mt-6 divide-y divide-dashed  divide-black border border-black">
                    {events.map((event: EventProps) => (
                        <Event event={event} key={event.id} />
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}