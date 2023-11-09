import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.130:4200/api',
    }),

    endpoints: (build) => ({
        getUsers: build.query({
            query: () => '/users',

        }),

        createUser: build.mutation({
            query: (body) => ({
                url: '/users/create',
                method: 'POST',
                body: body
            }),
        }),

        getById: build.query({
            query: (id) => `/users/id/${id}`, 
        }),

        getUserByEmail: build.query({
            query: (email) => `/users/email/${email}`,
        }),

        getByUsername: build.query({
            query: (username) => `/users/username/${username}`,
        }),

        loginUser: build.mutation({
            query: ({
                email,
                password
            }) => ({
                url: `/users/login`,
                method: 'POST',
                body: {
                    email,
                    password
                }
            }),
        }),

        updateUserById: build.mutation({
            query: ({
                    id,
                    avatar
                }) => ({
                url: `/users/update/${id}`,
                method: 'PATCH',
                body: avatar
            }),
        })
    }),
})