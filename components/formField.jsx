import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = title?.toLowerCase() === "password";

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white font-pmedium">{title}</Text>

      <View className="flex-row items-center bg-[#2C2C30] border-[2px] border-[#4B5563] rounded-2xl px-4 h-16">
        <TextInput
          className="flex-1 text-white font-psemibold text-base h-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#A1A1AA"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          cursorColor="#ffffff"
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="pl-3 h-full justify-center"
          >
            <Text className="text-white text-sm">
              {showPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
