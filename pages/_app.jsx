import Script from 'next/script';
import '../styles/global.css';
import Layout from '../layouts/layout';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Script
                strategy="lazyOnload"
                src="https://www.googletagmanager.com/gtag/js?id=G-ZQ54BHNNP4"
            />

            <Script strategy="lazyOnload" id='gtag-script'>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-ZQ54BHNNP4');
                `}
            </Script>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};
