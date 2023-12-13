/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Routes, Route, Navigate } from "@solidjs/router";
import { MatchFilters } from "@solidjs/router/dist/types";

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

const Frontpage = lazy(() => import("./pages/Frontpage"));
const Location = lazy(() => import("./pages/Location"));

const locationFilters: MatchFilters = {
  id: /^\d+$/, // only allow numbers
};

render(
  () => (
    <App>
      <Router>
        <Routes>
          <Route path="/location/:id" component={Location} matchFilters={locationFilters} />
          <Route path="/" component={Frontpage} />
          <Route path="*" component={() => <Navigate href="/" />} />
        </Routes>
      </Router>
    </App>
  ),
  root!,
);
