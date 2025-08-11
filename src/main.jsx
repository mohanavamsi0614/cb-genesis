import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { Analytics } from "@vercel/analytics/react"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Analytics/>
    <RouterProvider router={router} />
  </React.StrictMode>
);