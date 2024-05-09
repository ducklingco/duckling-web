export default interface Duck {
    id: string;
    title: string;
    description: string;
    cover_image: {
        id: string;
        path: string;
        created_at: string;
        updated_at: string;
    };
    total_cards: number;
    created_by: {
        id: string;
        profile_picture: {
            id: string;
            path: string;
            created_at: string;
            updated_at: string;
        };
        first_name: string;
        last_name: string;
        username: string;
        bio: string;
        birthday: string;
        register_completed_at: string;
        created_at: string;
        updated_at: string;
    };
    latest_topics: [{
        id: string;
        name: string;
    }];
    published_at: string;
    verified_at: string;
    featured_at: string;
    created_at: string;
    updated_at: string;
}