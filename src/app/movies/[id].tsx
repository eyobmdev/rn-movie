import { fetchMovieDetail } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useSearchParams } from "expo-router/build/hooks";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const MovieDetail = () => {
  const id = useSearchParams().get("id");
  const { data: movie, loading } = useFetch(() => fetchMovieDetail(id ?? ""));
  return (
    <View className=" bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({});
