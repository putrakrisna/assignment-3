import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import store from "../redux/stores";
import theme from "../theme"

const client = new ApolloClient({
  uri: "https://swiftpwa-be.testingnow.me/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    
    <Provider store={store}>
      <ThemeProvider theme={theme}>
    
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp
