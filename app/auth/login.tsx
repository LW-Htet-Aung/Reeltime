import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import LoginSvg from "@/assets/svgs/authentication/login.svg";
import { Link, useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { Lock, Mail } from "lucide-react-native";
type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const handleLogin = async () => {};
  const handleForgetPassword = async () => {};
  return (
    <View className="flex-1 px-10 bg-primary">
      <View className="flex flex-col justify-center flex-1 gap-5">
        <LoginSvg width={300} height={300} />
        <View className="mx-auto my-6">
          <Text className="mx-auto text-4xl font-semibold text-white">
            Login
          </Text>
        </View>
        <View className="gap-y-4">
          <View className="flex flex-row items-center gap-2 px-4 py-2 mb-4 rounded bg-dark-100">
            <Mail color={colors.primary} size={25} />
            <TextInput
              placeholderTextColor={colors.primary}
              className="flex-1"
              placeholder="Email"
            />
          </View>
          <View className="flex flex-row items-center gap-3 px-4 py-2 mb-4 rounded bg-dark-100">
            <Lock color={colors.primary} size={25} />
            <TextInput 
              placeholderTextColor={colors.primary}
              className="flex-1"
              placeholder="Password"
            />
          </View>
        </View>
        <Text onPress={handleForgetPassword} className="text-lg text-center text-accent">
          Forgot Password?
        </Text>
        <View className="flex gap-y-6">
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={1}
            className="w-full p-4 rounded-md bg-accent active:bg-accent/80"
          >
            <Text className="text-xl text-center text-primary">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center gap-2 ">
          <Text className="text-lg text-white">Don't you have a account?</Text>
          <Link className="text-lg text-accent" href="/auth/sign-up">
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Login;
