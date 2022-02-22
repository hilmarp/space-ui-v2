import React, { useMemo } from 'react';
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
    const memoRnds = useMemo(() => {
        return {
            falcon9: random(1, TOTAL_FALCON9_ROCKETS),
            soyuz: random(1, TOTAL_SOYUZ_ROCKETS),
            falconHeavy: random(1, TOTAL_FALCON_HEAVY_ROCKETS),
            misc: random(1, TOTAL_MISC_ROCKETS)
        };
    }, []);

    if (Object.values(AVAILABLE_ROCKETS).includes(slug)) {
        if (slug === AVAILABLE_ROCKETS.FALCON_9) {
            return (
                <Image
                    fit='cover'
                    src={`/images/rockets/falcon9_${memoRnds.falcon9}.jpg`}
                    alt='Falcon 9'
                />
            );
        }

        if (slug === AVAILABLE_ROCKETS.SOYUZ) {
            return (
                <Image
                    fit='cover'
                    src={`/images/rockets/soyuz_${memoRnds.soyuz}.jpg`}
                    alt='Soyuz'
                />
            );
        }

        if (slug === AVAILABLE_ROCKETS.FALCON_HEAVY) {
            return (
                <Image
                    fit='cover'
                    src={`/images/rockets/falcon_heavy_${memoRnds.falconHeavy}.jpg`}
                    alt='Falcon Heavy'
                />
            );
        }
    }

    return (
        <Image
            fit='cover'
            src={`/images/rockets/misc${memoRnds.misc}.jpg`}
            alt='Rocket'
        />
    );
};

Rocket.propTypes = {
    slug: PropTypes.string.isRequired
};

export default Rocket;
