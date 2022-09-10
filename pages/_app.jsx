import Script from 'next/script';
import '../styles/global.css';
import Layout from '../layouts/layout';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Script
                strategy="lazyOnload"
                data-website-id="8f0a3bb4-226c-439b-b8bf-735767530b41"
                src="https://umami.hilmarp.com/umami.js"
            />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};
