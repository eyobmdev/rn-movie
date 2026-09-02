import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold text-primary">
          Welcome to the Movies App
      </Text>
        <Link href="/onboarding" >On boarding </Link>

    </View>
  );
}
