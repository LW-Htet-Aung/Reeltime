import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/useAuthStore";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User2 } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  console.log(user, "user");
  const { logout } = useAuthStore.getState();
  const handleLogout = async () => {
    // console.log("here");
    logout();
  };
  return (
    <SafeAreaView className="flex-1 pb-12">
      <View className="flex flex-row items-center w-full p-3 rounded gap-x-3 a bg-dark-200">
        <User2 color={colors.primary} width={50} height={50} />
        <Text className="text-white capitalize">{user.name}</Text>
      </View>

      <TouchableOpacity
        className="p-3 rounded bg-rose-500 "
        onPress={handleLogout}
      >
        <Text className="text-lg text-center text-white">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
