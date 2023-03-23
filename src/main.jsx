import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./initialState";
import MoreDetails from "./containers/MoreDetails/MoreDetails";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SearchResults from "./containers/SearchResults/SearchResults";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:num",
        element: <App />,

        errorElement: <ErrorPage />,
      },
    ],
  },

  {
    path: "details/:id",
    element: <MoreDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/:name/:page",
    element: <SearchResults />,
    errorElement: <ErrorPage />,
  },
]);

export const store = configureStore({
  reducer: {
    mainState: stateReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
