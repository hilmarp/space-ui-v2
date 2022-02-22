import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getLaunchById, getPadById } from '../../utils/api';
import { getTitle, getFullUrl } from '../../utils/helpers';
import FullPageLoading from '../../components/full-page-loading';
import Loading from '../../components/loading';
import LaunchMedia from '../../components/launch-media';
import FeaturedLaunch from '../../components/featured-launch';

export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const data = await getLaunchById(id);
    return {
        props: {
            launch: data.result[0]
        }
    };
};

const DynamicMap = dynamic(
    () => import('../../components/map'),
    { ssr: false }
);

const Launch = ({ launch }) => {
    const [loading, setLoading] = useState(false);
    const [padLatLon, setPadLatLon] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const asyncGetPadById = async () => {
            const data = await getPadById(launch.pad.id);
            setPadLatLon({
                lat: data.result[0].location.latitude,
                lon: data.result[0].location.longitude
            });
        };
        asyncGetPadById();
    }, [launch]);

    return (
        <>
            <Head>
                <title>{getTitle(launch.name)}</title>
                <meta name="description" content={launch.launch_description} />
                <meta property="og:title" content={getTitle(launch.name)} />
                <meta property="og:description" content={launch.launch_description} />
                <meta property="og:url" content={getFullUrl(router.asPath)} />
            </Head>
            <Box pad={{ top: 'large', bottom: 'large', left: 'medium', right: 'medium' }}>
                <Box align='center' gap='medium'>
                    <Box width={'xxlarge'}>
                        <FeaturedLaunch launch={launch} />
                    </Box>
                    {launch.media && launch.media.length > 0 && (
                        <Box width={'xlarge'} gap='medium'>
                            <LaunchMedia launch={launch} />
                        </Box>
                    )}
                    {padLatLon ? (
                        <Box width={'xlarge'}>
                            <DynamicMap
                                lat={padLatLon.lat}
                                lon={padLatLon.lon}
                                popup={`${launch.pad.name}, ${launch.pad.location.name}`}
                            />
                        </Box>
                    ) : (
                        <Box
                            width={'xlarge'}
                            height='500px'
                            background={'dark-2'}
                            align='center'
                            justify='center'
                        >
                            <Loading />
                        </Box>
                    )}
                </Box>
                {loading && (
                    <FullPageLoading />
                )}
            </Box>
        </>
    );
};

export default Launch;
