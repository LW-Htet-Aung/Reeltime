import { ValidationRules } from "@/hooks/useFormValidation";
interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signupValidationRules: ValidationRules<FormValues> = {
  name: {
    test: (value) => !!value,
    message: "Username is required",
  },
  email: {
    test: (value) => !!value,
    message: "Email is required",
  },
  password: {
    test: (value) => !!value,
    message: "Password is required",
  },
  confirmPassword: {
    test: (value, formData) => {
      if (!formData?.password) return false;
      return value === formData.password;
    },
    message: "Passwords do not match",
    dependencies: ["password"],
  },
};
