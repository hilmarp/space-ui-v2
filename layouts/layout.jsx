import React from 'react';
import { Box, Grommet } from 'grommet';
import Head from 'next/head';
import { theme } from '../utils/theme';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Grommet theme={theme}>
                <Box fill background={'dark-1'}>
                    <Navbar />
                    <Box as={'main'}>
                        {children}
                    </Box>
                    <Footer />
                </Box>
            </Grommet>
        </>
    );
};

export default Layout;