import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination } from 'grommet';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { PER_PAGE } from '../utils/constants';
import { getLaunchesBefore } from '../utils/api';
import { getTitle  } from '../utils/helpers';
import FullPageLoading from '../components/full-page-loading';
import Launch from '../components/launch';

const today = format(new Date(), 'yyyy-MM-dd');

const PastLaunches = () => {
    const [launches, setLaunches] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { page } = router.query;

    useEffect(() => {
        document.title = getTitle('Past Launches');
    }, []);

    useEffect(() => {
        const pageQuery = page || '1';
        setCurrentPage(parseInt(pageQuery, 10));
        const asyncGetLaunches = async () => {
            const data = await getLaunchesBefore(pageQuery, today);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [page]);

    const handlePaginationChange = ({ page }) => {
        router.push(`/past-launches/?page=${page}`);
    };

    return (
        <Box pad={{ horizontal: 'medium' }}>
            <Box align='center' pad={'large'}>
                <Heading margin="none">Past Launches</Heading>
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
    );
};

export default PastLaunches;
