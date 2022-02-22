import React, { useEffect, useState } from 'react';
import { Box, Heading } from 'grommet';
import { isToday } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PER_HOME_PAGE } from '../utils/constants';
import { getLaunches } from '../utils/api';
import FullPageLoading from '../components/full-page-loading';
import Launch from '../components/launch';
import LaunchMedia from '../components/launch-media';
import FeaturedLaunch from '../components/featured-launch';
import { getTitle, getFullUrl } from '../utils/helpers';
// import { DEV_LAUNCHES } from '../fixtures';

const Home = () => {
    const [launches, setLaunches] = useState([]);
    const [featuredLaunches, setFeaturedLaunches] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const asyncGetLaunches = async () => {
            const data = await getLaunches();
            // const data = DEV_LAUNCHES;
            let result = [];
            if (data.result.length >= PER_HOME_PAGE) {
                for (let i = 0; i < PER_HOME_PAGE; i++) {
                    result.push(data.result[i]);
                }
            } else {
                result = data.result;
            }
            const featured = result.filter(r => r.win_open && isToday(new Date(r.win_open)));
            const notFeatured = result.filter(r => !featured.find(f => f.id === r.id));
            setFeaturedLaunches(featured);
            setLaunches(notFeatured);
            setLoading(false);
        };
        setLoading(true);
        asyncGetLaunches();
    }, []);

    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <meta name="description" content="Upcoming rocket launches" />
                <meta property="og:title" content={getTitle()} />
                <meta property="og:description" content="Upcoming rocket launches" />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ bottom: 'large', left: 'medium', right: 'medium' }}>
                {launches && launches.length > 0 && (
                    <Box>
                        <Box align='center' pad={'large'}>
                            {featuredLaunches.length > 0 ? (
                                <Heading margin="none">It&apos;s Launch Day!</Heading>
                            ) : (
                                <Heading margin="none">Upcoming Launches</Heading>
                            )}
                        </Box>
                        <Box align='center'>
                            {featuredLaunches.length > 0 && (
                                featuredLaunches.map(featuredLaunch => (
                                    <Box key={featuredLaunch.id} align='center'>
                                        <Box width={'xxlarge'} pad={{ bottom: 'medium' }}>
                                            <FeaturedLaunch launch={featuredLaunch} linkToLaunch />
                                        </Box>
                                        {featuredLaunch.media && featuredLaunch.media.length > 0 && (
                                            <Box width={'xlarge'} gap='medium' pad={{ bottom: 'medium' }}>
                                                <LaunchMedia launch={featuredLaunch} />
                                            </Box>
                                        )}
                                    </Box>
                                ))
                            )}
                            <Box width={'xlarge'}>
                                <Box gap='medium'>
                                    {launches.map(launch => (
                                        <Box key={launch.id}>
                                            <Launch launch={launch} />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
                {loading && (
                    <FullPageLoading />
                )}
            </Box>
        </>
    );
};

export default Home;
