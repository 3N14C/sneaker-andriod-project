import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/dist/query/react";

export const brand = createApi({
    reducerPath: 'brand',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://sneaker-andriod-project.onrender.com/api'
    }),
    endpoints: (build) => ({
        getAll: build.query({
            query: () => '/brand',
        }),

        createBrand: build.mutation({
            query: (body) => ({
                url: '/brand/create',
                method: 'POST',
                body: body
            })
        }),

        removeBrand: build.mutation({
            query: (id) => ({
                url: `/brand/delete/${id}`,
                method: 'DELETE',
            })
        }),
    }),
})