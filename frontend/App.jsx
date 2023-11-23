import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import ReactNativeRouter from "./router/ReactNativeRouter";
import { ToastProvider } from "react-native-toast-notifications";
import { PersistGate } from "redux-persist/integration/react";


export default function App() {
  return (
    <ToastProvider style={{ zIndex: 9999 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactNativeRouter />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
