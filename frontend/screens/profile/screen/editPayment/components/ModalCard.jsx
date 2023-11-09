import {
    Animated,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const ModalCard = ({ openModal, closeModal, name, number, date, cvv, balance }) => {
  const [rotate] = React.useState(new Animated.Value(0));
  const [showBalance, setShowBalance] = React.useState(false);

  const handleShowBalance = () => {
    setShowBalance(!showBalance);
    Animated.timing(rotate, {
      toValue: showBalance ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={closeModal}
    >
      <View
        style={{
          ...styles.modalContainer,
        }}
      >
        <View
          style={{
            backgroundColor: "rgb(30, 30, 30)",
            paddingVertical: 40,
            paddingHorizontal: 40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <TouchableOpacity
            underlayColor={"rgb(246, 246, 246)"}
            onPress={handleShowBalance}
          >
            <Animated.View
              style={{
                ...styles.cardContainer,
                transform: [
                  {
                    rotateX: rotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"],
                    }),
                  },
                ],
              }}
            >
              {showBalance ? (
                <>
                  <Animated.View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 73,
                      transform: [
                        {
                          rotateX: rotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "180deg"],
                          }),
                        },
                      ],
                    }}
                  >
                    <Text
                      style={{
                        color: "rgb(246, 246, 246)",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {parseFloat(balance).toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                      })}
                    </Text>
                  </Animated.View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "rgb(246, 246, 246)",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Mocard
                    </Text>

                    <Text
                      style={{
                        color: "rgb(246, 246, 246)",
                      }}
                    >
                      amazon
                    </Text>
                  </View>

                  <View style={{}}>
                    <Text
                      style={{
                        color: "rgb(246, 246, 246)",
                        paddingVertical: 40,
                        fontSize: 20,
                      }}
                    >
                      {number}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "rgb(122, 122, 122)",
                            fontWeight: "bold",
                          }}
                        >
                          Имя
                        </Text>
                        <Text
                          style={{
                            color: "rgb(122, 122, 122)",
                            fontWeight: "bold",
                          }}
                        >
                          {name}
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={{
                            color: "rgb(122, 122, 122)",
                            fontWeight: "bold",
                          }}
                        >
                          Дата
                        </Text>
                        <Text
                          style={{
                            color: "rgb(122, 122, 122)",
                            fontWeight: "bold",
                          }}
                        >
                          {date}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </Animated.View>
          </TouchableOpacity>

          <TouchableHighlight
            underlayColor={"rgb(246, 246, 246)"}
            onPress={closeModal}
            style={{
              ...styles.button,
            }}
          >
            <Text
              style={{
                color: "rgb(122, 122, 122)",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Закрыть
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCard;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  cardContainer: {
    justifyContent: "center",
    backgroundColor: "rgb(35, 35, 35)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#c6c6c6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  button: {
    backgroundColor: "rgb(35, 35, 35)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    shadowColor: "#c6c6c6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
