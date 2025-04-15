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
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordField = title.toLowerCase().includes("contraseña");

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          className="text-white flex-1 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          style={styles.input}
        />
        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
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
