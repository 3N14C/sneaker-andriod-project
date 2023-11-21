import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/dist/query/react";

export const sneaker = createApi({
    reducerPath: 'sneaker',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.130:4200/api'
    }),
    endpoints: (build) => ({
        getAll: build.query({
            query: () => '/sneaker',
        }),

        createSneaker: build.mutation({
            query: (body) => ({
                url: '/sneakers/create',
                method: 'POST',
                body: body
            })
        }),

        removeSneaker: build.mutation({
            query: (id) => ({
                url: `/sneakers/delete/${id}`,
                method: 'DELETE',
            })
        }),
    }),
})
