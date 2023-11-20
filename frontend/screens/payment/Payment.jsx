import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddressItem,
  selectCardItem,
  selectCartItems,
} from "../../hooks/useSelector";
import ModalSuccessfulPayment from "./components/ModalSuccessfulPayment";
import useCurrentPrice from "../../hooks/useCurrentPrice";
import ModalErrorPayment from "./components/ModalErrorPayment";
import { order } from "../../redux/order";
import { addItemToCart, removeItemFromCart } from "../../redux/cart/cart.slice";

const Payment = ({ navigation, userData }) => {
  React.useEffect(() => {
    navigation?.setOptions({
      title: "Способ оплаты",
    });
  }, []);

  const [isChecked, setIsChecked] = React.useState(false);

  const [modalSuccessfulVisible, setModalSuccessfulVisible] =
    React.useState(false);
  const [modalErrorVisible, setErrorVisible] = React.useState(false);

  const [createOrder] = order.useCreateOrderMutation();

  const dispatch = useDispatch();
  const cardItem = useSelector(selectCardItem);
  const cartItem = useSelector(selectCartItems);
  const addressItem = useSelector(selectAddressItem);
  const currentPrice = useCurrentPrice();

  const cartItemsId = cartItem.items.map((item) => item.id);

  const handleToggle = (idx) => {
    if (isChecked === idx) {
      setIsChecked(false);
    } else {
      setIsChecked(idx);
    }
  };

  const sum = cartItem.items.reduce((acc, item) => {
    return (
      acc +
      (+item.offerPrice
        ? ((+item.totalPrice * +item.offerPrice) / 100) * currentPrice
        : +item.totalPrice * currentPrice)
    );
  }, 0);

  const parsedSum = parseFloat(sum).toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });

  const parsedBalanceCard = parseFloat(
    cardItem.card[isChecked]?.balanceCard
  ).toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });

  const handleConfigmPayment = () => {
    if (isChecked !== false && +cardItem.card[isChecked]?.balanceCard >= +sum) {
      cartItemsId.forEach((item) => {
        createOrder({
          userId: userData.id,
          sneakerId: item,
          address: addressItem.address[0].street,
        });
      });
      cartItemsId.forEach((item) => {
        dispatch(removeItemFromCart(item));
      })
      setModalSuccessfulVisible(true);
    } else if (
      isChecked !== false &&
      +cardItem.card[isChecked]?.balanceCard <= +sum
    ) {
      setErrorVisible(true);
    }
  };


  return (
    <>
      {parsedBalanceCard >= parsedSum ? (
        <ModalSuccessfulPayment
          closeModal={() => {
            setModalSuccessfulVisible(false);
            setIsChecked(false);
          }}
          modalVisible={modalSuccessfulVisible}
        />
      ) : (
        <ModalErrorPayment
          closeModal={() => {
            setErrorVisible(false);
            setIsChecked(false);
          }}
          modalVisible={modalErrorVisible}
        />
      )}

      <View
        style={{
          ...styles.container,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "left",
            color: "gray",
          }}
        >
          Выберите способ оплаты, который вы хотите использовать.
        </Text>

        <View
          style={{
            marginTop: 20,
          }}
        >
          {cardItem.card.map((card, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../../public/mastercard.png")}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "rgb(34, 34, 34)",
                  }}
                >
                  {card.numberCard
                    .slice(-4)
                    .padStart(16, "*")
                    .replace(/(.{4})/g, "$1 ")}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleToggle(idx)}
                style={[
                  styles.circle,
                  isChecked === idx && styles.checkedCircle,
                ]}
              >
                {isChecked === idx && <View style={styles.innerCircle} />}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={(idx) => handleConfigmPayment(idx)}
          style={{
            ...styles.button,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Подтвердить платеж
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  circle: {
    width: 24,
    height: 24,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "rgb(16, 16, 16)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedCircle: {
    backgroundColor: "#fff",
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgb(16, 16, 16)",
  },

  button: {
    position: "absolute",
    bottom: 20,
    right: 50,
    width: 300,
    backgroundColor: "black",
    padding: 10,
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
