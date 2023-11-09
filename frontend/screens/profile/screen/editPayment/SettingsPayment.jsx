import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { selectCardItem } from "../../../../hooks/useSelector";
import ModalCard from "./components/ModalCard";
import { addBalanceToCard } from "../../../../redux/card/card.slice";
import { useNavigation } from "@react-navigation/native";

const SettingsPayment = ({ route }) => {
  const [focus, setFocus] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch()

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleToggle = (idx) => {
    if (focus === idx) {
      setFocus(idx);
    } else {
      setFocus(idx);
    }
  };

  const cardItem = useSelector(selectCardItem);

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View
        style={{
          marginBottom: 20
        }}
      >
        <TouchableHighlight
          underlayColor={false}
          onPress={() => {
            navigation.navigate("HistoryPayment", {
              userData: route?.params,
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "white",
              borderRadius: 10,
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "black",
                textAlign: 'center'
              }}
            >Посмотреть историю платежей</Text>
          </View>
        </TouchableHighlight>
      </View>

      <ModalCard
        number={cardItem?.card[focus]?.numberCard
          .toString()
          .padStart(16, "*")
          .replace(/(.{4})/g, "$1 ")}
        name={cardItem?.card[focus]?.nameCard}
        date={
          cardItem?.card[focus]?.dateCard.toString().slice(0, 2) +
          "/" +
          cardItem?.card[focus]?.dateCard.toString().slice(2, 4)
        }
        balance={cardItem?.card[focus]?.balanceCard + 1_000}
        openModal={modalVisible}
        closeModal={() => {
          setModalVisible(false);
          // dispatch(addBalanceToCard(focus))
        }}
      />

      {cardItem.card.length <= 0 ? (
        <View
          style={{
            ...styles.notFound,
          }}
        >
          <Icon name="credit-card" color={"gray"} size={100} />
          <Text
            style={{
              fontSize: 15,
              marginTop: 20,
              textAlign: "center",
              color: "gray",
            }}
          >
            Добавьте свою первую карту для оплаты
          </Text>
        </View>
      ) : (
        <>
          {cardItem?.card.map((card, idx) => (
            <TouchableHighlight
              underlayColor={false}
              onPress={() => {
                handleOpenModal();
                handleToggle(idx);
              }}
              key={idx}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginBottom: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
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
                    source={require("../../../../public/mastercard.png")}
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

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "rgb(34, 34, 34)",
                  }}
                >
                  Connected
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </>
      )}

      <TouchableHighlight
        onPress={() => {
          navigation.navigate("AddCard");
        }}
        style={{
          ...styles.button,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "normal",
          }}
        >
          Добавить новую карту
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default SettingsPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  notFound: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 100,
  },

  button: {
    backgroundColor: "black",
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
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
