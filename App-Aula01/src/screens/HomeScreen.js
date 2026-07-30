import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { supabase } from "../services/supabase";
import { buscarCotacao } from "../api/currency";

export default function HomeScreen({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [cotacao, setCotacao] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    // Usuário logado
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUsuario(user.user_metadata.nome || "Usuário");
    }

    // Cotação
    const dados = await buscarCotacao();
    setCotacao(dados);
  }

  async function sair() {
    await supabase.auth.signOut();
    navigation.replace("Login");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Olá, {usuario} 👋</Text>
      <Text style={styles.subtitulo}>Bem-vindo ao FinanSee</Text>

      <View style={styles.cardSaldo}>
        <Text style={styles.label}>Saldo Atual</Text>
        <Text style={styles.saldo}>R$ 0,00</Text>
      </View>

      <View style={styles.linha}>
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Receitas</Text>
          <Text style={styles.receita}>R$ 0,00</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Despesas</Text>
          <Text style={styles.despesa}>R$ 0,00</Text>
        </View>
      </View>

      <View style={styles.cardCotacao}>
        <Text style={styles.cardTitulo}>Cotação de Hoje</Text>

        <Text style={styles.texto}>
          💵 Dólar:
          {cotacao ? ` R$ ${cotacao.dolar}` : " Carregando..."}
        </Text>

        <Text style={styles.texto}>
          💶 Euro:
          {cotacao ? ` R$ ${cotacao.euro}` : " Carregando..."}
        </Text>
      </View>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>+ Nova Transação</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: "#d32f2f" }]}
        onPress={sair}
      >
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
  },

  subtitulo: {
    color: "#666",
    marginBottom: 20,
  },

  cardSaldo: {
    backgroundColor: "#2E7D32",
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
  },

  label: {
    color: "#FFF",
    fontSize: 16,
  },

  saldo: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#FFF",
    width: "48%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },

  cardTitulo: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  receita: {
    color: "green",
    fontSize: 22,
    fontWeight: "bold",
  },

  despesa: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
  },

  cardCotacao: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 20,
  },

  texto: {
    fontSize: 16,
    marginTop: 8,
  },

  botao: {
    backgroundColor: "#2E7D32",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});