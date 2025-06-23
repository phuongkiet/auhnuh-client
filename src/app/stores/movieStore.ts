import {MovieDetailDTO, MovieDTO} from "../models/movie.model.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
// import {store} from "./store.ts";
// import { router } from "../router/route.tsx";
// import {toast} from "react-toastify";

export default class MovieStore {
    movies: MovieDTO[] = [];
    movie: MovieDetailDTO | undefined = undefined;
    totalPages: number = 0;
    totalItems: number = 0;
    currentPage: number = 1;
    pageSize: number = 10;
    term: string = "";
    constructor() {
        makeAutoObservable(this);
    }

    setCurrentPage = (page: number) => {
        this.currentPage = page;
    };

    getMovies = async () => {
        const response = await agent.Movie.list();
        if (response.data) {
            this.movies = response.data;
        }
    };

    getAdminMovies = async () => {
        const response = await agent.Movie.adminList(this.pageSize, this.currentPage, this.term);
        if (response.data) {
            runInAction(() => {
                this.movies = response.data!.results;
                this.totalPages = response.data!.totalPage;
                this.totalItems = response.data!.totalItems;
                console.log("Store updated:", { 
                    currentPage: this.currentPage, 
                    totalPages: this.totalPages, 
                    moviesLength: this.movies.length 
                });
            });
        }
    };

    getMovieByCategory = async (categoryId: number | null) => {
        const response = await agent.Movie.getMovieByCategory(this.pageSize, this.currentPage, categoryId);
        if (response.data) {
            runInAction(() => {
                this.movies = response.data!.results;
                this.totalPages = response.data!.totalPage;
                this.totalItems = response.data!.totalItems;
                console.log("Store updated:", { 
                    currentPage: this.currentPage, 
                    totalPages: this.totalPages, 
                    moviesLength: this.movies.length 
                });
            });
        }
    };

    getMovie = async (movieId: number) => {
        const response = await agent.Movie.getMovieDetail(movieId);
        if (response.data) {
            this.movie = response.data;
        }
    };

    setMovies = (movies: MovieDTO[]) => {
        this.movies = movies;
    };

    setMovie = (movie: MovieDetailDTO) => {
        this.movie = movie;
    };
}