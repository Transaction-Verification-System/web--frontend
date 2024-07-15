import App from "@/App";
import LoginPage from "@/components/pages/auth/LoginPage";
import RegisterPage from "@/components/pages/auth/RegisterPage";
import DashboardPage from "@/components/pages/dashboard/DashboardPage";
import InsightsPage from "@/components/pages/insights/InsightsPage";
import FailedTransactionsPage from "@/components/pages/transactions/FailedTransactionsPage";
import PassedTransactionsPage from "@/components/pages/transactions/PassedTransactionsPage";
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
    path: "/insights",
    element: (
      <AuthProvider>
        <InsightsPage/>
      </AuthProvider>
    ),
  },
  {
    path: "/logs/passed-transactions",
    element: (
      <AuthProvider>
        <PassedTransactionsPage />
      </AuthProvider>
    ),
  },
  {
    path: "/logs/failed-transactions",
    element: (
      <AuthProvider>
        <FailedTransactionsPage />
      </AuthProvider>
    ),
  },
];

export const router = createBrowserRouter(routes);
