import "../../app/layout/App.css"
import {useEffect, useState} from "react";
import {MovieDTO} from "../../app/models/movie.model.ts";
import {toast} from "react-toastify";
import agent from "../../app/api/agent.ts";
import ContinueWatching from "../../components/homepage/ContinueWatching.tsx";
import TrendingNow from "../../components/homepage/TrendingNow.tsx";
import PopularAnime from "../../components/homepage/PopularAnime.tsx";
import HeroSection from "../../components/homepage/HeroSection.tsx";

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
                <HeroSection movieList={anime}/>

                <PopularAnime anime={anime}/>

                <ContinueWatching animeList={anime}/>

                <TrendingNow animeList={anime}/>

            </div>
        </>
    )
}

export default HomePage;