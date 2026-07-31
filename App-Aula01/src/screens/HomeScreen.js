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

  const [transacoes, setTransacoes] = useState([]);
  const [saldoInicial, setSaldoInicial] = useState(0);


  useEffect(() => {
    carregarDados();
  }, []);


  async function carregarDados() {
    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();


      if (user) {
        setUsuario(
          user.user_metadata?.nome || "Usuário"
        );
      }


      const dados = await buscarCotacao();
      setCotacao(dados);


    } catch (error) {

      console.log(
        "Erro ao carregar dados:",
        error
      );

    }
  }



  function novaTransacao() {

    navigation.navigate(
      "NovaTransacao",
      {

        adicionarTransacao: (nova) => {

          setTransacoes(
            (listaAtual) => [
              ...listaAtual,
              nova,
            ]
          );

        },

      }
    );

  }




  function configurarSaldo() {

    navigation.navigate(
      "ConfigSaldo",
      {

        alterarSaldo: (valor) => {

          setSaldoInicial(valor);

        },

      }
    );

  }





  async function sair() {

    const { error } =
      await supabase.auth.signOut();


    if (!error) {

      navigation.replace("Login");

    }

  }





  const receitas =
    transacoes
      .filter(
        (item) =>
          item.tipo === "receita"
      )
      .reduce(
        (total, item) =>
          total + Number(item.valor),
        0
      );



  const despesas =
    transacoes
      .filter(
        (item) =>
          item.tipo === "despesa"
      )
      .reduce(
        (total, item) =>
          total + Number(item.valor),
        0
      );



  const saldo =
    saldoInicial +
    receitas -
    despesas;



  return (

    <ScrollView
      style={styles.container}
    >


      <Text style={styles.titulo}>
        Olá, {usuario} 👋
      </Text>


      <Text style={styles.subtitulo}>
        Bem-vindo ao FinanSee
      </Text>




      <View style={styles.cardSaldo}>

        <Text style={styles.label}>
          Saldo Atual
        </Text>


        <Text style={styles.saldo}>
          R$ {saldo.toFixed(2)}
        </Text>


      </View>





      <View style={styles.linha}>


        <View style={styles.card}>

          <Text style={styles.cardTitulo}>
            Receitas
          </Text>


          <Text style={styles.receita}>
            R$ {receitas.toFixed(2)}
          </Text>


        </View>




        <View style={styles.card}>

          <Text style={styles.cardTitulo}>
            Despesas
          </Text>


          <Text style={styles.despesa}>
            R$ {despesas.toFixed(2)}
          </Text>


        </View>


      </View>






      <View style={styles.cardCotacao}>


        <Text style={styles.cardTitulo}>
          Cotação de Hoje
        </Text>


        <Text style={styles.texto}>
          💵 Dólar:
          {
            cotacao
              ? ` R$ ${cotacao.dolar}`
              : " Carregando..."
          }
        </Text>



        <Text style={styles.texto}>
          💶 Euro:
          {
            cotacao
              ? ` R$ ${cotacao.euro}`
              : " Carregando..."
          }
        </Text>


      </View>







      <TouchableOpacity
        style={styles.botao}
        onPress={configurarSaldo}
      >

        <Text style={styles.textoBotao}>
          💰 Definir saldo inicial
        </Text>


      </TouchableOpacity>






      <TouchableOpacity
        style={styles.botao}
        onPress={novaTransacao}
      >

        <Text style={styles.textoBotao}>
          + Nova Transação
        </Text>


      </TouchableOpacity>







      {
        transacoes.map(
          (item,index)=>(

            <View
              key={index}
              style={styles.cardCotacao}
            >

              <Text style={styles.cardTitulo}>
                {item.descricao}
              </Text>


              <Text style={styles.texto}>
                💰 R$ {Number(item.valor).toFixed(2)}
              </Text>


              <Text style={styles.texto}>
                📌 {item.tipo}
              </Text>


              <Text style={styles.texto}>
                📅 {item.data}
              </Text>


            </View>

          )
        )
      }






      <TouchableOpacity

        style={[
          styles.botao,
          {
            backgroundColor:"#d32f2f"
          }
        ]}

        onPress={sair}

      >

        <Text style={styles.textoBotao}>
          Sair
        </Text>


      </TouchableOpacity>




    </ScrollView>

  );

}






const styles = StyleSheet.create({


container:{
  flex:1,
  backgroundColor:"#F4F7FB",
  padding:20,
},


titulo:{
  fontSize:28,
  fontWeight:"bold",
  marginTop:50,
},


subtitulo:{
  color:"#666",
  marginBottom:20,
},


cardSaldo:{
  backgroundColor:"#2E7D32",
  padding:25,
  borderRadius:15,
  marginBottom:20,
},


label:{
  color:"#FFF",
  fontSize:16,
},


saldo:{
  color:"#FFF",
  fontSize:32,
  fontWeight:"bold",
  marginTop:10,
},


linha:{
  flexDirection:"row",
  justifyContent:"space-between",
},


card:{
  backgroundColor:"#FFF",
  width:"48%",
  padding:20,
  borderRadius:15,
  marginBottom:20,
},


cardTitulo:{
  fontWeight:"bold",
  marginBottom:10,
},


receita:{
  color:"green",
  fontSize:22,
  fontWeight:"bold",
},


despesa:{
  color:"red",
  fontSize:22,
  fontWeight:"bold",
},


cardCotacao:{
  backgroundColor:"#FFF",
  padding:20,
  borderRadius:15,
  marginBottom:20,
},


texto:{
  fontSize:16,
  marginTop:8,
},


botao:{
  backgroundColor:"#2E7D32",
  padding:18,
  borderRadius:12,
  alignItems:"center",
  marginBottom:15,
},


textoBotao:{
  color:"#FFF",
  fontSize:18,
  fontWeight:"bold",
},


});