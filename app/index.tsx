import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuthStore } from "@/store/AuthStore";

const index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isShow, setIsShow] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setAccessToken } = useAuthStore();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("https://api.itsnumart.com/api/login", {
        email: email,
        password: password,
      });

      setAccessToken(res.data.access_token);
      router.push("/product");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukan Email"
          placeholderTextColor="#aaa"
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder="Masukan Password"
            placeholderTextColor="#aaa"
            onChangeText={setPassword}
            secureTextEntry={isShow}
          />

          <TouchableOpacity onPress={() => setIsShow(!isShow)}>
            {!isShow ? (
              <AntDesign name="eye" size={24} color="black" />
            ) : (
              <FontAwesome name="eye-slash" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
