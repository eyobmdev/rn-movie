import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovie } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovie,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovie);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const hasTrending = Array.isArray(trendingMovie) && trendingMovie.length > 0;
  const movieList = Array.isArray(movies) ? movies : [];

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute z-0 w-full" />
      <FlatList
        data={movieList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />

            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for movies"
            />

            {hasTrending && (
              <>
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">
                    Trending Movies
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 16 }}
                  className="mt-3 mb-4"
                >
                  {trendingMovie.map((item, index) => (
                    <TrendingCard
                      key={`${item.movie_id}-${index}`}
                      movie={item}
                      index={index}
                    />
                  ))}
                </ScrollView>
              </>
            )}

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              The list of movies
            </Text>
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginTop: 10,
        }}
        ListEmptyComponent={
          moviesLoading || trendingLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-5 self-center"
            />
          ) : moviesError || trendingError ? (
            <Text className="my-3 text-red-500 px-5">
              Error: {moviesError?.message || trendingError?.message}
            </Text>
          ) : null
        }
      />
    </View>
  );
}
