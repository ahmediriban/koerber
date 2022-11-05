import * as React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config";

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin + "/callback",
};

const router = createBrowserRouter([
  {
    path: "*",
    element: <Home />,
  },
]);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Auth0Provider {...providerConfig}>
    <RouterProvider router={router} />
  </Auth0Provider>,
);
