import React, { useState } from "react";
import CustomButton from "../../components/customButton";
import { Link, router } from "expo-router";
import {
  Platform,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
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
    empresa: "",
    sucursal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password) {
      alert("Completa ambos campos");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("http://192.168.100.37:3001/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Bienvenido, ${data.username}`);
      
        router.replace("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error de login:", error);
      alert("Ocurrió un error. Intentá más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleUsernameChange = async (value) => {
    setForm({ ...form, username: value });
  
    if (value.length > 2) {
      try {
        const res = await fetch(
          `http://192.168.100.37:3001/usuario/info/${value}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        const data = await res.json();
        console.log("👉 Info del usuario:", data);
  
        if (res.ok && data.length > 0) {
          setForm((prev) => ({
            ...prev,
            empresa: data[0].emp_nombre || "",
            sucursal: data[0].suc_nombre || "",
          }));
        } else {
          setForm((prev) => ({
            ...prev,
            empresa: "",
            sucursal: "",
          }));
        }
      } catch (error) {
        console.error("Error al obtener info del usuario:", error);
        setForm((prev) => ({
          ...prev,
          empresa: "",
          sucursal: "",
        }));
      }
    }
  };

  return (
    <SafeAreaView className="bg-[#161622] flex-1">
      <StatusBar backgroundColor="#161622" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <TouchableWithoutFeedback
          onPress={Platform.OS !== "web" ? Keyboard.dismiss : undefined}
          accessible={false}
        >
          <View className="flex-1 justify-center px-4 py-6">
            <Image
              source={constants.images.logo}
              style={{
                width: 280,
                height: 140,
                alignSelf: "center",
                marginBottom: 30,
              }}
              resizeMode="contain"
            />
            <Text className="text-2xl text-white font-psemibold mb-5">
              Ingresá en BusinessGrowth
            </Text>

            <FormField
              title="USUARIO"
              placeholder="Ingresá tu nombre de usuario"
              value={form.username}
              handleChangeText={handleUsernameChange}
              otherStyles="mb-6"
            />

            <FormField
              title="CONTRASEÑA"
              placeholder="Ingresá tu contraseña"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
            />

            <FormField
              title="EMPRESA"
              placeholder="Empresa del usuario"
              value={form.empresa}
              handleChangeText={() => {}}
              isDisabled={true}
              otherStyles="mt-6"
            />

            <FormField
              title="SUCURSAL"
              placeholder="Sucursal asignada"
              value={form.sucursal}
              handleChangeText={() => {}}
              isDisabled={true}
              otherStyles="mt-6"
            />

            <CustomButton
              title="Iniciar sesión"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                ¿No tenes cuenta todavía?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-secondary"
              >
                Registrate
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
