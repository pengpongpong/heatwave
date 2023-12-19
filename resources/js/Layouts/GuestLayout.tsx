import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

import ApplicationLogo from '@/Components/dashboard/ApplicationLogo';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo width={200} className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full h-full">
                {children}
            </div>
        </div>
    );
}
