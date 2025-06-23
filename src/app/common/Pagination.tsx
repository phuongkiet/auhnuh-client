import { observer } from "mobx-react-lite";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  startItem?: number;
  endItem?: number;
  totalItems?: number;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, startItem, endItem, totalItems, className }: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = pageSize;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={className ?? "w-full flex justify-between items-center space-y-0"}>
      {(startItem != null && endItem != null && totalItems != null) && (
        <div className="text-sm text-slate-500">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
          <span className="ml-2 text-xs text-gray-400">
            (Page {currentPage} of {totalPages})
          </span>
        </div>
      )}
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border border-slate-300 rounded-full text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : typeof page === 'number'
                  ? "border border-slate-300 rounded-full text-sm hover:bg-slate-50"
                  : "cursor-default"
            }`}
            disabled={typeof page !== 'number'}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border border-slate-300 rounded-full text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default observer(Pagination); 