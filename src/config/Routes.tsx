import App from "@/App";
import RegisterPage from "@/components/pages/auth/RegisterPage";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export const router = createBrowserRouter(routes);
