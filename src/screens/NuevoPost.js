import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

function NuevoPost() {
    const [description, setDescription] = useState('');

    function onSubmit() {
        db.collection('posts').add({
            email: auth.currentUser.email,
            description: description,
            likes: [],
            createdAt: Date.now(),
        })
            .then(doc => {
                doc.update({
                    id: doc.id
                }); //creo el post con .add(), firebase le genera un id automatico y con doc.update() guardo ese mismo ID dentro del documento como propiedad id --> necesito guardar id para los comments
            })
            .then(() => {
                console.log('Post Creado');
                setDescription('');
            })
            .catch(e => console.log(e))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Pawly</Text>
            <Text style={styles.titulo}>New Post</Text>

            <View  style={styles.card}>
                <TextInput
                style={styles.input}
                placeholder='Post:'
                value={description}
                onChangeText={text => setDescription(text)}
            />

            <Pressable style={styles.boton} onPress={onSubmit}>
                <Text>Publicar Post</Text>
            </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EF',
        paddingHorizontal: 15,
        paddingTop: 20
    },
    logo: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#F28C28',
        textAlign: 'center',
        marginBottom: 5
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E8DED5'
    },
    input: {
        minHeight: 120,
        borderWidth: 1,
        borderColor: '#E0D6CC',
        borderRadius: 10,
        padding: 12,
        textAlignVertical: 'top',
        fontSize: 15,
        marginBottom: 15
    },
    boton: {
        backgroundColor: '#F28C28',
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 10
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default NuevoPost;

