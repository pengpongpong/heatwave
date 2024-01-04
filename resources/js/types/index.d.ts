export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};


export type EventProps = {
    id: number;
    user_id: number;
    name: string;
    date: Date;
    time: string;
    location: string;
    artist: string,
    cover_url: string,
    description: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
    }
}
