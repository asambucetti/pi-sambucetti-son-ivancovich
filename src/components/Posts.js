import { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';
import { View, Text, Pressable, StyleSheet } from 'react-native';


function Posts(props) {
    const [usuarioLike, setUsuarioLike] = useState(false);

    useEffect(() => {
        if (props.data.likes.includes(auth.currentUser.email)
        ) {
            setUsuarioLike(true)
        } else {
            setUsuarioLike(false)
        }

    }, [props.data.likes]);
    function like() {
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                console.log('Like Agregado')

            })
    }

    function dislike() {
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                console.log('Like Eliminado')

            })
            .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.email}>{props.data.email}</Text>
            <Text style={styles.descripcion}>{props.data.description}</Text>

            {/*
                <Image
                    source={}
                    style={{
                        width: 150,
                        height: 150
                    }}
                /> */}

            <Text style={styles.likes}>Likes: {props.data.likes.length}</Text>


            <View style={styles.botones}>
                {usuarioLike
                    ?

                    <Pressable onPress={dislike} style={styles.botonLike}>
                        <Text>Dislike</Text>
                    </Pressable>

                    :

                    <Pressable onPress={like} style={styles.botonLike}>
                        <Text>Like</Text>
                    </Pressable>
                }

                {props.navigation ? //utilizo un if ternario porque en mi perfil no tienen que aparecer "comment", por lo tanto, en miPerfil.js no se pasa la prop navigation(atributo en realidad)
                    <Pressable onPress={() => props.navigation.navigate('ComentarPosteo', { id: props.id })} style={styles.botonComentar}>
                        <Text style={styles.textoBoton}>Comment</Text>
                    </Pressable>
                    :
                    null}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 14,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E8DED5'
    },
    email: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 15,
        marginBottom: 8
    },
    descripcion: {
        color: '#444',
        fontSize: 16,
        marginBottom: 12
    },
    likes: {
        color: '#777',
        marginBottom: 12
    },
    botones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    botonLike: {
        backgroundColor: '#F28C28',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    botonComentar: {
        backgroundColor: '#2F80ED',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default Posts;