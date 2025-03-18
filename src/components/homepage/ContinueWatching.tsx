import {MovieDTO} from "../../app/models/movie.model.ts";
import {useNavigate} from "react-router-dom";

interface ContinueWatchingProps {
    animeList: MovieDTO[] | undefined;
}

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ animeList }) => {

    const navigate = useNavigate();

    return (
        <section className="py-6 px-12">
            <h2 className="text-2xl font-bold mb-6">Continue Watching</h2>
            <div className="relative">
                {/* Scrollable Container */}
                <div className="scrollable-container1 flex space-x-6 overflow-x-hidden scroll-smooth pb-4">
                    {animeList?.map((anime, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer overflow-hidden rounded-md transition-transform duration-300 hover:scale-105 min-w-[220px]"
                        >
                            <img src={anime.thumbnail} alt={anime.title} className="w-[220px] h-[160px] object-cover"/>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-700">
                                <div className="h-full bg-red-600" style={{ width: `50%` }}></div>
                            </div>
                            <div
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <button
                                    className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-300"
                                    onClick={() => navigate(`/movie/detail/${anime.movieId}`)} // Navigate to detail page
                                >
                                    <span className="material-symbols-outlined">play_arrow</span>
                                </button>
                            </div>
                            <div
                                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-3">
                                <h3 className="font-semibold text-sm">{anime.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Scroll Button */}
                <button
                    className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 shadow-lg"
                    onClick={() => {
                        document.querySelector(".scrollable-container1")?.scrollBy({ left: 220, behavior: "smooth" });
                    }}>
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>

                {/* Left Scroll Button */}
                <button
                    className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 shadow-lg"
                    onClick={() => {
                        document.querySelector(".scrollable-container1")?.scrollBy({ left: -220, behavior: "smooth" });
                    }}>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <span className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors duration-300 cursor-pointer"></span>
                <span className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors duration-300 cursor-pointer"></span>
                <span className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors duration-300 cursor-pointer"></span>
            </div>
        </section>
    );
};

export default ContinueWatching;
