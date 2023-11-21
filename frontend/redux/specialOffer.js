import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/dist/query/react";

export const specialOffer = createApi({
    reducerPath: "specialOffer",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.0.103:4200/api"
    }),
    endpoints: (build) => ({
        getSpecialOfferByDiscount: build.query({
            query: () => "/offer/25",
        }),

        getAllSpecialOffer: build.query({
            query: () => "/offer",
        })
    }),
})