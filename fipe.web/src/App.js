import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';

import { Client } from './config/graphqlClient'
import Routes from './routes'
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <ApolloProvider client={Client}>
          <Routes />
        </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
