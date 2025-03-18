import {Season} from "./season.model.ts";

export interface MovieDTO {
    movieId: number;
    title: string;
    description: string;
    releaseDate: Date;
    publisher: string;
    totalSeason: number;
    thumbnail: string;
    status: string;
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
    status: string;
    casts: string;
    directors: string;
    createdAt: Date;
    updatedAt: Date;
    movieCategories: string[];
    seasons: Season[];
}