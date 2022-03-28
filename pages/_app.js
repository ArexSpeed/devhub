import Head from 'next/head';
import Layout from 'components/Layout';
import 'styles/index.scss';
import { Provider as SessionProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Head>
          <title>Capgemini Developers</title>
          <meta name="description" content="website with capgemini developers" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
