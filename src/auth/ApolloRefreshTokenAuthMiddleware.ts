import {ApolloClient, NormalizedCacheObject} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

export let apolloClient : ApolloClient<NormalizedCacheObject>

export function needRefreshToken() {
    const tokenExpiresAt = localStorage.getItem('tokenExpiresAt') ? localStorage.getItem('tokenExpiresAt') : 0
    const token = localStorage.getItem('token') ?? null
    if (tokenExpiresAt)
        console.log(
            [
                (!token || !tokenExpiresAt || parseFloat(tokenExpiresAt) < Date.now()),
                tokenExpiresAt,
                parseFloat(tokenExpiresAt),
                Date.now(),
                parseFloat(tokenExpiresAt) - Date.now(),

            ]
        )
    return (!token || !tokenExpiresAt || parseFloat(tokenExpiresAt) < Date.now())
}
const refreshAuthToken = async () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({refresh_token: localStorage.getItem('refreshToken')}, null, 2)
    }
    fetch('http://localhost:8000/api/token/refresh', requestOptions)
        .then(response => response.json())
        .then(response => {
            if (response.message) {
                throw new Error(response.message);
            }
            if (response.error) {
                throw new Error(response.error);
            }
            localStorage.setItem('token', response.token);
            localStorage.setItem('tokenExpiresAt', (Date.now() + 3600000/*1 hour milliseconds*/).toString())

            return response.token
        })
}
const ApolloRefreshTokenAuthMiddleware = setContext(async (request, { headers }) => {
    // set token as refreshToken for refreshing token request
    if (request.operationName === 'refreshAuthToken') {
        let refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${refreshToken}`,
                }
            }
        } else {
            return { headers }
        }
    }
    let token = null
    if (needRefreshToken()) {
        const refreshPromise = refreshAuthToken()
        token = await refreshPromise
    }

    if (token) {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            }
        }
    } else {
        return { headers }
    }
})

export default ApolloRefreshTokenAuthMiddleware