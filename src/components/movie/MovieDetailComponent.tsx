import { MovieDetailDTO } from "../../app/models/movie.model";

interface Props {
    animeDetail?: MovieDetailDTO;
}

const MovieDetailComponent = ({ animeDetail }: Props) => {
    if (!animeDetail) return null;
    return (
        <div className="w-full min-h-screen bg-black text-white relative">
            {/* Hero Section */}
            <div className="h-[600px] w-full">
                <div className="h-full w-full relative">
                    <img
                        src={animeDetail.thumbnail}
                        alt="Anime Hero"
                        className="w-full h-full object-contain object-center bg-black"/>
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-12 w-1/2">
                        <img src={animeDetail.thumbnail}
                             alt="Anime Title"
                             className="w-72 mb-4 transform hover:scale-105 transition-transform duration-300 object-contain object-center bg-black"/>
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="text-green-500 font-semibold">98% Match</span>
                            <span className="border border-gray-600 px-2 py-0.5 text-xs">16+</span>
                            <span>2013-2023</span>
                            <span className="border border-gray-600 px-2 py-0.5 text-xs">HD</span>
                        </div>
                        <p className="text-lg mb-6">{animeDetail.description}</p>
                        <div className="flex space-x-4">
                            <button
                                className="bg-white text-black px-6 py-2 rounded flex items-center hover:bg-gray-200 transition-colors duration-300">
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

            {/* Episodes Section */}
            <section className="p-8">
                <h2 className="text-xl font-semibold mb-4">Episodes</h2>
                {animeDetail.seasons.map((season, index) => (
                    <div
                        key={index}
                        className="flex mb-6 border-b border-gray-800">
                        <button
                            className="pb-2 px-4 text-white border-b-2 border-red-600 mr-4">Season {season.seasonNumber}</button>
                    </div>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {animeDetail.seasons.map((season) => (
                        season.episodes.map((episode) => (
                            <div key={episode.id}
                                 className="flex bg-gray-900 rounded-md overflow-hidden hover:bg-gray-800 transition-colors duration-300 group">
                                <img
                                    src={episode.thumbnail || "https://via.placeholder.com/200x120?text=No+Image"}
                                    alt={`Episode ${episode.episodeNumber}`}
                                    className="w-[200px] h-[120px] object-contain object-center bg-black"/>
                                <div className="p-4 flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold">{episode.title}</h3>
                                        <span className="text-sm text-gray-400">{episode.duration}m</span>
                                    </div>
                                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">{episode.description}</p>
                                </div>
                                <div className="flex items-center pr-4">
                                    <button
                                        className="px-2 pt-1 bg-white rounded-full text-black transform group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined">play_arrow</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </section>

            {/* More Details Section */}
            <section className="p-8">
                <h2 className="text-xl font-semibold mb-4">More Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-gray-400 mb-2">Cast</h3>
                        <p>{animeDetail.casts}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-400 mb-2">Genres</h3>
                        {animeDetail.movieCategories.map((category, index) => (
                            <p key={index}>{category}</p>
                        ))}
                    </div>
                    <div>
                        <h3 className="text-gray-400 mb-2">Director</h3>
                        <p>{animeDetail.directors}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MovieDetailComponent; 