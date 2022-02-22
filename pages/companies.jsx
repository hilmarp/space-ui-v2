import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableHeader, TableRow, TableCell, TableBody, Text, Heading, TextInput, Pagination, Anchor } from 'grommet';
import { Search } from 'grommet-icons';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import Head from 'next/head';
import { getCompanies } from '../utils/api';
import { PER_PAGE } from '../utils/constants';
import FullPageLoading from '../components/full-page-loading';
import { getFullUrl, getTitle } from '../utils/helpers';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
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
        const asyncGetCompanies = async () => {
            const data = await getCompanies(pageQuery, searchQuery);
            setCompanies(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetCompanies();
    }, [page, search, router.isReady]);

    const handlePaginationChange = ({ page }) => {
        if (currentSearchValue) {
            router.push(`/companies/?page=${page}&search=${currentSearchValue}`);
        } else {
            router.push(`/companies/?page=${page}`);
        }
    };

    const handleSearchInputChange = debounce((value) => {
        router.push(`/companies/?search=${value}`);
    }, 800);

    return (
        <>
            <Head>
                <title>{getTitle('Companies')}</title>
                <meta name="description" content="Rocket Companies" />
                <meta property="og:title" content={getTitle('Companies')} />
                <meta property="og:description" content="Rocket Companies" />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ horizontal: 'medium' }}>
                <Box align='center' pad={'large'}>
                    <Heading margin="none">Rocket Companies</Heading>
                </Box>
                <Box align='center'>
                    <Box width={'large'} gap='medium'>
                        <TextInput
                            ref={searchInputEl}
                            icon={<Search />}
                            placeholder="Search for a company..."
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
                                            <Text weight={'bold'}>Active</Text>
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {companies.map(company => (
                                        <TableRow key={company.id}>
                                            <TableCell scope="row">
                                                <Anchor
                                                    href={`/company/${company.id}`}
                                                    onClick={(e) => { e.preventDefault(); router.push(`/company/${company.id}`); }}
                                                    label={company.name}
                                                    color={'light-1'}
                                                    weight={'normal'}
                                                />
                                            </TableCell>
                                            {company.country.code ? (
                                                <TableCell>
                                                    <Anchor
                                                        href={`/country/${company.country.code}`}
                                                        onClick={(e) => { e.preventDefault(); router.push(`/country/${company.country.code}`); }}
                                                        label={`${company.country.name} (${company.country.code})`}
                                                        color={'light-1'}
                                                        weight={'normal'}
                                                    />
                                                </TableCell>
                                            ) : (
                                                <TableCell>{company.country.name}</TableCell>
                                            )}
                                            <TableCell>
                                                {company.inactive ? (
                                                    <Text color={'status-error'}>No</Text>
                                                ) : (
                                                    <Text color={'status-ok'}>Yes</Text>
                                                )}
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

export default Companies;
