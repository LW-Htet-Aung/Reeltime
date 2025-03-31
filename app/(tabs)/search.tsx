import {
  ActivityIndicator,
  ActivityIndicatorComponent,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

type Props = {};

const Search = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  const onChangeText = (text: string) => {
    setSearchQuery(text);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      const func = async () => {
        if (searchQuery.trim()) {
          await loadMovies();
        } else {
          reset();
        }
      };

      func();
    }, 500);

    return () => clearTimeout(timeOut);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 flex-1 w-full"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        className="ps-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 10,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-center w-full mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                onChangeText={onChangeText}
                value={searchQuery}
                placeholder="Search movies..."
              />
            </View>
            {loading && (
              <ActivityIndicator size="large" color="#000ff" className="my-3" />
            )}
            {error && (
              <Text className="px-5 my-3 text-red-500">
                Error :{error.message}
              </Text>
            )}
            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl font-bold text-white">
                  Search Result For{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="px-5 mt-10">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No Movie Found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
