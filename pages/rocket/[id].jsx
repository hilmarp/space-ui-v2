import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination, Text } from 'grommet';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PER_PAGE } from '../../utils/constants';
import { getLaunchesByRocketId, getRocketById } from '../../utils/api';
import { getTitle, getFullUrl } from '../../utils/helpers';
import FullPageLoading from '../../components/full-page-loading';
import Launch from '../../components/launch';

export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const data = await getRocketById(id);
    return {
        props: {
            rocket: data.result[0]
        }
    };
};

const Rocket = ({ rocket }) => {
    const [launches, setLaunches] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);

    const router = useRouter();
    const { id, page } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        const pageQuery = page || '1';
        setCurrentPage(parseInt(pageQuery, 10));
        const asyncGetLaunches = async () => {
            const data = await getLaunchesByRocketId(pageQuery, id);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
            setEmpty(data.total === 0);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [page, id]);

    const handlePaginationChange = ({ page }) => {
        router.push(`/rocket/${id}/?page=${page}`);
    };

    return (
        <>
            <Head>
                <title>{getTitle(rocket.name)}</title>
                <meta name="description" content={`Upcoming ${rocket.name} launches`} />
                <meta property="og:title" content={getTitle(rocket.name)} />
                <meta property="og:description" content={`Upcoming ${rocket.name} launches`} />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ horizontal: 'medium' }}>
                <Box align='center' pad={'large'}>
                    <Heading margin="none">Upcoming {rocket.name} Launches</Heading>
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
                        <Text size='large' color={'status-error'}>No Upcoming {rocket.name} Launches</Text>
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

export default Rocket;
