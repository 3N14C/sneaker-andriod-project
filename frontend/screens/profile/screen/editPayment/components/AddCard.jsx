import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../../../../../redux/card/card.slice";
import { selectCardItem } from "../../../../../hooks/useSelector";

const AddCard = ({ navigation }) => {
  const [rotate] = React.useState(new Animated.Value(0));
  const [showBalance, setShowBalance] = React.useState(false);

  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [date, setDate] = React.useState("");
  const [dateValid, setDateValid] = React.useState(true)
  const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const [cvv, setCvv] = React.useState("");

  const dispatch = useDispatch();
  const cardItem = useSelector(selectCardItem);

  const handleAddCard = () => {
    

    if (name && number && date && cvv) {
      if (datePattern.test(date)) {
        dispatch(
          addCard({
            nameCard: name.toUpperCase(),
            numberCard: number,
            dateCard: date,
            cvvCard: cvv,
          })
        );
        setName("");
        setNumber("");
        setDate("");
        setCvv("");
        setDateValid(true)
      } else {
        setDateValid(false)
      }
    }
  };

  const handleShowBalance = () => {
    setShowBalance(!showBalance);
    Animated.timing(rotate, {
      toValue: showBalance ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: "Добавить карту",
    });
  }, [cardItem.card]);

  return (
    <ScrollView>
      <View
        style={{
          ...styles.container,
        }}
      >
        <TouchableHighlight
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
                  {cardItem.card.map((card) => (
                    <Text
                      style={{
                        color: "rgb(246, 246, 246)",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {parseFloat(card.balanceCard).toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                      })}
                    </Text>
                  ))}
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
                    {number.length > 0 ? (
                      number
                    ) : (
                      <Text>---- ---- ---- ----</Text>
                    )}
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
                        {name.length > 0 ? name.toUpperCase() : "---- ----"}
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
                        {date.length > 0 ? date : "---- / ----"}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </Animated.View>
        </TouchableHighlight>

        <View
          style={{
            paddingTop: 40,
          }}
        >
          <View>
            <Text
              style={{
                color: "rgb(74, 74, 74)",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Имя
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              style={{
                color: "rgb(74, 74, 74)",
                fontSize: 15,
                marginTop: 10,
                marginLeft: 20,
                borderWidth: 1,
                borderColor: "rgb(74, 74, 74)",
                borderRadius: 10,
                padding: 10,
              }}
              placeholder="Имя"
            />
          </View>

          <View
            style={{
              marginTop: 40,
            }}
          >
            <Text
              style={{
                color: "rgb(74, 74, 74)",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Номер карты
            </Text>

            <TextInput
              value={number.replace(/(\d{4})(?=\d)/g, "$1 ")}
              onChangeText={setNumber}
              keyboardType="numeric"
              maxLength={19}
              style={{
                color: "rgb(74, 74, 74)",
                fontSize: 15,
                marginTop: 10,
                marginLeft: 20,
                borderWidth: 1,
                borderColor: "rgb(74, 74, 74)",
                borderRadius: 10,
                padding: 10,
              }}
              placeholder="Номер карты"
            />
          </View>

          <View
            style={{
              marginTop: 40,
              flexDirection: "row",
              alignItems: "center",
              gap: 50,
            }}
          >
            <View>
              <Text
                style={{
                  color: "rgb(74, 74, 74)",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Дата
              </Text>

              <TextInput
                value={date.replace(/(\d{2})(?=\d)/g, "$1/")}
                onChangeText={setDate}
                keyboardType="numeric"
                maxLength={5}
                style={{
                  color: "rgb(74, 74, 74)",
                  fontSize: 15,
                  marginTop: 10,
                  marginLeft: 20,
                  borderWidth: 1,
                  borderColor: "rgb(74, 74, 74)",
                  borderRadius: 10,
                  padding: 10,
                }}
                placeholder="ДД/ММ"
              />
            </View>

            <View>
              <Text
                style={{
                  color: "rgb(74, 74, 74)",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                CVV
              </Text>

              <TextInput
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                style={{
                  color: "rgb(74, 74, 74)",
                  fontSize: 15,
                  marginTop: 10,
                  marginLeft: 20,
                  borderWidth: 1,
                  borderColor: "rgb(74, 74, 74)",
                  borderRadius: 10,
                  padding: 10,
                }}
                placeholder="CVV"
              />
            </View>
          </View>
        </View>

        <View>
          {!dateValid && (
            <Text
              style={{
                color: "red",
                maxWidth: 200,
                borderWidth: 1,
                borderColor: "#ff9095",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff9095",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              Формат даты не соответствует формату MM/YY
            </Text>
          )}
          <TouchableHighlight
            onPress={() => {
              handleAddCard();
            }}
            style={{
              ...styles.button,
            }}
          >
            <Text
              style={{
                color: "rgb(246, 246, 246)",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                paddingVertical: 10,
              }}
            >
              Добавить
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  cardContainer: {
    justifyContent: "center",
    backgroundColor: "rgb(35, 35, 35)",
    borderRadius: 20,
    padding: 20,
  },

  button: {
    backgroundColor: "black",
    padding: 10,
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
