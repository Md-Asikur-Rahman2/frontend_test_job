import React from "react";

const Pagination = ({ currentPage, perPage, totalProducts, paginate }) => {
  const totalPages = Math.ceil(totalProducts / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number} className="px-2 py-1">
            <button
              className={`${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600"
              } px-3 py-2 rounded-full`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
