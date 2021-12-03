import { clearUserData, getUserData, setUserData } from "../utils.js";

const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                clearUserData();
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}

export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('post', data));
}

export async function put(url, data) {
    return await request(url, createOptions('put', data));
}

export async function del(url) {
    return await request(url, createOptions('delete'));
}

export async function login(username, password) {
    const response = await post('/users/login', { username, password });

    const userData = {
        username : response.username,
        id: response._id,
        token: response.accessToken
    }

    setUserData(userData);
}

export async function register(username, password) {
    const response = await post('/users/register', { username, password });

    const userData = {
        username : response.username,
        id: response._id,
        token: response.accessToken
    }

    setUserData(userData);
}

export async function logout() {
    await get('/users/logout');
    clearUserData();    
}