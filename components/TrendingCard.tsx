import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

interface TrendingCardProps {
  movie: TrendingMovie & { posterUrl: string };
  index: number;
}

const TrendingCard = ({
  movie: { movie_id, title, posterUrl },
  index,
}: TrendingCardProps) => {
  console.log(posterUrl, "url");
  return (
    <Link asChild href={`/movies/${movie_id}`}>
      <TouchableOpacity className="relative w-32 pl-5 ml-3">
        <Image
          source={{ uri: posterUrl }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute px-2 py-1 rounded-full bottom-4 -left-3">
          <MaskedView
            maskElement={
              <Text className="text-6xl font-bold text-white">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className="mt-2 text-sm font-bold text-light-200"
          numberOfLines={2}
        >
          
        </Text>
      </TouchableOpacity>
    </Link>
  );
};
export default TrendingCard;
