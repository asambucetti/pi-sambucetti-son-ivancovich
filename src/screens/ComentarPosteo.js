import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

function ComentarPosteo(props) {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');



    useEffect(() => {
        db.collection('posts').where('id', '==', props.route.params.id).onSnapshot( //utilizo metodo where porque Permite recuperar documentos que cumplan una condición determinada
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setPosts(posts);
                setLoading(false);
            });

        //creo otro db.collection porque estoy buscanod info en otra coleccion (la de comments)
        db.collection('comments').where('postId', '==', props.route.params.id).onSnapshot(
            docs => {
                let comments = [];
                docs.forEach(doc => {
                    comments.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setComments(comments);
            });
    }, []);

    function onSubmit() {
        if (comment === '') {
            setError('Debes escribir un comentario');
            return;
        }
        db.collection('comments').add({
            owner: auth.currentUser.email,
            postId: props.route.params.id,
            commentPost: comment,
            createdAt: Date.now()
        })
            .then(() => {
                setComment('') //cuestion de estetica, utilizo esto para qwue despues de escribir el comentario y apretar el boton "comment" desaparezca lo que escribi
                setError('');
            })
            .catch(error => console.log(error))
    };


    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Pawly <FontAwesome name="paw" size={30} color="#F28C28" /></Text>

            {loading ? <Text>Cargando...</Text>
                : <FlatList
                    data={posts} // esto esta llamando a la const de arriba 
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.card}>
                            <Text style={styles.email}>{item.data.email}</Text>
                            <Text style={styles.descripcion}>{item.data.description}</Text>
                            <Text style={styles.likesContainer}>Likes: {item.data.likes.length}</Text>

                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='comment'
                                onChangeText={text => setComment(text)}
                                value={comment}
                            />
                            {error !== '' ? <Text style={styles.error}>{error}</Text> : null}

                            <Pressable onPress={() => onSubmit()} style={styles.boton}>
                                <Text style={styles.textoBoton}>Comment <FontAwesome name="comment" size={15} color="#fff" /></Text>
                            </Pressable>

                            <Text style={styles.subtitulo}>Comentarios:</Text>

                            <FlatList
                                style={styles.listaComentarios}
                                data={comments}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) =>
                                    <View style={styles.commentCard}>
                                        <Text style={styles.commentOwner}>{item.data.owner} <FontAwesome name="user-circle" size={15} color="#F28C28" /> </Text>
                                        <Text style={styles.commentText}>{item.data.commentPost}</Text>
                                    </View>
                                }
                            />

                        </View>}
                />}
        </View >
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EF',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 8
    },

    logo: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#F28C28',
        textAlign: 'center',
        marginBottom: 8
    },

    card: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E8DED5',
        marginBottom: 15
    },

    email: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E8DED5',
        paddingBottom: 8
    },

    descripcion: {
        color: '#444',
        fontSize: 17,
        marginBottom: 12
    },

    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18
    },

    likes: {
        color: '#777',
        fontSize: 15
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0D6CC',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        fontSize: 15
    },

    boton: {
        backgroundColor: '#F28C28',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowRadius: 6
    },

    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

    subtitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12
    },

    listaComentarios: {
        marginBottom: 5
    },

    commentCard: {
        backgroundColor: '#FFF7EF',
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E8DED5'
    },

    commentOwner: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 14,
        marginBottom: 6
    },

    commentText: {
        color: '#444',
        fontSize: 15
    },

    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10
    }
});

export default ComentarPosteo;