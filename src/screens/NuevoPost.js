import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

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
            <Text style={styles.logo}>Pawly  <FontAwesome name="paw" size={30} color="#F28C28" /></Text>
            <Text style={styles.titulo}>New Post</Text>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder='Post:'
                    value={description}
                    onChangeText={text => setDescription(text)}
                />

                <Pressable style={styles.boton} onPress={onSubmit}>
                    <Text style={styles.textoBoton} >Publicar Post</Text>
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
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        textAlignVertical: 'top',
        fontSize: 15,
        marginBottom: 15
    },
    boton: {
        backgroundColor: '#F6A85A',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowRadius: 6,
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default NuevoPost;

