import React, { useState } from "react";
import axios from "axios";

const FiltersSidebar = () => {
  const [tagsFilter, setTagsFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("");

  const handleFilter = async () => {
    try {
      const response = await axios.get("/products", {
        params: {
          tags_like: tagsFilter,
          price: priceFilter,
          subscription: subscriptionFilter,
        },
      });
      // Update product list based on filters
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      {/* Implement filters UI here */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleFilter}>
        Apply Filters
      </button>
    </div>
  );
};

export default FiltersSidebar;
