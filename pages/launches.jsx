import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination, Anchor } from 'grommet';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PER_PAGE } from '../utils/constants';
import { getLaunches } from '../utils/api';
import { getTitle, getFullUrl } from '../utils/helpers';
import FullPageLoading from '../components/full-page-loading';
import Launch from '../components/launch';

const Launches = () => {
    const [launches, setLaunches] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { page } = router.query;

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        const pageQuery = page || '1';
        setCurrentPage(parseInt(pageQuery, 10));
        const asyncGetLaunches = async () => {
            const data = await getLaunches(pageQuery);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [page, router.isReady]);

    const handlePaginationChange = ({ page }) => {
        router.push(`/launches/?page=${page}`);
    };

    return (
        <>
            <Head>
                <title>{getTitle('Launches')}</title>
                <meta name="description" content="Upcoming Launches" />
                <meta property="og:title" content={getTitle('Launches')} />
                <meta property="og:description" content="Upcoming Launches" />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ horizontal: 'medium' }}>
                <Box align='center' pad={'large'}>
                    <Heading margin="none">Upcoming Launches</Heading>
                    {/* <Box pad={{ top: 'small' }}>
                        <Anchor
                            href={'/past-launches'}
                            onClick={(e) => { e.preventDefault(); router.push('/past-launches'); }}
                            label={'See Past Launches'}
                        />
                    </Box> */}
                </Box>
                <Box align='center'>
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
                {total > 0 && (
                    <Box align='center' pad={'large'}>
                        <Pagination
                            numberItems={total}
                            step={PER_PAGE}
                            onChange={handlePaginationChange}
                            page={currentPage}
                        />
                    </Box>
                )}
                {loading && (
                    <FullPageLoading />
                )}
            </Box>
        </>
    );
};

export default Launches;
