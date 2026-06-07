import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth } from '../firebase/config'; // auth dejará disponibles métodos asincrónicos para registrar y loguear un usuario. Ambos requieren de los parámetros email y pass


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ACA chequeo que usuario este bien logueado y redirecciono a pantalla ppal de la app
    useEffect(() => { //useEffect reemplaza a componentDidMOunt (porque solo quiero preguntar 1 vez si el usuario esta logueado o no)
        auth.onAuthStateChanged(user => { // onAuthStateChanged observa los datos obtenidos del usuario
            if(user){
                props.navigation.navigate('HomeMenu');
            }
        });
    }, [])

    function onSubmit() {
        // ACA chequeo errores de campo
        if (!email.includes('@')) {
            alert('Email mal formateado');
            return;
        }
        if (password.length < 6) {
            alert('La password debe tener una longitud mínima de 6 caracteres');
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                props.navigation.navigate('HomeMenu');
            })
            .catch(error => {
                alert('Credenciales incorrectas');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Formulario de login</Text>

            <TextInput style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)} // usamos este atributo para guardar en el estado del componente principal los datos ingresados por el usuario
                value={email} // obtiene la información del estado y la muestra al usuario en la pantalla
            />

            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}  // muestra al usuario los puntitos
                onChangeText={text => setPassword(text)} 
                value={password} 
            />

            <Pressable // para simular boton de envio
                onPress={() => onSubmit()}
                style={styles.boton}
            >
                <Text style={styles.textoBoton}>Login</Text>
            </Pressable>

            <Pressable
                onPress={() => props.navigation.navigate('Register')} // chequear que register lo llamen asi
                style={styles.boton}
            >
                <Text>Ir al registro</Text>
            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 30
    },
    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textoBoton: {
        color: '#fff'
    }
})


export default Login;