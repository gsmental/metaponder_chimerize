import React, { useState } from "react";

interface PaginationProps {
  totalPages: number; // Total number of pages
  visiblePages: number; // Number of pages visible at a time
  onPageChange: (pageIndex: number) => void; // Callback when page is changed
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  visiblePages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  // Calculate start and end of page range
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <div className="flex gap-2">
      {/* Previous Button */}
      <button
        className="border rounded p-1"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Visible Page Numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
        (page) => (
          <button
            key={page}
            className={`border rounded p-1 ${
              page === currentPage ? "bg-gray-300" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        className="border rounded p-1"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
