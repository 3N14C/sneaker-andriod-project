import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import SpecialOffers from "../screens/SpecialOffers/SpecialOffers";
import OfferList from "../screens/SpecialOffers/components/OfferList";
import FavouriteList from "../screens/home/components/Favourite/FavouriteList";
import Category from "../screens/category/Category";
import { useSelector } from "react-redux";
import { selectCartItems } from "../hooks/useSelector";
import UserRouter from "./components/UserRouter";
import AdminRouter from "./components/AdminRouter";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Checkout from "../screens/checkout/Checkout";
import Payment from "../screens/payment/Payment";
import EditProfile from "../screens/profile/screen/editProfile/EditProfile";
import AddCard from "../screens/profile/screen/editPayment/components/AddCard";
import SettingsPayment from "../screens/profile/screen/editPayment/SettingsPayment";
import TrackOrder from "../screens/order/components/screen/TrackOrder";
import Receipt from "../screens/order/components/screen/Receipt";
import History from "../screens/history/History";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function ReactNativeRouter({}) {
  // COUNTER FOR NAVIGATION
  const cartSneaker = useSelector(selectCartItems);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{  }}
          // initialRouteName="Login"
        >
          <Stack.Group>
            <Stack.Screen
              options={{ animation: "slide_from_left", headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="Register"
              component={Register}
            />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen
              options={{ animation: "fade", animationDuration: 3000, headerShown: false }}
              name="Home"
            >
              {({ route }) => (
                <>
                  {route.params.data.role === "USER" ? (
                    <UserRouter params={route?.params} />
                  ) : (
                    <AdminRouter params={route?.params} />
                  )}
                </>
              )}
            </Stack.Screen>
          </Stack.Group>

          <Stack.Group
            screenOptions={{ headerShown: true, headerShadowVisible: false }}
          >
            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="Special Offers"
              component={SpecialOffers}
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerTitle: "Discount",
              }}
              name="OfferList"
              component={OfferList}
            />

            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerTitle: () => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name="heart"
                        solid
                        size={20}
                        color="red"
                        style={{ marginRight: 10 }}
                      />
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        Желания
                      </Text>
                    </View>
                  );
                },
              }}
              name="FavouriteList"
              component={FavouriteList}
            />

            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="Category"
              component={Category}
            />
            <Stack.Screen
              options={{ animation: "slide_from_right", headerTitle: "Подтверждение" }}
              name="Checkout"
            >
              {({ route }) => (
                <>
                  <Checkout userData={route?.params} />
                </>
              )}
            </Stack.Screen>
            <Stack.Screen
              options={{ animation: "slide_from_right", headerTitle: "Способ оплаты" }}
              name="Payment"
            >
              {({ route }) => (
                <>
                  <Payment userData={route?.params} />
                </>
              )}
            </Stack.Screen>
          </Stack.Group>

          {/* EDIT PROFILE */}
          <Stack.Group
            screenOptions={{ headerShown: true, headerShadowVisible: false }}
          >
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerTitle: "Оплата",
                headerShadowVisible: false,
              }}
              name="SettingsPayment"
              children={({ route }) => (
                <>
                  <SettingsPayment route={route} />
                </>
              )}
            />
            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="EditProfile"
              component={EditProfile}
            />
            <Stack.Screen
              options={{ animation: "slide_from_right" }}
              name="AddCard"
              component={AddCard}
            />
          </Stack.Group>

          {/* ORDER */}
          <Stack.Group>
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: "Статус заказа",
              }}
              name="TrackOrder"
              children={({ route }) => (
                <>
                  <TrackOrder route={route} />
                </>
              )}
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: "Квитанция",
              }}
              name="Квитанция"
              component={Receipt}
            />
          </Stack.Group>

          {/* HISTORY */}
          <Stack.Group>
            <Stack.Screen
              options={{
                animation: "slide_from_right",
                headerShadowVisible: false,
                headerTitle: "История платежей",
              }}
              name="HistoryPayment"
              component={History}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
