import { FormEvent } from 'react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/common/InputLabel";
import TextInput from "@/Components/common/TextInput";
import InputError from "@/Components/common/InputError";
import PrimaryButton from "@/Components/common/PrimaryButton";
import TextArea from "@/Components/common/TextArea";
import CrewItem from "./CrewItem";
import { PageProps } from "@/types";

export type CrewProps = {
    id: number;
    user_id: number;
    title: string;
    instagram: string;
    website: string;
    email: string;
    image_url: string;
    description: string;
    created_at: string;
    updated_at: string;
}

const CrewUpload = ({ auth, crew }: PageProps<{ crew: CrewProps[] }>) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        instagram: "",
        website: "",
        email: "",
        image_url: null as File | null,
        description: ""
    })

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('crew-upload.store'), { onSuccess: () => reset() });
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Crew" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <legend className="text-center text-xl">Create new Crew Member</legend>
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

                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </form>

                <ul role="list" className="mt-6 divide-y divide-dashed  divide-black border border-black">
                    {crew.map((member: CrewProps) => (
                        <CrewItem crew={member} key={member.id} auth={auth}/>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    )
}

export default CrewUpload