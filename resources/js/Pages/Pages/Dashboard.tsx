import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import NavLink from "@/Components/common/NavLink";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                        <NavLink className="ml-4 text-xl underline" href={route('event-upload.index')} active={route().current('event-upload.index')}>Event Upload</NavLink>
                        <NavLink className="ml-4 text-xl underline" href={route('gallery-upload.index')} active={route().current('gallery-upload.index')}>Gallery Upload</NavLink>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
