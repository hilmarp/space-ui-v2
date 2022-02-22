import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

const LaunchMedia = ({ launch }) => {
    if (!launch.media || !launch.media.length) {
        return;
    }
    const launchDayFeatured = launch.media.filter(m => m.ldfeatured);
    if (launchDayFeatured.length) {
        return (
            <Box gap='medium'>
                {launchDayFeatured.map(m => (
                    <iframe
                        key={m.id}
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${m.youtube_vidid}`}
                        title={launch.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ))}
            </Box>
        );
    }
    return (
        <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${launch.media[0].youtube_vidid}`}
            title={launch.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
};

LaunchMedia.propTypes = {
    launch: PropTypes.object.isRequired
};

export default LaunchMedia;
