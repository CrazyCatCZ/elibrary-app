import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import Cookies from "js-cookie";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import {
  refreshTokenSilently,
  verifyAccessToken,
} from "./components/functions";

import "./i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Verify if access token expired
const customFetch = async (uri, options) => {
  const tokenExpired = await verifyAccessToken();

  if (tokenExpired === "true") {
    await refreshTokenSilently();
  }

  return fetch(uri, options);
};

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql/`,
  credentials: "same-origin",
  fetch: customFetch,
});

// Access token is send through httponly cookie
const authLink = setContext((_, { headers }) => {
  // Get csrftoken from Cookies
  const csrftoken = Cookies.get("csrftoken");

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-CSRFToken": csrftoken,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          notBorrowedBooks: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          usersBorrowings: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
