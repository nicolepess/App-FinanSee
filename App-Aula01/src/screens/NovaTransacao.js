import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function NovaTransacao({ navigation, route }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("receita");


  function salvar() {

    if (!descricao || !valor) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos"
      );
      return;
    }


    const valorNumerico = Number(
      valor.replace(",", ".")
    );


    if (isNaN(valorNumerico)) {
      Alert.alert(
        "Erro",
        "Digite um valor válido"
      );
      return;
    }



    const novaTransacao = {
      descricao,
      valor: valorNumerico,
      tipo,
      data: new Date().toLocaleDateString(),
    };



    route.params?.adicionarTransacao(
      novaTransacao
    );


    Alert.alert(
      "Sucesso",
      "Transação cadastrada!"
    );


    navigation.goBack();

  }



  return (

    <View style={styles.container}>


      <Text style={styles.titulo}>
        Nova Transação
      </Text>



      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />



      <TextInput
        placeholder="Valor"
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />



      <Text style={styles.label}>
        Tipo:
      </Text>


      <View style={styles.linha}>

        <TouchableOpacity
          style={[
            styles.tipoBotao,
            tipo === "receita" &&
              styles.selecionadoReceita
          ]}
          onPress={() =>
            setTipo("receita")
          }
        >

          <Text style={styles.textoTipo}>
            Receita
          </Text>

        </TouchableOpacity>




        <TouchableOpacity
          style={[
            styles.tipoBotao,
            tipo === "despesa" &&
              styles.selecionadoDespesa
          ]}
          onPress={() =>
            setTipo("despesa")
          }
        >

          <Text style={styles.textoTipo}>
            Despesa
          </Text>

        </TouchableOpacity>


      </View>




      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
      >

        <Text style={styles.textoBotao}>
          Salvar
        </Text>

      </TouchableOpacity>



    </View>

  );
}



const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    justifyContent:"center",
    backgroundColor:"#F4F7FB",
  },


  titulo:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:30,
    textAlign:"center",
  },


  input:{
    backgroundColor:"#FFF",
    padding:15,
    borderRadius:10,
    marginBottom:15,
  },


  label:{
    fontSize:16,
    fontWeight:"bold",
    marginBottom:10,
  },


  linha:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20,
  },


  tipoBotao:{
    width:"48%",
    backgroundColor:"#ddd",
    padding:15,
    borderRadius:10,
    alignItems:"center",
  },


  selecionadoReceita:{
    backgroundColor:"#2E7D32",
  },


  selecionadoDespesa:{
    backgroundColor:"#d32f2f",
  },


  textoTipo:{
    color:"#FFF",
    fontWeight:"bold",
  },


  botao:{
    backgroundColor:"#2E7D32",
    padding:18,
    borderRadius:10,
    alignItems:"center",
  },


  textoBotao:{
    color:"#FFF",
    fontSize:18,
    fontWeight:"bold",
  },

});