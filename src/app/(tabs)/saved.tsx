import { icons } from "@/constants/icons";
import { Image, StyleSheet, Text, View } from "react-native";

const Saved = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex-col justify-center gap-5 items-center flex-1">
        <Image
          source={icons.save}
          className="size-10"
          style={{ tintColor: "#fff" }}
        />
        <Text className="text-gray-500 text-base">Save</Text>
      </View>
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({});
