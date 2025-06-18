import '../../app/layout/App.css'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Episode} from "../../app/models/episode.model.ts";
import {Season} from "../../app/models/season.model.ts";

const MovieStreaming = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const {episodeId} = useParams();
    const animeDetail = location.state?.animeDetail;
    const episode: Episode = animeDetail?.seasons
        ?.flatMap((season: { episodes: { id: number }[] }) => season.episodes)
        ?.find((ep: { id: number }) => ep.id === Number(episodeId));

    const castList = animeDetail.casts.split(",").map((cast: string) => cast.trim());
    const directorList = animeDetail.directors.split(",").map((director: string) => director.trim());

    const watchMovie = (episodeId: number) => {
        if (!animeDetail) return;
        navigate(`/movie/detail/movie-streaming/${episodeId}`, {state: {animeDetail}});
    }

    return (
        <div id="webcrumbs" className='w-full min-h-scree text-white'>
            <div className="pt-20 pb-10 bg-black text-white font-sans">
                <div className="relative aspect-video bg-gray-900 mb-6 rounded overflow-hidden group">
                    {/* YouTube Embed */}
                    <iframe
                        className="w-full h-full"
                        src={episode?.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="px-4">
                    <div className="flex items-center gap-3 mb-4">
                        <span
                            className="bg-red-600 text-white px-2 py-1 text-sm rounded">
                            S{animeDetail?.seasons?.find((season: {
                                seasonNumber: number;
                                episodes: { id: number }[]
                            }) =>
                                season.episodes.some((ep: { id: number }) => ep.id === Number(episodeId))
                        )?.seasonNumber}
                            E{episode?.episodeNumber}
                        </span>
                        <h2 className="text-xl font-bold">{episode.title}</h2>
                    </div>

                    <div className="flex gap-8">
                        <div className="w-2/3">
                            <div className="mb-8">
                                <p className="text-gray-300 mb-4">
                                    {episode.description}
                                </p>
                                <div className="flex flex-wrap gap-3 mb-4">
                                    {animeDetail?.movieCategories.map((category: string, index: number) => (
                                        <span
                                            className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition-colors"
                                            key={index}>{category}</span>
                                    ))}
                                </div>
                                <div className="flex gap-4 text-sm text-gray-400">
                                    <div>{new Date(animeDetail.releaseDate).getFullYear()}</div>
                                    <div>{animeDetail.totalSeason === 1 ? `${animeDetail.totalSeason} Season` : `${animeDetail.totalSeason} Seasons`}
                                    </div>
                                    <div>Full HD</div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4 flex items-center">
                                    <span className="material-symbols-outlined mr-2">playlist_play</span>
                                    Seasons & Episodes
                                </h3>

                                {animeDetail?.seasons?.map((season: Season) => (
                                    <details key={season.id} className="bg-gray-900 rounded mb-2 group">
                                        <summary
                                            className="p-4 cursor-pointer list-none flex justify-between items-center hover:bg-gray-800 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="text-red-600 font-bold">Season {season.seasonNumber}</span>
                                                <span
                                                    className="text-sm text-gray-400">{season.episodes.length} episodes</span>
                                            </div>
                                            <span
                                                className="material-symbols-outlined transform group-open:rotate-180 transition-transform">
                                                expand_more
                                            </span>
                                        </summary>
                                        <div className="px-4 pb-4">
                                            <ul className="space-y-2">
                                                {season.episodes.map((episode) => (
                                                    <li
                                                        key={episode.id}
                                                        onClick={() => watchMovie(episode.id)}
                                                        className="p-3 rounded bg-gray-800 hover:bg-gray-700 transition-colors flex justify-between cursor-pointer"
                                                    >
                                                        <div>
                                                            <span
                                                                className="text-red-600 mr-2">Ep {episode.episodeNumber}.</span>
                                                            <span>{episode.title}</span>
                                                        </div>
                                                        <span className="text-gray-400">{episode.duration}m</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </details>
                                ))}
                            </div>

                            <div>
                                <h3 className="text-lg font-bold mb-4 flex items-center">
                                    <span className="material-symbols-outlined mr-2">forum</span>
                                    Comments
                                </h3>

                                <div className="flex gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                                        <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User Avatar"
                                             className="w-full h-full object-cover"/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-900 rounded p-4 mb-2">
                                            <textarea placeholder="Add a comment..."
                                                      className="w-full bg-transparent outline-none resize-none h-20"/>
                                        </div>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded">Post
                                            Comment
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div
                                            className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar"
                                                 className="w-full h-full object-cover"/>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold">Mike Wheeler</span>
                                                <span className="text-gray-400 text-sm">3 days ago</span>
                                            </div>
                                            <p className="text-gray-300 mb-2">This first episode really sets the tone
                                                for the whole series. The atmosphere is incredible and the kids' acting
                                                is phenomenal!</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <button
                                                    className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                                                    124
                                                </button>
                                                <button
                                                    className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                                    <span
                                                        className="material-symbols-outlined text-sm">thumb_down</span>
                                                    8
                                                </button>
                                                <button className="hover:text-red-600 transition-colors">Reply</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div
                                            className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                                            <img src="https://randomuser.me/api/portraits/women/44.jpg"
                                                 alt="User Avatar" className="w-full h-full object-cover"/>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold">Jane Hopper</span>
                                                <span className="text-gray-400 text-sm">1 week ago</span>
                                            </div>
                                            <p className="text-gray-300 mb-2">That scene where Will is biking home alone
                                                still gives me chills every time I rewatch it. The music and
                                                cinematography are perfect.</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <button
                                                    className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                                                    87
                                                </button>
                                                <button
                                                    className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                                    <span
                                                        className="material-symbols-outlined text-sm">thumb_down</span>
                                                    3
                                                </button>
                                                <button className="hover:text-red-600 transition-colors">Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Next: "Add pagination for comments" */}
                            </div>
                        </div>

                        <div className="w-1/3">
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4 flex items-center">
                                    <span className="material-symbols-outlined mr-2">group</span>
                                    Voice Actress
                                </h3>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {castList.map((cast: string) => (
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-semibold">{cast}</div>
                                                <div className="text-sm text-gray-400">Voice Actress</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold mb-4 flex items-center">
                                        <span className="material-symbols-outlined mr-2">group</span>
                                        Directors
                                    </h3>
                                    <div className="flex items-center gap-3 mb-2">
                                        {directorList.map((directors: string) => (
                                            <div>
                                                <div className="font-semibold">{directors}</div>
                                                <div className="text-sm text-gray-400">Director</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold mb-4 flex items-center">
                                    <span className="material-symbols-outlined mr-2">local_movies</span>
                                    Related Titles
                                </h3>

                                <div className="space-y-4">
                                    <div
                                        className="group bg-gray-900 rounded overflow-hidden hover:bg-gray-800 transition-colors">
                                        <div className="relative h-32">
                                            <img
                                                src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400&auto=format&fit=crop"
                                                alt="Dark" className="w-full h-full object-cover"/>
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                            <div
                                                className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Series
                                            </div>
                                            <div
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 transition-colors rounded-full w-12 h-12 flex items-center justify-center">
                                                    <span className="material-symbols-outlined">play_arrow</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-semibold mb-1">Dark</h4>
                                            <div className="flex justify-between text-sm text-gray-400">
                                                <span>2017-2020</span>
                                                <div className="flex items-center gap-1">
                                                    <span
                                                        className="material-symbols-outlined text-red-600 text-xs">star</span>
                                                    <span>8.7/10</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="group bg-gray-900 rounded overflow-hidden hover:bg-gray-800 transition-colors">
                                        <div className="relative h-32">
                                            <img
                                                src="https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=400&auto=format&fit=crop"
                                                alt="The OA" className="w-full h-full object-cover"/>
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                            <div
                                                className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Series
                                            </div>
                                            <div
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 transition-colors rounded-full w-12 h-12 flex items-center justify-center">
                                                    <span className="material-symbols-outlined">play_arrow</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-semibold mb-1">The OA</h4>
                                            <div className="flex justify-between text-sm text-gray-400">
                                                <span>2016-2019</span>
                                                <div className="flex items-center gap-1">
                                                    <span
                                                        className="material-symbols-outlined text-red-600 text-xs">star</span>
                                                    <span>7.9/10</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="group bg-gray-900 rounded overflow-hidden hover:bg-gray-800 transition-colors">
                                        <div className="relative h-32">
                                            <img
                                                src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=400&auto=format&fit=crop"
                                                alt="Black Mirror" className="w-full h-full object-cover"/>
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                            <div
                                                className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Series
                                            </div>
                                            <div
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 transition-colors rounded-full w-12 h-12 flex items-center justify-center">
                                                    <span className="material-symbols-outlined">play_arrow</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-semibold mb-1">Black Mirror</h4>
                                            <div className="flex justify-between text-sm text-gray-400">
                                                <span>2011-2023</span>
                                                <div className="flex items-center gap-1">
                                                    <span
                                                        className="material-symbols-outlined text-red-600 text-xs">star</span>
                                                    <span>8.8/10</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Next: "Add 'See more' button with pagination" */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieStreaming;