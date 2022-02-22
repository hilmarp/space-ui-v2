import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination, Text } from 'grommet';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PER_PAGE } from '../../utils/constants';
import { getLaunchesByLocationId, getLocationById } from '../../utils/api';
import { getTitle, getFullUrl } from '../../utils/helpers';
import FullPageLoading from '../../components/full-page-loading';
import Launch from '../../components/launch';

export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const data = await getLocationById(id);
    return {
        props: {
            location: data.result[0]
        }
    };
};

const Location = ({ location }) => {
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
            const data = await getLaunchesByLocationId(pageQuery, id);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
            setEmpty(data.total === 0);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [page, id]);

    const handlePaginationChange = ({ page }) => {
        router.push(`/location/${id}/?page=${page}`);
    };

    return (
        <>
            <Head>
                <title>{getTitle(location.name)}</title>
                <meta name="description" content={`Upcoming ${location.name} launches`} />
                <meta property="og:title" content={getTitle(location.name)} />
                <meta property="og:description" content={`Upcoming ${location.name} launches`} />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ horizontal: 'medium' }}>
                <Box align='center' pad={'large'}>
                    <Heading margin="none">Upcoming {location.name} Launches</Heading>
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
                        <Text size='large' color={'status-error'}>No Upcoming {location.name} Launches</Text>
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

export default Location;
