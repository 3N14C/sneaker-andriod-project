import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/dist/query/react";

export const order = createApi({
    reducerPath: "order",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://sneaker-andriod-project.onrender.com/api"
    }),
    endpoints: (build) => ({
        getAllOrders: build.query({
            query: () => "/order",
        }),

        createOrder: build.mutation({
            query: ({
                userId,
                sneakerId,
                address,
            }) => ({
                url: "/order/create",
                method: "POST",
                body: {
                    userId,
                    sneakerId,
                    address,
                }
            })
        }),

        getOrdersByUser: build.query({
            query: (id) => `/order/user-orders/${id}`
        }),

        updateOrderRoadmap: build.mutation({
            query: ({id, roadmapDelivery}) => ({
                url: `/order/update-status-order-by-id/${id}`,
                method: 'PATCH',
                body: {
                    roadmapDelivery
                }
            })
        })
    })
})