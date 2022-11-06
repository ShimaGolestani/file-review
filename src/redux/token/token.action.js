export const SET_TOKEN = "SET_TOKEN"

export function setToken(value) {
    return dispatch => {
        dispatch({
            type: SET_TOKEN,
            payload: value
        })
    }
}