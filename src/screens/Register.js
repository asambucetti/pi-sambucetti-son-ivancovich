import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

function Register(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');
    const [registerError, setRegisterError] = useState('');

    function onSubmit() {
        if (username === '') {
            setRegisterError('El nombre de usuario es obligatorio');
            return;
        }
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                return db.collection('users').add({
                    email: email,
                    username: username,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                return auth.signOut();
            })
            .then(() => {
                    props.navigation.navigate('Login');
            })
            .catch(error => {
                setRegisterError(error.message)
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}> Pawly <FontAwesome name="paw" size={30} color="#F28C28" /> </Text>
            <Text style={styles.titulo}>Formulario de registro</Text>

            <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email} />

            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Nombre de usuario"
                onChangeText={text => setUsername(text)}
                value={username} />

            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPass(text)}
                value={pass} />

            <Pressable onPress={() => onSubmit()} style={styles.boton}>
                <Text style={styles.textoBoton}>Registrarme</Text>
            </Pressable>

            {registerError !== '' ? <Text style={styles.error}>{registerError}</Text> : null}

            <Pressable
                onPress={() => props.navigation.navigate('Login')}
                style={styles.linkContainer}>
                <Text style={styles.link}>Ya tengo cuenta</Text>
            </Pressable>
        </View>
    );
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


export default Register;