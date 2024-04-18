import React from "react";
import ReactDOM from "react-dom/client";
import "@/assets/styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/config/Routes.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
          colorInfo: "#000000",
          borderRadius: 8,
          sizeStep: 8,
          fontFamily: "DM-Sans, sans-serif",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);
