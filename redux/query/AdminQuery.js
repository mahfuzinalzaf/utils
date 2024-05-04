import { getCookie } from '@/helper/cookie';
import { ENDPOINT } from '@/helper/endpoint';
import { getApiUrl } from '@/helper/getApiUrl';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getCookie(process.env.NEXT_PUBLIC_ADMIN_SECRET);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const AdminQueryApi = createApi({
    reducerPath: 'adminQueryApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getPackegeList: builder.query({
            query: (params) => {
                return {
                    url: getApiUrl(ENDPOINT.admin, ENDPOINT.package, getFullQuery(params)),
                    method: 'GET',
                }
            },
        }),
    }),
});

export const {
    useGetPackegeListQuery,
} = AdminQueryApi;


// ----------------------------------
// ---------------------------------------
#getApiUrl
export const getApiUrl = (type, endpoint, fullQuery, single = false) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${type}${endpoint}${single ? `/${single}` : ''}?${fullQuery}`
}

// calling example
// getApiUrl(ENDPOINT.admin, ENDPOINT.auth.login);


// ----------------------------------------
// ---------------------------------------------
#getFullQuery
import { buildQueryString } from "@/utils/buildQueryString";

export const getFullQuery = (params) => {
    const defaultParams = {
        page: params?.page || 1,
        per_page: params?.perPage || 10,
    };
    const additionalQuery = buildQueryString(params?.queryParams);
    const fullQuery = buildQueryString(defaultParams) + (additionalQuery ? `&${additionalQuery}` : '');
    return fullQuery;
}


// ----------------------------------------
// ---------------------------------------------
#buildQueryString
export const buildQueryString = (params) => {
    if (!params) return '';

    if (Array.isArray(params)) {
        return params
            .filter((param) => param.key && param.value) // Only include valid pairs
            .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
            .join('&');
    }

    if (typeof params === 'object') {
        return Object.entries(params)
            .filter(([, value]) => value !== undefined && value !== null) // Exclude undefined/null values
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    return '';
};
