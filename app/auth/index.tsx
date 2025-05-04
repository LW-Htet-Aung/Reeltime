import { Text, TouchableOpacity, View } from "react-native";
import WelcomAuthSvg from "@/assets/svgs/authentication/welcome-auth.svg";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/useAuthStore";
type Props = {};

const AuthPage = (props: Props) => {
  const router = useRouter();
  const { login } = useAuthStore.getState();
  const handleLogin = () => {
    router.push("/auth/login");
  };
  const handleSignup = () => {
    login;
    router.push("/auth/sign-up");
  };
  return (
    <View className="flex flex-col justify-center flex-1 gap-5">
      <WelcomAuthSvg width={300} height={300} />
      <View className="mx-auto my-6">
        <Text className="mx-auto text-4xl font-semibold text-white">Hello</Text>
        <Text className="mt-4 text-lg text-center text-white">
          Login to your account to save your favorite movies and create
          personalized watchlists that stay with you forever
        </Text>
      </View>
      <View className="flex gap-y-6">
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={1}
          className="w-full p-4 rounded-md bg-accent active:bg-accent/80"
        >
          <Text className="text-xl text-center text-primary">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignup}
          activeOpacity={1}
          className="w-full p-4 border rounded-md border-accent active:bg-accent/20"
        >
          <Text className="text-xl text-center text-white">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthPage;
