import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import Admin from "./components/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "shop/:category", Component: Shop },
      { path: "product/:id", Component: ProductDetails },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "order-success", Component: OrderSuccess },
      { path: "admin", Component: Admin },
    ],
  },
]);
