import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

const Countdown = ({ endTime }) => {
    const [days, setDays] = useState('00');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    useEffect(() => {
        if (!endTime) {
            return;
        }
        const firstTotal = Date.parse(endTime) - Date.parse(new Date());
        if (firstTotal <= 0) {
            return;
        }
        const countdownInterval = setInterval(() => {
            const total = Date.parse(endTime) - Date.parse(new Date());
            const secondsRemaining = Math.floor((total / 1000) % 60);
            const minutesRemaining = Math.floor((total / 1000 / 60) % 60);
            const hoursRemaining = Math.floor((total / (1000 * 60 * 60)) % 24);
            const daysRemaining = Math.floor(total / (1000 * 60 * 60 * 24));
            setDays(('0' + daysRemaining).slice(-2));
            setHours(('0' + hoursRemaining).slice(-2));
            setMinutes(('0' + minutesRemaining).slice(-2));
            setSeconds(('0' + secondsRemaining).slice(-2));
            if (total <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
        return () => clearInterval(countdownInterval);
    }, [endTime]);

    return (
        <Box direction='row' gap='xsmall'>
            <Box>
                <Text size='xlarge'>-</Text>
            </Box>
            <Box direction='row' gap='xsmall'>
                <Box width={'xxsmall'}>
                    <Box align='center'>
                        <Text size='xlarge'>{days}</Text>
                    </Box>
                    <Box align='center'>
                        <Text size='xsmall'>Days</Text>
                    </Box>
                </Box>
                <Box align='center'>
                    <Text size='xlarge'>:</Text>
                </Box>
                <Box width={'xxsmall'}>
                    <Box align='center'>
                        <Text size='xlarge'>{hours}</Text>
                    </Box>
                    <Box align='center'>
                        <Text size='xsmall'>Hours</Text>
                    </Box>
                </Box>
                <Box align='center'>
                    <Text size='xlarge'>:</Text>
                </Box>
                <Box width={'xxsmall'}>
                    <Box align='center'>
                        <Text size='xlarge'>{minutes}</Text>
                    </Box>
                    <Box align='center'>
                        <Text size='xsmall'>Minutes</Text>
                    </Box>
                </Box>
                <Box align='center'>
                    <Text size='xlarge'>:</Text>
                </Box>
                <Box width={'xxsmall'}>
                    <Box align='center'>
                        <Text size='xlarge'>{seconds}</Text>
                    </Box>
                    <Box align='center'>
                        <Text size='xsmall'>Seconds</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

Countdown.propTypes = {
    endTime: PropTypes.instanceOf(Date)
};

export default Countdown;
