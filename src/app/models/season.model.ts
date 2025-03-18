import {Episode} from "./episode.model.ts";

export interface Season {
    id: number;
    seasonNumber: number;
    totalEpisode: number;
    createdAt: Date;
    updatedAt: Date;
    episodes: Episode[];
}