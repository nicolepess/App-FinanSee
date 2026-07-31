import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


export default function ConfigSaldo({ navigation, route }) {

  const [saldo, setSaldo] = useState("");


  function salvar() {

    route.params?.alterarSaldo(Number(saldo));

    navigation.goBack();

  }


  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Informe seu saldo atual
      </Text>


      <TextInput
        placeholder="Ex: 500"
        keyboardType="numeric"
        style={styles.input}
        value={saldo}
        onChangeText={setSaldo}
      />


      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
      >

        <Text style={styles.texto}>
          Salvar
        </Text>

      </TouchableOpacity>


    </View>

  );
}


const styles = StyleSheet.create({

container:{
 flex:1,
 justifyContent:"center",
 padding:20,
 backgroundColor:"#F4F7FB"
},

titulo:{
 fontSize:24,
 fontWeight:"bold",
 marginBottom:20
},

input:{
 backgroundColor:"#fff",
 padding:15,
 borderRadius:10,
 marginBottom:15
},

botao:{
 backgroundColor:"#2E7D32",
 padding:15,
 borderRadius:10,
 alignItems:"center"
},

texto:{
 color:"#fff",
 fontWeight:"bold"
}

});