import React from 'react';
import { Layer, Box, Spinner } from 'grommet';

const FullPageLoading = () => {
    return (
        <Layer
            full
            animation={'fadeIn'}
            background={{ opacity: false }}
        >
            <Box
                fill
                background={{ color: 'dark-1', opacity: 'weak' }}
                align="center"
                justify="center"
            >
                <Spinner
                    size='large'
                    color={'light-1'}
                />
            </Box>
        </Layer>
    );
};

export default FullPageLoading;
