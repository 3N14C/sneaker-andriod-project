import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/dist/query/react";

export const sizeSneaker = createApi({
    reducerPath: 'sizeSneaker',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://sneaker-andriod-project.onrender.com/api'
    }),

    endpoints: (build) => ({
        getSizes: build.query({
            query: () => '/size',
        }),
    })
})