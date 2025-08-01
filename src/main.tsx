import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" />
  </React.StrictMode> 
);