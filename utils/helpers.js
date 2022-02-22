import { format, differenceInDays, isTomorrow, isToday, isYesterday } from 'date-fns';
import { MAX_RELATIVE_DATE_DAYS } from './constants';

const BASE_URL = 'https://rocketlaunches.space';

export const fToC = (f) => {
    return Math.round((f - 32) * 5 / 9);
};

export const mphToMs = (mph) => {
    return Math.round(0.44704 * mph);
};

export const relativeDateStr = (date, includeTime = true, maxDiff = MAX_RELATIVE_DATE_DAYS) => {
    const diff = differenceInDays(date, new Date());
    if (diff < 0) {
        return dateStr(date, includeTime);
    }
    if (diff <= maxDiff) {
        let datePart = format(date, 'EEEE');
        if (isToday(date)) {
            datePart = 'Today';
        }
        if (isTomorrow(date)) {
            datePart = 'Tomorrow';
        }
        if (isYesterday(date)) {
            datePart = 'Yesterday';
        }
        if (includeTime) {
            return `${datePart} at ${format(date, 'HH:mm')} GMT`;
        }
        return datePart;
    }
    return dateStr(date, includeTime);
};


export const dateStr = (date, includeTime = true) => {
    const datePart = format(date, 'd MMM y');
    if (includeTime) {
        return `${datePart} at ${format(date, 'HH:mm')} GMT`;
    }
    return datePart;
};

export const launchDateObj = (launch) => {
    const currDate = new Date();
    if (launch.win_open) {
        const date = new Date(launch.win_open);
        const diff = differenceInDays(date, currDate);
        return {
            time: dateStr(date),
            relativeTime: relativeDateStr(date),
            showRelativeTime: diff <= MAX_RELATIVE_DATE_DAYS
        };
    } else if (launch.est_date && launch.est_date.year && launch.est_date.month && launch.est_date.day) {
        const date = new Date(launch.est_date.year, launch.est_date.month - 1, launch.est_date.day);
        const diff = differenceInDays(date, currDate);
        return {
            time: dateStr(date, false),
            relativeTime: relativeDateStr(date, false),
            showRelativeTime: diff <= MAX_RELATIVE_DATE_DAYS
        };
    }
    return {
        time: launch.date_str,
        relativeTime: launch.date_str,
        showRelativeTime: false
    };
};

export const getTitle = (title) => {
    if (!title) {
        return 'Rocket Launches';
    }
    return `${title} - Rocket Launches`;
};

export const getFullUrl = (path) => {
    return `${BASE_URL}${path}`;
};
