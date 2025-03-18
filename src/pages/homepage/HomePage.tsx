import "../../app/layout/App.css"
import {useEffect, useState} from "react";
import {MovieDTO} from "../../app/models/movie.model.ts";
import {toast} from "react-toastify";
import agent from "../../app/api/agent.ts";
import ContinueWatching from "../../components/homepage/ContinueWatching.tsx";
import TrendingNow from "../../components/homepage/TrendingNow.tsx";
import PopularAnime from "../../components/homepage/PopularAnime.tsx";

const HomePage = () => {

    const [anime, setAnime] = useState<MovieDTO[]>();
    const [loading, setLoading] = useState(false);

    const getAnimeFeaturing = async () => {
        try {
            setLoading(true);
            const result = await agent.Movie.list();
            if (result.success) {
                setAnime(result.data);
            } else if (!result.data) {
                toast.error("Error in getFeaturingEmployers");
            }
        }catch (err){
            toast.error("Error: " + err);
        }finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        // setIsVisible(true);
        getAnimeFeaturing();
    }, [loading]);

    return (
        <>
            <div className="w-full min-h-screen bg-black text-white font-sans">
                <div className="h-[600px] w-full">
                    <div className="h-full w-full relative">
                        <img
                            src="https://somoskudasai.com/wp-content/uploads/2021/09/kimetsu.jpg"
                            alt="Anime Hero"
                            className="w-full h-full object-cover"/>
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-12 w-1/2">
                            <img src="/kimetsu-logo.png"
                                 alt="Anime Title"
                                 className="w-72 mb-4 transform hover:scale-105 transition-transform duration-300"/>
                            <div className="flex items-center space-x-4 mb-4">
                                <span className="text-green-500 font-semibold">98% Match</span>
                                <span className="border border-gray-600 px-2 py-0.5 text-xs">16+</span>
                                <span>2013-2023</span>
                                <span className="border border-gray-600 px-2 py-0.5 text-xs">HD</span>
                            </div>
                            <p className="text-lg mb-6">Tanjiro Kamado sets out to become a demon slayer after his
                                family is slaughtered and
                                his
                                sister
                                is turned into a demon.</p>
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

                <PopularAnime anime={anime}/>

                <ContinueWatching animeList={anime}/>

                <TrendingNow animeList={anime}/>

            </div>
        </>
    )
}

export default HomePage;