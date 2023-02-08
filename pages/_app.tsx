import { Provider } from "react-redux";
import { PersistGate as PersistGateClient } from "redux-persist/integration/react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Fonts from "@/components/Atoms/Fonts";

import { store, persistor } from "@/states/store";
import { getAccessToken } from "@/utils";
import { setContext } from "@apollo/client/link/context";

import type { ReactNode } from "react";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

const backEndUrl =
  typeof process.env.NEXT_PUBLIC_BACKEND_URL === "string"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "";

const httpLink = createHttpLink({
  uri: `${backEndUrl}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // uri: `${backEndUrl}/graphql`,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // credentials: 'include',
  // headers: {
  //   authorization: `Bearer ${getAccessToken()}`,
  // },
});

const customTheme = extendTheme({
  colors: {
    brand: {
      yellow: "#FFDD00",
      grey: "#393939",
      grey10: "#FAFAFA",
      grey40: "#4D4D4D",
      grey70: "#D7D7D7",
      textBody: "#787878",
      yellowPastel: "#FFFAE0",
      textTitle: "#222222",
    },
  },
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: '"Avenir Next", sans-serif',
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
    "3xl": "114em",
  },
});

const PersistGateServer = ({ children }: { children: ReactNode }) => {
  return children;
};

function MyApp({ Component, pageProps }: AppProps) {
  let runtime = process.env.RUNTIME;
  let PersistGate = PersistGateServer as unknown as typeof PersistGateClient;
  if (runtime === "browser") {
    PersistGate = PersistGateClient;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ChakraProvider theme={customTheme}>
            <Fonts />
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
