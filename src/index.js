import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StadiumInfoProvider from "./context/StadiumInfoContext";
import UserProvider from "./context/UserContext";
import FutureBDProvider from "./context/FutureBreakDownContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StadiumInfoProvider>
      <UserProvider>
        <FutureBDProvider>
          <App />
        </FutureBDProvider>
      </UserProvider>
    </StadiumInfoProvider>
  </BrowserRouter>
);
