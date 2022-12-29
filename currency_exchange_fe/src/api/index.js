import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/rates',
})

export const insertRate = payload => api.post(`/`, payload)
export const getRates = () => api.get(`/`)
export const getRatesUsd = () => api.get(`/USD`)
export const getDateFiltered = (from, to)=> api.get(`?from=${from}&to=${to}`)

const apis = {
    insertRate,
    getRates,
    getRatesUsd,
    getDateFiltered
}

export default apis