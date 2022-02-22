import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Anchor, Tip, Paragraph, ResponsiveContext } from 'grommet';
import { Location, Cloud, Deploy, Calendar } from 'grommet-icons';
import { useRouter } from 'next/router';
import { differenceInDays } from 'date-fns';
import { fToC, mphToMs, launchDateObj } from '../utils/helpers';
import { AVAILABLE_LOGOS, COUNTRY_CODES, MAX_RELATIVE_DATE_DAYS } from '../utils/constants';
import Logo from './logo';
import Rocket from './rocket';
import Countdown from './countdown';

const FeaturedLaunch = ({ launch, linkToLaunch }) => {
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
            {linkToLaunch ? (
                screenSize === 'small' ? (
                    <Anchor
                        href={`/launch/${launch.id}`}
                        onClick={(e) => { e.preventDefault(); router.push(`/launch/${launch.id}`); }}
                    >
                        <Box flex={false} height={'medium'}>
                            <Rocket slug={launch.vehicle.slug} />
                        </Box>
                    </Anchor>
                ) : (
                    <Anchor
                        href={`/launch/${launch.id}`}
                        onClick={(e) => { e.preventDefault(); router.push(`/launch/${launch.id}`); }}
                    >
                        <Box flex={false} height={'large'} width={screenSize === 'medium' ? 'medium' : 'large'}>
                            <Rocket slug={launch.vehicle.slug} />
                        </Box>
                    </Anchor>
                )
            ) : (
                screenSize === 'small' ? (
                    <Box flex={false} height={'medium'}>
                        <Rocket slug={launch.vehicle.slug} />
                    </Box>
                ) : (
                    <Box flex={false} height={'large'} width={screenSize === 'medium' ? 'medium' : 'large'}>
                        <Rocket slug={launch.vehicle.slug} />
                    </Box>
                )
            )}
            <Box pad={'large'} gap='small'>
                {linkToLaunch ? (
                    <Heading margin={'none'}>
                        <Anchor
                            href={`/launch/${launch.id}`}
                            onClick={(e) => { e.preventDefault(); router.push(`/launch/${launch.id}`); }}
                            label={launch.name}
                            color={'light-1'}
                        />
                    </Heading>
                ) : (
                    <Heading margin={'none'}>{launch.name}</Heading>
                )}
                <Box pad={{ bottom: 'small' }}>
                    {Object.values(AVAILABLE_LOGOS).includes(launch.provider.slug) ? (
                        <Logo
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
                {launch.win_open && (differenceInDays(new Date(launch.win_open), new Date()) <= MAX_RELATIVE_DATE_DAYS) && (
                    <Box pad={{ bottom: 'small' }}>
                        <Countdown endTime={new Date(launch.win_open)}/>
                    </Box>
                )}
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
                {launch.launch_description && (
                    <Box>
                        <Paragraph margin={'none'}>{launch.launch_description}</Paragraph>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

FeaturedLaunch.propTypes = {
    launch: PropTypes.object.isRequired,
    linkToLaunch: PropTypes.bool
};

export default FeaturedLaunch;
