import '../../app/layout/App.css'
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {MovieDetailDTO} from "../../app/models/movie.model.ts";
import agent from "../../app/api/agent.ts";
import {toast} from "react-toastify";
import MovieDetailComponent from "../../components/movie/MovieDetailComponent.tsx";

const MovieDetail = () => {
    const {id} = useParams();
    const [animeDetail, setAnimeDetail] = useState<MovieDetailDTO>();
    // const navigate = useNavigate();

    const getAnimeDetail = async () => {
        try {
            if (typeof id === "string") {
                const result = await agent.Movie.getMovieDetail(Number(id));
                if (result.success) {
                    setAnimeDetail(result.data);
                } else if (!result.data) {
                    toast.error("Error in get anime detail");
                }
            }
        } catch (err) {
            toast.error("Error: " + err);
        }
    }

    useEffect(() => {
        getAnimeDetail();
    }, [])

    // const watchMovie = (episodeId: number) => {
    //     if (!animeDetail) return;
    //     navigate(`/movie/detail/movie-streaming/${episodeId}`, { state: { animeDetail } });
    // }

    return (
        <div className="w-full min-h-screen bg-black text-white relative">
            <MovieDetailComponent animeDetail={animeDetail} />
        </div>
    )
}

export default MovieDetail;