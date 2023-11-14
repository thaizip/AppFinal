import React,{useState} from "react";
import { View, Text, StyleSheet,TextInput, TouchableOpacity, onChangeText} from "react-native";
import * as Animatable from 'react-native-animatable';

export default function Login({navigation}){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    return (
        <View style={style.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={style.containerHeader}>
            <Text style={style.titulo}>Bem - Vindo !</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={style.containerForm}>
               <Text style={style.label}>E-mail</Text>
               <TextInput
                placeholder="Digite seu E-mail"
                value={email}
                onChangeText={text => setEmail(text)}
                style={style.input}
               />

                <Text style={style.label}>Senha</Text>
                <TextInput
                placeholder="Digite sua Senha"
                value={senha}
                onChangeText={text => setSenha(text)}
                style={style.input}
               />
                
                <TouchableOpacity style={style.button}>
                    <Text style={style.buttonText}>Acessar</Text>
                </TouchableOpacity>
                
                    <TouchableOpacity style={style.buttonCadastro} onPress={() => {navigation.navigate('Cadastro')}}>
                    <Text> Ainda não possui conta? Cadastra-se </Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#8CBEAA'
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '50%',
        paddingStart: '5%'
    },
    titulo:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F0F2EB'
    },
    containerForm:{
        backgroundColor: '#F0F2EB', 
        flex:1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30, 
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    label:{
        fontSize: 20,
        marginTop: 28
    }, 
    input:{
        borderBottomWidth: 1 ,
        height: 40, 
        marginBottom: 12,
        fontSize: 16
    },
    button:{
        backgroundColor: '#8CBEAA',
        width: '100%',
        borderRadius: 4, 
        paddingVertical: 8, 
        marginTop: 14,
        justifyContent: 'center',
        alignItems:'center'
    }, 
    buttonText:{
        color: '#F0F2EB',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonCadastro:{
        marginTop: 14, 
        alignSelf: 'center'
    }
})