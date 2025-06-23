import { useMemo, useEffect } from "react";
import Pagination from "../../app/common/Pagination";
import { useStore } from "../../app/stores/store";
import { useLocation, useNavigate } from "react-router-dom";

const MovieList = () => {
  const { movieStore } = useStore();
  const {
    movies,
    totalPages,
    currentPage,
    pageSize,
    getMovieByCategory,
    setCurrentPage,
  } = movieStore;
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId");

  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return movies.slice(start, start + pageSize);
  }, [currentPage, movies]);

  useEffect(() => {
    if (categoryId === null || categoryId === "null") {
      getMovieByCategory(null);
    } else {
      getMovieByCategory(Number(categoryId));
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col py-24 mx-auto">
      <div className="flex justify-center items-center h-16">
        <h2 className="text-2xl font-bold">Movies List</h2>
      </div>
      <div className="flex-1 px-8">
        <div className="flex justify-center">
          <div className="grid grid-cols-6 gap-x-6 gap-y-8 mx-auto max-w-6xl">
            {paginatedMovies.map((movie) => (
              <div key={movie.movieId} className="flex flex-col items-center">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-[180px] h-[260px] object-cover rounded-lg shadow-md mb-2 cursor-pointer transition-transform duration-300 transform hover:scale-105"
                  onClick={() => navigate(`/movie/detail/${movie.movieId}`)}
                />
                <div
                  className="text-base font-medium text-center truncate w-[180px] cursor-pointer hover:text-blue-400"
                  onClick={() => navigate(`/movie/detail/${movie.movieId}`)}
                >
                  {movie.title}
                </div>
                <div className="text-xs text-slate-400 text-center truncate w-[180px]">
                  {movie.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            className="flex justify-center items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
