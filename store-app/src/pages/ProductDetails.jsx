import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";
import requests from "../api/apiClient";

export default function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        //const res = await fetch("http://localhost:5000/products/" + id);
        const data = await requests.products.details(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (loading) return <Loading message="Loading..." />;
  if (!product) return <h1>Ürün Yok</h1>;
  return <ProductItem product={product} />;
}
