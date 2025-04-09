import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`justify-center items-center ${containerStyles} ${isLoading? 'opacity-50' : ''}`}
      disabled={isLoading}
      style={{
        
        backgroundColor: '#F50B58', // Reemplazá con el color que quieras
        borderRadius: 16,            // Radio redondeado manual
        minHeight: 62,
        opacity: isLoading ? 0.5 : 1,
        paddingHorizontal: 24,
      }}
    >
      <Text
        className={`text-white text-lg font-semibold ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
