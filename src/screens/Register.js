import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Register(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');
    const [registerError, setRegisterError] = useState('');

    function onSubmit() {
        console.log(username);
        
        if (username === '') {
        setRegisterError('El nombre de usuario es obligatorio');
        return;
    }
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                db.collection('users').add({
                    email: email,
                    username: username,
                    createdAt: Date.now()
                })
            })
            .then((res) => {
                props.navigation.navigate('Login');
            })

            .catch(error => {
                setRegisterError(error.message)
            });
    }

    return (
        <View style={styles.container}>
            <Text>Registro</Text>

            <TextInput
                style={styles.field}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email} />

            <TextInput
                style={styles.field}
                keyboardType="default"
                placeholder="Nombre de usuario"
                onChangeText={text => setUsername(text)}
                value={username} />

            <TextInput
                style={styles.field}
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={text => setPass(text)}
                value={pass} />

            <Pressable onPress={() => onSubmit()}>
                <Text>Registrarme</Text>
            </Pressable>

            {registerError !== '' ? <Text>{registerError}</Text> : null}

            <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Text>Ya tengo cuenta</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    field: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5
    }
});

export default Register;