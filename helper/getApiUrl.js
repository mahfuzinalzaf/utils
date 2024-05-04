export const getApiUrl = (type, endpoint, single = false) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${type}${endpoint}${single ? `/${single}` : ''}`
}

// calling example
// getApiUrl(ENDPOINT.admin, ENDPOINT.auth.login);