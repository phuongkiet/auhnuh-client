import { observer } from "mobx-react-lite";
import MovieTable from "../../../components/admin/MovieTable";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { action } from "mobx";

const MovieManagement = () => {
  const { movieStore } = useStore();
  const { movies, totalPages, totalItems, currentPage, pageSize } = movieStore;

  console.log("MovieManagement render:", { currentPage, totalPages, moviesLength: movies.length });

  useEffect(() => {
    movieStore.getAdminMovies();
  }, []);

  const handleEditMovie = (movie: any) => {
    console.log("Edit movie:", movie);
    // TODO: Implement edit functionality
  };

  const handleDeleteMovie = (movie: any) => {
    console.log("Delete movie:", movie);
    // TODO: Implement delete functionality
  };

  const handleViewMovie = (movie: any) => {
    console.log("View movie:", movie);
    // TODO: Implement view functionality
  };

  const handlePageChange = action(async (page: number) => {
    console.log("MovieManagement handlePageChange called with page:", page);
    movieStore.setCurrentPage(page);
    await movieStore.getAdminMovies();
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Movies</h1>
        <p className="text-slate-500 mt-1">Manage all system movies</p>
        {/* Next: "Add search and filter options" */}
      </header>

      <MovieTable 
        movies={movies}
        onEdit={handleEditMovie}
        onDelete={handleDeleteMovie}
        onView={handleViewMovie}
        itemsPerPage={pageSize}
        totalPages={totalPages}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default observer(MovieManagement);
