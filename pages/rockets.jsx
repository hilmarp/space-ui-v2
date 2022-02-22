import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableHeader, TableRow, TableCell, TableBody, Text, Heading, TextInput, Pagination, Anchor } from 'grommet';
import { Search } from 'grommet-icons';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import Head from 'next/head';
import { getRockets } from '../utils/api';
import { PER_PAGE } from '../utils/constants';
import { getTitle, getFullUrl } from '../utils/helpers';
import FullPageLoading from '../components/full-page-loading';

const Rockets = () => {
    const [rockets, setRockets] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearchValue, setCurrentSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const searchInputEl = useRef(null);
    const router = useRouter();
    const { page, search } = router.query;

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        const pageQuery = page || '1';
        const searchQuery = search || '';
        searchInputEl.current.value = searchQuery;
        setCurrentPage(parseInt(pageQuery, 10));
        setCurrentSearchValue(searchQuery);
        const asyncGetRockets = async () => {
            const data = await getRockets(pageQuery, searchQuery);
            setRockets(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetRockets();
    }, [page, search, router.isReady]);

    const handlePaginationChange = ({ page }) => {
        if (currentSearchValue) {
            router.push(`/rockets/?page=${page}&search=${currentSearchValue}`);
        } else {
            router.push(`/rockets/?page=${page}`);
        }
    };

    const handleSearchInputChange = debounce((value) => {
        router.push(`/rockets/?search=${value}`);
    }, 800);

    return (
        <>
            <Head>
                <title>{getTitle('Rockets')}</title>
                <meta name="description" content="Rockets" />
                <meta property="og:title" content={getTitle('Rockets')} />
                <meta property="og:description" content="Rockets" />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ horizontal: 'medium' }}>
                <Box align='center' pad={'large'}>
                    <Heading margin="none">Rockets</Heading>
                </Box>
                <Box align='center'>
                    <Box width={'large'} gap='medium'>
                        <TextInput
                            ref={searchInputEl}
                            icon={<Search />}
                            placeholder="Search for a rocket..."
                            onChange={(event) => { handleSearchInputChange(event.target.value); }}
                        />
                        <Box>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell scope="col" border="bottom">
                                            <Text weight={'bold'}>Name</Text>
                                        </TableCell>
                                        <TableCell scope="col" border="bottom">
                                            <Text weight={'bold'}>Company</Text>
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rockets.map(rocket => (
                                        <TableRow key={rocket.id}>
                                            <TableCell scope="row">
                                                <Anchor
                                                    href={`/rocket/${rocket.id}`}
                                                    onClick={(e) => { e.preventDefault(); router.push(`/rocket/${rocket.id}`); }}
                                                    label={rocket.name}
                                                    color={'light-1'}
                                                    weight={'normal'}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Anchor
                                                    href={`/company/${rocket.company.id}`}
                                                    onClick={(e) => { e.preventDefault(); router.push(`/company/${rocket.company.id}`); }}
                                                    label={rocket.company.name}
                                                    color={'light-1'}
                                                    weight={'normal'}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </Box>
                <Box align='center' pad={'large'}>
                    <Pagination
                        numberItems={total}
                        step={PER_PAGE}
                        onChange={handlePaginationChange}
                        page={currentPage}
                    />
                </Box>
                {loading && (
                    <FullPageLoading />
                )}
            </Box>
        </>
    );
};

export default Rockets;
