import InputError from "@/Components/common/InputError";
import InputLabel from "@/Components/common/InputLabel";
import PageHeadline from "@/Components/common/PageHeadline";
import TextInput from "@/Components/common/TextInput";
import MainLayout from "@/Layouts/MainLayout"
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

type ContactProps = {
    error: string;
    success: string;
}

// loading spinner
const PuffLoader = ({ size }: { size: number }) => {
    return (
        <svg width={`${size}`} height={`${size}`} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#dafbf7">
            <g fill="none" fillRule="evenodd" strokeWidth="2">
                <circle cx="22" cy="22" r="1">
                    <animate attributeName="r"
                        begin="0s" dur="1.8s"
                        values="1; 20"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.165, 0.84, 0.44, 1"
                        repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity"
                        begin="0s" dur="1.8s"
                        values="1; 0"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.3, 0.61, 0.355, 1"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="22" cy="22" r="1">
                    <animate attributeName="r"
                        begin="-0.9s" dur="1.8s"
                        values="1; 20"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.165, 0.84, 0.44, 1"
                        repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity"
                        begin="-0.9s" dur="1.8s"
                        values="1; 0"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.3, 0.61, 0.355, 1"
                        repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
    )
}

const Contact = ({ error, success }: ContactProps) => {
    const { data, setData, post, processing, wasSuccessful, errors, reset } = useForm({
        name: '',
        email: '',
        message: ''
    });

    // submit
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('kontakt'));
    };

    // reset form if success and no error
    useEffect(() => {
        if (wasSuccessful && !error) {
            reset()
        }
    }, [wasSuccessful])

    return (
        <MainLayout title="Contact" hideNav={false}>
            <main className="w-full p-8 flex-grow">
                <PageHeadline title="Kontaktiere uns!" />
                <div>
                    <ul className="mt-8 mx-auto w-fit lg:mt-16 text-xl lg:text-2xl text-left">
                        <li className="mb-2">
                            <a
                                href={"https://www.instagram.com/heatwave.association/"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img className="inline mr-2" src="/icons/bxl-instagram.svg" width={25} alt="Instagram" />
                                Instagram
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href={"mailto:email@email.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img className="inline mr-2" src="/icons/bx-envelope.svg" width={25} alt="Events" />
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
                    {error ? <span className="w-full mt-4 inline-block text-center text-red-600">{error}</span> : null}
                    <button className="mt-6 px-4 py-3 w-full flex justify-center rounded-lg bg-purple text-lightBlue shadow-xl hover:text-black duration-200 transition-colors">{processing ? <PuffLoader size={24} /> : "Senden"}</button>
                </form>
                {success ? <span className="w-full mt-4 inline-block text-center">{success}</span> : null}
            </main>
        </MainLayout>
    )
}

export default Contact