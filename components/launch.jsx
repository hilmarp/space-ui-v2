import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Tip, Anchor, ResponsiveContext } from 'grommet';
import { Location, Cloud, Deploy, Calendar } from 'grommet-icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { fToC, mphToMs, launchDateObj } from '../utils/helpers';
import { AVAILABLE_LOGOS, COUNTRY_CODES } from '../utils/constants';
import Loading from './loading';

const DynamicLogo = dynamic(
    () => import('./logo'),
    { ssr: false, loading: () => <Loading /> }
);

const DynamicRocket = dynamic(
    () => import('./rocket'),
    { ssr: false, loading: () => <Loading /> }
);

const Launch = ({ launch }) => {
    const [time, setTime] = useState('');
    const [relativeTime, setRelativeTime] = useState('');
    const [showRelativeTime, setShowRelativeTime] = useState(false);

    const screenSize = useContext(ResponsiveContext);
    const router = useRouter();

    useEffect(() => {
        const launchDate = launchDateObj(launch);
        setTime(launchDate.time);
        setRelativeTime(launchDate.relativeTime);
        setShowRelativeTime(launchDate.showRelativeTime);
    }, [launch]);

    return (
        <Box background={'dark-2'} direction={screenSize === 'small' ? 'column' : 'row'}>
            <Anchor
                href={`/launch/${launch.id}`}
                onClick={(e) => { e.preventDefault(); router.push(`/launch/${launch.id}`); }}
            >
                {screenSize === 'small' ? (
                    <Box flex={false} height={'small'}>
                        <DynamicRocket slug={launch.vehicle.slug} />
                    </Box>
                ) : (
                    <Box flex={false} height={'medium'} width={'medium'}>
                        <DynamicRocket slug={launch.vehicle.slug} />
                    </Box>
                )}
            </Anchor>
            <Box pad={'medium'} gap='small'>
                <Heading margin={'none'}>
                    <Anchor
                        href={`/launch/${launch.id}`}
                        onClick={(e) => { e.preventDefault(); router.push(`/launch/${launch.id}`); }}
                        label={launch.name}
                        color={'light-1'}
                    />
                </Heading>
                <Box pad={{ bottom: 'small' }}>
                    {Object.values(AVAILABLE_LOGOS).includes(launch.provider.slug) ? (
                        <DynamicLogo
                            slug={launch.provider.slug}
                            link={`/company/${launch.provider.id}`}
                            tooltip={launch.provider.name}
                        />
                    ): (
                        <Anchor
                            href={`/company/${launch.provider.id}`}
                            onClick={(e) => { e.preventDefault(); router.push(`/company/${launch.provider.id}`); }}
                            label={launch.provider.name}
                            color={'light-1'}
                            weight={'normal'}
                        />
                    )}
                </Box>
                <Box direction='row' gap='small'>
                    <Calendar color='brand' />
                    {showRelativeTime ? (
                        <Tip
                            plain
                            content={
                                <Box background={'light-1'} pad={'small'} round="small">
                                    <Text>{time}</Text>
                                </Box>
                            }
                            dropProps={{ align: { bottom: 'top' } }}
                        >
                            <Text>{relativeTime}</Text>
                        </Tip>
                    ) : (
                        <Text>{relativeTime}</Text>
                    )}
                </Box>
                {launch.weather_temp && (
                    <Box direction='row' gap='small' align='center'>
                        <Cloud color='brand' />
                        <Box>
                            <Text>{fToC(launch.weather_temp)}°C</Text>
                            <Text>{mphToMs(launch.weather_wind_mph)} m/s</Text>
                            <Text>{launch.weather_condition}</Text>
                        </Box>
                    </Box>
                )}
                <Box direction='row' gap='small' align='center'>
                    <Location color='brand' />
                    <Box>
                        <Text>
                            <Anchor
                                href={`/pad/${launch.pad.id}`}
                                onClick={(e) => { e.preventDefault(); router.push(`/pad/${launch.pad.id}`); }}
                                label={launch.pad.name}
                                color={'light-1'}
                                weight={'normal'}
                            />{', '}
                            <Anchor
                                href={`/location/${launch.pad.location.id}`}
                                onClick={(e) => { e.preventDefault(); router.push(`/location/${launch.pad.location.id}`); }}
                                label={launch.pad.location.name}
                                color={'light-1'}
                                weight={'normal'}
                            />
                        </Text>
                        {launch.pad.location.statename ? (
                            <Text>
                                <Anchor
                                    href={`/state/${launch.pad.location.state}`}
                                    onClick={(e) => { e.preventDefault(); router.push(`/state/${launch.pad.location.state}`); }}
                                    label={launch.pad.location.statename}
                                    color={'light-1'}
                                    weight={'normal'}
                                />{', '}
                                {Object.values(COUNTRY_CODES).includes(launch.pad.location.country) ? (
                                    <Anchor
                                        href={`/country/${Object.entries(COUNTRY_CODES).find(cc => cc[1] === launch.pad.location.country)[0]}`}
                                        onClick={(e) => { e.preventDefault(); router.push(`/country/${Object.entries(COUNTRY_CODES).find(cc => cc[1] === launch.pad.location.country)[0]}`); }}
                                        label={launch.pad.location.country}
                                        color={'light-1'}
                                        weight={'normal'}
                                    />
                                ) : (
                                    <Text>{launch.pad.location.country}</Text>
                                )}
                            </Text>
                        ) : (
                            <Text>
                                {Object.values(COUNTRY_CODES).includes(launch.pad.location.country) ? (
                                    <Anchor
                                        href={`/country/${Object.entries(COUNTRY_CODES).find(cc => cc[1] === launch.pad.location.country)[0]}`}
                                        onClick={(e) => { e.preventDefault(); router.push(`/country/${Object.entries(COUNTRY_CODES).find(cc => cc[1] === launch.pad.location.country)[0]}`); }}
                                        label={launch.pad.location.country}
                                        color={'light-1'}
                                        weight={'normal'}
                                    />
                                ) : (
                                    <Text>{launch.pad.location.country}</Text>
                                )}
                            </Text>
                        )}
                    </Box>
                </Box>
                <Box direction='row' gap='small'>
                    <Deploy color='brand' />
                    <Anchor
                        href={`/rocket/${launch.vehicle.id}`}
                        onClick={(e) => { e.preventDefault(); router.push(`/rocket/${launch.vehicle.id}`); }}
                        label={launch.vehicle.name}
                        color={'light-1'}
                        weight={'normal'}
                    />
                </Box>
            </Box>
        </Box>
    );
};

Launch.propTypes = {
    launch: PropTypes.object.isRequired
};

export default Launch;
