import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import requests from "../api/apiClient";

export default function Products() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(
    () =>
      async function fetchProducts() {
        try {
          const data = await requests.products.list();
          setLoadedProducts(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }

        fetchProducts();
      },
    []
  );
  if (loading) return <Loading message="Loading..." />;

  return <ProductList products={loadedProducts} />;
}
