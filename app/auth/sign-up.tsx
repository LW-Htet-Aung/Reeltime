import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import SignUpSvg from "@/assets/svgs/authentication/sign_up.svg";
import { Link, useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { KeyRound, Lock, Mail, User2 } from "lucide-react-native";
import CustomTextInput from "@/components/CustomTextInput";
import useFormValidation from "@/hooks/useFormValidation";
import { signupValidationRules } from "@/utils/validationRule";
import { useAuthStore } from "@/stores/useAuthStore";
import { axiosInstance } from "@/utils/axios";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const SignUp = () => {
  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const { errors, validate } = useFormValidation(signupValidationRules);
  const { login } = useAuthStore.getState();

  const handleSignUp = async () => {
    try {
      if (validate(data)) {
        setLoading(true);
        const res = await axiosInstance.post("/api/users/signup", data);
        if (res.status === 200) {
          const { token, user } = res.data;
          login(token, user);
          router.push("/(tabs)/profile");
        }
      }
    } catch (error: any) {
      console.log(error?.response?.data?.message, "Message");
      Dialog.show({
        autoClose: 500,
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error?.response?.data?.message || "Something went wrong.",
        button: "close",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 px-10 bg-primary">
      <View className="flex flex-col justify-center flex-1 gap-5 my-16">
        <SignUpSvg width={300} height={300} />
        <View className="mx-auto my-6">
          <Text className="mx-auto text-4xl font-semibold text-white">
            Sign Up
          </Text>
          <Text className="mt-4 text-lg text-center text-white">
            Login to your account to save your favorite movies and create
            personalized watchlists that stay with you forever
          </Text>
        </View>

        <View className="gap-y-4">
          <CustomTextInput
            error={errors?.name}
            onChangeText={(text) => setData({ ...data, name: text })}
            icon={<User2 color={colors.primary} size={25} />}
            placeholder="User Name"
          />
          <CustomTextInput
            error={errors?.email}
            onChangeText={(text) => setData({ ...data, email: text })}
            icon={<Mail color={colors.primary} size={25} />}
            placeholder="Email"
          />
          <CustomTextInput
            error={errors?.password}
            onChangeText={(text) => setData({ ...data, password: text })}
            icon={<Lock color={colors.primary} size={25} />}
            placeholder="Password"
          />
          <CustomTextInput
            error={errors?.confirmPassword}
            onChangeText={(text) => setData({ ...data, confirmPassword: text })}
            icon={<KeyRound color={colors.primary} size={25} />}
            placeholder="Confirm Password"
          />
        </View>
        <View className="flex gap-y-6">
          <TouchableOpacity
            disabled={loading}
            onPress={handleSignUp}
            activeOpacity={1}
            className="w-full p-4 rounded-md bg-accent active:bg-accent/80"
          >
            <Text className="text-xl text-center text-primary">
              {!loading ? "Sign Up" : "Loading..."}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center text-lg gap-x-2">
          <Text className="text-lg text-white">Already have an account?</Text>
          <Link className="text-lg text-accent" href="/auth/login">
            Login
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
