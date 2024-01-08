import { FormEvent, useState } from 'react';
import { useForm } from '@inertiajs/react';

import Dropdown from '@/Components/common/Dropdown';
import InputError from '@/Components/common/InputError';
import PrimaryButton from '@/Components/common/PrimaryButton';
import InputLabel from "@/Components/common/InputLabel";
import TextInput from "@/Components/common/TextInput";
import TextArea from "@/Components/common/TextArea";
import { CrewProps } from "./CrewUpload";
import { PageProps } from "@/types";


export default function CrewItem({ auth, crew }: PageProps<{ crew: CrewProps }>) {
    const [editing, setEditing] = useState(false);

    const { data, setData, post, clearErrors, reset, processing, errors } = useForm({
        title: crew.title,
        instagram: crew.instagram,
        website: crew.website,
        email: crew.email,
        image_url:  null as File | null,
        description: crew.description,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route('crew-upload.update', crew.id), { onSuccess: () => setEditing(false) });
    };

    return (
        <li key={crew.id} className="flex-col justify-between gap-x-6 p-4">
            {crew.user.id === auth.user.id &&
                <Dropdown>
                    <Dropdown.Trigger headline={`Crew Member: ${crew.title}`}>
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
                        <Dropdown.Link as="button" href={route('crew-upload.destroy', crew.id)} method="delete">
                            Delete
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            }

            <div className="flex justify-between gap-x-6 py-5">
                <div className="flex flex-col min-w-0 gap-x-4 text-gray-900">
                    <p>Title: {crew.title}</p>
                    <p>Instagram: <a className="underline" target="_blank" rel="noopener noreferrer" href={crew.instagram}>{crew.instagram}</a></p>
                    <p>Website:  <a className="underline" target="_blank" rel="noopener noreferrer" href={crew.website}>{crew.website}</a></p>
                    <p>Email: <a className="underline" target="_blank" rel="noopener noreferrer" href={`mailto:${crew.email}`}>{crew.email}</a></p>
                </div>
            </div>

            <img src={crew.image_url} width={150} />
            <div className="mt-2">
                <span className="text-gray-800">Created by: {auth.user.name}</span>
                <small className="ml-2 text-sm text-gray-600">{new Date(crew.updated_at).toLocaleString("de-AT")}</small>
                {crew.created_at !== crew.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
            </div>


            {editing
                ? <form onSubmit={submit}>
                    <div className="my-4">
                        <InputLabel htmlFor="title" value="Crew Name" />

                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="mt-1 p-2 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="my-4">
                        <InputLabel htmlFor="instagram" value="Instagram Url" />

                        <TextInput
                            id="instagram"
                            name="instagram"
                            value={data.instagram}
                            className="mt-1 p-2 block w-full"
                            onChange={(e) => setData('instagram', e.target.value)}
                        />
                        <InputError message={errors.instagram} className="mt-2" />
                    </div>

                    <div className="my-4">
                        <InputLabel htmlFor="website" value="Website Url" />

                        <TextInput
                            id="website"
                            name="website"
                            value={data.website}
                            className="mt-1 p-2 block w-full"
                            onChange={(e) => setData('website', e.target.value)}
                        />
                        <InputError message={errors.website} className="mt-2" />
                    </div>

                    <div className="my-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            className="mt-1 p-2 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="my-4">
                        <InputLabel htmlFor="image_url" value="Image Upload" />

                        <TextInput
                            type="file"
                            id="image_url"
                            name="image_url"
                            defaultValue={typeof data.image_url === 'string' ? data.image_url : ""}
                            className="mt-1 p-2 block w-full"
                            onChange={(e) => {
                                if (!e.target.files) return;

                                setData('image_url', e.target.files[0]);
                            }}
                        />
                        <InputError message={errors.image_url} className="mt-2" />
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
                : <p className="mt-4 text-gray-900">Description: {crew.description}</p>
            }
        </li>
    )
}
