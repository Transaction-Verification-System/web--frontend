import App from "@/App";
import LoginPage from "@/components/pages/auth/LoginPage";
import RegisterPage from "@/components/pages/auth/RegisterPage";
import DashboardPage from "@/components/pages/dashboard/DashboardPage";
import InsightsPage from "@/components/pages/insights/InsightsPage";
import TransactionsHistoryPage from "@/components/pages/transactions/TransactionsHistoryPage";
import AuthProvider from "@/providers/AuthProvider";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: "404 Not Found!",
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    ),
  },
  {
    path: "/transactions",
    element: (
      <AuthProvider>
        <TransactionsHistoryPage />
      </AuthProvider>
    ),
  },
  {
    path: "/insights",
    element: (
      <AuthProvider>
        <InsightsPage/>
      </AuthProvider>
    ),
  },
];

export const router = createBrowserRouter(routes);
