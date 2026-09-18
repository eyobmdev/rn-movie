import { icons } from "@/constants/icons";
import { Image, Text, View } from "react-native";

const Profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex-col justify-center gap-5 items-center flex-1">
        <Image
          source={icons.person}
          className="size-10"
          style={{ tintColor: "#fff" }}
        />
        <Text className="text-gray-500 text-base">Person</Text>
      </View>
    </View>
  );
};

export default Profile;
