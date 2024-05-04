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
            query: () => ({
                url: getApiUrl(ENDPOINT.admin, ENDPOINT.package),
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetPackegeListQuery,
} = AdminQueryApi;
