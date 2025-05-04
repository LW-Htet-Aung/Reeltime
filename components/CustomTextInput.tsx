import { TextInput, TextInputProps, View, Text } from "react-native";
import { colors } from "@/constants/colors";
import { LucideIcon } from "lucide-react-native";
import { ReactNode } from "react";

interface CustomTextInputProps extends TextInputProps {
  icon?: ReactNode;
  error?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  textInputClassName?: string;
}

const CustomTextInput = ({
  icon,
  error,
  placeholder,
  wrapperClassName,
  iconClassName,
  textInputClassName,
  ...props
}: CustomTextInputProps) => {
  return (
    <View>
      <View
        className={`flex flex-row items-center gap-3 px-4 py-2 mb-4 rounded bg-dark-100 ${wrapperClassName}`}
      >
        {icon && icon}
        <TextInput
          {...props}
          placeholderTextColor={colors.primary}
          className={`flex-1 text-white ${textInputClassName}`}
          placeholder={placeholder}
        />
      </View>
      {error && <Text className="ml-2 text-sm text-red-500">{error}</Text>}
    </View>
  );
};

export default CustomTextInput;
