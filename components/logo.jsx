import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image, Tip, Box, Text } from 'grommet';
import { useRouter } from 'next/router';
import { AVAILABLE_LOGOS } from '../utils/constants';

const Logo = ({ slug, link, tooltip }) => {
    const router = useRouter();

    const getImage = () => {
        switch (slug) {
            case AVAILABLE_LOGOS.ABL_SPACE:
                return <Image height={'20'} src={'/images/logos/abl_space_systems.png'} alt={AVAILABLE_LOGOS.ABL_SPACE} />;
            case AVAILABLE_LOGOS.AEVUM:
                return <Image height={'25'} src={'/images/logos/aevum.png'} alt={AVAILABLE_LOGOS.AEVUM} />;
            case AVAILABLE_LOGOS.AIRBUS_DEFENSE:
                return <Image height={'40'} src={'/images/logos/Airbus_Defence_and_Space.jpg'} alt={AVAILABLE_LOGOS.AIRBUS_DEFENSE} />;
            case AVAILABLE_LOGOS.ALBA_ORBITAL:
                return <Image height={'50'} src={'/images/logos/albaorbital.png'} alt={AVAILABLE_LOGOS.ALBA_ORBITAL} />;
            case AVAILABLE_LOGOS.ARIANESPACE:
                return <Image height={'50'} src={'/images/logos/arianespace.png'} alt={AVAILABLE_LOGOS.ARIANESPACE} />;
            case AVAILABLE_LOGOS.ASTRA_SPACE:
                return <Image height={'25'} src={'/images/logos/astra.png'} alt={AVAILABLE_LOGOS.ASTRA_SPACE} />;
            case AVAILABLE_LOGOS.ASTROBOTIC:
                return <Image height={'40'} src={'/images/logos/astrobotic.jpg'} alt={AVAILABLE_LOGOS.ASTROBOTIC} />;
            case AVAILABLE_LOGOS.BLUE_ORIGIN:
                return <Image height={'40'} src={'/images/logos/blue_origin.png'} alt={AVAILABLE_LOGOS.BLUE_ORIGIN} />;
            case AVAILABLE_LOGOS.ENERGIA:
                return <Image height={'40'} src={'/images/logos/energia.jpeg'} alt={AVAILABLE_LOGOS.ENERGIA} />;
            case AVAILABLE_LOGOS.EXPACE:
                return <Image height={'40'} src={'/images/logos/expace.jpeg'} alt={AVAILABLE_LOGOS.EXPACE} />;
            case AVAILABLE_LOGOS.FIREFLY:
                return <Image height={'50'} src={'/images/logos/Firefly_logo.jpg'} alt={AVAILABLE_LOGOS.FIREFLY} />;
            case AVAILABLE_LOGOS.FLEET_SPACE:
                return <Image height={'30'} src={'/images/logos/fleet_space.png'} alt={AVAILABLE_LOGOS.FLEET_SPACE} />;
            case AVAILABLE_LOGOS.ISAS:
                return <Image height={'30'} src={'/images/logos/ISAS_logo.png'} alt={AVAILABLE_LOGOS.ISAS} />;
            case AVAILABLE_LOGOS.ISRO:
                return <Image height={'50'} src={'/images/logos/isro.png'} alt={AVAILABLE_LOGOS.ISRO} />;
            case AVAILABLE_LOGOS.NASA:
                return <Image height={'50'} src={'/images/logos/nasa.png'} alt={AVAILABLE_LOGOS.NASA} />;
            case AVAILABLE_LOGOS.ROCKET_LAB:
                return <Image height={'30'} src={'/images/logos/rocket_lab.png'} alt={AVAILABLE_LOGOS.ROCKET_LAB} />;
            case AVAILABLE_LOGOS.ROSCOSMOS:
                return <Image height={'50'} src={'/images/logos/roscosmos_logo.png'} alt={AVAILABLE_LOGOS.ROSCOSMOS} />;
            case AVAILABLE_LOGOS.SPACEX:
                return <Image height={'20'} src={'/images/logos/spacex.png'} alt={AVAILABLE_LOGOS.SPACEX} />;
            case AVAILABLE_LOGOS.VIRGIN_GALACTIC:
                return <Image height={'50'} src={'/images/logos/virgin_galactic.png'} alt={AVAILABLE_LOGOS.VIRGIN_GALACTIC} />;
            case AVAILABLE_LOGOS.VIRGIN_ORBIT:
                return <Image height={'50'} src={'/images/logos/virgin_orbit.png'} alt={AVAILABLE_LOGOS.VIRGIN_ORBIT} />;
            case AVAILABLE_LOGOS.NORTHROP_GRUMMAN:
                return <Image height={'40'} src={'/images/logos/northrop_grumman.jpg'} alt={AVAILABLE_LOGOS.NORTHROP_GRUMMAN} />;
            case AVAILABLE_LOGOS.ULA:
                return <Image height={'30'} src={'/images/logos/ula.png'} alt={AVAILABLE_LOGOS.ULA} />;
            case AVAILABLE_LOGOS.RELATIVITY_SPACE:
                return <Image height={'25'} src={'/images/logos/relativity_space.png'} alt={AVAILABLE_LOGOS.RELATIVITY_SPACE} />;
            default:
                return <></>;
        }
    };
    return (
        link ? (
            <Anchor
                href={link}
                onClick={(e) => { e.preventDefault(); router.push(link); }}
            >
                {tooltip ? (
                    <Tip
                        plain
                        content={
                            <Box background={'light-1'} pad={'small'} round="small">
                                <Text>{tooltip}</Text>
                            </Box>
                        }
                        dropProps={{ align: { bottom: 'top' } }}
                    >
                        {getImage()}
                    </Tip>
                ) : (
                    <>
                        {getImage()}
                    </>
                )}
            </Anchor>
        ) : (
            <>
                {getImage()}
            </>
        )
    );
};

Logo.propTypes = {
    slug: PropTypes.string.isRequired,
    link: PropTypes.string,
    tooltip: PropTypes.string
};

export default Logo;
