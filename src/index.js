import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StadiumInfoProvider from "./context/StadiumInfoContext";
import PastHistoryProvider from "./context/PastHistoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StadiumInfoProvider>
      <PastHistoryProvider>
        <App />
      </PastHistoryProvider>
    </StadiumInfoProvider>
  </BrowserRouter>
);
