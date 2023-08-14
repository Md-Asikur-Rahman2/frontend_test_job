import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import FiltersSidebar from "./components/FiltersSidebar";
import products from "./components/products.json";
import ProductDetails from "./components/Details";
import {BrowserRouter,Route,Routes} from "react-router-dom"
function App() {
  return (
    <div className="container  mx-auto p-8">
      {/* <FiltersSidebar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList products={products.products} />} />
          <Route
            path="/product/:id"
            element={<ProductDetails products={products.products} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
