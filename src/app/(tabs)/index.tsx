import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListHeaderComponent={
          <>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for movies"
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              The list of movies
            </Text>
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-5 self-center"
            />
          ) : moviesError ? (
            <Text className="mt-5 text-white">
              Error: {moviesError?.message}
            </Text>
          ) : null
        }
      />
    </View>
  );
}
