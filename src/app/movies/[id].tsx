import { useSearchParams } from "expo-router/build/hooks";
import { StyleSheet, Text, View } from "react-native";

const MovieDetail = () => {
  const id = useSearchParams();
  return (
    <View className="mt-20">
      <Text className="text-black">MovieDetail: {id}</Text>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({});
