import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'grommet';
import { random } from 'lodash';

const TOTAL_MISC_ROCKETS = 9;
const TOTAL_FALCON9_ROCKETS = 4;
const TOTAL_FALCON_HEAVY_ROCKETS = 2;
const TOTAL_SOYUZ_ROCKETS = 4;

const AVAILABLE_ROCKETS = {
    FALCON_9: 'falcon-9',
    SOYUZ: 'soyuz-2',
    FALCON_HEAVY: 'falcon-heavy'
};

const Rocket = ({ slug }) => {
    if (Object.values(AVAILABLE_ROCKETS).includes(slug)) {
        if (slug === AVAILABLE_ROCKETS.FALCON_9) {
            const rnd = random(1, TOTAL_FALCON9_ROCKETS);
            return (
                <Image
                    fit='cover'
                    src={`/images/rockets/falcon9_${rnd}.jpg`}
                    alt='Falcon 9'
                />
            );
        }

        if (slug === AVAILABLE_ROCKETS.SOYUZ) {
            const rnd = random(1, TOTAL_SOYUZ_ROCKETS);
            return (
                <Image
                    fit='cover'
                    src={`/images/rockets/soyuz_${rnd}.jpg`}
                    alt='Soyuz'
                />
            );
        }

        if (slug === AVAILABLE_ROCKETS.FALCON_HEAVY) {
            const rnd = random(1, TOTAL_FALCON_HEAVY_ROCKETS);
            return (
                <Image
                    fit='cover'
                    src={`/images/rockets/falcon_heavy_${rnd}.jpg`}
                    alt='Falcon Heavy'
                />
            );
        }
    }
    const randomMisc = random(1, TOTAL_MISC_ROCKETS);
    return (
        <Image
            fit='cover'
            src={`/images/rockets/misc${randomMisc}.jpg`}
            alt='Rocket'
        />
    );
};

Rocket.propTypes = {
    slug: PropTypes.string.isRequired
};

export default Rocket;
