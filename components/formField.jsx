import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  isDisabled = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = title.toLowerCase().includes("contraseña");

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-white font-pmedium">{title}</Text>
      <View className="flex-row items-center bg-[#252836] px-4 rounded-2xl">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={isPasswordField && !isPasswordVisible}
          editable={!isDisabled}
          className="flex-1 text-white font-psemibold text-base py-4"
        />
        {isPasswordField && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Text className="text-white font-pmedium px-2">
              {isPasswordVisible ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232533",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#383a4f",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  toggleButton: {
    paddingLeft: 12,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 70,
  },
  toggleText: {
    color: "#A1A1AA",
    fontSize: 14,
      fontWeight: "600",
  },
});
