import React, { useState } from "react";
import CustomButton from "../../components/customButton";
import { Link, router } from "expo-router";
import { Platform, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import constants from "../../constants";
import FormField from "../../components/formField";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      alert("Completá todos los campos");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://192.168.100.37:3001/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Usuario registrado: ${data.username}`);
        router.replace("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Ocurrió un error. Intentá más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#161622] flex-1">
      <StatusBar backgroundColor="#161622" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center px-4 py-6">
            <Image
              source={constants.images.logo}
              style={{ width: 280, height: 140, alignSelf: "center", marginBottom: 30 }}
              resizeMode="contain"
            />
            <Text className="text-2xl text-white font-psemibold mb-5">Creá tu cuenta</Text>

            <FormField
              title="USUARIO"
              placeholder="Ingresá tu nombre de usuario"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mb-4"
            />

            <FormField
              title="EMAIL"
              placeholder="Ingresá tu email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mb-4"
            />

            <FormField
              title="CONTRASEÑA"
              placeholder="Ingresá tu contraseña"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
            />

            <CustomButton
              title="Registrarse"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">¿Ya tenés cuenta?</Text>
              <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Ingresá</Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;