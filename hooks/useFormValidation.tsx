import React, { useState } from "react";

export interface ValidationRule<T> {
  test: (value: any, formData?: T) => boolean;
  message: string;
  dependencies?: Array<keyof T>;
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T>;
};

const useFormValidation = <T extends Record<string, any>>(
  validationRules: ValidationRules<T>
) => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (formData: T): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    (Object.entries(validationRules) as [keyof T, ValidationRule<T>][]).forEach(
      ([field, rule]) => {
        const value = formData[field];
        const shouldValidate = rule.dependencies
          ? rule.dependencies.every((dep) => formData[dep])
          : true;

        if (shouldValidate && !rule.test(value, formData)) {
          newErrors[field] = rule.message;
        }
      }
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useFormValidation;
