import { observer } from "mobx-react-lite";
import { MovieDTO, MovieStatus } from "../../app/models/movie.model";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { formatMovieStatus } from "../../app/common/stringUtils";
import { useMemo } from "react";

interface MovieTableProps {
  movies: MovieDTO[];
  onEdit?: (movie: MovieDTO) => void;
  onDelete?: (movie: MovieDTO) => void;
  onView?: (movie: MovieDTO) => void;
  itemsPerPage?: number;
  totalPages?: number;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const MovieTable = ({ 
  movies, 
  onEdit, 
  onDelete, 
  onView, 
  itemsPerPage = 10,
  totalPages = 1,
  totalItems = 0,
  currentPage = 1,
  onPageChange
}: MovieTableProps) => {
  // Use server-side pagination if totalPages is provided, otherwise client-side
  const isServerSidePagination = totalPages > 1;
  const actualTotalPages = isServerSidePagination ? totalPages : Math.ceil(movies.length / itemsPerPage);
  
  // Tính toán pagination
  const paginatedMovies = useMemo(() => {
    if (isServerSidePagination) {
      return movies; // Server already paginated
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movies.slice(startIndex, endIndex);
  }, [movies, currentPage, itemsPerPage, isServerSidePagination]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = isServerSidePagination 
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : Math.min(currentPage * itemsPerPage, movies.length);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= actualTotalPages && onPageChange) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (actualTotalPages <= maxVisiblePages) {
      // Hiển thị tất cả trang nếu ít hơn maxVisiblePages
      for (let i = 1; i <= actualTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic hiển thị trang với ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(actualTotalPages);
      } else if (currentPage >= actualTotalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = actualTotalPages - 3; i <= actualTotalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(actualTotalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-slate-200 flex-shrink-0">
        <h2 className="font-semibold text-lg">Movie List</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center">
          <span className="material-symbols-outlined text-sm mr-1">add</span>
          Add New Movie
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Release Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Publisher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Seasons
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
            {movies.length > 0 ? (
              paginatedMovies.map((movie) => (
                <tr
                  key={movie.movieId}
                  className="hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    #{movie.movieId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-medium">
                        {movie.title[0].toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {movie.title}
                        </div>
                        <div className="text-sm text-slate-500">
                          {movie.description.substring(0, 30)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {movie.releaseDate instanceof Date
                      ? movie.releaseDate.toLocaleDateString()
                      : new Date(movie.releaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {movie.publisher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {movie.totalSeason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        movie.status === MovieStatus.Completed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {formatMovieStatus(movie.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xl font-medium space-x-2">
                    {onView && (
                      <button
                        onClick={() => onView(movie)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200 hover:underline"
                      >
                        <FaEye className="inline-block mr-1" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(movie)}
                        className="text-emerald-600 hover:text-emerald-900 transition-colors duration-200 hover:underline"
                        title="Edit"
                      >
                        <FaPencilAlt className="inline-block mr-1" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(movie)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 hover:underline"
                        title="Delete"
                      >
                        <FaRegTrashCan className="inline-block mr-1" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-slate-500">
                  No movies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 flex-shrink-0 bg-white">
        <div className="text-sm text-slate-500">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{isServerSidePagination ? totalItems : movies.length}</span> results
          <span className="ml-2 text-xs text-gray-400">
            (Page {currentPage} of {actualTotalPages})
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {renderPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                page === currentPage 
                  ? "bg-blue-600 text-white" 
                  : typeof page === 'number'
                    ? "border border-slate-300 hover:bg-slate-50"
                    : "cursor-default"
              }`}
              disabled={typeof page !== 'number'}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === actualTotalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(MovieTable);
