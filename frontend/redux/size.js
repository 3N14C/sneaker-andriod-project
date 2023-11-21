import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/dist/query/react";

export const sizeSneaker = createApi({
    reducerPath: 'sizeSneaker',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.103:4200/api'
    }),

    endpoints: (build) => ({
        getSizes: build.query({
            query: () => '/size',
        }),
    })
})