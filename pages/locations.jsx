import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableHeader, TableRow, TableCell, TableBody, Text, Heading, TextInput, Pagination, Anchor } from 'grommet';
import { Search } from 'grommet-icons';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import Head from 'next/head';
import { getLocations } from '../utils/api';
import { PER_PAGE } from '../utils/constants';
import { getTitle, getFullUrl } from '../utils/helpers';
import FullPageLoading from '../components/full-page-loading';

const Locations = () => {
    const [locations, setLocations] = useState([]);
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
        const asyncGetLocations = async () => {
            const data = await getLocations(pageQuery, searchQuery);
            setLocations(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetLocations();
    }, [page, search, router.isReady]);

    const handlePaginationChange = ({ page }) => {
        if (currentSearchValue) {
            router.push(`/locations/?page=${page}&search=${currentSearchValue}`);
        } else {
            router.push(`/locations/?page=${page}`);
        }
    };

    const handleSearchInputChange = debounce((value) => {
        router.push(`/locations/?search=${value}`);
    }, 800);

    return (
        <>
            <Head>
                <title>{getTitle('Locations')}</title>
                <meta name="description" content="Locations" />
                <meta property="og:title" content={getTitle('Locations')} />
                <meta property="og:description" content="Locations" />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ horizontal: 'medium' }}>
                <Box align='center' pad={'large'}>
                    <Heading margin="none">Locations</Heading>
                </Box>
                <Box align='center'>
                    <Box width={'large'} gap='medium'>
                        <TextInput
                            ref={searchInputEl}
                            icon={<Search />}
                            placeholder="Search for a location..."
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
                                            <Text weight={'bold'}>Country</Text>
                                        </TableCell>
                                        <TableCell scope="col" border="bottom">
                                            <Text weight={'bold'}>Launch Pads</Text>
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {locations.map(location => (
                                        <TableRow key={location.id}>
                                            <TableCell scope="row">
                                                <Anchor
                                                    href={`/location/${location.id}`}
                                                    onClick={(e) => { e.preventDefault(); router.push(`/location/${location.id}`); }}
                                                    label={location.name}
                                                    color={'light-1'}
                                                    weight={'normal'}
                                                />
                                            </TableCell>
                                            {!location.country && (
                                                <TableCell>N/A</TableCell>
                                            )}
                                            {location.country && location.country.code && (
                                                <TableCell>
                                                    <Anchor
                                                        href={`/country/${location.country.code}`}
                                                        onClick={(e) => { e.preventDefault(); router.push(`/country/${location.country.code}`); }}
                                                        label={`${location.country.name} (${location.country.code})`}
                                                        color={'light-1'}
                                                        weight={'normal'}
                                                    />
                                                </TableCell>
                                            )}
                                            {location.country && !location.country.code && (
                                                <TableCell>{location.country.name}</TableCell>
                                            )}
                                            <TableCell>{location.pads ? location.pads.length : 0}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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

export default Locations;
