export interface Episode{
    id: number;
    episodeNumber: number;
    title: string;
    description: string;
    duration: number;
    thumbnail: string;
    videoUrl: string;
    releaseDate: Date;
    createdAt: Date;
    updatedAt: Date;
}