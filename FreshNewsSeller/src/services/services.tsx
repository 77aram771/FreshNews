import axios from 'axios'

import {SERVER_BASE} from "../share/consts";

/**
 * Returns {requestId} to store and use in the "verify" request
 */

export const request = (phoneNumber: Number) => {
    return axios.post(`${SERVER_BASE}/auth?phone=${phoneNumber}`)
};


export const verify = (requestId: Number, code: Number) => {
    return axios.post(`${SERVER_BASE}/login?phone=${requestId}&code=${code}`)
};


export const invite = (phoneNumber: Number) => {
    return fetch(`${SERVER_BASE}/invite`, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            number: phoneNumber
        })
    })
};
