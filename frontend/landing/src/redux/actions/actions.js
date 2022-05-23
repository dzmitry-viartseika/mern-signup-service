import { GET_USER, SET_USER } from '../../constants/types'

export function getUser(data) {
    return {
        type: GET_USER,
        payload: data
    }
}
export function setUser(data) {
    return {
        type: SET_USER,
        payload: data
    }
}
