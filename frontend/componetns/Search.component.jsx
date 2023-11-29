import {
  BackHandler,
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

const Search = ({ getSneakerData }) => {
  const [search, setSearch] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const navigation = useNavigation();

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

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      keyboardDidShowListener.remove();
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
        }}
      >
        <View style={styles.search}>
          <Icon name="search" size={20} color={"#cccbca"} />
          <TextInput
            onChangeText={setSearch}
            style={{ minWidth: 250 }}
            placeholder="Поиск"
          />
        </View>

        <TouchableOpacity>
          <Icon name="filter" size={20} color={"#101010"} />
        </TouchableOpacity>
      </View>

      {visible && (
        <>
          {search !== "" && (
            <>
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
                  <TouchableOpacity
                    key={sneaker.id}
                    onPress={() => {
                      navigation.setParams({
                        sneaker: sneaker,
                      });
                      openBottomSheet();
                    }}
                  >
                    <View style={{ ...styles.sneakerContainer }}>
                      <Image
                        style={{ width: 50, height: 50 }}
                        src={sneaker.image[0].path}
                      />

                      <View>
                        <Text>{sneaker.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </>
          )}
          {getSneakerData.filter((sneaker) =>
            sneaker.name?.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && <Text>Ничего не найдено</Text>}
        </>
      )}
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
