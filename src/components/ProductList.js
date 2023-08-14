import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { useNavigate, useLocation } from "react-router-dom";

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);
  const [tagsFilter, setTagsFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("");

  // Parse URL parameters and update filtering state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setTagsFilter(searchParams.get("tagsFilter") || "");
    setMinPriceFilter(searchParams.get("minPriceFilter") || "");
    setMaxPriceFilter(searchParams.get("maxPriceFilter") || "");
    setSubscriptionFilter(searchParams.get("subscriptionFilter") || "");
  }, [location.search]);

  // Update URL parameters when filters change
  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (tagsFilter) searchParams.set("tagsFilter", tagsFilter);
    if (minPriceFilter) searchParams.set("minPriceFilter", minPriceFilter);
    if (maxPriceFilter) searchParams.set("maxPriceFilter", maxPriceFilter);
    if (subscriptionFilter) searchParams.set("subscriptionFilter", subscriptionFilter);

    navigate(`?${searchParams.toString()}`);
  }, [tagsFilter, minPriceFilter, maxPriceFilter, subscriptionFilter, navigate]);

  // Filtering logic
  let filteredProducts = [...products];

  if (tagsFilter) {
    const lowercaseTagsFilter = tagsFilter.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseTagsFilter))
    );
  }

  if (minPriceFilter || maxPriceFilter) {
    const minPrice = minPriceFilter ? parseInt(minPriceFilter) : 0;
    const maxPrice = maxPriceFilter ? parseInt(maxPriceFilter) : Number.MAX_VALUE;
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  if (subscriptionFilter !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.subscription === (subscriptionFilter === "true")
    );
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //reset
const resetFilters = () => {
  setTagsFilter("");
  setMinPriceFilter("");
  setMaxPriceFilter("");
  setSubscriptionFilter("");
};
  return (
    <div className="mt-8">
      <h1 className="text-center text-8xl md:text-10xl">Products</h1>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-2">
        <input
          type="text"
          placeholder="Tags"
          className="border rounded-md px-2 py-1 w-full mb-2"
          value={tagsFilter}
          onChange={(e) => setTagsFilter(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          className="border rounded-md px-2 py-1 w-full mb-2"
          value={minPriceFilter}
          onChange={(e) => setMinPriceFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border rounded-md px-2 py-1 w-full mb-2"
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter(e.target.value)}
        />
        <div className="flex items-center mb-2">
          <label className="mr-2">Subscription:</label>
          <select
            className="border rounded-md px-2 py-1"
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div className="mt-2">
        {/* ... other filtering inputs ... */}
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4">
          <b>Filter by tags:</b>
        </h1>
      </div>
      <ul className="flex border rounded-md px-2 py-1 w-full mb-2 overflow-hidden">
        {products.slice(0, 12).map((product) => (
          <li key={product.id} className="cursor-pointer hover:bg-gray-100">
            <span
              className="px-2 py-1 block"
              onClick={() => setTagsFilter(product.tags[0])}
            >
              {product.tags[0]}
            </span>
          </li>
        ))}
        <button
          type="button"
          className="border rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
          onClick={resetFilters}
        >
          Reset Filter
        </button>
      </ul>
      <div className="mt-8">
        {/* ... other filtering inputs ... */}
        <h1 className="text-xl md:text-2xl lg:text-4xl font-thin mb-4">
          <b>All Products:</b> {products && products.length}
        </h1>
        <h1 className="text-xl md:text-2xl lg:text-4xl font-thin mb-4">
          <b>Filtered Products:</b> {currentProducts.length}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.image_src}
              alt={product.title}
              className="h-32 w-auto mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
            <p className="text-gray-600">
              ${product.price}
              <sup className="text-red-400">
                <s>{product.subscription_discount || 0}</s>
              </sup>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Discount: {product.subscription_discount || 0}
            </p>
            <p>Tags: {product.tags.join(", ")}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ProductList;
