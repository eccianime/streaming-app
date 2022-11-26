export type ImageProps = {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export type ImageResultProps = {
    backdrops: ImageProps[];
    id: number;
    logos: ImageProps[];
    posters: ImageProps[];
}

export type PersonProps = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    // for cast
    cast_id?: number;
    character?: string;
    order?: number;
    // for crew
    department?: string;
    job?: string;
}

export type CreditResultProps = {
    id: number;
    cast: PersonProps[];
    crew: PersonProps[];
}