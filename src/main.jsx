import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { Analytics } from "@vercel/analytics/react"
import "./index.css";
import { Toaster } from "react-hot-toast"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Analytics/>
    <RouterProvider router={router} />
     <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: '16px',
          padding: '16px 20px',
          fontFamily:'sans-serif',
          fontSize: '16px', 
          fontWeight: '600',
          background: '#1b2a49',
          color: '#fbbf24',
          minWidth: '300px', 
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />

  </React.StrictMode>
);