import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "../services/supabase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function fazerLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      navigation.navigate("Home");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FinanSee</Text>
      <Text style={styles.subtitulo}>
        Controle suas finanças de forma simples
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>
          Não possui uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitulo: {
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
    fontSize: 16,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  botao: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#2E7D32",
    fontWeight: "600",
  },
});