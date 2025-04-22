import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [sucursales, setSucursales] = useState([]);

  const handleUsernameChange = async (value) => {
    setUsername(value);

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

        console.log("Respuesta de /usuario/info:", data);
        if (res.ok && data.length > 0) {
          const usuario = data[0];
          const usu_id = usuario.usu_id;

          setEmpresa(usuario.emp_nombre || "");
          setSucursal(usuario.suc_nombre || "");

          if (usu_id) {
            const sucRes = await fetch(
              `http://192.168.100.37:3001/usuario/sucursales/${usu_id}`
            );

            if (!sucRes.ok) {
              console.warn("Error al obtener sucursales:", sucRes.status);
              setSucursales([]);
              return;
            }

            const sucData = await sucRes.json();
            setSucursales(sucData);
          } else {
            console.warn("usu_id no definido");
            setSucursales([]);
          }
        } else {
          setEmpresa("");
          setSucursal("");
          setSucursales([]);
        }
      } catch (error) {
        console.error("Error en Profile:", error);
        setEmpresa("");
        setSucursal("");
        setSucursales([]);
      }
    } else {
      setEmpresa("");
      setSucursal("");
      setSucursales([]);
    }
  };

  return (
    <SafeAreaView className="bg-[#161622] flex-1 p-5">
      <StatusBar backgroundColor="#161622" />
      <Text className="text-white text-2xl font-bold mb-4">
        Buscar Usuario
      </Text>

      <TextInput
        className="bg-white rounded-lg p-3 mb-4"
        placeholder="Ingresá nombre de usuario"
        value={username}
        onChangeText={handleUsernameChange}
      />

      <Text className="text-white text-lg mb-2">Empresa: {empresa}</Text>
      <Text className="text-white text-lg mb-4">Sucursal: {sucursal}</Text>

      <Text className="text-white text-lg font-semibold mb-2">
        Sucursales asignadas:
      </Text>

      <ScrollView className="bg-white rounded-lg p-3 max-h-[250px]">
        {sucursales.length > 0 ? (
          sucursales.map((suc, index) => (
            <Text key={index} className="text-black text-base mb-1">
              - {suc.suc_nombre}
            </Text>
          ))
        ) : (
          <Text className="text-gray-500 text-base">No hay sucursales.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
