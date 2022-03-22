import Head from 'next/head';
import Layout from 'components/Layout';
import 'styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Capgemini Developers</title>
        <meta name="description" content="website with capgemini developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
