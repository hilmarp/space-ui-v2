import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination, Text } from 'grommet';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PER_PAGE, US_STATES } from '../../utils/constants';
import { getLaunchesByState } from '../../utils/api';
import { getTitle, getFullUrl } from '../../utils/helpers';
import FullPageLoading from '../../components/full-page-loading';
import Launch from '../../components/launch';

export const getStaticProps = (context) => {
    const { code } = context.params;
    const stateName = US_STATES[code];
    return {
        props: {
            state: stateName
        }
    };
};

export const getStaticPaths = () => {
    return {
        paths: Object.keys(US_STATES).map(k => ({ params: { code: k } })),
        fallback: false
    };
};

const State = ({ state }) => {
    const [launches, setLaunches] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    
    const router = useRouter();
    const { code, page } = router.query;

    useEffect(() => {
        if (!code) {
            return;
        }
        const pageQuery = page || '1';
        setCurrentPage(parseInt(pageQuery, 10));
        const asyncGetLaunches = async () => {
            const data = await getLaunchesByState(pageQuery, code);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
            setEmpty(data.total === 0);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [page, code]);

    const handlePaginationChange = ({ page }) => {
        router.push(`/state/${code}/?page=${page}`);
    };

    return (
        <>
            <Head>
                <title>{getTitle(state)}</title>
                <meta name="description" content={`Upcoming ${state} launches`} />
                <meta property="og:title" content={getTitle(state)} />
                <meta property="og:description" content={`Upcoming ${state} launches`} />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ horizontal: 'medium' }}>
                <Box align='center' pad={'large'}>
                    <Heading margin="none">Upcoming {state} Launches</Heading>
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
                {empty && (
                    <Box align='center' pad={{ bottom: 'large' }}>
                        <Text size='large' color={'status-error'}>No Upcoming {state} Launches</Text>
                    </Box>
                )}
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

export default State;
