export interface ApiDataProps {
    id: string;
    idRef: string;
    title: string;
    image: string;
    descricao: string;
    director: string;
    producer: string;
    releaseDate: number;
    rtScore: number;
}

export interface ApiResponse {
    data: ApiDataProps[];
    count: number;
}