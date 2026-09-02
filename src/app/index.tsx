import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold text-primary">
        Welcome to the Movies App
      </Text>
      <Link href="/onboarding">On boarding </Link>
      <Link href="/movie/avengers">Avengers </Link>
    </View>
  );
}
