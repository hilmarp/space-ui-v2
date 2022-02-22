import React, { useEffect } from 'react';
import { Box, Paragraph, Heading, Anchor } from 'grommet';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getTitle, getFullUrl } from '../utils/helpers';

const About = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{getTitle('About')}</title>
                <meta name="description" content="About Rocket Launches" />
                <meta property="og:title" content={getTitle('About')} />
                <meta property="og:description" content="About Rocket Launches" />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ horizontal: 'medium' }}>
                <Box align='center' pad={'large'}>
                    <Heading margin="none">About</Heading>
                </Box>
                <Box align='center' pad={{ bottom: 'large' }}>
                    <Box width={'large'} gap='medium'>
                        <Box>
                            <Paragraph fill margin={'none'}>See upcoming rocket launches using a straight to the point, clutter-free, easy on the eyes UI.</Paragraph>
                        </Box>
                        <Box>
                            <Paragraph fill margin={'none'}>
                                Any questions or comments? Send me an email at{' '}
                                <Anchor href="mailto:hilmar@hilmarp.com" label="hilmar@hilmarp.com" />.
                            </Paragraph>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default About;
