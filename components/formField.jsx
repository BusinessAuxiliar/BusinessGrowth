import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import {CustomButton} from "../components/customButton"
 
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = title?.toLowerCase() === "password";

  return (
    <View style={styles.wrapper}>
      <Text className="text-base text-white font-pmedium">{title}</Text>

      <View
        style={[
          styles.inputContainer,
          { borderColor: isFocused ? "#4B5563" : "#ffffff" },
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#A1A1AA"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          cursorColor="#ffffff"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C30",
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 64,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    height: "100%",
  },
  toggleButton: {
    paddingLeft: 12,
    height: "100%",
    justifyContent: "center",
  },
  toggleText: {
    color: "#ffffff",
    fontSize: 14,
  },
});

export default FormField;