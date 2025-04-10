import React, { useState } from "react";
import CustomButton from "../../components/customButton";
import { Link } from "expo-router";

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

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmiting] = useState(false);

  const submit = () => {};

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
          Registrate en BusinessGrowth
        </Text>

        <FormField
          title="Username"
          placeholder="Ingresá tu nombre"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="Email"
          placeholder="Ingresá tu email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          placeholder="Ingresá tu contraseña"
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />

        <CustomButton
          title="Registrarme"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            ¿Ya tenés una cuenta?
          </Text>

          <Link
            href="/sign-in"
            className="text-lg font-psemibold  text-secondary"
          >
            Ingresar a Business Growth
          </Link>
        </View>
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

export default SignUp;
