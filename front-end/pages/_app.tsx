import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { UtilsProvider } from '../contexts/UtilsContext';
import Header from '../components/Header';
import '../public/css/daos.css';
import '../public/css/ideas.css';
import '../public/output.css';
import '../public/theme.css';

function MyApp({ Component, pageProps }) {
  return (
          <ThemeProvider defaultTheme={'dark'} enableColorScheme={false} attribute="class" enableSystem={false}>
            <Header />
            <Component {...pageProps} />
            <ToastContainer hideProgressBar={false} position="top-right" autoClose={3000} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover theme="light" />
          </ThemeProvider>
  );
}

export default MyApp;
