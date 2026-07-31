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

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function cadastrar() {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome: nome,
        },
      },
    });

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso! Faça login para continuar."
      );
      navigation.navigate("Login");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FinanSee</Text>
      <Text style={styles.subtitulo}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

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

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>
          Já possui uma conta? Entrar
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