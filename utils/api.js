const API_URL = 'https://api.rocketlaunches.space';

export const getCompanies = async (page = '1', search = '') => {
    let path = `/json/companies?page=${page}`;
    if (search) {
        path += `&name=${search}`;
    }

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getRockets = async (page = '1', search = '') => {
    let path = `/json/vehicles?page=${page}`;
    if (search) {
        path += `&name=${search}`;
    }

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLocations = async (page = '1', search = '') => {
    let path = `/json/locations?page=${page}`;
    if (search) {
        path += `&name=${search}`;
    }

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunches = async (page = '1') => {
    const path = `/json/launches?page=${page}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchesBefore = async (page = '1', date) => {
    const path = `/json/launches?page=${page}&before_date=${date}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchesAfter = async (page = '1', date) => {
    const path = `/json/launches?page=${page}&after_date=${date}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getNextLaunches = async () => {
    return await fetch(`${API_URL}/json/launches/next/5`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchesByRocketId = async (page = '1', rocketId) => {
    const path = `/json/launches?page=${page}&vehicle_id=${rocketId}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchesByLocationId = async (page = '1', locationId) => {
    const path = `/json/launches?page=${page}&location_id=${locationId}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchesByPadId = async (page = '1', padId) => {
    const path = `/json/launches?page=${page}&pad_id=${padId}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchesByCompanyId = async (page = '1', companyId) => {
    const path = `/json/launches?page=${page}&provider_id=${companyId}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchesByState = async (page = '1', state) => {
    const path = `/json/launches?page=${page}&state_abbr=${state}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchesByCountry = async (page = '1', country) => {
    const path = `/json/launches?page=${page}&country_code=${country}`;

    return await fetch(`${API_URL}${path}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLaunchById = async (id) => {
    return await fetch(`${API_URL}/json/launches?id=${id}`)
        .then(response => response.json())
        .then(data => data);
};

export const getPadById = async (id) => {
    return await fetch(`${API_URL}/json/pads?id=${id}`)
        .then(response => response.json())
        .then(data => data);
};

export const getRocketById = async (id) => {
    return await fetch(`${API_URL}/json/vehicles?id=${id}`)
        .then(response => response.json())
        .then(data => data);
};

export const getCompanyById = async (id) => {
    return await fetch(`${API_URL}/json/companies?id=${id}`)
        .then(response => response.json())
        .then(data => data);
};

export const getLocationById = async (id) => {
    return await fetch(`${API_URL}/json/locations?id=${id}`)
        .then(response => response.json())
        .then(data => data);
};
