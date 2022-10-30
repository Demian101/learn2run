
import {Provider} from "react-redux";
import Navigator from './navigator';
import store from "./store";
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ReactQueryProvider } from "./lib/ReactQueryProvider";



// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// const queryClient = new QueryClient();

export default function App() {
  return (
    <ReactQueryProvider>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </ReactQueryProvider>
  );
}