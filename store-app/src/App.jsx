import { useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Main from "./layouts/Main";
import Products from "./pages/Products";
import Home from "./pages/Home";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import ErrorPage from "./pages/errors/Error";

import ServerErrorPage from "./pages/errors/ServerError";
import NotFoundPage from "./pages/errors/NotFound";
import requests from "./api/apiClient";
import { CartContext, useCartContext } from "./context/CartContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "products",
        children: [
          { index: true, element: <Products /> },
          { path: ":id", element: <ProductDetails /> },
        ],
      },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "errors",
        children: [
          { index: true, element: <ErrorPage /> },
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "not-found", element: <NotFoundPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  const { setCart } = useCartContext();
  useEffect(() => {
    requests.cart
      .get()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error));
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
