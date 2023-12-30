import {
  Animated,
  BackHandler,
  Easing,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ModalSneaker } from "../screens/home/components/BottomModal/ModalSneaker";
import { useNavigation } from "@react-navigation/native";
import Sneaker from "./Sneaker.component";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoriteProducts } from "../hooks/useSelector";
import { addToFavorites } from "../redux/favourite/favourite.slice";

const Search = ({ getSneakerData, search, setSearch }) => {
  const searchRef = React.useRef();
  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [animation] = React.useState(new Animated.Value(0));

  const dispatch = useDispatch();
  const favorite = useSelector(selectFavoriteProducts);

  const showResults = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300, // adjust the duration as needed
      useNativeDriver: true, // enable native driver for better performance
    }).start();
  };

  const hideResults = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300, // adjust the duration as needed
      useNativeDriver: true, // enable native driver for better performance
    }).start();
  };

  React.useEffect(() => {
    if (search.length > 0) {
      showResults();
    } else if (search.length === 0) {
      hideResults();
    }
  }, [search.length]);

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setModalVisible(false);
  };

  React.useEffect(() => {
    const handleBackButton = () => {
      setVisible(false);
      return true;
    };

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        searchRef.current.blur();
      }
    );

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View>
      <ModalSneaker
        modalVisible={modalVisible}
        closeBottomSheet={closeBottomSheet}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          gap: 10,
          backgroundColor: "#f4f4f4",
          borderRadius: 50,
          width: 340
        }}
      >
        <View style={styles.search}>
          <Icon name="search" size={20} color={"#cccbca"} />
          <TextInput
            ref={searchRef}
            onChangeText={setSearch}
            style={{ minWidth: 250 }}
            placeholder="Поиск"
          />
        </View>

        <TouchableOpacity>
          <Icon name="filter" size={20} color={"#101010"} />
        </TouchableOpacity>
      </View>

      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={{
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [-2, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
        }}
      >
        {visible && (
          <>
            {search !== "" && (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {getSneakerData
                  .filter((sneaker) =>
                    sneaker.name?.toLowerCase().includes(search.toLowerCase())
                  )
                  .reduce((acc, obj) => {
                    const found = acc.find((item) => item.name === obj.name);
                    if (!found) {
                      acc.push(obj);
                    }
                    return acc;
                  }, [])
                  .map((sneaker) => (
                    <View
                      key={sneaker.id}
                      style={{
                        maxWidth: 150,
                      }}
                    >
                      <Sneaker
                        imageSneaker={sneaker.image[0].path}
                        createdAt={sneaker.createdAt}
                        sneakerName={sneaker.name}
                        sneakerParams={sneaker}
                        sneakerPrice={sneaker.price}
                        sneakerOfferPrice={sneaker.offerPrice}
                        sneakerRating={sneaker.rating}
                        sneakerSoldCount={sneaker.soldCount}
                        favoriteSneaker={() =>
                          dispatch(addToFavorites(sneaker))
                        }
                        favoriteSneakerColor={
                          favorite.items
                            .map((item) => item.id)
                            .includes(sneaker.id)
                            ? "red"
                            : "black"
                        }
                      />
                    </View>
                  ))}
              </View>
            )}
            {getSneakerData.filter((sneaker) =>
              sneaker.name?.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: "100%", height: 300 }}
                  source={require("../public/clipboard.png")}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 20,
                    color: "#212121",
                  }}
                >
                  Ничего не найдено
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    marginTop: 10,
                    color: "#484848",
                    maxWidth: 250,
                  }}
                >
                  Извините, по вашему запросу ничего не найдено. Попробуйте
                  изменить запрос
                </Text>
              </View>
            )}
          </>
        )}
      </Animated.View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  sneakerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
