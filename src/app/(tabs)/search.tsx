import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="flex-1 w-full absolute z-0" />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginTop: 10,
        }}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            <View className="my-5">
              <SearchBar
                placeholder="Search for movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {movies?.length > 0 && searchQuery.trim() && (
              <Text className="text-xl text-white font-bold">
                Search Result For{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text className="my-3 text-red-500 px-5 text-center">
              Error: {moviesError.message}
            </Text>
          ) : searchQuery.trim() ? (
            <Text className="text-center text-gray-400 mt-10">
              No movies found for "{searchQuery}"
            </Text>
          ) : (
            <Text className="text-center text-gray-400 mt-10">
              Start typing to search for movies
            </Text>
          )
        }
      />
    </View>
  );
};

export default Search;
