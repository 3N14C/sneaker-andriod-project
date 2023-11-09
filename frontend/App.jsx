import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import ReactNativeRouter from "./router/ReactNativeRouter";
import { ToastProvider } from "react-native-toast-notifications";
import { PersistGate } from "redux-persist/integration/react";


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <ReactNativeRouter />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
