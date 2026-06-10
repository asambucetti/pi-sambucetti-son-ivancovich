import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth } from '../firebase/config'; // auth dejará disponibles métodos asincrónicos para registrar y loguear un usuario. Ambos requieren de los parámetros email y pass
import { FontAwesome } from '@expo/vector-icons';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // ACA chequeo que usuario este bien logueado y redirecciono a pantalla ppal de la app
    useEffect(() => { //useEffect reemplaza a componentDidMOunt (porque solo quiero preguntar 1 vez si el usuario esta logueado o no)
        auth.onAuthStateChanged(user => { // onAuthStateChanged observa los datos obtenidos del usuario
            if (user) {
                props.navigation.navigate('NavegacionTab');
            }
        });
    }, [])

    function onSubmit() {
        // ACA chequeo errores de campo
        if (!email.includes('@')) {
            setLoginError('Email mal formateado');
            return;
        }
        if (password.length < 6) {
            setLoginError('La contraseña debe tener una longitud mínima de 6 caracteres');
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                props.navigation.navigate('NavegacionTab', { screen: 'NavegacionStackHome' });
            })
            .catch(error => {
                setLoginError('Email o contraseña incorrectos')
                console.log(error)
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo} >Pawly <FontAwesome name="paw" size={30} color="#F28C28" /></Text>
            <Text style={styles.titulo}>Formulario de login</Text>

            <TextInput 
                style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)} // usamos este atributo para guardar en el estado del componente principal los datos ingresados por el usuario
                value={email} // obtiene la información del estado y la muestra al usuario en la pantalla
            />

            <TextInput 
                style={styles.input}
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

            {loginError !== '' ? <Text style={styles.error}>{loginError}</Text> : null}

            <Pressable
                onPress={() => props.navigation.navigate('Register')} // chequear que register lo llamen asi
                style={styles.linkContainer}
            >
                <Text style={styles.link}>¿No tenes cuenta? Ir al registro</Text>
            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EF',
        paddingHorizontal: 25,
        justifyContent: 'center'
    },
    logo: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#F28C28',
        textAlign: 'center',
        marginBottom: 10
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 25
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#E0D6CC',
        borderRadius: 10,
        marginBottom: 12,
        fontSize: 15
    },
    boton: {
        backgroundColor: '#F28C28',
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 8
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 12
    },
    linkContainer: {
        marginTop: 20
    },
    link: {
        color: '#2F80ED',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});


export default Login;