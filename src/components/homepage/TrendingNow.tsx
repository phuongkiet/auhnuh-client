import {MovieDTO} from "../../app/models/movie.model.ts";

interface TrendingNowProps {
    animeList: MovieDTO[] | undefined;
}

const TrendingNow: React.FC<TrendingNowProps> = ({ animeList }) => {
    return (
        <section className="py-6 px-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Trending Now</h2>
                <div className="flex space-x-2">
                    <button
                        className="bg-zinc-800 hover:bg-zinc-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                        className="bg-zinc-800 hover:bg-zinc-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {animeList?.map((anime, index) => (
                    <div
                        key={index}
                        className="relative group cursor-pointer overflow-hidden rounded-md transition-all duration-300 hover:scale-105 hover:z-10"
                    >
                        <img src={anime.thumbnail} alt={anime.title} className="w-full h-[240px] object-cover"/>
                        {/*<div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md">*/}
                        {/*    {anime.rating}*/}
                        {/*</div>*/}
                        <div
                            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="font-semibold">{anime.title}</h3>
                            <div className="flex items-center mt-2 space-x-2">
                                <button
                                    className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                                </button>
                                <button
                                    className="bg-zinc-800/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-zinc-700 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                                <button
                                    className="bg-zinc-800/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-zinc-700 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <span
                    className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors duration-300 cursor-pointer"></span>
                <span
                    className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors duration-300 cursor-pointer"></span>
                <span
                    className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors duration-300 cursor-pointer"></span>
            </div>
        </section>
    )
}

export default TrendingNow;