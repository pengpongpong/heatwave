import InputError from "@/Components/dashboard/InputError";
import InputLabel from "@/Components/dashboard/InputLabel";
import TextInput from "@/Components/dashboard/TextInput";
import MainLayout from "@/Layouts/MainLayout"
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";


const Contact = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('register'));
    };

    return (
        <MainLayout title="Contact" hideNav={false}>
            <main className="w-full p-8 flex-grow">
                <h1 className="my-8 text-2xl lg:text-6xl text-center">Kontaktiere uns!</h1>

                <div>
                    <ul className="mt-8 mx-auto w-fit lg:mt-24 text-xl lg:text-2xl text-left">
                        <li className="mb-2">
                            <a
                                href={"https://www.instagram.com/heatwave.association/"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img className="inline mr-2" src="/bxl-instagram.svg" width={25} alt="Instagram" />
                                Instagram
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href={"mailto:email@email.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img className="inline mr-2" src="/bx-envelope.svg" width={25} alt="Events" />
                                Email
                            </a>
                        </li>
                    </ul>
                </div>

                <form onSubmit={submit} className="mt-8 max-w-xl mx-auto">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="message" value="Nachricht" />

                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={data.message}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            autoComplete="username"
                            onChange={(e) => setData('message', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <button className="mt-6 px-4 py-3 w-full rounded-lg bg-purple text-lightBlue shadow-xl">Senden</button>
                </form>
            </main>
        </MainLayout>
    )
}

export default Contact