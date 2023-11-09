import axios from "axios";
import React from "react";

const useCurrentPrice = () => {
    const [currentPrice, setCurrentPrice] = React.useState(0);

    React.useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await axios.get(
                    "https://api.exchangerate-api.com/v4/latest/USD"
                );
                const exchangeRate = res.data.rates.RUB;
                setCurrentPrice(exchangeRate);
            } catch (err) {
                console.log(err);
            }
        }

        fetchPrice();

    }, []);

    return currentPrice
}

export default useCurrentPrice