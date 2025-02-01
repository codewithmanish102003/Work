import React, { useEffect } from 'react';
import ProductCard from '../Products/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../app/features/product/productThunk'; // Ensure the correct path to productThunk

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when component mounts
  }, [dispatch]);

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!Array.isArray(products)) return <p>No products available</p>;

  return (

       <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Products;