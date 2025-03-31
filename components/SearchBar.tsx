import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  value?: string;
  placeholder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  value,
  placeholder,
  onPress,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center px-5 py-4 rounded-full bg-dark-200">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={colors.primary}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.primary}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
