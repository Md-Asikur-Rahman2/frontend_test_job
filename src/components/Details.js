import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
          <h1 className="text-center text-2xl md:text-4xl">Products -{product.title}</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <img
          src={product.image_src}
          alt={product.title}
          className="h-32 w-auto mx-auto mb-2"
        />
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        <p className="mt-4">
          {product.subscription ? "Subscription available" : "No subscription"}
        </p>
        <p>Tags: {product.tags.join(", ")}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
