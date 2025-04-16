import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { axiosInstance } from "@/utils/axios";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const getTrendingMovies = async () => {
    const res = await axiosInstance.get("/api/metrics/trending-movies");
    return res.data.data;
  };
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const onSearch = () => {
    router.push("/search");
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#000ff"
            className="self-center mt-10"
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar onPress={onSearch} placeholder="Search For a movie" />
            {trendingMovies && (
              <View className="mt-10 ">
                <Text className="mb-3 text-lg font-bold text-white">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  className="mt-3 mb-4"
                  keyExtractor={(item) => item.movie_id.toString()}
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} key={item.id} />
                  )}
                />
              </View>
            )}
            <>
              <Text className="mt-5 mb-3 text-lg font-bold text-white">
                Latest Movie
              </Text>

              <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="pb-32 mt-2"
                scrollEnabled={false}
                renderItem={({ item }) => <MovieCard {...item} />}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
