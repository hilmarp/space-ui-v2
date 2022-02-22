import React, { useContext } from 'react';
import { Anchor, Box, Menu, ResponsiveContext } from 'grommet';
import { Deploy, Menu as MenuIcon } from 'grommet-icons';
import { useRouter } from 'next/router';

const Navbar = () => {
    const screenSize = useContext(ResponsiveContext);
    const router = useRouter();

    return (
        <Box
            as={'nav'}
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
            {screenSize === 'small' ? (
                <Box>
                    <Menu
                        icon={<MenuIcon />}
                        items={[
                            { label: 'Launches', onClick: () => { router.push('/launches'); } },
                            { label: 'Companies', onClick: () => { router.push('/companies'); } },
                            { label: 'Rockets', onClick: () => { router.push('/rockets'); } },
                            { label: 'Locations', onClick: () => { router.push('/locations'); } }
                        ]}
                        dropAlign={{ top: 'bottom', right: 'right' }}
                    />
                </Box>
            ) : (
                <Box direction="row" gap="small">
                    <Anchor
                        href="/launches"
                        onClick={(e) => { e.preventDefault(); router.push('/launches'); }}
                        label="Launches"
                        color={'light-1'}
                        weight={'normal'}
                    />
                    <Anchor
                        href="/companies"
                        onClick={(e) => { e.preventDefault(); router.push('/companies'); }}
                        label="Companies"
                        color={'light-1'}
                        weight={'normal'}
                    />
                    <Anchor
                        href="/rockets"
                        onClick={(e) => { e.preventDefault(); router.push('/rockets'); }}
                        label="Rockets"
                        color={'light-1'}
                        weight={'normal'}
                    />
                    <Anchor
                        href="/locations"
                        onClick={(e) => { e.preventDefault(); router.push('/locations'); }}
                        label="Locations"
                        color={'light-1'}
                        weight={'normal'}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Navbar;
