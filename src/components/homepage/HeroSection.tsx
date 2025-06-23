import { MovieDTO } from "../../app/models/movie.model.ts";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

interface Props {
    movieList?: MovieDTO[];
}

const HeroSection = ({ movieList }: Props) => {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (movieList && movieList.length > 1) {
            const timer = setInterval(() => {
                setCurrentMovieIndex(prevIndex => (prevIndex + 1) % movieList.length);
            }, 10000); // Change movie every 10 seconds
            return () => clearInterval(timer);
        }
    }, [movieList]);

    if (!movieList || movieList.length === 0) {
        return (
            <div className="h-[600px] w-full bg-black flex items-center justify-center">
                <p className="text-white">Loading movies...</p>
            </div>
        );
    }

    const currentMovie = movieList[currentMovieIndex];

    return (
        <div className="h-[600px] w-full">
            <div className="h-full w-full relative">
                <img
                    src={currentMovie.thumbnail}
                    alt={currentMovie.title}
                    className="w-full h-full object-cover"/>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 w-1/2">
                    <h1 className="text-5xl font-bold text-white mb-4">{currentMovie.title}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                        <span>{new Date(currentMovie.releaseDate).getFullYear()}</span>
                        <span className="border border-gray-600 px-2 py-0.5 text-xs">HD</span>
                    </div>
                    <p className="text-lg mb-6">{currentMovie.description}</p>
                    <div className="flex space-x-4">
                        <button
                            className="bg-white text-black px-6 py-2 rounded flex items-center hover:bg-gray-200 transition-colors duration-300"
                            onClick={() => {
                                navigate(`/movie/detail/${currentMovie.movieId}`);
                            }}
                            >
                            <span className="material-symbols-outlined mr-2">play_arrow</span> Play
                        </button>
                        <button
                            className="bg-gray-600/80 text-white px-6 py-2 rounded flex items-center hover:bg-gray-700 transition-colors duration-300">
                            <span className="material-symbols-outlined mr-2">add</span> My List
                        </button>
                        <button
                            className="rounded-full bg-gray-800/80 p-2.5 hover:bg-gray-700 transition-colors duration-300">
                            <span className="material-symbols-outlined">thumb_up</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(HeroSection); 