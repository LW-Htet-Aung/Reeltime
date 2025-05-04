import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import WelcomAuthSvg from "@/assets/svgs/authentication/welcome-auth.svg";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/useAuthStore";
import AuthPage from "../auth";
import UserProfile from "../auth/user-profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Props = {};

const Profile = (props: Props) => {
  const router = useRouter();
  const { user } = useAuthStore.getState();
  const handleLogin = () => {
    router.push("/auth/login");
  };
  const handleSignup = () => {
    router.push("/auth/sign-up");
  };
  console.log(user, "user");
  return (
    <View className="flex-1 px-5 py-10 bg-primary">
      {!user ? <AuthPage /> : <UserProfile user={user} />}
    </View>
  );
};

export default Profile;
