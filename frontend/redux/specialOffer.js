import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/dist/query/react";

export const specialOffer = createApi({
    reducerPath: "specialOffer",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://sneaker-andriod-project.onrender.com/api"
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