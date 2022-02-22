import React, { useContext } from 'react';
import { Anchor, Box, ResponsiveContext } from 'grommet';
import { Deploy } from 'grommet-icons';
import { useRouter } from 'next/router';

const Footer = () => {
    const screenSize = useContext(ResponsiveContext);
    const router = useRouter();

    return (
        <Box
            as={'footer'}
            direction="row"
            justify="between"
            align="center"
            pad={'large'}
            background={'dark-1'}
        >
            <Box>
                {screenSize === 'small' ? (
                    <Anchor
                        href="/"
                        onClick={(e) => { e.preventDefault(); router.push('/'); }}
                        color={'light-1'}
                        icon={<Deploy color={'brand'} />}
                    />
                ) : (
                    <Anchor
                        href="/"
                        onClick={(e) => { e.preventDefault(); router.push('/'); }}
                        label="Rocket Launches"
                        color={'light-1'}
                        icon={<Deploy color={'brand'} />}
                    />
                )}
            </Box>
            <Box>
                <Anchor
                    href="/about"
                    onClick={(e) => { e.preventDefault(); router.push('/about'); }}
                    label="About"
                    color={'light-1'}
                    weight={'normal'}
                />
            </Box>
        </Box>
    );
};

export default Footer;
