import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import constants from "../../constants";
import FormField from "../../components/formField";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const FormContent = () => (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="w-full justify-center px-4 py-6 flex-1">
        <Image
          source={constants.images.logoLargo}
          resizeMode="contain"
          className="w-3/4 max-w-[250px] h-16 self-center"
        />
        <Text className="text-2xl text-white font-psemibold mt-10 mb-5">
          Ingresá en BusinessGrowth
        </Text>

        <FormField
          title="Email"
          placeholder="Ingresá tu email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mb-6"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          placeholder="Ingresá tu contraseña"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView className="bg-[#161622] flex-1">
      <StatusBar backgroundColor="#161622" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {Platform.OS !== "web" ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {FormContent()}
          </TouchableWithoutFeedback>
        ) : (
          FormContent()
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
