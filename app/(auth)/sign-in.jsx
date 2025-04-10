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

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setisSubmiting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password) {
      alert("Completa ambos campos");
      return;
    }

    setisSubmiting(true);

    try {
      const res = await fetch("http://192.168.100.37:3001/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Bienvenido, ${data.username}`);
        // Acá podrías redirigir o guardar datos
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error de login:", error);
      alert("Ocurrió un error. Intentá más tarde.");
    } finally {
      setisSubmiting(false);
    }
  };

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
          title="Usuario"
          placeholder="Ingresá tu nombre de usuario"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mb-6"
        />

        <FormField
          title="Password"
          placeholder="Ingresá tu contraseña"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />

        <CustomButton
          title="Iniciar sesión"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            ¿No tenes cuenta todavia?
          </Text>

          <Link
            href="/sign-up"
            className="text-lg font-psemibold  text-secondary"
          >
            Registrate
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

export default SignIn;
