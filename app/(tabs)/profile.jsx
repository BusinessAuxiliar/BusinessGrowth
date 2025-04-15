import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        buscarUsuarios(searchTerm);
      } else {
        setUsuarios([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const buscarUsuarios = async (nombre) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://192.168.100.37:3001/profile/${nombre}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsuarios(data);
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const renderUsuario = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>👤 {item.usu_nombre}</Text>
      <Text style={styles.userEmail}>📧 {item.usu_email}</Text>
      <Text style={styles.userEmpresa}>🏢 Empresa: {item.empresa}</Text>
      <Text style={styles.userSucursales}>
        🏬 Sucursales:{" "}
        {item.sucursales?.length > 0
          ? item.sucursales.join(", ")
          : "No asociadas"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-[#161622] flex-1">
      <View style={styles.container}>
        <TextInput
          placeholder="🔍 Buscar usuario por nombre..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
        />

        {loading && <ActivityIndicator size="large" color="#007AFF" />}

        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.usu_id.toString()}
          renderItem={renderUsuario}
          ListEmptyComponent={
            !loading && (
              <Text style={styles.noResults}>No se encontraron usuarios.</Text>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#161622",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
  },
  userContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    color: "#fff"
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  userEmail: {
    fontSize: 14,
   color: "#fff"
    
  },
  userEmpresa: {
    fontSize: 14,
    marginTop: 4,
    color: "#fff",
  },
  userSucursales: {
    fontSize: 14,
    marginTop: 2,
    color: "#fff",
  },
  noResults: {
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
});
