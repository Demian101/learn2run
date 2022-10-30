import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Sentences from '../components/Sentences';

export default function Homescreen() {
  return(
    <SafeAreaView>
      <ScrollView className=" bg-[#f0f3f5]">
        <Sentences />
        {/* <View className="flex  flex-row justify-start text-5xl p-10">
          <Text className="inline-block">kyour app!</Text>
          <Text className="inline-block">Open up App</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
    )
}