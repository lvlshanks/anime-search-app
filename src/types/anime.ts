export interface Anime {
    images?: {
        jpg?: {
            image_url?: string;
        }
    };
    mal_id: string;
    members?: number;
    popularity?: number;
    rank?: number;
    score?: number;
    scored_by?: number;
    synopsis?: string;
    title?: string;
}
