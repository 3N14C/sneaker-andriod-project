import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import useCurrentPrice from "../hooks/useCurrentPrice";
import Icon from "react-native-vector-icons/FontAwesome5";

const StarRaiting = ({closeModal}) => {
  const [isSolid, setIsSolid] = React.useState(false);
  const [raiting, setRaiting] = React.useState(1)
  const newArray = new Array(5).fill(0);

  const handleSolid = (idx) => {
    if (isSolid === idx) {
      setIsSolid(false);
    } else {
      setIsSolid(idx);
    }

    console.log(idx)
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          gap: 20
        }}
      >
        {newArray.map((_, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              handleSolid(idx);
              setRaiting(idx + 1)
            }}
          >
            <Icon 
              style={{ width: 40, height: 40 }}
              name="star"
              size={30}
              solid={isSolid >= idx}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={closeModal}
          style={{
            backgroundColor: "#e7e7e7",
            paddingHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              color: "#363940",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Отмена
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#141415",
            paddingHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 50,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Принять
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Review = ({ openModal, closeModal }) => {
  const route = useRoute();
  const sneaker = route?.params?.orderItem;
  const currentPrice = useCurrentPrice();

  return (
    <Modal
      style={{ flex: 1 }}
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={closeModal}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#fff",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingBottom: 20,
          }}
        >
          <Text style={{ marginTop: 50, fontSize: 20, fontWeight: "bold" }}>
            Оставить Отзыв
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20 }}>
            <Image
              style={{ width: 150, height: 150 }}
              src={sneaker?.image[0].path}
            />

            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  maxWidth: 150
                }}
              >{sneaker?.name}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  gap: 10,
                }}
              >
                <Text style={{ ...styles.sneakerSize, maxWidth: 35 }}>
                  {sneaker?.sizeNumber}
                </Text>

                <Text style={{ ...styles.inDelivery }}>Доставлен</Text>
              </View>

              <Text
                style={{
                  ...styles.price,
                  marginTop: 10,
                }}
              >
                {sneaker?.offerPrice
                  ? parseFloat(
                      (+sneaker?.price * currentPrice * +sneaker?.offerPrice) /
                        100
                    ).toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    })
                  : parseFloat(+sneaker?.price * currentPrice).toLocaleString(
                      "ru-RU",
                      {
                        style: "currency",
                        currency: "RUB",
                      }
                    )}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Как вам данный товар?
            </Text>

            <Text style={{ marginTop: 10, color: "#c6c6c6" }}>
              Пожалуйста, оставьте свою оценку
            </Text>
          </View>

          <StarRaiting closeModal={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default Review;

const styles = StyleSheet.create({
  sneakerSize: {
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
  },

  inDelivery: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  price: {
    color: "#101010",
    fontSize: 16,
    fontWeight: "bold",
  },
});
