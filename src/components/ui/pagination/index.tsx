import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-3 rounded-full transition ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-purple-100 text-gray-600 hover:bg-purple-600 hover:text-white"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-3 rounded-full transition ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-purple-100 text-gray-600 hover:bg-purple-600 hover:text-white"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
