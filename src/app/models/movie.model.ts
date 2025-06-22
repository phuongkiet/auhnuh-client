import {Season} from "./season.model.ts";

export enum MovieStatus {
    OnAir = 0,
    Completed = 1,
    Dropped = 2,
    ComingSoon = 3,
}

export interface MovieDTO {
    movieId: number;
    title: string;
    description: string;
    releaseDate: Date;
    publisher: string;
    totalSeason: number;
    thumbnail: string;
    status: MovieStatus;
    createdAt: Date;
    updatedAt: Date;
    movieCategory: string[];
}

export interface MovieDetailDTO{
    movieId: number;
    title: string;
    description: string;
    releaseDate: Date;
    publisher: string;
    totalSeason: number;
    thumbnail: string;
    status: MovieStatus;
    casts: string;
    directors: string;
    createdAt: Date;
    updatedAt: Date;
    movieCategories: string[];
    seasons: Season[];
}